<template>
  <div class="container mx-auto min-h-[calc(100vh-250px)] max-w-7xl px-4 py-6">
    <!-- Progress Breakdown Section -->
    <div class="mb-8">
      <button
        class="group mb-4 flex w-full cursor-pointer items-center text-2xl font-bold text-white"
        @click="progressSectionCollapsed = !progressSectionCollapsed"
      >
        <UIcon name="i-mdi-chart-line" class="text-primary-500 mr-2 h-6 w-6" />
        {{ $t('page.dashboard.progress.title') }}
        <UIcon
          :name="progressSectionCollapsed ? 'i-mdi-chevron-down' : 'i-mdi-chevron-up'"
          class="text-surface-400 group-hover:text-surface-200 ml-auto h-5 w-5 transition-colors"
        />
      </button>
      <div
        v-show="!progressSectionCollapsed"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <DashboardProgressCard
          icon="i-mdi-chart-box-outline"
          :label="$t('page.dashboard.hero.overall')"
          :completed="overallCompleted"
          :total="overallTotal"
          :percentage="overallPercentageNum"
          color="primary"
          @click="router.push('/tasks')"
        />
        <DashboardProgressCard
          icon="i-mdi-checkbox-marked-circle-outline"
          :label="$t('page.dashboard.progress.tasks')"
          :completed="dashboardStats.completedTasks.value"
          :total="dashboardStats.totalTasks.value"
          :percentage="totalTasksPercentageNum"
          color="primary"
          @click="router.push('/tasks')"
        />
        <DashboardProgressCard
          icon="i-mdi-briefcase-search"
          :label="$t('page.dashboard.progress.objectives')"
          :completed="dashboardStats.completedObjectives.value"
          :total="dashboardStats.totalObjectives.value"
          :percentage="totalObjectivesPercentageNum"
          color="info"
          @click="router.push('/tasks')"
        />
        <DashboardProgressCard
          icon="i-mdi-package-variant"
          :label="$t('page.dashboard.progress.items')"
          :completed="dashboardStats.completedTaskItems.value"
          :total="dashboardStats.totalTaskItems.value"
          :percentage="totalTaskItemsPercentageNum"
          color="success"
          @click="router.push('/needed-items')"
        />
        <DashboardProgressCard
          icon="i-mdi-trophy"
          :label="$t('page.dashboard.progress.kappa')"
          :completed="dashboardStats.completedKappaTasks.value"
          :total="dashboardStats.totalKappaTasks.value"
          :percentage="totalKappaTasksPercentageNum"
          color="kappa"
          @click="router.push('/tasks')"
        />
        <DashboardProgressCard
          icon="i-mdi-lighthouse"
          :label="$t('page.dashboard.progress.lightkeeper')"
          :completed="dashboardStats.completedLightkeeperTasks.value"
          :total="dashboardStats.totalLightkeeperTasks.value"
          :percentage="totalLightkeeperTasksPercentageNum"
          color="lightkeeper"
          @click="router.push('/tasks')"
        />
      </div>
    </div>
    <!-- Trader Progress Section -->
    <div class="mb-8">
      <button
        class="group mb-4 flex w-full cursor-pointer items-center text-2xl font-bold text-white"
        @click="tradersSectionCollapsed = !tradersSectionCollapsed"
      >
        <UIcon name="i-mdi-account-group" class="text-primary-500 mr-2 h-6 w-6" />
        {{ $t('page.dashboard.traders.title') }}
        <UIcon
          :name="tradersSectionCollapsed ? 'i-mdi-chevron-down' : 'i-mdi-chevron-up'"
          class="text-surface-400 group-hover:text-surface-200 ml-auto h-5 w-5 transition-colors"
        />
      </button>
      <div
        v-show="!tradersSectionCollapsed"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <DashboardTraderCard
          v-for="trader in traderStats"
          :key="trader.id"
          :trader="trader"
          :completed-tasks="trader.completedTasks"
          :total-tasks="trader.totalTasks"
          :percentage="trader.percentage"
        />
      </div>
    </div>
    <!-- Milestones Section -->
    <div>
      <button
        class="group mb-4 flex w-full cursor-pointer items-center text-2xl font-bold text-white"
        @click="milestonesSectionCollapsed = !milestonesSectionCollapsed"
      >
        <UIcon name="i-mdi-star-circle" class="text-primary-500 mr-2 h-6 w-6" />
        {{ $t('page.dashboard.milestones.title') }}
        <UIcon
          :name="milestonesSectionCollapsed ? 'i-mdi-chevron-down' : 'i-mdi-chevron-up'"
          class="text-surface-400 group-hover:text-surface-200 ml-auto h-5 w-5 transition-colors"
        />
      </button>
      <div
        v-show="!milestonesSectionCollapsed"
        class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
      >
        <DashboardMilestoneCard
          title="25%"
          :subtitle="$t('page.dashboard.milestones.starter')"
          :is-achieved="totalTasksPercentageNum >= 25"
          achieved-icon="i-mdi-check-circle"
          unachieved-icon="i-mdi-circle-outline"
          color="primary"
        />
        <DashboardMilestoneCard
          title="50%"
          :subtitle="$t('page.dashboard.milestones.halfway')"
          :is-achieved="totalTasksPercentageNum >= 50"
          achieved-icon="i-mdi-check-circle"
          unachieved-icon="i-mdi-circle-outline"
          color="info"
        />
        <DashboardMilestoneCard
          title="75%"
          :subtitle="$t('page.dashboard.milestones.veteran')"
          :is-achieved="totalTasksPercentageNum >= 75"
          achieved-icon="i-mdi-check-circle"
          unachieved-icon="i-mdi-circle-outline"
          color="success"
        />
        <DashboardMilestoneCard
          :title="$t('page.dashboard.milestones.kappa.title')"
          :subtitle="$t('page.dashboard.milestones.kappa.subtitle')"
          :is-achieved="totalKappaTasksPercentageNum >= 100"
          achieved-icon="i-mdi-trophy"
          unachieved-icon="i-mdi-trophy-outline"
          color="kappa"
        />
        <DashboardMilestoneCard
          :title="$t('page.dashboard.milestones.lightkeeper.title')"
          :subtitle="$t('page.dashboard.milestones.lightkeeper.subtitle')"
          :is-achieved="totalLightkeeperTasksPercentageNum >= 100"
          achieved-icon="i-mdi-lighthouse"
          unachieved-icon="i-mdi-lighthouse-on"
          color="lightkeeper"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { useXpCalculation } from '@/composables/useXpCalculation';
  import { usePreferencesStore } from '@/stores/usePreferences';
  import { useTarkovStore } from '@/stores/useTarkov';
  import { calculatePercentageNum } from '@/utils/formatters';
  import { logger } from '@/utils/logger';
  const progressSectionCollapsed = ref(false);
  const tradersSectionCollapsed = ref(false);
  const milestonesSectionCollapsed = ref(false);
  // Page metadata
  useSeoMeta({
    title: 'Dashboard',
    description:
      'Your Escape from Tarkov progress dashboard. View overall stats, recent completions, and quick access to tasks, hideout, and needed items.',
  });
  // Dashboard statistics composable
  const dashboardStats = useDashboardStats();
  const tarkovStore = useTarkovStore();
  const router = useRouter();
  const preferencesStore = usePreferencesStore();
  const xpCalculation = useXpCalculation();
  // Get current level - respect automatic calculation setting
  const useAutomaticLevel = computed(() => preferencesStore.getUseAutomaticLevelCalculation);
  // Watch for invalid manual level values
  watch(
    () => tarkovStore.playerLevel(),
    (manualLevel) => {
      if (!Number.isFinite(manualLevel)) {
        logger.warn('[Dashboard] manualLevel is not finite', { manualLevel });
      } else if (manualLevel < 0) {
        logger.warn('[Dashboard] manualLevel is negative', { manualLevel });
      }
    }
  );
  // Watch for invalid derived level values (only relevant in automatic mode)
  watch(
    () => xpCalculation?.derivedLevel?.value,
    (derivedLevel) => {
      // Skip if automatic level calculation is disabled or derivedLevel ref is not yet available
      if (!useAutomaticLevel.value || derivedLevel === undefined) return;
      if (!Number.isFinite(derivedLevel)) {
        logger.warn('[Dashboard] derivedLevel is not finite', { derivedLevel });
      } else if (derivedLevel < 0) {
        logger.warn('[Dashboard] derivedLevel is negative', { derivedLevel });
      }
    }
  );
  // Unwrap trader stats for template usage
  const traderStats = computed(() => dashboardStats.traderStats.value || []);
  // Percentage calculations (numeric)
  const totalTasksPercentageNum = computed(() =>
    calculatePercentageNum(dashboardStats.completedTasks.value, dashboardStats.totalTasks.value)
  );
  const totalObjectivesPercentageNum = computed(() =>
    calculatePercentageNum(
      dashboardStats.completedObjectives.value,
      dashboardStats.totalObjectives.value
    )
  );
  const totalTaskItemsPercentageNum = computed(() =>
    calculatePercentageNum(
      dashboardStats.completedTaskItems.value,
      dashboardStats.totalTaskItems.value
    )
  );
  const totalKappaTasksPercentageNum = computed(() =>
    calculatePercentageNum(
      dashboardStats.completedKappaTasks.value,
      dashboardStats.totalKappaTasks.value
    )
  );
  const totalLightkeeperTasksPercentageNum = computed(() =>
    calculatePercentageNum(
      dashboardStats.completedLightkeeperTasks.value,
      dashboardStats.totalLightkeeperTasks.value
    )
  );
  const overallCompleted = computed(
    () =>
      dashboardStats.completedTasks.value +
      dashboardStats.completedObjectives.value +
      dashboardStats.completedTaskItems.value
  );
  const overallTotal = computed(
    () =>
      dashboardStats.totalTasks.value +
      dashboardStats.totalObjectives.value +
      dashboardStats.totalTaskItems.value
  );
  const overallPercentageNum = computed(() =>
    calculatePercentageNum(overallCompleted.value, overallTotal.value)
  );
</script>
