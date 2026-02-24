import { defineEventHandler, setResponseHeaders } from 'h3';
import { createLogger } from '@/server/utils/logger';
import type { ContributorApiItem, ContributorsResponse } from '@/types/contributors';
type GitHubContributor = {
  avatar_url?: string | null;
  contributions?: number | null;
  html_url?: string | null;
  login?: string | null;
  type?: string | null;
};
type ContributorsCacheEntry = {
  items: ContributorApiItem[];
  timestamp: number;
};
const logger = createLogger('Contributors');
const CONTRIBUTORS_PER_PAGE = 100;
const DEFAULT_TIMEOUT_MS = 8000;
const MAX_TIMEOUT_MS = 20000;
const MAX_TOTAL_PAGES = 10;
const MIN_TIMEOUT_MS = 1000;
const DEFAULT_CACHE_TTL_MS = 30 * 60 * 1000;
const MIN_CACHE_TTL_MS = 60 * 1000;
const MAX_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const FETCH_FAILURE_COOLDOWN_MS = 60 * 1000;
const MAX_LOCAL_CACHE_KEYS = 10;
const EXCLUDED_LOGIN_SUBSTRINGS = ['semantic-release'];
const DEFAULT_EXCLUDED_LOGINS = [
  'claude',
  'claude[bot]',
  'semantic-release-bot',
  'semantic-release[bot]',
];
const contributorsCache = new Map<string, ContributorsCacheEntry>();
const contributorsFetchInFlight = new Map<string, Promise<ContributorsResponse>>();
const contributorsFetchFailureTimestamps = new Map<string, number>();
const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};
const parseNumber = (value: unknown, fallback: number): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};
const parseCommaSeparated = (value: unknown): string[] => {
  if (typeof value !== 'string') return [];
  return value
    .split(',')
    .map((segment) => segment.trim())
    .filter(Boolean);
};
const normalizeLogin = (value: string): string => {
  return value.trim().toLowerCase();
};
const parseString = (value: unknown, fallback: string): string => {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
};
const buildContributorsCacheKey = (
  owner: string,
  repo: string,
  excludedLogins: Set<string>
): string => {
  return [
    normalizeLogin(owner),
    normalizeLogin(repo),
    [...excludedLogins].sort((a, b) => a.localeCompare(b)).join(','),
  ].join(':');
};
const readCachedContributors = (
  cacheKey: string,
  cacheTtlMs: number
): { isFresh: boolean; items: ContributorApiItem[] | null } => {
  const cached = contributorsCache.get(cacheKey);
  if (!cached) return { isFresh: false, items: null };
  return {
    isFresh: Date.now() - cached.timestamp < cacheTtlMs,
    items: cached.items,
  };
};
const writeCachedContributors = (cacheKey: string, items: ContributorApiItem[]): void => {
  if (contributorsCache.size >= MAX_LOCAL_CACHE_KEYS && !contributorsCache.has(cacheKey)) {
    const oldestKey = contributorsCache.keys().next().value as string | undefined;
    if (oldestKey) {
      contributorsCache.delete(oldestKey);
      contributorsFetchFailureTimestamps.delete(oldestKey);
    }
  }
  contributorsCache.set(cacheKey, { items, timestamp: Date.now() });
};
const toBooleanBotType = (contributor: GitHubContributor): boolean => {
  return String(contributor.type ?? '').toLowerCase() === 'bot';
};
const shouldExcludeContributor = (
  contributor: GitHubContributor,
  excludedLogins: Set<string>
): boolean => {
  const rawLogin = contributor.login;
  if (typeof rawLogin !== 'string' || !rawLogin.trim()) return true;
  const login = normalizeLogin(rawLogin);
  if (!login) return true;
  if (toBooleanBotType(contributor)) return true;
  if (login.includes('[bot]')) return true;
  if (EXCLUDED_LOGIN_SUBSTRINGS.some((value) => login.includes(value))) return true;
  return excludedLogins.has(login);
};
const parseContributions = (value: unknown): number => {
  const parsed = parseNumber(value, 0);
  return parsed > 0 ? parsed : 0;
};
const fetchContributorPage = async (
  url: string,
  githubToken: string,
  timeoutMs: number
): Promise<GitHubContributor[] | null> => {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(githubToken
          ? {
              Authorization: `Bearer ${githubToken}`,
              'X-GitHub-Api-Version': '2022-11-28',
            }
          : {}),
      },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) {
      logger.warn('GitHub contributors request failed.', {
        status: response.status,
        url,
      });
      return null;
    }
    const parsed = (await response.json()) as unknown;
    if (!Array.isArray(parsed)) {
      logger.warn('GitHub contributors response is not an array.', { url });
      return null;
    }
    return parsed as GitHubContributor[];
  } catch (error) {
    logger.error('Failed to fetch contributor page.', {
      error: error instanceof Error ? error.message : String(error),
      url,
    });
    return null;
  }
};
const sortContributors = (items: ContributorApiItem[]): ContributorApiItem[] => {
  return [...items].sort((a, b) => {
    if (b.contributions !== a.contributions) return b.contributions - a.contributions;
    return a.login.localeCompare(b.login, undefined, { sensitivity: 'base' });
  });
};
const fetchContributors = async (
  baseUrl: string,
  githubToken: string,
  timeoutMs: number,
  excludedLogins: Set<string>
): Promise<ContributorApiItem[] | null> => {
  const allContributors: GitHubContributor[] = [];
  for (let page = 1; page <= MAX_TOTAL_PAGES; page++) {
    const pageUrl = `${baseUrl}/contributors?per_page=${CONTRIBUTORS_PER_PAGE}&page=${page}`;
    const contributors = await fetchContributorPage(pageUrl, githubToken, timeoutMs);
    if (!contributors) {
      return null;
    }
    allContributors.push(...contributors);
    if (contributors.length < CONTRIBUTORS_PER_PAGE) {
      break;
    }
  }
  const dedupedContributors = new Map<string, ContributorApiItem>();
  for (const contributor of allContributors) {
    if (shouldExcludeContributor(contributor, excludedLogins)) continue;
    const rawLogin = String(contributor.login || '');
    const login = normalizeLogin(rawLogin);
    const normalizedContributor: ContributorApiItem = {
      avatar: String(contributor.avatar_url || ''),
      contributions: parseContributions(contributor.contributions),
      login: rawLogin,
      url: String(contributor.html_url || `https://github.com/${rawLogin}`),
    };
    const existing = dedupedContributors.get(login);
    if (!existing || normalizedContributor.contributions > existing.contributions) {
      dedupedContributors.set(login, normalizedContributor);
    }
  }
  return sortContributors(Array.from(dedupedContributors.values()));
};
export default defineEventHandler(async (event): Promise<ContributorsResponse> => {
  setResponseHeaders(event, { 'Cache-Control': 'public, max-age=300, s-maxage=300' });
  const runtimeConfig = useRuntimeConfig(event);
  const owner = parseString(runtimeConfig.public.githubOwner, 'tarkovtracker-org');
  const repo = parseString(runtimeConfig.public.githubRepo, 'TarkovTracker');
  const timeoutMs = clamp(
    parseNumber(runtimeConfig.githubTimeoutMs, DEFAULT_TIMEOUT_MS),
    MIN_TIMEOUT_MS,
    MAX_TIMEOUT_MS
  );
  const cacheTtlMs = clamp(
    parseNumber(runtimeConfig.githubContributorsCacheTtlMs, DEFAULT_CACHE_TTL_MS),
    MIN_CACHE_TTL_MS,
    MAX_CACHE_TTL_MS
  );
  const githubToken = parseString(runtimeConfig.githubToken, '');
  const configuredExcludedLogins = parseCommaSeparated(runtimeConfig.githubContributorsExclude);
  const excludedLogins = new Set(
    [...DEFAULT_EXCLUDED_LOGINS, ...configuredExcludedLogins].map(normalizeLogin)
  );
  const cacheKey = buildContributorsCacheKey(owner, repo, excludedLogins);
  const cached = readCachedContributors(cacheKey, cacheTtlMs);
  if (cached.isFresh && cached.items) {
    return { items: cached.items };
  }
  const staleCachedItems = cached.items;
  const lastFailureTimestamp = contributorsFetchFailureTimestamps.get(cacheKey);
  const withinCooldown =
    typeof lastFailureTimestamp === 'number' &&
    Date.now() - lastFailureTimestamp < FETCH_FAILURE_COOLDOWN_MS;
  if (withinCooldown) {
    if (staleCachedItems) {
      return { items: staleCachedItems };
    }
    return { items: [], error: 'Failed to fetch contributors' };
  }
  const inFlightRequest = contributorsFetchInFlight.get(cacheKey);
  if (inFlightRequest) {
    return inFlightRequest;
  }
  const baseUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const requestPromise = (async (): Promise<ContributorsResponse> => {
    const fetchedItems = await fetchContributors(baseUrl, githubToken, timeoutMs, excludedLogins);
    if (fetchedItems) {
      writeCachedContributors(cacheKey, fetchedItems);
      contributorsFetchFailureTimestamps.delete(cacheKey);
      return { items: fetchedItems };
    }
    contributorsFetchFailureTimestamps.set(cacheKey, Date.now());
    if (staleCachedItems) {
      logger.warn('Using stale contributors cache after GitHub fetch failure.', { owner, repo });
      return { items: staleCachedItems };
    }
    return { items: [], error: 'Failed to fetch contributors' };
  })();
  contributorsFetchInFlight.set(cacheKey, requestPromise);
  try {
    return await requestPromise;
  } finally {
    const activeRequest = contributorsFetchInFlight.get(cacheKey);
    if (activeRequest === requestPromise) {
      contributorsFetchInFlight.delete(cacheKey);
    }
  }
});
