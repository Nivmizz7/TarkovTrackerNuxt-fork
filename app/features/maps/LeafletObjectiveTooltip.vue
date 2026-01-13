<template>
  <div class="leaflet-objective-tooltip">
    <div class="flex items-start justify-between gap-2">
      <div class="min-w-0 flex-1">
        <div class="text-sm font-semibold leading-snug text-gray-100">{{ taskName }}</div>
      </div>
      <div class="flex shrink-0 gap-1">
        <button
          type="button"
          class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
          :aria-label="t('maps.tooltip.goToInTaskList')"
          :title="t('maps.tooltip.goTo')"
          @click.stop="scrollToObjective"
        >
          <UIcon name="i-mdi-arrow-down-circle-outline" class="h-4 w-4" />
        </button>
        <button
          v-if="!readOnly"
          type="button"
          class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
          :aria-label="isComplete ? t('maps.tooltip.uncomplete') : t('maps.tooltip.complete')"
          :aria-pressed="isComplete"
          @click.stop="toggleObjective"
        >
          <UIcon :name="isComplete ? 'i-mdi-check-circle' : 'i-mdi-circle-outline'" class="h-4 w-4" />
        </button>
        <button
          type="button"
          class="inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-300 hover:bg-white/10"
          :aria-label="t('generic.close_button')"
          @click.stop="emitClose"
        >
          <UIcon name="i-mdi-close" class="h-4 w-4" />
        </button>
      </div>
    </div>
    <div class="mt-1">
      <div v-if="!objective" class="text-xs text-gray-400">{{ t('maps.tooltip.objectiveUnavailable') }}</div>
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
  import { computed, inject, onBeforeUnmount } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useMetadataStore } from '@/stores/useMetadata';
  import { useTarkovStore } from '@/stores/useTarkov';
  import type { Router } from 'vue-router';

  const props = withDefaults(
    defineProps<{
      objectiveId: string;
      readOnly?: boolean;
      onClose?: () => void;
    }>(),
    {
      readOnly: false,
    }
  );

  const emit = defineEmits<{
    (e: 'close'): void;
  }>();

  // Inject clearPinnedTask to dismiss the pinned task when tooltip closes
  const clearPinnedTask = inject<(() => void) | null>('clearPinnedTask', null);

  const emitClose = () => {
    emit('close');
    props.onClose?.();
    // Clear the pinned task when user closes the tooltip
    clearPinnedTask?.();
  };

  const { t } = useI18n();
  const router = inject<Router>('router');
  const metadataStore = useMetadataStore();
  const tarkovStore = useTarkovStore();

  // Track timer IDs for cleanup on unmount
  const pendingTimers: ReturnType<typeof setTimeout>[] = [];

  const objective = computed(() => {
    return metadataStore.objectives.find((o) => o.id === props.objectiveId);
  });
  const task = computed(() => {
    const taskId = objective.value?.taskId;
    if (!taskId) return null;
    return metadataStore.tasks.find((t) => t.id === taskId) ?? null;
  });
  const taskName = computed(() => task.value?.name ?? t('maps.tooltip.taskFallback'));
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
   * Clears all pending timers tracked by this component.
   */
  const clearPendingTimers = () => {
    pendingTimers.forEach((timerId) => clearTimeout(timerId));
    pendingTimers.length = 0;
  };

  // Track observer for cleanup
  let visibilityObserver: IntersectionObserver | null = null;

  /**
   * Highlights element when it becomes visible on screen.
   */
  const highlightWhenVisible = (element: HTMLElement) => {
    clearPendingTimers();
    if (visibilityObserver) {
      visibilityObserver.disconnect();
      visibilityObserver = null;
    }

    // Clear any existing highlights from other elements
    document.querySelectorAll('.objective-highlight').forEach((el) => {
      el.classList.remove('objective-highlight');
    });

    const applyHighlight = () => {
      element.classList.add('objective-highlight');
      const removeTimer = setTimeout(() => {
        element.classList.remove('objective-highlight');
      }, 3500);
      pendingTimers.push(removeTimer);
    };

    // Check if already in view
    const rect = element.getBoundingClientRect();
    const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
    if (isInView) {
      applyHighlight();
      return;
    }

    // Wait for element to become visible
    visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          visibilityObserver?.disconnect();
          visibilityObserver = null;
          // Small delay to let scroll settle
          const delayTimer = setTimeout(applyHighlight, 100);
          pendingTimers.push(delayTimer);
        }
      },
      { threshold: 0.5 }
    );
    visibilityObserver.observe(element);

    // Cleanup observer after timeout
    const cleanupTimer = setTimeout(() => {
      visibilityObserver?.disconnect();
      visibilityObserver = null;
    }, 3500);
    pendingTimers.push(cleanupTimer);
  };

  /**
   * Scrolls to the objective in the task list and highlights it.
   * Only highlights objectives, never task cards.
   * If element not rendered, triggers the task page to load it via query params.
   */
  const scrollToObjective = () => {
    if (!task.value || !router) return;
    // Try to find the objective element (only highlight objectives, never task cards)
    // First try by ID, then by data-objective-ids for item groups
    let objectiveEl = document.getElementById(`objective-${props.objectiveId}`);
    if (!objectiveEl) {
      // For item groups, the ID might be based on the first objective, so search by data attribute
      objectiveEl = document.querySelector<HTMLElement>(
        `[data-objective-ids*="${props.objectiveId}"]`
      );
    }
    if (objectiveEl) {
      // Objective exists - scroll task card into view first, then highlight objective
      // This prevents layout shifts from content-visibility: auto
      const taskEl = document.getElementById(`task-${task.value.id}`);
      if (taskEl) {
        // First scroll the task card into view
        taskEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      // Small delay to let scroll settle, then highlight
      const elToHighlight = objectiveEl;
      setTimeout(() => {
        highlightWhenVisible(elToHighlight);
      }, 100);
      return;
    }
    // Check if task card exists but objective not rendered yet
    const taskEl = document.getElementById(`task-${task.value.id}`);
    if (taskEl) {
      // Task exists but objective not visible - just scroll to task without highlighting
      taskEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

  // Clean up timers and observers on component unmount
  onBeforeUnmount(() => {
    clearPendingTimers();
    if (visibilityObserver) {
      visibilityObserver.disconnect();
      visibilityObserver = null;
    }
  });
</script>
<style scoped>
  .leaflet-objective-tooltip {
    min-width: 220px;
  }
</style>
