<template>
  <div class="container mx-auto px-4 py-6 space-y-4 min-h-[calc(100vh-250px)]">
    <div class="flex justify-center">
      <UCard class="w-full max-w-4xl bg-surface-900 border border-white/10">
        <div class="flex flex-wrap gap-2 justify-center">
          <UButton
            v-for="view in primaryViews"
            :key="view.view"
            :icon="`i-${view.icon}`"
            :variant="activePrimaryView === view.view ? 'solid' : 'ghost'"
            :color="activePrimaryView === view.view ? 'primary' : 'neutral'"
            size="sm"
            class="min-w-[140px] justify-center"
            @click="activePrimaryView = view.view"
          >
            {{ view.title }}
          </UButton>
        </div>
      </UCard>
    </div>

    <div>
      <div
        v-if="hideoutLoading || isStoreLoading"
        class="flex flex-col items-center gap-3 text-surface-200 py-10"
      >
        <UIcon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 animate-spin text-primary-500"
        />
        <div class="flex items-center gap-2 text-sm">
          {{ $t("page.hideout.loading") }}
          <RefreshButton />
        </div>
      </div>

      <div
        v-else-if="visibleStations.length === 0"
        class="flex justify-center"
      >
        <UAlert
          icon="i-mdi-clipboard-search"
          color="neutral"
          variant="soft"
          class="max-w-xl"
          :title="$t('page.hideout.nostationsfound')"
        />
      </div>

      <div
        v-else
        class="grid gap-3 mt-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      >
        <HideoutCard
          v-for="(hStation, hIndex) in visibleStations"
          :key="hIndex"
          :station="hStation"
          class="h-full"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useHideoutData } from "@/composables/data/useHideoutData";
import { useProgressStore } from "@/stores/progress";
import { useUserStore } from "@/stores/user";
const HideoutCard = defineAsyncComponent(() =>
  import("@/features/hideout/HideoutCard.vue")
);
const RefreshButton = defineAsyncComponent(() =>
  import("@/components/ui/RefreshButton.vue")
);
const { t } = useI18n({ useScope: "global" });
const { hideoutStations, loading: hideoutLoading } = useHideoutData();
const progressStore = useProgressStore();
const userStore = useUserStore();
const primaryViews = [
  {
    title: t("page.hideout.primaryviews.available"),
    icon: "mdi-tag-arrow-up-outline",
    view: "available",
  },
  {
    title: t("page.hideout.primaryviews.maxed"),
    icon: "mdi-arrow-collapse-up",
    view: "maxed",
  },
  {
    title: t("page.hideout.primaryviews.locked"),
    icon: "mdi-lock",
    view: "locked",
  },
  {
    title: t("page.hideout.primaryviews.all"),
    icon: "mdi-clipboard-check",
    view: "all",
  },
];
const activePrimaryView = computed({
  get: () => userStore.getTaskPrimaryView,
  set: (value) => userStore.setTaskPrimaryView(value),
});
const isStoreLoading = computed(() => {
  try {
    // Check if hideout data is still loading
    if (hideoutLoading.value) return true;
    // Check if we have hideout stations data
    if (!hideoutStations.value || hideoutStations.value.length === 0) {
      return true;
    }
    // Check if progress store team data is ready
    if (
      !progressStore.visibleTeamStores ||
      Object.keys(progressStore.visibleTeamStores).length === 0
    ) {
      return true;
    }
    // Remove the hideoutLevels check as it creates a circular dependency
    // The hideoutLevels computed property needs both hideout stations AND team stores
    // Since we've already verified both are available above, we can proceed
    return false;
  } catch (error) {
    console.error("Error in hideout loading check:", error);
    // Return false to prevent stuck loading state on error
    return false;
  }
});
const visibleStations = computed(() => {
  try {
    // Use the comprehensive loading check - don't render until everything is ready
    if (isStoreLoading.value) {
      return [];
    }
    const hideoutStationList = JSON.parse(
      JSON.stringify(hideoutStations.value)
    );
    //Display all upgradeable stations
    if (activePrimaryView.value === "available")
      return hideoutStationList.filter((station) => {
        const lvl = progressStore.hideoutLevels?.[station.id]?.self || 0;
        const nextLevelData = station.levels.find((l) => l.level === lvl + 1);
        if (!nextLevelData) return false;
        return nextLevelData.stationLevelRequirements.every(
          (req) =>
            (progressStore.hideoutLevels?.[req.station.id]?.self || 0) >=
            req.level
        );
      });
    //Display all maxed stations
    if (activePrimaryView.value === "maxed")
      return hideoutStationList.filter(
        (station) =>
          (progressStore.hideoutLevels?.[station.id]?.self || 0) ===
          station.levels.length
      );
    //Display all locked stations
    if (activePrimaryView.value === "locked")
      return hideoutStationList.filter((station) => {
        const lvl = progressStore.hideoutLevels?.[station.id]?.self || 0;
        const nextLevelData = station.levels.find((l) => l.level === lvl + 1);
        if (!nextLevelData) return false;
        return !nextLevelData.stationLevelRequirements.every(
          (req) =>
            (progressStore.hideoutLevels?.[req.station.id]?.self || 0) >=
            req.level
        );
      });
    //Display all stations
    if (activePrimaryView.value === "all") return hideoutStationList;
    return hideoutStationList;
  } catch (error) {
    console.error("Error computing visible stations:", error);
    // Return empty array on error to prevent stuck states
    return [];
  }
});
</script>
<style lang="scss" scoped></style>