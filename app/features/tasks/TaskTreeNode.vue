<template>
  <div v-if="task" class="space-y-3">
    <div :style="{ paddingLeft: `${depth * 18}px` }">
      <TaskCard :task="task" @on-task-action="$emit('on-task-action', $event)" />
    </div>
    <div v-if="childIds.length" class="space-y-3">
      <TaskTreeNode
        v-for="childId in childIds"
        :key="childId"
        :task-id="childId"
        :depth="depth + 1"
        :tasks-by-id="tasksById"
        :children-map="childrenMap"
        :ancestry="[...ancestry, taskId]"
        @on-task-action="$emit('on-task-action', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import TaskCard from '@/features/tasks/TaskCard.vue';
  import type { Task } from '@/types/tarkov';

  defineOptions({ name: 'TaskTreeNode' });

  const props = defineProps<{
    taskId: string;
    depth: number;
    tasksById: Map<string, Task>;
    childrenMap: Map<string, string[]>;
    ancestry: string[];
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

  const task = computed(() => props.tasksById.get(props.taskId));
  const childIds = computed(() => {
    const children = props.childrenMap.get(props.taskId) ?? [];
    return children.filter((childId) => !props.ancestry.includes(childId));
  });
</script>
