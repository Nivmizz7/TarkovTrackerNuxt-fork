<template>
  <div :class="containerClasses" class="relative overflow-hidden">
    <img
      v-if="isVisible && imageSrc"
      :src="imageSrc"
      :class="imageClasses"
      loading="lazy"
      class="w-full h-full object-contain"
    />
    <div
      v-else
      :class="[imageClasses, 'image-placeholder']"
      class="flex items-center justify-center w-full h-full bg-gray-800"
    >
      <UIcon name="i-mdi-loading" class="w-6 h-6 animate-spin text-gray-400" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, type PropType } from "vue";

const props = defineProps({
  imageItem: {
    type: Object,
    required: true,
  },
  src: {
    type: String,
    default: "",
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<"small" | "medium" | "large">,
    default: "medium",
  },
});

const imageSrc = computed(() => props.src || props.imageItem?.iconLink || "");

const containerClasses = computed(() => "d-block");
const imageClasses = computed(() => ({
  [`item-bg-${props.imageItem?.backgroundColor ?? "default"}`]: true,
  rounded: true,
  "p-1": true,
  "item-row-image": props.size === "small",
  "item-dialog-image": props.size === "large",
}));
</script>
