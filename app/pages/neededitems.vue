<template>
  <div class="container mx-auto px-4 py-6 max-w-6xl">
    <UCard class="bg-surface-900 border border-white/10" :ui="{ body: 'p-0' }">
      <div class="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <UIcon
          name="i-mdi-format-list-checks"
          class="w-6 h-6 text-primary-400"
        />
        <h1 class="text-lg font-semibold text-surface-50">
          {{ $t("page.neededitems.title") }}
        </h1>
        <div class="ml-auto flex items-center gap-2">
          <UBadge color="neutral" variant="soft" size="xs">
            {{ filteredItems.length }} items
          </UBadge>
          <USwitch
            v-model="isSmallView"
            :ui="{
              base: 'bg-surface-800 border border-white/10',
              icon: 'text-white',
            }"
            class="shrink-0"
          >
            <template #on>
              <UIcon name="i-mdi-view-list" class="w-4 h-4" />
            </template>
            <template #off>
              <UIcon name="i-mdi-view-module" class="w-4 h-4" />
            </template>
          </USwitch>
        </div>
      </div>
      <div class="px-4 py-3 border-b border-white/10">
        <UInput
          v-model="search"
          :placeholder="$t('page.neededitems.searchplaceholder')"
          icon="i-mdi-magnify"
          clearable
          :ui="inputUi"
        />
      </div>
      <div class="divide-y divide-white/5">
        <div
          v-if="filteredItems.length === 0"
          class="p-4 text-sm text-surface-300"
        >
          {{ $t("page.neededitems.empty", "No items match your search.") }}
        </div>
        <div v-else class="divide-y divide-white/5">
          <NeededItem
            v-for="(item, index) in visibleItems"
            :key="`${String(item.needType)}-${String(item.id)}`"
            :need="item"
            :item-style="viewMode === 'small' ? 'smallCard' : 'mediumCard'"
            :data-index="index"
          />
          <div
            v-if="visibleCount < filteredItems.length"
            class="p-4 flex justify-center"
          >
            <UButton
              color="primary"
              variant="soft"
              label="Load More"
              @click="loadMore"
            />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useMetadataStore } from "@/stores/metadata";
import { useBreakpoints } from "@vueuse/core";
import NeededItem from "@/features/neededitems/NeededItem.vue";
import type {
  NeededItemTaskObjective,
  NeededItemHideoutModule,
} from "@/types/tarkov";
const inputUi = {
  base: "w-full",
  input:
    "h-11 bg-surface-900 border border-white/15 text-surface-50 placeholder:text-surface-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-white/20",
  leadingIcon: "text-surface-300",
};
// Breakpoints aligned to Vuetify legacy values
const breakpoints = useBreakpoints({
  xs: 0,
  sm: 600,
  md: 960,
});
const name = computed(() => {
  if (breakpoints.smaller("sm").value) return "xs";
  if (breakpoints.smaller("md").value) return "sm";
  return "md";
});
const metadataStore = useMetadataStore();
const { neededItemTaskObjectives, neededItemHideoutModules } =
  storeToRefs(metadataStore);
// Initialize view mode based on screen size
const initialViewMode = computed(() => {
  // Use medium view on mobile and small screens
  return ["xs", "sm"].includes(name.value) ? "medium" : "small";
});
// Use ref for view mode to allow reactive updates
const viewMode = ref(initialViewMode.value);
// Writable computed for the toggle
const isSmallView = computed({
  get: () => viewMode.value === "small",
  set: (val) => {
    viewMode.value = val ? "small" : "medium";
  },
});
// Watch for screen size changes to update view mode automatically if user hasn't manually toggled?
// Actually, let's just make viewMode reactive to the computed initialViewMode if we want it to auto-switch,
// or just initialize it. The previous code had a manual listener.
// Let's keep it simple: initialize it, and if we want it to be responsive, we can watch `name`.
// But for now, let's just fix the crash. The user can toggle it manually.
// If we want to mimic the previous behavior of updating on resize:
watch(name, (newName) => {
  viewMode.value = ["xs", "sm"].includes(newName) ? "medium" : "small";
});
const allItems = computed(() => {
  const combined = [
    ...(neededItemTaskObjectives.value || []),
    ...(neededItemHideoutModules.value || []),
  ];

  // Aggregate items by (taskId/hideoutModule, itemId) to combine duplicate items
  // from different objectives in the same task
  const aggregated = new Map<
    string,
    NeededItemTaskObjective | NeededItemHideoutModule
  >();

  let aggregationCount = 0;

  for (const need of combined) {
    let key: string;
    let itemId: string | undefined;

    if (need.needType === "taskObjective") {
      // For tasks: get itemId from either item or markerItem (for mark objectives)
      itemId = need.item?.id || need.markerItem?.id;

      if (!itemId) {
        console.warn(
          "[NeededItems] Skipping objective without item/markerItem:",
          need
        );
        continue;
      }

      // Aggregate by taskId + itemId
      // This combines multiple objectives for the same item in the same task
      key = `task:${need.taskId}:${itemId}`;
    } else {
      // For hideout: get itemId from item
      itemId = need.item?.id;

      if (!itemId) {
        console.warn(
          "[NeededItems] Skipping hideout requirement without item:",
          need
        );
        continue;
      }

      // This combines multiple requirements for the same item in the same module
      key = `hideout:${need.hideoutModule.id}:${itemId}`;
    }

    const existing = aggregated.get(key);
    if (existing) {
      // Item already exists for this task/module, sum the counts
      existing.count += need.count;
      aggregationCount++;
    } else {
      // First occurrence, clone the object to avoid mutating original
      aggregated.set(key, { ...need });
    }
  }

  return Array.from(aggregated.values());
});
const search = ref("");
const filteredItems = computed(() => {
  if (!search.value) {
    return allItems.value;
  }
  return allItems.value.filter((item) => {
    // Some task objectives use markerItem instead of item; guard against missing objects
    const itemName =
      item.item?.name || (item as NeededItemTaskObjective).markerItem?.name;
    return itemName?.toLowerCase().includes(search.value.toLowerCase());
  });
});
const visibleCount = ref(20);
const visibleItems = computed(() => {
  return filteredItems.value.slice(0, visibleCount.value);
});
const loadMore = () => {
  if (visibleCount.value < filteredItems.value.length) {
    visibleCount.value += 20;
  }
};
// Reset visible count when search or filter changes
watch([search, name], () => {
  visibleCount.value = 20;
});
</script>
