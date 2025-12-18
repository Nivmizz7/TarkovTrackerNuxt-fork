<template>
  <div class="mb-6 space-y-3">
    <!-- Primary Filter: ALL / TASKS / HIDEOUT (Centered) -->
    <div
      class="flex flex-wrap items-center justify-center gap-1 overflow-x-auto rounded-lg bg-[hsl(240,5%,5%)] px-2 py-2 sm:gap-2 sm:px-4 sm:py-3"
    >
      <UButton
        v-for="tab in filterTabs"
        :key="tab.value"
        :variant="'ghost'"
        :color="'neutral'"
        size="sm"
        class="shrink-0 px-2 sm:px-3"
        :class="{
          'border-primary-500 rounded-none border-b-2': modelValue === tab.value,
        }"
        @click="$emit('update:modelValue', tab.value)"
      >
        <UIcon :name="tab.icon" class="h-4 w-4 sm:mr-1 sm:h-5 sm:w-5" />
        <span class="hidden text-[clamp(0.625rem,2vw,0.875rem)] sm:inline">
          {{ tab.label.toUpperCase() }}
        </span>
        <span
          :class="[
            'ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold text-white sm:ml-2 sm:h-7 sm:min-w-7 sm:px-1.5 sm:text-sm',
            modelValue === tab.value ? 'bg-primary-500' : 'bg-gray-600',
          ]"
        >
          {{ tab.count }}
        </span>
      </UButton>
    </div>
    <!-- Secondary filters container -->
    <div class="flex w-full flex-wrap gap-3">
      <!-- Section 1: Search bar -->
      <div class="flex min-w-[250px] flex-1 items-center rounded-lg bg-[hsl(240,5%,5%)] px-4 py-3">
        <UInput
          :model-value="search"
          :placeholder="$t('page.neededitems.searchplaceholder', 'Search items, tasks, or hideout stations...')"
          icon="i-mdi-magnify"
          clearable
          class="w-full"
          @update:model-value="$emit('update:search', $event)"
        />
      </div>
      <!-- Section 2: Item Filters -->
      <div class="flex items-center gap-3 rounded-lg bg-[hsl(240,5%,5%)] px-4 py-3">
        <span class="text-surface-400 mr-1 text-xs font-medium">FILTER:</span>
        <UButton
          :variant="firFilter === 'fir' ? 'soft' : 'ghost'"
          :color="firFilter === 'fir' ? 'success' : 'neutral'"
          size="sm"
          @click="$emit('update:firFilter', firFilter === 'fir' ? 'all' : 'fir')"
        >
          <UIcon name="i-mdi-checkbox-marked-circle" class="mr-1 h-4 w-4" />
          FIR
        </UButton>
        <UButton
          :variant="firFilter === 'non-fir' ? 'soft' : 'ghost'"
          :color="firFilter === 'non-fir' ? 'warning' : 'neutral'"
          size="sm"
          @click="$emit('update:firFilter', firFilter === 'non-fir' ? 'all' : 'non-fir')"
        >
          <UIcon name="i-mdi-checkbox-blank-circle-outline" class="mr-1 h-4 w-4" />
          NON-FIR
        </UButton>
        <div class="border-l border-white/10 pl-3">
          <UButton
            :variant="groupByItem ? 'soft' : 'ghost'"
            :color="groupByItem ? 'primary' : 'neutral'"
            size="sm"
            @click="$emit('update:groupByItem', !groupByItem)"
          >
            <UIcon name="i-mdi-group" class="mr-1 h-4 w-4" />
            GROUP
          </UButton>
        </div>
      </div>
      <!-- Section 3: Team Filters -->
      <div class="flex items-center gap-3 rounded-lg bg-[hsl(240,5%,5%)] px-4 py-3">
        <span class="text-surface-400 mr-1 text-xs font-medium">TEAM:</span>
        <UButton
          :variant="hideTeamItems ? 'soft' : 'ghost'"
          :color="hideTeamItems ? 'error' : 'neutral'"
          size="sm"
          @click="$emit('update:hideTeamItems', !hideTeamItems)"
        >
          <UIcon name="i-mdi-account-group-outline" class="mr-1 h-4 w-4" />
          {{ hideTeamItems ? 'HIDDEN' : 'SHOW' }}
        </UButton>
      </div>
      <!-- Section 3: View Mode & Item Count -->
      <div class="flex items-center gap-3 rounded-lg bg-[hsl(240,5%,5%)] px-4 py-3">
        <UBadge color="neutral" variant="soft" size="md" class="px-3 py-1 text-sm">
          <template v-if="groupByItem && ungroupedCount !== totalCount">
            {{ totalCount }} unique ({{ ungroupedCount }} total)
          </template>
          <template v-else>{{ totalCount }} {{ $t('page.neededitems.items', 'items') }}</template>
        </UBadge>
        <div class="flex gap-1 border-l border-white/10 pl-3">
          <UButton
            icon="i-mdi-view-list"
            :color="viewMode === 'list' ? 'primary' : 'neutral'"
            :variant="viewMode === 'list' ? 'soft' : 'ghost'"
            size="sm"
            @click="$emit('update:viewMode', 'list')"
          />
          <UButton
            icon="i-mdi-view-grid"
            :color="viewMode === 'grid' ? 'primary' : 'neutral'"
            :variant="viewMode === 'grid' ? 'soft' : 'ghost'"
            size="sm"
            @click="$emit('update:viewMode', 'grid')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  type FilterType = 'all' | 'tasks' | 'hideout' | 'completed';
  type ViewMode = 'list' | 'grid';
  type FirFilter = 'all' | 'fir' | 'non-fir';
  interface FilterTab {
    label: string;
    value: FilterType;
    icon: string;
    count: number;
  }
  defineProps<{
    modelValue: FilterType;
    search: string;
    viewMode: ViewMode;
    filterTabs: FilterTab[];
    totalCount: number;
    ungroupedCount: number;
    firFilter: FirFilter;
    groupByItem: boolean;
    hideTeamItems: boolean;
  }>();
  defineEmits<{
    'update:modelValue': [value: FilterType];
    'update:search': [value: string];
    'update:viewMode': [value: ViewMode];
    'update:firFilter': [value: FirFilter];
    'update:groupByItem': [value: boolean];
    'update:hideTeamItems': [value: boolean];
  }>();
</script>
