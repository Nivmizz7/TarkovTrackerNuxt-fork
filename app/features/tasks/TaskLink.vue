<template>
  <div class="flex max-w-full min-w-0 items-center justify-between overflow-hidden">
    <router-link
      :to="taskHref"
      class="text-primary-400 hover:text-primary-300 flex min-w-0 items-center overflow-hidden no-underline"
      :title="props.task?.name"
    >
      <div
        class="shrink-0 overflow-hidden rounded-full"
        :class="compact ? 'h-4 w-4 sm:h-5 sm:w-5 lg:h-8 lg:w-8' : 'h-8 w-8 lg:h-12 lg:w-12'"
      >
        <img :src="traderAvatar" class="h-full w-full object-cover" />
      </div>
      <template v-if="isFactionTask">
        <div
          class="ml-0.5 shrink-0 rounded-none"
          :class="compact ? 'h-4 w-4 sm:h-5 sm:w-5 lg:h-8 lg:w-8' : 'h-8 w-8 lg:h-12 lg:w-12'"
        >
          <img :src="factionImage" class="h-full w-full object-contain invert" />
        </div>
      </template>
      <span
        class="ml-1 truncate font-bold"
        :class="compact ? 'hidden text-xs lg:inline lg:text-sm' : 'text-sm lg:text-xl'"
      >
        {{ props.task?.name }}
      </span>
    </router-link>
    <a
      v-if="props.showWikiLink"
      :href="props.task.wikiLink"
      target="_blank"
      class="text-primary-400 hover:text-primary-300 flex items-center text-xs whitespace-nowrap"
    >
      <img src="/img/logos/wikilogo.webp" alt="Wiki" class="mr-1 h-6 w-6" />
      <span>{{ t('page.tasks.questcard.wiki') }}</span>
    </a>
  </div>
</template>
<script setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    task: {
      type: Object,
      required: true,
    },
    showWikiLink: {
      type: Boolean,
      required: false,
      default: false,
    },
    compact: {
      type: Boolean,
      required: false,
      default: false,
    },
  });
  const { t } = useI18n({ useScope: 'global' });
  const isFactionTask = computed(() => {
    return props.task?.factionName != 'Any';
  });
  const factionImage = computed(() => {
    return `/img/factions/${props.task.factionName}.webp`;
  });
  const traderAvatar = computed(() => {
    return props.task?.trader?.imageLink;
  });
  const taskHref = computed(() => `/tasks?task=${props.task?.id}`);
</script>
