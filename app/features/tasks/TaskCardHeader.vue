<template>
  <div class="flex min-w-0 items-center gap-2">
    <AppTooltip :text="task?.name">
      <component
        :is="task?.id ? 'router-link' : 'div'"
        v-bind="task?.id ? { to: `/tasks?task=${task.id}` } : {}"
        :class="
          task?.id
            ? 'text-link hover:text-link-hover flex min-w-0 items-center gap-2 no-underline'
            : 'flex min-w-0 items-center gap-2'
        "
      >
        <div class="bg-surface-800 h-9 w-9 shrink-0 overflow-hidden rounded-full">
          <img
            v-if="task?.trader?.imageLink"
            :src="task.trader.imageLink"
            :alt="task?.trader?.name || 'Trader'"
            class="h-full w-full object-cover"
          />
          <UIcon v-else name="i-mdi-account-circle" class="text-surface-400 h-full w-full" />
        </div>
        <img
          v-if="task?.factionName && isFactionTask"
          :src="factionImage"
          :alt="task?.factionName || 'Faction'"
          class="h-6 w-6 shrink-0 object-contain invert"
        />
        <span class="text-surface-100 min-w-0 truncate text-sm font-semibold sm:text-base">
          {{ task?.name }}
        </span>
      </component>
    </AppTooltip>
    <div class="ml-2 flex shrink-0 items-center gap-1.5">
      <AppTooltip
        v-if="task?.wikiLink"
        :text="t('page.tasks.questcard.viewOnWiki', 'View on Wiki')"
      >
        <a
          :href="task.wikiLink"
          target="_blank"
          rel="noopener noreferrer"
          class="focus-visible:ring-primary-500 focus-visible:ring-offset-surface-900 text-surface-400 hover:text-surface-200 inline-flex items-center justify-center rounded p-1 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          :aria-label="t('page.tasks.questcard.viewOnWiki', 'View on Wiki')"
          @click.stop
        >
          <img src="/img/logos/wikilogo.webp" alt="Wiki" aria-hidden="true" class="h-5 w-5" />
        </a>
      </AppTooltip>
      <AppTooltip
        v-if="task?.id"
        :text="t('page.tasks.questcard.viewOnTarkovDev', 'View on Tarkov.dev')"
      >
        <a
          :href="tarkovDevTaskUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="focus-visible:ring-primary-500 focus-visible:ring-offset-surface-900 text-surface-400 hover:text-surface-200 inline-flex items-center justify-center rounded p-1 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          :aria-label="t('page.tasks.questcard.viewOnTarkovDev', 'View on Tarkov.dev')"
          @click.stop
        >
          <img
            src="/img/logos/tarkovdevlogo.webp"
            alt="tarkov.dev"
            aria-hidden="true"
            class="h-5 w-5"
          />
        </a>
      </AppTooltip>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { Task } from '@/types/tarkov';
  const props = defineProps<{
    task: Task;
  }>();
  const { t } = useI18n({ useScope: 'global' });
  const isFactionTask = computed(() => props.task.factionName !== 'Any');
  const factionImage = computed(() => `/img/factions/${props.task.factionName}.webp`);
  const tarkovDevTaskUrl = computed(() => `https://tarkov.dev/task/${props.task.id}`);
</script>
