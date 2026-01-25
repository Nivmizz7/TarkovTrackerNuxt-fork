<template>
  <div :class="['flex shrink-0 items-center justify-center', sizeClass]">
    <NuxtImg v-if="avatar" :src="avatar" class="h-6 w-6 rounded-full" width="24" height="24" />
    <UIcon
      v-else-if="icon?.startsWith('i-')"
      :name="icon"
      class="h-6 w-6 transition-colors"
      :class="colorClass"
    />
    <span v-else :class="['mdi', icon, 'text-2xl']" />
  </div>
</template>
<script setup lang="ts">
  const props = defineProps<{
    icon?: string;
    avatar?: string | null;
    colorClass?: string;
    hasMargin?: boolean;
  }>();
  const sizeClass = computed(() => (props.hasMargin ? 'mr-3 w-6' : 'w-6'));
</script>
