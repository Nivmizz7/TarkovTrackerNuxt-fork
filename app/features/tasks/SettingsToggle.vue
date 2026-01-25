<template>
  <div
    class="bg-surface-800 border-surface-700/50 flex items-center justify-between rounded-lg border px-4 py-3 shadow-sm"
  >
    <div class="flex items-center gap-2">
      <USwitch
        :model-value="modelValue"
        color="success"
        size="lg"
        @update:model-value="$emit('update:modelValue', $event)"
      />
      <span class="text-surface-200 text-sm">{{ label }}</span>
    </div>
    <AppTooltip v-if="tooltip" :text="tooltip">
      <UIcon name="i-mdi-help-circle-outline" class="text-surface-500 h-5 w-5" />
    </AppTooltip>
  </div>
</template>
<script setup lang="ts">
  defineProps<{
    modelValue: boolean;
    label: string;
    tooltip?: string;
  }>();
  defineEmits<{
    'update:modelValue': [value: boolean];
  }>();
</script>
