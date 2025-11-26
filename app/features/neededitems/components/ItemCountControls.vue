<template>
  <div class="flex items-center">
    <UButton
      variant="ghost"
      color="neutral"
      class="p-0 m-0 min-w-0"
      size="xs"
      @click="$emit('decrease')"
    >
      <UIcon name="i-mdi-minus-thick" class="w-4 h-4" />
    </UButton>
    <UButton
      variant="ghost"
      color="neutral"
      class="px-1 mx-1 min-w-0"
      size="xs"
      @click="$emit('toggle')"
    >
      {{ currentCount.toLocaleString() }}/{{ neededCount.toLocaleString() }}
    </UButton>
    <UButton
      variant="ghost"
      color="neutral"
      class="p-0 m-0 min-w-0"
      size="xs"
      @click="$emit('increase')"
    >
      <UIcon name="i-mdi-plus-thick" class="w-4 h-4" />
    </UButton>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  currentCount: number;
  neededCount: number;
}>();
defineEmits<{
  decrease: [];
  increase: [];
  toggle: [];
}>();
</script>
