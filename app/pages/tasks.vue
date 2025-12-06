<template>
  <div class="px-4 py-6">
    <TaskLoadingState v-if="isLoading" />
    <div v-else>
      <QuestTreeGraph :nodes="questTreeRoots" :task-statuses="taskStatusMap" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';
  import { buildQuestTree } from '@/composables/useQuestTree';
  import QuestTreeGraph from '@/features/tasks/QuestTreeGraph.vue';
  import TaskLoadingState from '@/features/tasks/TaskLoadingState.vue';
  import { useMetadataStore } from '@/stores/useMetadata';
  import { usePreferencesStore } from '@/stores/usePreferences';
  import { useProgressStore } from '@/stores/useProgress';
  import type { Task } from '@/types/tarkov';

  type TaskStatus = 'available' | 'locked' | 'completed';

  const metadataStore = useMetadataStore();
  const { tasks, loading: tasksLoading } = storeToRefs(metadataStore);
  const preferencesStore = usePreferencesStore();
  const progressStore = useProgressStore();
  const { tasksCompletions, unlockedTasks, playerFaction, visibleTeamStores } =
    storeToRefs(progressStore);

  const activeUserView = computed(() => preferencesStore.getTaskUserView);
  const isLoading = computed(() => tasksLoading.value);

  const questTreeRoots = computed(() => buildQuestTree(tasks.value, tasks.value));

  const taskStatusMap = computed<Record<string, TaskStatus>>(() => {
    const statusMap: Record<string, TaskStatus> = {};
    tasks.value.forEach((task) => {
      statusMap[task.id] = determineTaskStatus(task);
    });
    return statusMap;
  });

  const determineTaskStatus = (task: Task): TaskStatus => {
    const currentView = activeUserView.value;
    if (!currentView || currentView === 'all') {
      return getStatusForTeam(task);
    }
    return getStatusForUser(task, currentView);
  };

  const getStatusForUser = (task: Task, userId: string): TaskStatus => {
    const faction = playerFaction.value?.[userId];
    if (task.factionName && task.factionName !== 'Any' && task.factionName !== faction) {
      return 'locked';
    }
    const isCompleted = tasksCompletions.value?.[task.id]?.[userId] === true;
    if (isCompleted) return 'completed';
    const isUnlocked = unlockedTasks.value?.[task.id]?.[userId] === true;
    if (isUnlocked) return 'available';
    return 'locked';
  };

  const getStatusForTeam = (task: Task): TaskStatus => {
    const teamIds = Object.keys(visibleTeamStores.value || {});
    if (teamIds.length === 0) {
      return 'locked';
    }
    const relevantTeamIds = teamIds.filter((teamId) => {
      const faction = playerFaction.value?.[teamId];
      return task.factionName === 'Any' || task.factionName === faction;
    });
    if (!relevantTeamIds.length) {
      return 'locked';
    }
    const isCompletedByAll = relevantTeamIds.every(
      (teamId) => tasksCompletions.value?.[task.id]?.[teamId] === true
    );
    if (isCompletedByAll) return 'completed';
    const isUnlockedByAny = relevantTeamIds.some((teamId) => {
      const isCompleted = tasksCompletions.value?.[task.id]?.[teamId] === true;
      const isUnlocked = unlockedTasks.value?.[task.id]?.[teamId] === true;
      return isUnlocked && !isCompleted;
    });
    if (isUnlockedByAny) return 'available';
    return 'locked';
  };
</script>
