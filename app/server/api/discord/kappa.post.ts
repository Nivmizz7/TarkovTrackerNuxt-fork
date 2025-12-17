import { createError, defineEventHandler, readBody } from 'h3';
import { createHash } from 'node:crypto';
import type { UserProgressData } from '@/stores/progressState';
import type { Task } from '@/types/tarkov';
import { API_GAME_MODES, API_SUPPORTED_LANGUAGES, GAME_MODES } from '@/utils/constants';
import { createTarkovFetcher, edgeCache } from '~/server/utils/edgeCache';
import { createRestFetch, getSupabaseConfig } from '~/server/utils/supabaseAdmin';

const REQUIRED_PERMISSION = 'GP';
const VALID_GAME_MODES = new Set<string>([GAME_MODES.PVP, GAME_MODES.PVE]);
const GRAPHQL_QUERY = `
  query DiscordKappaTasks($lang: LanguageCode!, $gameMode: GameMode!) {
    tasks(lang: $lang, gameMode: $gameMode) {
      id
      name
      kappaRequired
      factionName
    }
  }
`;

interface TokenRow {
  token_id: string;
  user_id: string;
  permissions: string[];
  game_mode: 'pvp' | 'pve';
  expires_at?: string | null;
  is_active: boolean;
  usage_count?: number | null;
}

interface ProgressRow {
  user_id: string;
  current_game_mode?: string | null;
  pvp_data?: UserProgressData | null;
  pve_data?: UserProgressData | null;
}

type TaskCompletionMap = Record<
  string,
  | {
      complete?: boolean;
      failed?: boolean;
      timestamp?: number;
    }
  | undefined
>;

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

const normalizeGameMode = (mode?: string | null): 'pvp' | 'pve' => {
  if (!mode) return GAME_MODES.PVP;
  const normalized = mode.toLowerCase();
  return VALID_GAME_MODES.has(normalized) ? (normalized as 'pvp' | 'pve') : GAME_MODES.PVP;
};

const sanitizeLanguage = (lang?: string | null) => {
  if (!lang) return 'en';
  const normalized = lang.toLowerCase();
  if (API_SUPPORTED_LANGUAGES.includes(normalized as (typeof API_SUPPORTED_LANGUAGES)[number])) {
    return normalized;
  }
  return 'en';
};

const filterKappaTasks = (tasks: Task[], faction: string) => {
  const normalizedFaction = faction?.toLowerCase() || 'any';
  return tasks.filter((task) => {
    if (!task?.kappaRequired) return false;
    const factionName = task.factionName?.toLowerCase() || 'any';
    if (factionName === 'any') return true;
    return factionName === normalizedFaction;
  });
};

export default defineEventHandler(async (event) => {
  const { apiToken, gameMode: requestedMode, lang } = (await readBody<
    { apiToken?: string; gameMode?: string; lang?: string }
  >(event).catch(() => ({}))) as {
    apiToken?: string;
    gameMode?: string;
    lang?: string;
  };

  const trimmedToken = apiToken?.trim();
  if (!trimmedToken) {
    throw createError({ statusCode: 400, statusMessage: 'apiToken is required' });
  }

  const resolvedGameMode = normalizeGameMode(requestedMode);
  const resolvedLang = sanitizeLanguage(lang);
  const supabaseConfig = getSupabaseConfig();
  const restFetch = createRestFetch(supabaseConfig);

  // Look up the token via hash comparison
  const tokenHash = hashToken(trimmedToken);
  const tokenResp = await restFetch(
    `api_tokens?select=token_id,user_id,permissions,game_mode,is_active,expires_at,usage_count&token_hash=eq.${tokenHash}&is_active=eq.true`
  );
  if (!tokenResp.ok) {
    const reason = await tokenResp.text();
    console.error('[discord/kappa] Token lookup failed:', tokenResp.status, reason);
    throw createError({ statusCode: 500, statusMessage: 'Failed to validate token' });
  }
  const tokens = (await tokenResp.json()) as TokenRow[];
  const token = tokens?.[0];
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid API token' });
  }
  if (!token.is_active) {
    throw createError({ statusCode: 403, statusMessage: 'Token is inactive' });
  }
  if (token.expires_at && new Date(token.expires_at).getTime() < Date.now()) {
    throw createError({ statusCode: 403, statusMessage: 'Token has expired' });
  }
  if (!token.permissions?.includes(REQUIRED_PERMISSION)) {
    throw createError({ statusCode: 403, statusMessage: 'Token is missing GP permission' });
  }
  const tokenMode = normalizeGameMode(token.game_mode);
  if (tokenMode !== resolvedGameMode) {
    throw createError({
      statusCode: 400,
      statusMessage: `Token is restricted to ${tokenMode.toUpperCase()} mode`,
    });
  }

  // Load user progress for the requested mode
  const progressResp = await restFetch(
    `user_progress?select=user_id,current_game_mode,pvp_data,pve_data&user_id=eq.${token.user_id}&limit=1`
  );
  if (!progressResp.ok) {
    const reason = await progressResp.text();
    console.error('[discord/kappa] Failed to load progress:', progressResp.status, reason);
    throw createError({ statusCode: 500, statusMessage: 'Failed to load profile' });
  }
  const progressData = ((await progressResp.json()) as ProgressRow[])[0];
  const modeData =
    (progressData?.[`${resolvedGameMode}_data` as const] as UserProgressData | undefined) || null;
  const faction = modeData?.pmcFaction || 'Any';
  const taskCompletions: TaskCompletionMap = modeData?.taskCompletions || {};

  // Load tasks with caching via edge cache
  const apiGameMode = API_GAME_MODES[resolvedGameMode as keyof typeof API_GAME_MODES] || 'regular';
  const cacheKey = `discord-kappa-${resolvedLang}-${apiGameMode}`;
  const graphResult = await edgeCache<{ data?: { tasks?: Task[] } }>(
    event,
    cacheKey,
    createTarkovFetcher(GRAPHQL_QUERY, { lang: resolvedLang, gameMode: apiGameMode }),
    43200,
    { cacheKeyPrefix: 'tarkov' }
  );
  const tasks = graphResult?.data?.tasks || [];
  const kappaTasks = filterKappaTasks(tasks, faction);
  const totalKappaTasks = kappaTasks.length;
  const completedKappaTasks = kappaTasks.filter(
    (task) => task && taskCompletions?.[task.id]?.complete === true
  ).length;

  // Fire-and-forget usage tracking
  restFetch(`api_tokens?token_id=eq.${token.token_id}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      usage_count: (token.usage_count || 0) + 1,
      last_used_at: new Date().toISOString(),
    }),
  }).catch((err) => console.error('[discord/kappa] Token usage update failed:', err));

  return {
    data: {
      totalKappaTasks,
      completedKappaTasks,
      remainingKappaTasks: Math.max(totalKappaTasks - completedKappaTasks, 0),
      faction,
      gameMode: resolvedGameMode,
      displayName: modeData?.displayName || null,
    },
  };
});
