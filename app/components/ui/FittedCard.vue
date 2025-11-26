<template>
  <div
    class="rounded shadow-md bg-[#212121] overflow-hidden"
    :class="{ 'h-full': props.fillHeight }"
  >
    <div class="h-full m-0 p-0">
      <div class="flex flex-col h-full">
        <div
          class="relative w-full text-xl flex items-center gap-3 pb-2"
        >
          <div class="flex items-center gap-3">
            <span
              :class="highlightClasses"
              class="inline-block px-3 py-1 rounded-br-lg shadow-lg"
            >
              <UIcon
                :name="
                  props.icon.startsWith('mdi-') ? `i-${props.icon}` : props.icon
                "
                :class="`text-${props.iconColor}`"
                class="w-6 h-6"
              />
            </span>
            <span class="text-left px-2 inline-block leading-6">
              <slot name="title"></slot>
            </span>
          </div>
          <div
            v-if="$slots['title-right']"
            class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-2 text-center"
          >
            <slot name="title-right"></slot>
          </div>
        </div>
        <div class="mx-4 border-b border-gray-700"></div>
        <div class="w-full mt-2 grow">
          <slot name="content"></slot>
        </div>
        <div class="w-full pb-1 mt-auto">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  icon: {
    type: String,
    default: "mdi-check-all",
    required: false,
  },
  iconColor: {
    type: String,
    default: "white",
    required: false,
  },
  highlightColor: {
    type: String,
    default: "accent",
    required: false,
  },
  fillHeight: {
    type: Boolean,
    default: true,
    required: false,
  },
});
const highlightClasses = computed(() => {
  const classes = {};
  // Map highlight colors to Tailwind gradient classes
  switch (props.highlightColor) {
    case "green":
      classes[
        "bg-gradient-to-r from-[rgba(1,36,0,0.15)] via-[rgba(15,121,9,0.15)] to-[rgba(0,83,0,0.15)]"
      ] = true;
      break;
    case "blue":
      classes[
        "bg-gradient-to-r from-[rgba(0,0,36,0.15)] via-[rgba(0,0,121,0.15)] to-[rgba(0,0,83,0.15)]"
      ] = true;
      break;
    case "red":
      classes[
        "bg-gradient-to-r from-[rgba(36,0,0,0.15)] via-[rgba(121,0,0,0.15)] to-[rgba(83,0,0,0.15)]"
      ] = true;
      break;
    case "tan":
      classes[
        "bg-gradient-to-r from-[rgba(36,36,0,0.15)] via-[rgba(121,121,0,0.15)] to-[rgba(83,83,0,0.15)]"
      ] = true;
      break;
    case "purple":
      classes[
        "bg-gradient-to-r from-[rgba(36,0,36,0.15)] via-[rgba(121,0,121,0.15)] to-[rgba(83,0,83,0.15)]"
      ] = true;
      break;
    case "secondary":
      classes[
        "bg-gradient-to-br from-[#7d6f55] via-[#ac9d80] to-[#9a8866]"
      ] = true;
      break;
    case "accent":
    default:
      classes[
        "bg-gradient-to-br from-[#1d2426] via-[#202e36] to-[#233138]"
      ] = true;
      break;
  }
  return classes;
});
</script>
