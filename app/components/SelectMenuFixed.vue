<script setup lang="ts">
  import { computed, useSlots } from 'vue';
  import type { SelectMenuItem } from '#ui/types';
  type SelectMenuValue = SelectMenuItem | number | string;
  const props = defineProps<{
    modelValue?: SelectMenuValue;
    items?: SelectMenuValue[];
    valueKey?: string;
    labelKey?: string;
  }>();
  defineEmits(['update:modelValue']);
  const slots = useSlots();
  const hasCustomDefault = computed(() => !!slots.default);
  const valueKey = computed(() => props.valueKey || 'value');
  const labelKey = computed(() => props.labelKey || 'label');
  const getCurrentLabel = () => {
    if (!props.items?.length) return '';
    const currentItem = props.items.find((item) => {
      const itemValue = typeof item === 'object' && item !== null ? item[valueKey.value] : item;
      const compareValue =
        typeof props.modelValue === 'object' && props.modelValue !== null
          ? props.modelValue[valueKey.value]
          : props.modelValue;
      return itemValue === compareValue;
    });
    if (!currentItem) return '';
    return typeof currentItem === 'object' && currentItem !== null
      ? currentItem[labelKey.value]
      : currentItem;
  };
  const getLongestLabel = () => {
    if (!props.items?.length) return '';
    const labels = props.items.map((item) =>
      typeof item === 'object' && item !== null ? item[labelKey.value] : item
    );
    return labels.reduce((longest, label) => {
      const labelStr = String(label || '');
      const longestStr = String(longest || '');
      return labelStr.length > longestStr.length ? labelStr : longestStr;
    }, '');
  };
</script>
<template>
  <USelectMenu
    v-bind="$attrs"
    :model-value="modelValue"
    :items="items"
    :value-key="valueKey"
    :label-key="labelKey"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template v-if="!hasCustomDefault" #default>
      <span class="inline-grid">
        <span class="col-start-1 row-start-1 justify-self-start">
          {{ getCurrentLabel() }}
        </span>
        <span class="invisible col-start-1 row-start-1 pr-6 whitespace-nowrap">
          {{ getLongestLabel() }}
        </span>
      </span>
    </template>
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </USelectMenu>
</template>
