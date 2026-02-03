<template>
  <div
    class="bg-surface-900 hover:border-surface-600 focus-visible:border-surface-500 focus-visible:ring-surface-700/50 rounded-lg border border-white/12 px-4 py-3 shadow-md transition-all outline-none hover:shadow-lg focus-visible:ring-2"
  >
    <div class="mb-2 flex items-center gap-3">
      <button
        type="button"
        class="flex min-w-0 flex-1 items-center gap-3 text-left transition-opacity hover:opacity-80 focus:outline-none"
        :aria-label="$t('page.dashboard.traders.viewTasks', { name: trader.name })"
        @click="navigateToTraderTasks"
      >
        <img
          v-if="trader.imageLink"
          :src="trader.imageLink"
          :alt="trader.name"
          class="bg-surface-800 border-surface-700 h-10 w-10 shrink-0 rounded-full border"
        />
        <div class="min-w-0 flex-1">
          <div class="truncate text-sm font-semibold text-white">
            {{ trader.name }}
          </div>
        </div>
      </button>
      <div class="text-surface-200 text-sm font-semibold tabular-nums">{{ percentage }}%</div>
    </div>
    <div class="text-surface-400 mb-1 flex items-center justify-between text-xs">
      <span>{{ completedTasks }}/{{ totalTasks }} {{ $t('page.dashboard.traders.tasks') }}</span>
    </div>
    <div
      class="bg-surface-800/35 relative h-2 overflow-hidden rounded-full"
      :class="{ 'mb-2': isLocked || hasLoyaltyLevels || isFence }"
    >
      <div
        class="bg-surface-400/60 absolute inset-y-0 left-0 rounded-full transition-[width] duration-300 ease-out"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
    <div v-if="isLocked && unlockTask" class="text-xs">
      <div class="text-surface-400 mb-0.5 flex items-center gap-1">
        <UIcon name="i-mdi-lock" class="h-3.5 w-3.5" />
        <span>{{ $t('page.dashboard.traders.unlockRequired') }}</span>
      </div>
      <NuxtLink
        :to="`/tasks?task=${unlockTaskId}`"
        class="text-info-400 hover:text-info-300 block transition-colors hover:underline"
      >
        {{ unlockTask.name }}
      </NuxtLink>
    </div>
    <div v-else-if="hasLoyaltyLevels" class="space-y-2">
      <div class="text-surface-400 flex items-center justify-between text-xs font-medium">
        <span>{{ $t('page.dashboard.traders.loyaltyLevel') }}</span>
        <span v-if="hasReputation">{{ $t('page.dashboard.traders.reputation') }}</span>
      </div>
      <div class="flex items-center gap-3">
        <div
          class="bg-surface-800/60 border-surface-700 flex flex-1 overflow-hidden rounded-md border"
        >
          <button
            v-for="lvl in 4"
            :key="lvl"
            type="button"
            class="focus-visible:ring-primary-500/40 flex-1 px-2 py-1 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
            :class="
              currentLevel === lvl
                ? 'bg-surface-600 text-white'
                : 'text-surface-300 hover:bg-surface-700/70 hover:text-surface-100'
            "
            @click="updateLevel(lvl)"
          >
            {{ lvl }}
          </button>
        </div>
        <ReputationInput
          :has-reputation="hasReputation"
          :reputation-input="reputationInput"
          :title="$t('page.dashboard.traders.reputation')"
          :aria-label="$t('page.dashboard.traders.reputation')"
          @blur="onReputationBlur"
          @focus="isEditingReputation = true"
          @input="onReputationInput"
          @keydown="onReputationKeydown"
        />
      </div>
    </div>
    <div
      v-else-if="isFence"
      class="text-surface-400 flex items-center justify-between text-xs font-medium"
    >
      <span>{{ $t('page.dashboard.traders.scavKarma', 'Scav Karma') }}</span>
      <ReputationInput
        :has-reputation="true"
        :reputation-input="reputationInput"
        :title="$t('page.dashboard.traders.reputation')"
        :aria-label="$t('page.dashboard.traders.reputation')"
        @blur="onReputationBlur"
        @focus="isEditingReputation = true"
        @input="onReputationInput"
        @keydown="onReputationKeydown"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
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
  const isFence = computed(() => props.trader.normalizedName === 'fence');
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
  const updateLevel = (level: number) => {
    tarkovStore.setTraderLevel(props.trader.id, level);
  };
  const reputationInput = ref('');
  const isEditingReputation = ref(false);
  const formatReputation = (value: number | null | undefined) => {
    const numeric = Number.isFinite(value) ? (value as number) : 0;
    return numeric.toFixed(2);
  };
  watch(
    currentReputation,
    (value) => {
      if (isEditingReputation.value) return;
      reputationInput.value = formatReputation(value ?? 0);
    },
    { immediate: true }
  );
  const commitReputationInput = () => {
    const normalized = reputationInput.value.replace(',', '.').trim();
    const value = parseFloat(normalized);
    if (Number.isNaN(value)) {
      reputationInput.value = formatReputation(currentReputation.value ?? 0);
      return;
    }
    const clamped = Math.max(-10, Math.min(10, value));
    const rounded = Math.round(clamped * 100) / 100;
    tarkovStore.setTraderReputation(props.trader.id, rounded);
    reputationInput.value = formatReputation(rounded);
  };
  const onReputationInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    reputationInput.value = target.value;
  };
  const onReputationBlur = () => {
    isEditingReputation.value = false;
    commitReputationInput();
  };
  const onReputationKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    const target = event.target as HTMLInputElement;
    target.blur();
  };
  const navigateToTraderTasks = () => {
    preferencesStore.setTaskPrimaryView('traders');
    preferencesStore.setTaskTraderView(props.trader.id);
    router.push('/tasks');
  };
</script>
