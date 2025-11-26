<template>
  <div>
    <template v-if="!xs">
      <div class="m-0 p-0">
        <div class="flex mb-2 text-lg">
          <div class="w-full">
            <task-link :task="task" />
          </div>
        </div>
        <InfoRow v-if="task.minPlayerLevel != 0" icon="mdi-menu-right">
          <i18n-t keypath="page.tasks.questcard.level" scope="global">
            <template #count>{{ task.minPlayerLevel }}</template>
          </i18n-t>
        </InfoRow>
        <InfoRow
          v-if="task?.predecessors?.length"
          icon="mdi-lock-open-outline"
          class="mb-1"
        >
          <i18n-t keypath="page.tasks.questcard.lockedbefore" scope="global">
            <template #count>{{ lockedBefore }}</template>
          </i18n-t>
        </InfoRow>
        <InfoRow v-if="task?.successors?.length" icon="mdi-lock" class="mb-1">
          <i18n-t keypath="page.tasks.questcard.lockedbehind" scope="global">
            <template #count>{{ lockedBehind }}</template>
          </i18n-t>
        </InfoRow>
        <InfoRow v-if="task?.factionName != 'Any'" class="mb-1">
          <template #icon>
            <img :src="factionImage" class="w-6 h-6 mx-1 invert" />
          </template>
          {{ task.factionName }}
        </InfoRow>
        <div v-if="nonKappa" class="flex mb-1">
          <div class="mr-1">
            <UBadge size="xs" color="red" variant="outline">
              {{ t("page.tasks.questcard.nonkappa") }}
            </UBadge>
          </div>
        </div>
        <InfoRow
          v-if="activeUserView === 'all' && neededBy.length > 0"
          icon="mdi-account-multiple-outline"
          class="mb-1"
        >
          <i18n-t keypath="page.tasks.questcard.neededby" scope="global">
            <template #names>{{ neededBy.join(", ") }}</template>
          </i18n-t>
        </InfoRow>
        <div class="flex mb-1">
          <a
            :href="task.wikiLink"
            target="_blank"
            class="text-blue-400 hover:text-blue-300 no-underline"
          >
            <InfoRow icon="mdi-information-outline">
              {{ t("page.tasks.questcard.wiki") }}
            </InfoRow>
          </a>
        </div>
      </div>
    </template>
    <template v-else>
      <task-link :task="task" class="flex justify-center" />
    </template>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";
const TaskLink = defineAsyncComponent(() => import("./TaskLink.vue"));
const InfoRow = defineAsyncComponent(() => import("./InfoRow.vue"));
defineProps({
  task: { type: Object, required: true },
  xs: { type: Boolean, required: true },
  lockedBefore: { type: Number, required: true },
  lockedBehind: { type: Number, required: true },
  factionImage: { type: String, required: true },
  nonKappa: { type: Boolean, required: true },
  neededBy: { type: Array, required: true },
  activeUserView: { type: String, required: true },
});
const { t } = useI18n({ useScope: "global" });
</script>
