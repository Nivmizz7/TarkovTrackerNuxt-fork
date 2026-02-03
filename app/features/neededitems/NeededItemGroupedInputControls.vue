<template>
  <div class="space-y-3">
    <div v-if="firNeeded > 0" class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <UIcon name="i-mdi-checkbox-marked-circle-outline" class="text-warning-400 h-4 w-4" />
        <span class="text-sm font-medium">{{ $t('neededItems.fir', 'FIR') }}</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="bg-surface-700 flex items-center rounded-lg border border-white/20">
          <button
            class="text-surface-200 hover:bg-surface-600 active:bg-surface-500 flex h-8 w-8 items-center justify-center rounded-l-lg transition-colors hover:text-white"
            aria-label="Decrease FIR count"
            @click="decreaseFir"
          >
            <UIcon name="i-mdi-minus" class="h-4 w-4" />
          </button>
          <div
            class="bg-surface-800 flex h-8 min-w-16 items-center justify-center border-x border-white/20"
          >
            <input
              v-if="isEditingFir"
              ref="firInputRef"
              v-model.number="firEditValue"
              type="number"
              :min="0"
              step="1"
              class="bg-surface-900 focus:ring-primary-500 h-full w-full px-2 text-center text-sm font-semibold text-white focus:ring-2 focus:outline-none focus:ring-inset"
              @blur="submitFirEdit"
              @keydown.enter="submitFirEdit"
              @keydown.escape="cancelFirEdit"
            />
            <button
              v-else
              class="hover:bg-surface-600 h-full w-full px-2 text-sm font-semibold text-white transition-colors"
              @click="startFirEdit"
            >
              {{ firCurrent }}
            </button>
          </div>
          <button
            class="text-surface-200 hover:bg-surface-600 active:bg-surface-500 flex h-8 w-8 items-center justify-center rounded-r-lg transition-colors hover:text-white"
            aria-label="Increase FIR count"
            @click="increaseFir"
          >
            <UIcon name="i-mdi-plus" class="h-4 w-4" />
          </button>
        </div>
        <span class="text-surface-400 text-sm">
          / {{ firNeeded }} {{ $t('neededItems.needed', 'needed') }}
        </span>
      </div>
    </div>
    <div v-if="nonFirNeeded > 0" class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <UIcon name="i-mdi-checkbox-blank-circle-outline" class="text-surface-400 h-4 w-4" />
        <span class="text-sm font-medium">{{ $t('neededItems.nonFir', 'Non-FIR') }}</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="bg-surface-700 flex items-center rounded-lg border border-white/20">
          <button
            class="text-surface-200 hover:bg-surface-600 active:bg-surface-500 flex h-8 w-8 items-center justify-center rounded-l-lg transition-colors hover:text-white"
            aria-label="Decrease Non-FIR count"
            @click="decreaseNonFir"
          >
            <UIcon name="i-mdi-minus" class="h-4 w-4" />
          </button>
          <div
            class="bg-surface-800 flex h-8 min-w-16 items-center justify-center border-x border-white/20"
          >
            <input
              v-if="isEditingNonFir"
              ref="nonFirInputRef"
              v-model.number="nonFirEditValue"
              type="number"
              :min="0"
              step="1"
              class="bg-surface-900 focus:ring-primary-500 h-full w-full px-2 text-center text-sm font-semibold text-white focus:ring-2 focus:outline-none focus:ring-inset"
              @blur="submitNonFirEdit"
              @keydown.enter="submitNonFirEdit"
              @keydown.escape="cancelNonFirEdit"
            />
            <button
              v-else
              class="hover:bg-surface-600 h-full w-full px-2 text-sm font-semibold text-white transition-colors"
              @click="startNonFirEdit"
            >
              {{ nonFirCurrent }}
            </button>
          </div>
          <button
            class="text-surface-200 hover:bg-surface-600 active:bg-surface-500 flex h-8 w-8 items-center justify-center rounded-r-lg transition-colors hover:text-white"
            aria-label="Increase Non-FIR count"
            @click="increaseNonFir"
          >
            <UIcon name="i-mdi-plus" class="h-4 w-4" />
          </button>
        </div>
        <span class="text-surface-400 text-sm">
          / {{ nonFirNeeded }} {{ $t('neededItems.needed', 'needed') }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps<{
    firNeeded: number;
    firCurrent: number;
    nonFirNeeded: number;
    nonFirCurrent: number;
  }>();
  const emit = defineEmits<{
    'update:fir': [count: number];
    'update:nonFir': [count: number];
  }>();
  const createEditController = (options: {
    current: () => number;
    needed: () => number;
    onUpdate: (value: number) => void;
  }) => {
    const isEditing = ref(false);
    const editValue = ref(0);
    const inputRef = ref<HTMLInputElement | null>(null);
    const startEdit = () => {
      editValue.value = options.current();
      isEditing.value = true;
      nextTick(() => {
        inputRef.value?.focus();
        inputRef.value?.select();
      });
    };
    const submitEdit = () => {
      if (isEditing.value) {
        const value = Math.floor(Math.min(options.needed(), Math.max(0, editValue.value || 0)));
        options.onUpdate(value);
        isEditing.value = false;
      }
    };
    const cancelEdit = () => {
      isEditing.value = false;
    };
    const increase = () => {
      options.onUpdate(Math.min(options.needed(), options.current() + 1));
    };
    const decrease = () => {
      options.onUpdate(Math.max(0, options.current() - 1));
    };
    watch(options.current, () => {
      if (isEditing.value) isEditing.value = false;
    });
    return {
      isEditing,
      editValue,
      inputRef,
      startEdit,
      submitEdit,
      cancelEdit,
      increase,
      decrease,
    };
  };
  const {
    isEditing: isEditingFir,
    editValue: firEditValue,
    inputRef: firInputRef,
    startEdit: startFirEdit,
    submitEdit: submitFirEdit,
    cancelEdit: cancelFirEdit,
    increase: increaseFir,
    decrease: decreaseFir,
  } = createEditController({
    current: () => props.firCurrent,
    needed: () => props.firNeeded,
    onUpdate: (value) => emit('update:fir', value),
  });
  const {
    isEditing: isEditingNonFir,
    editValue: nonFirEditValue,
    inputRef: nonFirInputRef,
    startEdit: startNonFirEdit,
    submitEdit: submitNonFirEdit,
    cancelEdit: cancelNonFirEdit,
    increase: increaseNonFir,
    decrease: decreaseNonFir,
  } = createEditController({
    current: () => props.nonFirCurrent,
    needed: () => props.nonFirNeeded,
    onUpdate: (value) => emit('update:nonFir', value),
  });
</script>
