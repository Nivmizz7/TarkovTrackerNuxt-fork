import { defineEventHandler, getQuery, setResponseHeaders } from 'h3';
import { createLogger } from '~/server/utils/logger';
type ChangelogStats = {
  additions: number;
  deletions: number;
};
type ChangelogBullet = {
  text: string;
  stats?: ChangelogStats;
};
type ChangelogItem = {
  date: string;
  label?: string;
  bullets: ChangelogBullet[];
  stats?: ChangelogStats;
};
type ChangelogResponse = {
  source: 'releases' | 'commits';
  items: ChangelogItem[];
};
type GitHubRelease = {
  name?: string | null;
  tag_name?: string | null;
  body?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  draft?: boolean | null;
};
type GitHubCommitListItem = {
  sha?: string | null;
  commit?: {
    message?: string | null;
    author?: { date?: string | null } | null;
    committer?: { date?: string | null } | null;
  } | null;
};
type GitHubCommitDetail = {
  sha?: string | null;
  commit?: {
    message?: string | null;
    author?: { date?: string | null } | null;
    committer?: { date?: string | null } | null;
  } | null;
  stats?: {
    additions?: number;
    deletions?: number;
    total?: number;
  } | null;
};
type GitHubCompareResponse = {
  ahead_by?: number;
  behind_by?: number;
  total_commits?: number;
  files?: Array<{
    additions?: number;
    deletions?: number;
    changes?: number;
  }>;
};
const logger = createLogger('Changelog');
const OWNER = 'tarkovtracker-org';
const REPO = 'TarkovTrackerNuxt';
const BASE_URL = `https://api.github.com/repos/${OWNER}/${REPO}`;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;
const RELEASE_LIMIT = 3;
const MAX_BULLETS_PER_GROUP = 5;
const MAX_STATS_FETCHES = 20;
const statsCache = new Map<string, { stats: ChangelogStats; timestamp: number }>();
const CACHE_TTL_MS = 30 * 60 * 1000;
const cleanText = (value: string): string => {
  let text = value.replace(/\s*\(#\d+\)\s*$/, '');
  text = text.replace(/\s*\[[^\]]+\]\s*$/, '');
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/[`*_~]/g, '');
  text = text.replace(/[_/]+/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();
  return text;
};
const toSentence = (value: string): string => {
  let text = cleanText(value);
  if (!text) return '';
  const firstChar = text.charAt(0);
  if (firstChar) {
    text = firstChar.toUpperCase() + text.slice(1);
  }
  if (!/[.!?]$/.test(text)) {
    text += '.';
  }
  return text;
};
const parseNumber = (value: unknown, fallback: number): number => {
  if (Array.isArray(value)) return parseNumber(value[0], fallback);
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};
const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};
const fetchGithub = async <T>(url: string): Promise<T | null> => {
  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'TarkovTracker',
      },
    });
  } catch (error) {
    logger.error('[Changelog] Network error fetching GitHub data.', {
      url,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
  if (!response.ok) {
    let bodySnippet = '';
    try {
      bodySnippet = await response.text();
      if (bodySnippet.length > 200) {
        bodySnippet = bodySnippet.slice(0, 200) + '...';
      }
    } catch {
      bodySnippet = '[unable to read response body]';
    }
    logger.warn('[Changelog] Non-OK response from GitHub.', {
      url,
      status: response.status,
      body: bodySnippet,
    });
    return null;
  }
  try {
    return (await response.json()) as T;
  } catch (error) {
    logger.error('[Changelog] Failed to parse GitHub response.', {
      url,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
};
const fetchCommitStats = async (sha: string): Promise<ChangelogStats | null> => {
  const cached = statsCache.get(sha);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.stats;
  }
  const detail = await fetchGithub<GitHubCommitDetail>(`${BASE_URL}/commits/${sha}`);
  if (!detail?.stats) return null;
  const stats: ChangelogStats = {
    additions: detail.stats.additions ?? 0,
    deletions: detail.stats.deletions ?? 0,
  };
  statsCache.set(sha, { stats, timestamp: Date.now() });
  return stats;
};
const fetchReleaseStats = async (
  tagName: string,
  prevTagName?: string
): Promise<ChangelogStats | null> => {
  const cacheKey = `release:${tagName}:${prevTagName || 'initial'}`;
  const cached = statsCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.stats;
  }
  if (!prevTagName) return null;
  const compareUrl = `${BASE_URL}/compare/${prevTagName}...${tagName}`;
  const compare = await fetchGithub<GitHubCompareResponse>(compareUrl);
  if (!compare?.files) return null;
  const stats: ChangelogStats = {
    additions: compare.files.reduce((sum, f) => sum + (f.additions ?? 0), 0),
    deletions: compare.files.reduce((sum, f) => sum + (f.deletions ?? 0), 0),
  };
  statsCache.set(cacheKey, { stats, timestamp: Date.now() });
  return stats;
};
const extractReleaseBullets = (body: string | null | undefined): string[] => {
  if (!body) return [];
  const lines = body
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const bulletLines = lines.filter((line) => /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line));
  const sourceLines = bulletLines.length
    ? bulletLines
    : lines.filter((line) => !line.startsWith('#')).slice(0, MAX_BULLETS_PER_GROUP);
  return sourceLines
    .map((line) =>
      line
        .replace(/^[-*]\s+/, '')
        .replace(/^\d+\.\s+/, '')
        .trim()
    )
    .filter(Boolean);
};
const buildReleaseItems = async (releases: GitHubRelease[]): Promise<ChangelogItem[]> => {
  const validReleases = releases.filter((release) => !release.draft).slice(0, RELEASE_LIMIT);
  const items: ChangelogItem[] = [];
  for (let i = 0; i < validReleases.length; i++) {
    const release = validReleases[i];
    if (!release) continue;
    const date = (release.published_at || release.created_at || '').slice(0, 10);
    const label = cleanText(release.name || release.tag_name || '');
    const rawBullets = extractReleaseBullets(release.body);
    const bullets: ChangelogBullet[] = rawBullets
      .map((b) => ({ text: toSentence(b) }))
      .filter((b) => b.text)
      .slice(0, MAX_BULLETS_PER_GROUP);
    if (!bullets.length && label) {
      bullets.push({ text: toSentence(label) });
    }
    const tagName = release.tag_name;
    const prevRelease = validReleases[i + 1];
    const prevTagName = prevRelease?.tag_name;
    let stats: ChangelogStats | undefined;
    if (tagName && prevTagName) {
      const releaseStats = await fetchReleaseStats(tagName, prevTagName);
      if (releaseStats) {
        stats = releaseStats;
      }
    }
    if (date && bullets.length) {
      items.push({
        date,
        label: label || undefined,
        bullets,
        stats,
      });
    }
  }
  return items;
};
const normalizeCommitMessage = (message: string | null | undefined): string | null => {
  if (!message) return null;
  const firstLine = message.split('\n')[0]?.trim();
  if (!firstLine) return null;
  if (/^merge\b/i.test(firstLine)) return null;
  if (/^revert\b/i.test(firstLine)) return null;
  const conventional = firstLine.match(/^([a-z]+)(?:\([^)]+\))?:\s*(.+)$/i);
  const type = conventional?.[1]?.toLowerCase() ?? '';
  let subject = conventional?.[2] ?? firstLine;
  const skipTypes = new Set(['chore', 'ci', 'test', 'tests', 'docs', 'build', 'style', 'deps']);
  if (type && skipTypes.has(type)) return null;
  const verbMap: Record<string, string> = {
    feat: 'Added',
    fix: 'Fixed',
    perf: 'Improved',
    ui: 'Updated',
    refactor: 'Improved',
  };
  let verb = verbMap[type] || '';
  subject = cleanText(subject);
  if (!subject) return null;
  const leadingVerb = subject.match(
    /^(add|adds|added|fix|fixes|fixed|improve|improves|improved|update|updates|updated|refactor|refactors|refactored)\b/i
  );
  if (!verb && leadingVerb && leadingVerb[1]) {
    const keyword = leadingVerb[1].toLowerCase();
    const inferredMap: Record<string, string> = {
      add: 'Added',
      adds: 'Added',
      added: 'Added',
      fix: 'Fixed',
      fixes: 'Fixed',
      fixed: 'Fixed',
      improve: 'Improved',
      improves: 'Improved',
      improved: 'Improved',
      update: 'Updated',
      updates: 'Updated',
      updated: 'Updated',
      refactor: 'Improved',
      refactors: 'Improved',
      refactored: 'Improved',
    };
    verb = inferredMap[keyword] || 'Updated';
    subject = subject.replace(/^\w+\s+/i, '');
  }
  if (!verb) {
    return null;
  }
  subject = subject.replace(
    /^(add|adds|added|fix|fixes|fixed|improve|improves|improved|update|updates|updated|refactor|refactors|refactored)\b\s+/i,
    ''
  );
  const sentence = toSentence(`${verb} ${subject}`);
  return sentence || null;
};
type ProcessedCommit = {
  sha: string;
  date: string;
  bullet: string;
};
const buildCommitItems = async (
  commits: GitHubCommitListItem[],
  limit: number
): Promise<ChangelogItem[]> => {
  const processed: ProcessedCommit[] = [];
  for (const commit of commits) {
    if (processed.length >= limit) break;
    const bullet = normalizeCommitMessage(commit.commit?.message ?? '');
    if (!bullet) continue;
    const date = commit.commit?.author?.date || commit.commit?.committer?.date || '';
    const day = date.slice(0, 10);
    const sha = commit.sha;
    if (!day || !sha) continue;
    processed.push({ sha, date: day, bullet });
  }
  const statsToFetch = processed.slice(0, MAX_STATS_FETCHES);
  const statsMap = new Map<string, ChangelogStats>();
  await Promise.all(
    statsToFetch.map(async ({ sha }) => {
      const stats = await fetchCommitStats(sha);
      if (stats) {
        statsMap.set(sha, stats);
      }
    })
  );
  const grouped = new Map<string, ChangelogItem>();
  for (const { sha, date, bullet } of processed) {
    const existing = grouped.get(date) ?? {
      date,
      bullets: [],
      stats: { additions: 0, deletions: 0 },
    };
    if (existing.bullets.length < MAX_BULLETS_PER_GROUP) {
      const commitStats = statsMap.get(sha);
      existing.bullets.push({
        text: bullet,
        stats: commitStats,
      });
      if (commitStats && existing.stats) {
        existing.stats.additions += commitStats.additions;
        existing.stats.deletions += commitStats.deletions;
      }
      grouped.set(date, existing);
    }
  }
  return Array.from(grouped.values()).map((item) => ({
    ...item,
    stats: item.stats?.additions || item.stats?.deletions ? item.stats : undefined,
  }));
};
export default defineEventHandler(async (event): Promise<ChangelogResponse> => {
  setResponseHeaders(event, { 'Cache-Control': 'public, max-age=300, s-maxage=300' });
  try {
    const query = getQuery(event);
    const limit = clamp(parseNumber(query.limit, DEFAULT_LIMIT), 1, MAX_LIMIT);
    const releaseLimit = clamp(parseNumber(query.releases, RELEASE_LIMIT), 1, 10);
    const releaseUrl = `${BASE_URL}/releases?per_page=${releaseLimit}`;
    const releases = await fetchGithub<GitHubRelease[]>(releaseUrl);
    const releaseItems = Array.isArray(releases) ? await buildReleaseItems(releases) : [];
    if (releaseItems.length) {
      return { source: 'releases', items: releaseItems };
    }
    const commitFetchCount = Math.min(limit * 4, 100);
    const commitUrl = `${BASE_URL}/commits?per_page=${commitFetchCount}`;
    const commits = await fetchGithub<GitHubCommitListItem[]>(commitUrl);
    const commitItems = Array.isArray(commits) ? await buildCommitItems(commits, limit) : [];
    return { source: 'commits', items: commitItems };
  } catch (error) {
    logger.error('[Changelog] Failed to build changelog.', {
      error: error instanceof Error ? error.message : String(error),
    });
    return { source: 'commits', items: [] };
  }
});
