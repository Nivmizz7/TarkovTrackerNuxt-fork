<template>
  <div
    class="rounded-lg shadow-md bg-[#12191e] border border-white/5 overflow-hidden flex flex-col h-full transition-transform hover:scale-[1.02]"
  >
    <div class="flex items-center p-4">
      <div
        class="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-600/20 text-cyan-400 mr-4 shrink-0"
      >
        <UIcon
          :name="props.icon.startsWith('mdi-') ? `i-${props.icon}` : props.icon"
          class="w-6 h-6"
        />
      </div>
      <div class="grow-right min-w-0">
        <div
          class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 truncate"
        >
          <slot name="stat"></slot>
        </div>
        <div class="text-2xl font-bold text-white leading-none mb-1">
          <slot name="value"></slot>
        </div>
        <div class="text-xs text-cyan-500 font-medium">
          <slot name="percentage"></slot>
        </div>
      </div>
    </div>
    <div v-if="$slots.details" class="px-4 pb-3 mt-auto">
      <div class="h-px bg-white/5 mb-2"></div>
      <div class="flex items-start text-xs text-gray-500">
        <UIcon
          name="i-mdi-help-circle-outline"
          class="mr-1.5 w-4 h-4 text-gray-600 shrink-0 mt-0.5"
        />
        <span class="leading-relaxed line-clamp-2"
          ><slot name="details"></slot
        ></span>
      </div>
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
});
</script>
