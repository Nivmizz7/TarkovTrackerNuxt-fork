<template>
  <fitted-card
    icon="mdi-account-wrench"
    icon-color="white"
    highlight-color="secondary"
  >
    <template #title>
      {{ $t("page.team.card.teamoptions.title") }}
    </template>
    <template #content>
      <div class="p-4 space-y-4">
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium">{{ $t(taskHideAllLabel) }}</div>
          <UToggle
            v-model="taskHideAll"
            on-icon="i-mdi-eye-off"
            off-icon="i-mdi-eye"
            color="red"
          />
        </div>
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium">{{ $t(itemsHideAllLabel) }}</div>
          <UToggle
            v-model="itemsHideAll"
            on-icon="i-mdi-eye-off"
            off-icon="i-mdi-eye"
            color="red"
          />
        </div>
        <div class="flex items-center justify-between">
          <div
            class="text-sm font-medium"
            :class="{ 'opacity-50': itemsHideAll }"
          >
            {{ $t(itemsHideNonFIRLabel) }}
          </div>
          <UToggle
            v-model="itemsHideNonFIR"
            :disabled="itemsHideAll"
            on-icon="i-mdi-eye-off"
            off-icon="i-mdi-eye"
            color="red"
          />
        </div>
        <div class="flex items-center justify-between">
          <div
            class="text-sm font-medium"
            :class="{ 'opacity-50': itemsHideAll }"
          >
            {{ $t(itemsHideHideoutLabel) }}
          </div>
          <UToggle
            v-model="itemsHideHideout"
            :disabled="itemsHideAll"
            on-icon="i-mdi-eye-off"
            off-icon="i-mdi-eye"
            color="red"
          />
        </div>
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium">{{ $t(mapHideAllLabel) }}</div>
          <UToggle
            v-model="mapHideAll"
            on-icon="i-mdi-eye-off"
            off-icon="i-mdi-eye"
            color="red"
          />
        </div>
      </div>
    </template>
  </fitted-card>
</template>
<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/user";
import FittedCard from "@/components/ui/FittedCard.vue";
const userStore = useUserStore();
const taskHideAll = computed({
  get: () => userStore.taskTeamAllHidden,
  set: (value) => userStore.setQuestTeamHideAll(value),
});
const taskHideAllLabel = computed(() =>
  userStore.taskTeamAllHidden
    ? "page.team.card.teamoptions.task_hide_all"
    : "page.team.card.teamoptions.task_show_all"
);
const itemsHideAll = computed({
  get: () => userStore.itemsTeamAllHidden,
  set: (value) => userStore.setItemsTeamHideAll(value),
});
const itemsHideAllLabel = computed(() =>
  userStore.itemsTeamAllHidden
    ? "page.team.card.teamoptions.items_hide_all"
    : "page.team.card.teamoptions.items_show_all"
);
const itemsHideNonFIR = computed({
  get: () => userStore.itemsTeamNonFIRHidden,
  set: (value) => userStore.setItemsTeamHideNonFIR(value),
});
const itemsHideNonFIRLabel = computed(() =>
  userStore.itemsTeamNonFIRHidden
    ? "page.team.card.teamoptions.items_hide_non_fir"
    : "page.team.card.teamoptions.items_show_non_fir"
);
const itemsHideHideout = computed({
  get: () => userStore.itemsTeamHideoutHidden,
  set: (value) => userStore.setItemsTeamHideHideout(value),
});
const itemsHideHideoutLabel = computed(() =>
  userStore.itemsTeamHideoutHidden
    ? "page.team.card.teamoptions.items_hide_hideout"
    : "page.team.card.teamoptions.items_show_hideout"
);
const mapHideAll = computed({
  get: () => userStore.mapTeamAllHidden,
  set: (value) => userStore.setMapTeamHideAll(value),
});
const mapHideAllLabel = computed(() =>
  userStore.mapTeamAllHidden
    ? "page.team.card.teamoptions.map_hide_all"
    : "page.team.card.teamoptions.map_show_all"
);
</script>
<style scoped></style>