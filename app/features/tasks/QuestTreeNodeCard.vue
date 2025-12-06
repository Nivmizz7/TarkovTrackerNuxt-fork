<template>
  <div class="quest-node absolute rounded-xl border p-3 shadow-lg transition hover:-translate-y-0.5" :class="statusClass">
    <div class="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wide">
      <span>{{ statusLabel }}</span>
      <span class="text-white/50">#{{ task.tarkovDataId || '—' }}</span>
    </div>
    <p class="mt-2 text-sm font-bold text-white">
      {{ task.name || 'Unknown Quest' }}
    </p>
    <div class="mt-3 flex items-center justify-between text-[11px] text-white/60">
      <span class="truncate">
        {{ task.trader?.name || t('page.tasks.questtree.unknown_trader') }}
      </span>
      <span v-if="task.minPlayerLevel" class="rounded-full border border-white/10 px-2 py-0.5 text-white/70">
        Lv {{ task.minPlayerLevel }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { Task } from '@/types/tarkov';

  const props = defineProps<{
    task: Task;
    status: 'available' | 'locked' | 'completed';
  }>();

  const { t } = useI18n({ useScope: 'global' });

  const statusClass = computed(() => {
    if (props.status === 'completed') {
      return 'quest-node-completed';
    }
    if (props.status === 'available') {
      return 'quest-node-available';
    }
    return 'quest-node-locked';
  });

  const statusLabel = computed(() => {
    if (props.status === 'completed') return t('page.tasks.questtree.completed');
    if (props.status === 'available') return t('page.tasks.questtree.available');
    return t('page.tasks.questtree.locked');
  });
</script>
<style scoped>
.quest-node {
  min-height: 110px;
  width: 220px;
  backdrop-filter: blur(10px);
}
.quest-node-available {
  border-color: rgba(34, 197, 94, 0.4);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(34, 197, 94, 0.05));
}
.quest-node-locked {
  border-color: rgba(248, 113, 113, 0.4);
  background: linear-gradient(135deg, rgba(248, 113, 113, 0.25), rgba(248, 113, 113, 0.05));
}
.quest-node-completed {
  border-color: rgba(59, 130, 246, 0.45);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(59, 130, 246, 0.05));
}
</style>
