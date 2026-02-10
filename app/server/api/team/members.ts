import { createError, defineEventHandler, getQuery, getRequestHeader } from 'h3';
import { createLogger } from '~/server/utils/logger';
const logger = createLogger('TeamMembers');
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isValidUuid = (value: string): boolean => UUID_REGEX.test(value);
type ProfileRow = {
  user_id: string;
  current_game_mode?: string | null;
  pvp_display_name?: string | null;
  pvp_level?: number | null;
  pvp_tasks_completed?: number | null;
  pve_display_name?: string | null;
  pve_level?: number | null;
  pve_tasks_completed?: number | null;
};
type MemberProfile = {
  displayName: string | null;
  level: number | null;
  tasksCompleted: number | null;
};
function mapProfile(p: ProfileRow): MemberProfile {
  const isPve = ((p.current_game_mode as 'pvp' | 'pve' | null) || 'pvp') === 'pve';
  return {
    displayName: isPve ? (p.pve_display_name ?? null) : (p.pvp_display_name ?? null),
    level: isPve ? (p.pve_level ?? null) : (p.pvp_level ?? null),
    tasksCompleted: isPve ? (p.pve_tasks_completed ?? null) : (p.pvp_tasks_completed ?? null),
  };
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const supabaseUrl = config.supabaseUrl;
  const supabaseServiceKey = config.supabaseServiceKey;
  const supabaseAnonKey = config.supabaseAnonKey;
  if (
    typeof supabaseUrl !== 'string' ||
    !supabaseUrl ||
    typeof supabaseAnonKey !== 'string' ||
    !supabaseAnonKey
  ) {
    throw createError({
      statusCode: 500,
      statusMessage:
        '[team/members] Missing required environment variables: SUPABASE_URL and SUPABASE_ANON_KEY must both be set',
    });
  }
  const teamId = (getQuery(event).teamId as string | undefined)?.trim();
  if (!teamId) {
    throw createError({ statusCode: 400, statusMessage: 'teamId is required' });
  }
  const authHeader = getRequestHeader(event, 'authorization');
  const authContextUser = (event.context as { auth?: { user?: { id?: string } } }).auth?.user;
  let userId = authContextUser?.id || null;
  if (!userId) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({ statusCode: 401, statusMessage: 'Missing auth token' });
    }
    const authResp = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        Authorization: authHeader,
        apikey: supabaseAnonKey,
      },
    });
    if (!authResp.ok) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
    }
    const user = (await authResp.json()) as { id: string };
    userId = user.id;
  }
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
  }
  const restApiKey = supabaseServiceKey || supabaseAnonKey;
  const restAuthorization =
    authHeader || (supabaseServiceKey ? `Bearer ${supabaseServiceKey}` : '');
  if (!restAuthorization) {
    throw createError({ statusCode: 401, statusMessage: 'Missing auth token' });
  }
  const restFetch = async (path: string, init?: RequestInit) => {
    const url = `${supabaseUrl}/rest/v1/${path}`;
    const headers = {
      apikey: restApiKey,
      Authorization: restAuthorization,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init?.headers as Record<string, string> | undefined),
    };
    return fetch(url, { ...init, headers });
  };
  const membershipResp = await restFetch(
    `team_memberships?team_id=eq.${teamId}&user_id=eq.${userId}&select=user_id&limit=1`
  );
  if (!membershipResp.ok) {
    throw createError({ statusCode: 500, statusMessage: 'Failed membership check' });
  }
  const membershipJson = (await membershipResp.json()) as Array<{ user_id: string }>;
  if (!membershipJson?.length) {
    throw createError({ statusCode: 403, statusMessage: 'Not a team member' });
  }
  const membersResp = await restFetch(`team_memberships?team_id=eq.${teamId}&select=user_id`);
  if (!membersResp.ok) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to load members' });
  }
  const membersJson = (await membersResp.json()) as Array<{ user_id: string }>;
  const memberIds = membersJson.map((m) => m.user_id);
  const validMemberIds = memberIds.filter((id) => isValidUuid(id));
  const profileMap: Record<string, MemberProfile> = {};
  if (validMemberIds.length > 0) {
    const idsParam = validMemberIds.map((id) => `"${id}"`).join(',');
    const profilesResp = await restFetch(
      `team_member_summary?select=user_id,current_game_mode,pvp_display_name,pvp_level,pvp_tasks_completed,pve_display_name,pve_level,pve_tasks_completed&user_id=in.(${idsParam})`
    );
    if (profilesResp.ok) {
      const profiles = (await profilesResp.json()) as ProfileRow[];
      for (const p of profiles) {
        profileMap[p.user_id] = mapProfile(p);
      }
    } else {
      const errorText = await profilesResp.text();
      logger.error(`Profiles fetch error (${profilesResp.status}):`, errorText);
      for (const id of validMemberIds) {
        const resp = await restFetch(
          `team_member_summary?select=user_id,current_game_mode,pvp_display_name,pvp_level,pvp_tasks_completed,pve_display_name,pve_level,pve_tasks_completed&user_id=eq.${id}`
        );
        if (!resp.ok) continue;
        const profiles = (await resp.json()) as ProfileRow[];
        for (const p of profiles) {
          profileMap[p.user_id] = mapProfile(p);
        }
      }
    }
  }
  return { members: memberIds, profiles: profileMap };
});
