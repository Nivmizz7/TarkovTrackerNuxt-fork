<template>
  <div class="bg-[rgba(33,33,33,1)] rounded-lg shadow-md mt-2 relative">
    <div
      class="absolute -top-4 left-4 w-16 h-16 rounded-full shadow-md flex items-center justify-center"
      :class="`bg-${props.iconBackground}`"
    >
      <UIcon
        :name="props.icon.startsWith('mdi-') ? `i-${props.icon}` : props.icon"
        class="w-8 h-8"
        :class="`text-${props.iconColor}`"
      />
    </div>
    <div
      class="text-xl font-medium text-left p-2 pb-0 pl-24 min-h-12 flex items-center"
    >
      <slot name="stat"></slot>
    </div>
    <div class="text-center p-2 pt-6">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "mdi-check-all",
    required: false,
  },
  iconBackground: {
    type: String,
    default: "accent",
    required: false,
  },
  iconColor: {
    type: String,
    default: "secondary",
    required: false,
  },
});
</script>
<style lang="scss" scoped></style>
