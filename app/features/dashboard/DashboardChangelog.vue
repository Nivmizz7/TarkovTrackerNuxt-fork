<template>
  <div class="mb-3">
    <div class="panel px-3 py-2">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 text-sm font-semibold text-white">
          <UIcon name="i-mdi-history" class="text-primary-400 h-4 w-4" />
          {{ t('page.dashboard.changelog.title') }}
        </div>
        <div class="flex items-center gap-2">
          <NuxtLink
            to="/changelog"
            class="text-primary-400 hover:text-primary-300 text-xs transition-colors"
          >
            {{ t('page.dashboard.changelog.viewAll') }}
          </NuxtLink>
          <span class="text-surface-600">|</span>
          <UButton
            size="xs"
            color="neutral"
            variant="link"
            :aria-controls="panelId"
            :aria-expanded="isOpen"
            @click="toggleOpen"
          >
            {{ isOpen ? t('page.dashboard.changelog.hide') : t('page.dashboard.changelog.show') }}
          </UButton>
        </div>
      </div>
      <div v-if="isOpen" :id="panelId" class="mt-2 space-y-3 text-xs sm:text-sm">
        <div v-if="pending" class="text-surface-400 text-xs">
          {{ t('page.dashboard.changelog.loading') }}
        </div>
        <div v-else-if="error" class="text-surface-400 flex items-center gap-2 text-xs">
          <span>{{ t('page.dashboard.changelog.error') }}</span>
          <UButton size="xs" color="neutral" variant="link" @click="retry">
            {{ t('page.dashboard.changelog.retry') }}
          </UButton>
        </div>
        <div v-else-if="showEmpty" class="text-surface-400 text-xs">
          {{ t('page.dashboard.changelog.empty') }}
        </div>
        <div v-else class="space-y-3">
          <div v-for="entry in entries" :key="entry.date" class="space-y-1">
            <div class="text-surface-400 text-[11px] font-semibold tracking-wide uppercase">
              <span>{{ formatDate(entry.date) }}</span>
              <span v-if="entry.label" class="text-surface-500">· {{ entry.label }}</span>
            </div>
            <ul class="text-surface-200 list-disc space-y-1 pl-4">
              <li v-for="(bullet, index) in entry.bullets" :key="index">
                {{ getBulletText(bullet) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  type ChangelogStats = {
    additions: number;
    deletions: number;
  };
  type ChangelogBullet = string | { text: string; stats?: ChangelogStats };
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
  const { locale, t } = useI18n({ useScope: 'global' });
  const isOpen = ref(false);
  const hasRequested = ref(false);
  const panelId = 'dashboard-changelog-panel';
  const entries = ref<ChangelogItem[]>([]);
  const pending = ref(false);
  const error = ref(false);
  const showEmpty = computed(() => !pending.value && !error.value && entries.value.length === 0);
  const getBulletText = (bullet: ChangelogBullet): string => {
    return typeof bullet === 'string' ? bullet : bullet.text;
  };
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
    const firstChar = text[0];
    if (firstChar) {
      text = firstChar.toUpperCase() + text.slice(1);
    }
    if (!/[.!?]$/.test(text)) {
      text += '.';
    }
    return text;
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
      : lines.filter((line) => !line.startsWith('#'));
    return sourceLines
      .map((line) =>
        line
          .replace(/^[-*]\s+/, '')
          .replace(/^\d+\.\s+/, '')
          .trim()
      )
      .filter(Boolean);
  };
  const buildReleaseItems = (releases: Array<Record<string, unknown>>): ChangelogItem[] => {
    return releases
      .filter((release) => release && release.draft !== true)
      .slice(0, 3)
      .map((release) => {
        const date = String(release.published_at || release.created_at || '').slice(0, 10);
        const label = cleanText(String(release.name || release.tag_name || ''));
        const rawBullets = extractReleaseBullets(release.body as string | null | undefined);
        const bullets = rawBullets.map(toSentence).filter(Boolean).slice(0, 5);
        if (!bullets.length && label) {
          bullets.push(toSentence(label));
        }
        return { date, label: label || undefined, bullets };
      })
      .filter((item) => item.date && item.bullets.length);
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
    if (!verb) return null;
    subject = subject.replace(
      /^(add|adds|added|fix|fixes|fixed|improve|improves|improved|update|updates|updated|refactor|refactors|refactored)\b\s+/i,
      ''
    );
    const sentence = toSentence(`${verb} ${subject}`);
    return sentence || null;
  };
  const buildCommitItems = (commits: Array<Record<string, unknown>>): ChangelogItem[] => {
    const grouped = new Map<string, ChangelogItem>();
    let total = 0;
    for (const commit of commits) {
      if (total >= 10) break;
      const commitData = (commit?.commit as Record<string, unknown> | undefined) ?? {};
      const bullet = normalizeCommitMessage(commitData.message as string | null | undefined);
      if (!bullet) continue;
      const date =
        (commitData.author as Record<string, unknown> | undefined)?.date ||
        (commitData.committer as Record<string, unknown> | undefined)?.date ||
        '';
      const day = String(date).slice(0, 10);
      if (!day) continue;
      const existing = grouped.get(day) ?? { date: day, bullets: [] };
      if (existing.bullets.length < 5) {
        existing.bullets.push(bullet);
        grouped.set(day, existing);
        total += 1;
      }
    }
    return Array.from(grouped.values());
  };
  const fetchServerItems = async (): Promise<ChangelogItem[] | null> => {
    try {
      const response = await fetch('/api/changelog?limit=10', {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) return null;
      const data = (await response.json()) as ChangelogResponse | null;
      if (!data || !Array.isArray(data.items)) return null;
      return data.items;
    } catch {
      return null;
    }
  };
  const fetchGithubItems = async (): Promise<ChangelogItem[] | null> => {
    try {
      const releaseResponse = await fetch(
        'https://api.github.com/repos/tarkovtracker-org/TarkovTrackerNuxt/releases?per_page=3',
        {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        }
      );
      if (releaseResponse.ok) {
        const releases = (await releaseResponse.json()) as Array<Record<string, unknown>>;
        if (Array.isArray(releases)) {
          const releaseItems = buildReleaseItems(releases);
          if (releaseItems.length) return releaseItems;
        }
      }
      const commitResponse = await fetch(
        'https://api.github.com/repos/tarkovtracker-org/TarkovTrackerNuxt/commits?per_page=40',
        {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        }
      );
      if (!commitResponse.ok) return null;
      const commits = (await commitResponse.json()) as Array<Record<string, unknown>>;
      if (!Array.isArray(commits)) return null;
      const commitItems = buildCommitItems(commits);
      return commitItems;
    } catch {
      return null;
    }
  };
  const loadChangelog = async (force = false) => {
    if (pending.value) return;
    if (hasRequested.value && !force) return;
    pending.value = true;
    error.value = false;
    hasRequested.value = true;
    const serverItems = await fetchServerItems();
    if (serverItems) {
      entries.value = serverItems;
      pending.value = false;
      return;
    }
    const githubItems = await fetchGithubItems();
    if (githubItems) {
      entries.value = githubItems;
      pending.value = false;
      return;
    }
    entries.value = [];
    error.value = true;
    pending.value = false;
  };
  const toggleOpen = () => {
    isOpen.value = !isOpen.value;
  };
  const retry = async () => {
    await loadChangelog(true);
  };
  watch(isOpen, async (open) => {
    if (open) {
      await loadChangelog();
    }
  });
  const formatDate = (date: string): string => {
    if (!date) return '';
    const parsed = new Date(`${date}T00:00:00Z`);
    return parsed.toLocaleDateString(locale.value, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
  };
</script>
