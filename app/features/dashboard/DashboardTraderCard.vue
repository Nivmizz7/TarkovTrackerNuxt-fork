<template>
  <div
    class="bg-surface-900 hover:border-surface-600 focus-visible:border-surface-500 focus-visible:ring-surface-700/50 rounded-lg border border-white/12 px-4 py-3 shadow-md transition-all outline-none hover:shadow-lg focus-visible:ring-2"
  >
    <!-- Header: Avatar + Name + Task Progress -->
    <button
      type="button"
      class="mb-3 flex w-full items-center gap-3 text-left transition-opacity hover:opacity-80 focus:outline-none"
      :aria-label="$t('page.dashboard.traders.viewTasks', { name: trader.name })"
      @click="navigateToTraderTasks"
    >
      <img
        v-if="trader.imageLink"
        :src="trader.imageLink"
        :alt="trader.name"
        class="bg-surface-800 border-surface-700 h-10 w-10 rounded-full border"
      />
      <div class="min-w-0 flex-1">
        <div class="truncate text-sm font-semibold text-white">
          {{ trader.name }}
        </div>
        <div class="text-surface-400 text-xs">
          {{ completedTasks }}/{{ totalTasks }} {{ $t('page.dashboard.traders.tasks') }}
        </div>
      </div>
      <div class="text-surface-50 text-base font-bold">{{ percentage }}%</div>
    </button>
    <!-- Task Progress Bar -->
    <div
      class="bg-surface-950 relative mb-3 h-2 overflow-hidden rounded-full border border-white/8"
    >
      <div
        class="from-surface-500 to-surface-400 absolute inset-y-0 left-0 rounded-full bg-gradient-to-r transition-all duration-300 ease-out"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
    <!-- Locked Trader State -->
    <div v-if="isLocked && unlockTask" class="text-surface-400 text-xs">
      <UIcon name="i-mdi-lock" class="mr-1 inline-block h-3.5 w-3.5 align-text-bottom" />
      {{ $t('page.dashboard.traders.unlockRequired') }}
      <NuxtLink
        :to="`/tasks?task=${unlockTaskId}`"
        class="text-primary-400 hover:text-primary-300 ml-1 underline"
      >
        {{ unlockTask.name }}
      </NuxtLink>
    </div>
    <!-- Controls Row: LL + REP side by side for standard traders -->
    <div v-else-if="hasLoyaltyLevels || hasReputation" class="flex items-end gap-3">
      <!-- Loyalty Level (only for traders with LL1-4) -->
      <div v-if="hasLoyaltyLevels" class="flex-1">
        <div class="text-surface-400 mb-1 text-xs font-medium">
          {{ $t('page.dashboard.traders.loyaltyLevel') }}
        </div>
        <div class="flex gap-1">
          <button
            v-for="lvl in 4"
            :key="lvl"
            type="button"
            class="flex-1 rounded px-1.5 py-1 text-xs font-medium transition-colors"
            :class="
              currentLevel === lvl
                ? 'bg-surface-600 text-surface-50'
                : 'bg-surface-800 text-surface-400 hover:bg-surface-700 hover:text-surface-200'
            "
            @click="updateLevel(lvl)"
          >
            {{ lvl }}
          </button>
        </div>
      </div>
      <!-- Reputation Input -->
      <div v-if="hasReputation" :class="hasLoyaltyLevels ? 'w-20 shrink-0' : 'w-28'">
        <div class="text-surface-400 mb-1 text-xs font-medium">
          {{ $t('page.dashboard.traders.reputation') }}
        </div>
        <input
          type="number"
          step="0.1"
          min="-10"
          max="10"
          :value="currentReputation"
          placeholder="0.00"
          class="no-spinner bg-surface-800 border-surface-700 text-surface-100 placeholder-surface-500 focus:border-surface-600 focus:ring-primary-500/30 h-7 w-full rounded border px-2 text-center text-sm transition-colors focus:ring-1 focus:outline-none"
          @input="onReputationInput"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useMetadataStore } from '@/stores/useMetadata';
  import { usePreferencesStore } from '@/stores/usePreferences';
  import { useTarkovStore } from '@/stores/useTarkov';
  import type { Trader, TraderLoyaltyLevel } from '@/types/tarkov';
  import {
    TRADER_UNLOCK_TASKS,
    TRADERS_WITHOUT_LOYALTY_LEVELS,
    TRADERS_WITHOUT_REPUTATION,
  } from '@/utils/constants';
  const props = defineProps<{
    trader: Trader & { levels?: TraderLoyaltyLevel[] };
    completedTasks: number;
    totalTasks: number;
    percentage: number;
  }>();
  const router = useRouter();
  const preferencesStore = usePreferencesStore();
  const tarkovStore = useTarkovStore();
  const metadataStore = useMetadataStore();
  const hasLoyaltyLevels = computed(
    () =>
      !TRADERS_WITHOUT_LOYALTY_LEVELS.includes(
        props.trader.normalizedName as (typeof TRADERS_WITHOUT_LOYALTY_LEVELS)[number]
      )
  );
  const hasReputation = computed(
    () =>
      !TRADERS_WITHOUT_REPUTATION.includes(
        props.trader.normalizedName as (typeof TRADERS_WITHOUT_REPUTATION)[number]
      )
  );
  const unlockTaskId = computed(
    () => TRADER_UNLOCK_TASKS[props.trader.normalizedName as keyof typeof TRADER_UNLOCK_TASKS]
  );
  const unlockTask = computed(() => {
    if (!unlockTaskId.value) return null;
    return metadataStore.tasks?.find((t) => t.id === unlockTaskId.value) ?? null;
  });
  const isLocked = computed(() => {
    if (!unlockTaskId.value) return false;
    return !tarkovStore.isTaskComplete(unlockTaskId.value);
  });
  const currentLevel = computed(() => tarkovStore.getTraderLevel(props.trader.id));
  const currentReputation = computed(() => tarkovStore.getTraderReputation(props.trader.id));
  const getRequiredRepForLevel = (level: number): number => {
    if (!props.trader.levels || level <= 1) return 0;
    const levelData = props.trader.levels.find((l) => l.level === level);
    return levelData?.requiredReputation ?? 0;
  };
  const getLevelForRep = (rep: number): number => {
    if (!props.trader.levels) return 1;
    let maxLevel = 1;
    for (const level of props.trader.levels) {
      if (rep >= level.requiredReputation && level.level > maxLevel) {
        maxLevel = level.level;
      }
    }
    return maxLevel;
  };
  const updateLevel = (level: number) => {
    tarkovStore.setTraderLevel(props.trader.id, level);
    const requiredRep = getRequiredRepForLevel(level);
    const currentRep = currentReputation.value ?? 0;
    if (currentRep < requiredRep) {
      tarkovStore.setTraderReputation(props.trader.id, requiredRep);
    }
  };
  const onReputationInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    if (!isNaN(value)) {
      const clamped = Math.max(-10, Math.min(10, value));
      tarkovStore.setTraderReputation(props.trader.id, clamped);
      if (clamped !== value) {
        target.value = clamped.toString();
      }
      if (hasLoyaltyLevels.value) {
        const maxPossibleLevel = getLevelForRep(clamped);
        const currentLvl = currentLevel.value ?? 1;
        if (currentLvl > maxPossibleLevel) {
          tarkovStore.setTraderLevel(props.trader.id, maxPossibleLevel);
        }
      }
    }
  };
  const navigateToTraderTasks = () => {
    preferencesStore.setTaskPrimaryView('traders');
    preferencesStore.setTaskTraderView(props.trader.id);
    router.push('/tasks');
  };
</script>
