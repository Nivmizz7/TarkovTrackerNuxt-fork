<template>
  <div class="rounded-lg bg-surface-900/60 p-4">
    <div class="space-y-2">
      <button
        v-for="node in orderedNodes"
        :key="node.taskId"
        type="button"
        class="flex items-start gap-2 text-left text-xs text-gray-200"
        @click="goToTask(node.taskId)"
      >
        <span
          class="relative mt-0.5 h-4 w-4 shrink-0 rounded-sm border"
          :class="statusColorClass(node.taskId)"
          :style="{ marginLeft: `${node.depth * 16}px` }"
        >
          <span
            v-if="isLightkeeperTask(node.taskId)"
            class="absolute -left-1 -top-1 rounded-sm bg-white px-0.5 text-[9px] font-bold text-black"
          >
            K
          </span>
          <span
            v-if="isKappaTask(node.taskId)"
            class="absolute -right-1 -top-1 rounded-sm bg-white px-0.5 text-[9px] font-bold text-black"
          >
            K
          </span>
        </span>
        <span class="leading-tight">
          {{ tasksById.get(node.taskId)?.name ?? 'Task' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMetadataStore } from '@/stores/useMetadata';
  import { usePreferencesStore } from '@/stores/usePreferences';
  import { useProgressStore } from '@/stores/useProgress';
  import type { Task } from '@/types/tarkov';

  const props = defineProps<{
    tasks: Task[];
  }>();

  const preferencesStore = usePreferencesStore();
  const progressStore = useProgressStore();
  const metadataStore = useMetadataStore();
  const router = useRouter();
  const userView = computed(() => preferencesStore.getTaskUserView);
  const teamIds = computed(() => Object.keys(progressStore.visibleTeamStores || {}));
  const tasksById = computed(() => new Map(props.tasks.map((task) => [task.id, task])));
  const lightkeeperTraderId = computed(() => metadataStore.getTraderByName('lightkeeper')?.id);

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

  const orderedNodes = computed(() => {
    const childMap = new Map<string, string[]>();
    props.tasks.forEach((task) => {
      const children = (task.children ?? []).filter((childId) => tasksById.value.has(childId));
      children.sort((a, b) => (tasksById.value.get(a)?.name ?? '').localeCompare(
        tasksById.value.get(b)?.name ?? ''
      ));
      childMap.set(task.id, children);
    });
    const roots = props.tasks.filter((task) => {
      const parents = (task.parents ?? []).filter((parentId) => tasksById.value.has(parentId));
      return parents.length === 0;
    });
    roots.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
    const ordered: Array<{ taskId: string; depth: number }> = [];
    const visited = new Set<string>();
    const walk = (taskId: string, depth: number) => {
      if (visited.has(taskId)) return;
      visited.add(taskId);
      ordered.push({ taskId, depth });
      const children = childMap.get(taskId) ?? [];
      children.forEach((childId) => walk(childId, depth + 1));
    };
    roots.forEach((root) => walk(root.id, 0));
    props.tasks.forEach((task) => {
      if (!visited.has(task.id)) {
        walk(task.id, 0);
      }
    });
    return ordered;
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

  const goToTask = (taskId: string) => {
    preferencesStore.setTaskPrimaryView('all');
    router.push({ path: '/tasks', query: { task: taskId } });
  };
</script>
