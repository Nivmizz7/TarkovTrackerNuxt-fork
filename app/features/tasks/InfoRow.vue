<template>
  <div class="flex items-start mb-1">
    <div v-if="icon || $slots.icon" class="mr-1 shrink-0">
      <slot name="icon">
        <UIcon
          :name="icon.startsWith('mdi-') ? `i-${icon}` : icon"
          class="w-6 h-6"
        />
      </slot>
    </div>
    <div class="grow">
      <slot />
    </div>
  </div>
</template>
<script setup>
defineProps({
  icon: { type: String, default: "" },
});
</script>
