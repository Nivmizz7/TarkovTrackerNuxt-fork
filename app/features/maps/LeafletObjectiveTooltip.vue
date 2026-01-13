<template>
  <div class="leaflet-objective-tooltip">
    <div class="flex items-center justify-between gap-2">
      <div class="min-w-0 flex-1">
        <div class="text-sm font-semibold leading-7 text-gray-100">{{ taskName }}</div>
      </div>
      <div class="flex shrink-0 gap-1">
        <button
          type="button"
          class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
          aria-label="Go to objective in task list"
          title="Go to objective"
          @click.stop="scrollToObjective"
        >
          <UIcon name="i-mdi-arrow-down-circle-outline" class="h-4 w-4" />
        </button>
        <button
          v-if="!readOnly"
          type="button"
          class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
          :aria-label="isComplete ? 'Uncomplete objective' : 'Complete objective'"
          :aria-pressed="isComplete"
          @click.stop="toggleObjective"
        >
          <UIcon :name="isComplete ? 'i-mdi-check-circle' : 'i-mdi-circle-outline'" class="h-4 w-4" />
        </button>
        <button
          type="button"
          class="inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-300 hover:bg-white/10"
          aria-label="Close"
          @click.stop="emitClose"
        >
          <UIcon name="i-mdi-close" class="h-4 w-4" />
        </button>
      </div>
    </div>
    <div class="mt-1">
      <div v-if="!objective" class="text-xs text-gray-400">Objective unavailable.</div>
      <div v-else class="text-sm text-gray-200">
        <div class="text-gray-300">{{ objective.description }}</div>
        <div v-if="!readOnly && requiredCount > 1" class="mt-1 text-[11px] text-gray-400">
          {{ currentCount }}/{{ requiredCount }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed, inject } from 'vue';
  import { useMetadataStore } from '@/stores/useMetadata';
  import { useTarkovStore } from '@/stores/useTarkov';
  import type { Router } from 'vue-router';
  const props = withDefaults(
    defineProps<{
      objectiveId: string;
      readOnly?: boolean;
    }>(),
    {
      readOnly: false,
    }
  );
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();
  const emitClose = () => emit('close');
  const router = inject<Router>('router');
  const metadataStore = useMetadataStore();
  const tarkovStore = useTarkovStore();
  const objective = computed(() => {
    return metadataStore.objectives.find((o) => o.id === props.objectiveId);
  });
  const task = computed(() => {
    const taskId = objective.value?.taskId;
    if (!taskId) return null;
    return metadataStore.tasks.find((t) => t.id === taskId) ?? null;
  });
  const taskName = computed(() => task.value?.name ?? 'Task');
  const isComplete = computed(() => tarkovStore.isTaskObjectiveComplete(props.objectiveId));
  const requiredCount = computed(() => objective.value?.count ?? 1);
  const currentCount = computed(() => tarkovStore.getObjectiveCount(props.objectiveId));
  const toggleObjective = () => {
    if (props.readOnly) return;
    const required = requiredCount.value;
    if (isComplete.value) {
      tarkovStore.setTaskObjectiveUncomplete(props.objectiveId);
      if (required > 1) {
        tarkovStore.setObjectiveCount(props.objectiveId, Math.max(0, required - 1));
      }
      return;
    }
    tarkovStore.setTaskObjectiveComplete(props.objectiveId);
    if (required > 1) {
      tarkovStore.setObjectiveCount(props.objectiveId, required);
    }
  };
  /**
   * Scrolls to the objective in the task list and highlights it.
   * Falls back to task card if objective element not found.
   * If neither is rendered, triggers the task page to load it via query params.
   */
  const scrollToObjective = () => {
    if (!task.value || !router) return;
    // Try to find the objective element first, fall back to task card
    const objectiveEl = document.getElementById(`objective-${props.objectiveId}`);
    const taskEl = document.getElementById(`task-${task.value.id}`);
    const targetEl = objectiveEl || taskEl;
    if (targetEl) {
      // Element exists - scroll to it and highlight
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        targetEl.classList.add('objective-highlight');
      }, 300);
      setTimeout(() => {
        targetEl.classList.remove('objective-highlight');
      }, 2800);
      return;
    }
    // Neither element in DOM - add query params to trigger task loading
    // Use router.replace to keep current view (map/traders) while adding task query
    const currentQuery = { ...router.currentRoute.value.query };
    router.replace({
      query: {
        ...currentQuery,
        task: task.value.id,
        highlightObjective: props.objectiveId,
      },
    });
  };
</script>
<style scoped>
  .leaflet-objective-tooltip {
    min-width: 220px;
  }
</style>
