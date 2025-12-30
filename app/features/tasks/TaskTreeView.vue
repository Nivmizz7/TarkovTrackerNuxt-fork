<template>
  <div class="space-y-4">
    <TaskTreeNode
      v-for="taskId in rootIds"
      :key="taskId"
      :task-id="taskId"
      :depth="0"
      :tasks-by-id="tasksById"
      :children-map="childrenMap"
      :ancestry="[]"
      @on-task-action="$emit('on-task-action', $event)"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import TaskTreeNode from '@/features/tasks/TaskTreeNode.vue';
  import type { Task } from '@/types/tarkov';

  const props = defineProps<{
    tasks: Task[];
  }>();

  defineEmits<{
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

  const tasksById = computed(() => new Map(props.tasks.map((task) => [task.id, task])));

  const childrenMap = computed(() => {
    const map = new Map<string, string[]>();
    const taskName = (taskId: string) => tasksById.value.get(taskId)?.name ?? '';
    props.tasks.forEach((task) => {
      const children = (task.children ?? []).filter((childId) => tasksById.value.has(childId));
      children.sort((a, b) => taskName(a).localeCompare(taskName(b)));
      map.set(task.id, children);
    });
    return map;
  });

  const rootIds = computed(() => {
    const taskName = (taskId: string) => tasksById.value.get(taskId)?.name ?? '';
    const roots = props.tasks.filter((task) => {
      const parents = task.parents ?? [];
      return parents.length === 0 || !parents.some((parentId) => tasksById.value.has(parentId));
    });
    return roots.map((task) => task.id).sort((a, b) => taskName(a).localeCompare(taskName(b)));
  });
</script>
