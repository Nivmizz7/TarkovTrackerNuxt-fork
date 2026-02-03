<template>
  <NuxtLink
    v-if="isNuxtLink"
    :to="props.to ?? undefined"
    class="group flex min-h-10 items-center rounded-sm border-l-2 px-3 py-2 text-sm font-medium transition-colors duration-150"
    :class="[
      props.isCollapsed ? 'justify-center' : '',
      isActive
        ? 'border-primary-500 bg-neutral-800/50 text-white'
        : 'text-surface-300 border-transparent hover:bg-neutral-800/30 hover:text-white',
    ]"
  >
    <DrawerItemIcon
      :icon="props.icon"
      :avatar="props.avatar"
      :color-class="props.colorClass"
      :has-margin="props.hasMargin"
    />
    <span v-if="!props.isCollapsed" class="truncate">{{ props.labelText }}</span>
  </NuxtLink>
  <a
    v-else-if="isAnchor"
    :href="props.href ?? undefined"
    target="_blank"
    rel="noopener noreferrer"
    class="group text-surface-300 flex min-h-10 items-center rounded-sm border-l-2 border-transparent px-3 py-2 text-xs font-medium transition-colors duration-150 hover:bg-neutral-800/30 hover:text-white"
    :class="[props.isCollapsed ? 'justify-center' : '']"
  >
    <DrawerItemIcon
      :icon="props.icon"
      :avatar="props.avatar"
      :color-class="props.colorClass"
      :has-margin="props.hasMargin"
    />
    <span v-if="!props.isCollapsed" class="truncate">{{ props.labelText }}</span>
  </a>
  <div
    v-else
    class="group flex min-h-12 cursor-not-allowed items-center rounded-sm border-l-2 border-transparent px-3 py-3 text-base font-medium text-white/50 opacity-60 transition-colors duration-200"
    :class="[props.isCollapsed ? 'justify-center' : '']"
    aria-disabled="true"
  >
    <DrawerItemIcon
      :icon="props.icon"
      :avatar="props.avatar"
      :color-class="props.colorClass"
      :has-margin="props.hasMargin"
    />
    <span v-if="!props.isCollapsed" class="truncate">{{ props.labelText }}</span>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps<{
    to?: string | null;
    href?: string | null;
    disabled?: boolean;
    isCollapsed: boolean;
    icon?: string;
    avatar?: string | null;
    colorClass?: string;
    labelText?: string;
    hasMargin?: boolean;
  }>();
  const route = useRoute();
  const isDisabled = computed(() => props.disabled ?? (!props.to && !props.href));
  const isNuxtLink = computed(() => !isDisabled.value && !!props.to && !props.href);
  const isAnchor = computed(() => !isDisabled.value && !isNuxtLink.value && !!props.href);
  const isActive = computed(() => (props.to ? route.path === props.to : false));
</script>
