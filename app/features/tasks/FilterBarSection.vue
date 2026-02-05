<template>
  <section class="bg-surface-800/50 rounded-lg border border-white/5 p-3">
    <div class="mb-2 flex items-center gap-2">
      <UIcon name="i-mdi-filter-variant" class="text-success-400 h-4 w-4" />
      <h3 class="text-xs font-semibold tracking-wide text-white uppercase">
        {{ t('page.tasks.settings.tabs.filter_bar', 'Filter Bar') }}
      </h3>
    </div>
    <p class="text-surface-500 mb-2 text-xs">
      {{ t('page.tasks.settings.filter_bar.hint', 'Show or hide status filters.') }}
    </p>
    <div class="space-y-1">
      <label
        class="hover:bg-surface-700/50 flex cursor-pointer items-center gap-2.5 rounded px-2 py-1.5 transition-colors"
      >
        <UCheckbox v-model="showAllFilterModel" />
        <span class="text-surface-200 text-sm">
          {{ t('page.tasks.settings.filter_bar.all_filter', 'All Filter') }}
        </span>
      </label>
      <label
        class="hover:bg-surface-700/50 flex cursor-pointer items-center gap-2.5 rounded px-2 py-1.5 transition-colors"
      >
        <UCheckbox v-model="showAvailableFilterModel" />
        <span class="text-surface-200 text-sm">
          {{ t('page.tasks.settings.filter_bar.available_filter', 'Available Filter') }}
        </span>
      </label>
      <label
        class="hover:bg-surface-700/50 flex cursor-pointer items-center gap-2.5 rounded px-2 py-1.5 transition-colors"
      >
        <UCheckbox v-model="showLockedFilterModel" />
        <span class="text-surface-200 text-sm">
          {{ t('page.tasks.settings.filter_bar.locked_filter', 'Locked Filter') }}
        </span>
      </label>
      <label
        class="hover:bg-surface-700/50 flex cursor-pointer items-center gap-2.5 rounded px-2 py-1.5 transition-colors"
      >
        <UCheckbox v-model="showCompletedFilterModel" />
        <span class="text-surface-200 text-sm">
          {{ t('page.tasks.settings.filter_bar.completed_filter', 'Completed Filter') }}
        </span>
      </label>
      <label
        class="hover:bg-surface-700/50 flex cursor-pointer items-center gap-2.5 rounded px-2 py-1.5 transition-colors"
      >
        <UCheckbox v-model="showFailedFilterModel" />
        <span class="text-surface-200 text-sm">
          {{ t('page.tasks.settings.filter_bar.failed_filter', 'Failed Filter') }}
        </span>
      </label>
    </div>
  </section>
</template>
<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  const props = defineProps<{
    showAllFilter: boolean;
    showAvailableFilter: boolean;
    showLockedFilter: boolean;
    showCompletedFilter: boolean;
    showFailedFilter: boolean;
  }>();
  const emit = defineEmits<{
    'update:showAllFilter': [value: boolean];
    'update:showAvailableFilter': [value: boolean];
    'update:showLockedFilter': [value: boolean];
    'update:showCompletedFilter': [value: boolean];
    'update:showFailedFilter': [value: boolean];
  }>();
  const { t } = useI18n({ useScope: 'global' });
  const showAllFilterModel = computed({
    get: () => props.showAllFilter,
    set: (value: boolean) => emit('update:showAllFilter', value),
  });
  const showAvailableFilterModel = computed({
    get: () => props.showAvailableFilter,
    set: (value: boolean) => emit('update:showAvailableFilter', value),
  });
  const showLockedFilterModel = computed({
    get: () => props.showLockedFilter,
    set: (value: boolean) => emit('update:showLockedFilter', value),
  });
  const showCompletedFilterModel = computed({
    get: () => props.showCompletedFilter,
    set: (value: boolean) => emit('update:showCompletedFilter', value),
  });
  const showFailedFilterModel = computed({
    get: () => props.showFailedFilter,
    set: (value: boolean) => emit('update:showFailedFilter', value),
  });
</script>
