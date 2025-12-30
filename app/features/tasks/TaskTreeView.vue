<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
    <div class="h-[70vh] overflow-x-auto overflow-y-auto rounded-lg bg-surface-900/60 p-4">
      <div class="flex min-w-max items-start gap-6">
        <div
          v-for="column in columns"
          :key="column.depth"
          class="flex min-w-[180px] flex-col gap-2"
        >
          <button
            v-for="taskId in column.taskIds"
            :key="taskId"
            type="button"
            class="flex items-center gap-2 text-left text-xs text-gray-200"
          >
            <span class="relative h-4 w-4 shrink-0 rounded-sm border" :class="statusColorClass(taskId)">
              <span
                v-if="isLightkeeperTask(taskId)"
                class="absolute -left-1 -top-1 rounded-sm bg-white px-0.5 text-[9px] font-bold text-black"
              >
                K
              </span>
              <span
                v-if="isKappaTask(taskId)"
                class="absolute -right-1 -top-1 rounded-sm bg-white px-0.5 text-[9px] font-bold text-black"
              >
                K
              </span>
            </span>
            <span class="leading-tight">
              {{ tasksById.get(taskId)?.name ?? 'Task' }}
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="h-[70vh] overflow-y-auto rounded-lg bg-surface-900/60 p-4">
      <div class="mb-3 text-sm font-semibold text-gray-200">Quetes disponibles</div>
      <div v-if="userView === 'all'" class="text-xs text-gray-400">
        Selectionne un joueur pour valider les quetes.
      </div>
      <div v-else-if="availableTasks.length === 0" class="text-xs text-gray-400">
        Aucune quete disponible.
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="task in availableTasks"
          :key="task.id"
          class="flex items-center justify-between gap-2"
        >
          <span class="text-xs text-gray-200">{{ task.name ?? 'Task' }}</span>
          <UButton size="xs" color="primary" variant="solid" @click="completeTask(task)">
            Valider
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useTaskActions } from '@/composables/useTaskActions';
  import { useMetadataStore } from '@/stores/useMetadata';
  import { usePreferencesStore } from '@/stores/usePreferences';
  import { useProgressStore } from '@/stores/useProgress';
  import type { Task } from '@/types/tarkov';

  const props = defineProps<{
    tasks: Task[];
  }>();

  const emit = defineEmits<{
    'on-task-action': [
      event: {
        taskId: string;
        taskName: string;
        action: string;
        undoKey?: string;
        statusKey?: string;
      },
    ];
  }>();

  const preferencesStore = usePreferencesStore();
  const progressStore = useProgressStore();
  const metadataStore = useMetadataStore();
  const userView = computed(() => preferencesStore.getTaskUserView);
  const teamIds = computed(() => Object.keys(progressStore.visibleTeamStores || {}));
  const tasksById = computed(() => new Map(props.tasks.map((task) => [task.id, task])));
  const lightkeeperTraderId = computed(() => metadataStore.getTraderByName('lightkeeper')?.id);

  const actionTask = ref<Task | null>(null);
  const { markTaskComplete } = useTaskActions(
    () => actionTask.value as Task,
    (payload) => emit('on-task-action', payload)
  );

  const statusById = computed(() => {
    const statuses = new Map<string, 'locked' | 'available' | 'inprogress' | 'completed'>();
    props.tasks.forEach((task) => {
      const taskFaction = task.factionName;
      if (userView.value === 'all') {
        const relevantTeamIds = teamIds.value.filter((teamId) => {
          const teamFaction = progressStore.playerFaction[teamId];
          return taskFaction === 'Any' || taskFaction === teamFaction;
        });
        if (relevantTeamIds.length === 0) {
          statuses.set(task.id, 'locked');
          return;
        }
        const isCompletedByAll = relevantTeamIds.every(
          (teamId) => progressStore.tasksCompletions?.[task.id]?.[teamId] === true
        );
        if (isCompletedByAll) {
          statuses.set(task.id, 'completed');
          return;
        }
        const isAvailableForAny = relevantTeamIds.some((teamId) => {
          const isUnlocked = progressStore.unlockedTasks?.[task.id]?.[teamId] === true;
          const isCompleted = progressStore.tasksCompletions?.[task.id]?.[teamId] === true;
          return isUnlocked && !isCompleted;
        });
        if (!isAvailableForAny) {
          statuses.set(task.id, 'locked');
          return;
        }
        const isInProgress = relevantTeamIds.some((teamId) =>
          isTaskInProgress(task, teamId)
        );
        statuses.set(task.id, isInProgress ? 'inprogress' : 'available');
        return;
      }
      const userFaction = progressStore.playerFaction[userView.value];
      if (taskFaction !== 'Any' && taskFaction !== userFaction) {
        statuses.set(task.id, 'locked');
        return;
      }
      const isCompleted = progressStore.tasksCompletions?.[task.id]?.[userView.value] === true;
      if (isCompleted) {
        statuses.set(task.id, 'completed');
        return;
      }
      const isUnlocked = progressStore.unlockedTasks?.[task.id]?.[userView.value] === true;
      if (!isUnlocked) {
        statuses.set(task.id, 'locked');
        return;
      }
      const isInProgress = isTaskInProgress(task, userView.value);
      statuses.set(task.id, isInProgress ? 'inprogress' : 'available');
    });
    return statuses;
  });

  const availableTasks = computed(() => {
    if (userView.value === 'all') return [];
    return props.tasks
      .filter((task) => {
        const status = statusById.value.get(task.id);
        return status === 'available' || status === 'inprogress';
      })
      .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  });

  const statusColorClass = (taskId: string) => {
    const status = statusById.value.get(taskId);
    if (status === 'available') return 'bg-emerald-500 border-emerald-300';
    if (status === 'inprogress' || status === 'completed') return 'bg-gray-500 border-gray-300';
    return 'bg-red-500 border-red-300';
  };

  const depthMap = computed(() => {
    const depth = new Map<string, number>();
    const parentMap = new Map<string, string[]>();
    props.tasks.forEach((task) => {
      const parents = (task.parents ?? []).filter((parentId) => tasksById.value.has(parentId));
      parentMap.set(task.id, parents);
      if (parents.length === 0) {
        depth.set(task.id, 0);
      }
    });
    let progress = true;
    let safety = 0;
    while (progress && safety < props.tasks.length) {
      progress = false;
      safety += 1;
      props.tasks.forEach((task) => {
        if (depth.has(task.id)) return;
        const parents = parentMap.get(task.id) ?? [];
        if (parents.length === 0) {
          depth.set(task.id, 0);
          progress = true;
          return;
        }
        const parentDepths = parents.map((parentId) => depth.get(parentId));
        if (parentDepths.some((value) => value === undefined)) return;
        const maxDepth = Math.max(...(parentDepths as number[]));
        depth.set(task.id, maxDepth + 1);
        progress = true;
      });
    }
    props.tasks.forEach((task) => {
      if (!depth.has(task.id)) depth.set(task.id, 0);
    });
    return depth;
  });

  const columns = computed(() => {
    const columnsMap = new Map<number, string[]>();
    const taskName = (taskId: string) => tasksById.value.get(taskId)?.name ?? '';
    props.tasks.forEach((task) => {
      const depth = depthMap.value.get(task.id) ?? 0;
      const list = columnsMap.get(depth) ?? [];
      list.push(task.id);
      columnsMap.set(depth, list);
    });
    return [...columnsMap.entries()]
      .sort(([a], [b]) => a - b)
      .map(([depth, taskIds]) => ({
        depth,
        taskIds: taskIds.sort((a, b) => taskName(a).localeCompare(taskName(b))),
      }));
  });

  const isTaskInProgress = (task: Task, teamId: string) => {
    if (!task.objectives?.length) return false;
    return task.objectives.some(
      (objective) => progressStore.objectiveCompletions?.[objective.id]?.[teamId] === true
    );
  };

  const isKappaTask = (taskId: string) => {
    return tasksById.value.get(taskId)?.kappaRequired === true;
  };

  const isLightkeeperTask = (taskId: string) => {
    const task = tasksById.value.get(taskId);
    if (!task) return false;
    if (task.lightkeeperRequired === true) return true;
    if (lightkeeperTraderId.value) {
      return task.trader?.id === lightkeeperTraderId.value;
    }
    return task.trader?.name?.toLowerCase() === 'lightkeeper';
  };

  const completeTask = (task: Task) => {
    if (userView.value === 'all') return;
    actionTask.value = task;
    markTaskComplete();
  };
</script>
