<template>
  <div v-if="!xs">
    <div class="flex justify-center">
      {{ label || defaultLabel }}
    </div>
    <div v-for="task in alternativeTasks" :key="task.id" class="my-2">
      <TaskLink :task="task" class="flex justify-center" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import TaskLink from '@/features/tasks/TaskLink.vue';
  import type { Task } from '@/types/tarkov';
  const props = defineProps<{
    alternatives: string[];
    tasks: Task[];
    xs?: boolean;
    label?: string;
  }>();
  const taskById = computed(() => new Map(props.tasks.map((task) => [task.id, task])));
  const alternativeTasks = computed(() =>
    props.alternatives
      .map((alternative) => taskById.value.get(alternative))
      .filter((task): task is Task => Boolean(task))
  );
  const { t } = useI18n({ useScope: 'global' });
  const defaultLabel = t('page.tasks.questcard.alternatives');
</script>
