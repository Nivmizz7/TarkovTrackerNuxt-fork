<template>
  <li>
    <UTooltip v-if="props.isCollapsed" :text="labelText" :content="{ side: 'right' }">
      <NuxtLink
        v-if="props.to && !props.href"
        :to="props.to"
        class="group flex min-h-10 items-center justify-center rounded-sm border-l-2 px-3 py-2 text-sm font-medium transition-colors duration-150"
        :class="[
          isActive
            ? 'border-primary-500 bg-neutral-800/50 text-white'
            : 'text-surface-300 border-transparent hover:bg-neutral-800/30 hover:text-white',
        ]"
      >
        <DrawerItemIcon :icon="props.icon" :avatar="props.avatar" :color-class="iconClasses" />
      </NuxtLink>
      <a
        v-else-if="props.href"
        :href="props.href"
        target="_blank"
        rel="noopener noreferrer"
        class="group text-surface-300 flex min-h-10 items-center justify-center rounded-sm border-l-2 border-transparent px-3 py-2 text-xs font-medium transition-colors duration-150 hover:bg-neutral-800/30 hover:text-white"
      >
        <DrawerItemIcon :icon="props.icon" :avatar="props.avatar" :color-class="iconClasses" />
      </a>
      <div
        v-else
        class="group flex min-h-12 cursor-not-allowed items-center justify-center rounded-sm border-l-2 border-transparent px-3 py-3 text-base font-medium text-white/50 opacity-60 transition-colors duration-200"
        aria-disabled="true"
      >
        <DrawerItemIcon :icon="props.icon" :avatar="props.avatar" :color-class="iconClasses" />
      </div>
    </UTooltip>
    <template v-else>
      <NuxtLink
        v-if="props.to && !props.href"
        :to="props.to"
        class="group flex min-h-10 items-center rounded-sm border-l-2 px-3 py-2 text-sm font-medium transition-colors duration-150"
        :class="[
          isActive
            ? 'border-primary-500 bg-neutral-800/50 text-white'
            : 'text-surface-300 border-transparent hover:bg-neutral-800/30 hover:text-white',
        ]"
      >
        <DrawerItemIcon
          :icon="props.icon"
          :avatar="props.avatar"
          :color-class="iconClasses"
          has-margin
        />
        <span class="truncate">{{ labelText }}</span>
      </NuxtLink>
      <a
        v-else-if="props.href"
        :href="props.href"
        target="_blank"
        rel="noopener noreferrer"
        class="group text-surface-300 flex min-h-10 items-center rounded-sm border-l-2 border-transparent px-3 py-2 text-xs font-medium transition-colors duration-150 hover:bg-neutral-800/30 hover:text-white"
      >
        <DrawerItemIcon
          :icon="props.icon"
          :avatar="props.avatar"
          :color-class="iconClasses"
          has-margin
        />
        <span class="truncate">{{ labelText }}</span>
      </a>
      <div
        v-else
        class="group flex min-h-12 cursor-not-allowed items-center rounded-sm border-l-2 border-transparent px-3 py-3 text-base font-medium text-white/50 opacity-60 transition-colors duration-200"
        aria-disabled="true"
      >
        <DrawerItemIcon
          :icon="props.icon"
          :avatar="props.avatar"
          :color-class="iconClasses"
          has-margin
        />
        <span class="truncate">{{ labelText }}</span>
      </div>
    </template>
  </li>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  const { t } = useI18n({ useScope: 'global' });
  const route = useRoute();
  const props = defineProps<{
    icon?: string;
    avatar?: string | null;
    localeKey?: string | null;
    text?: string | null;
    to?: string | null;
    href?: string | null;
    isCollapsed: boolean;
  }>();
  const isActive = computed(() => {
    if (props.to) {
      return route.path === props.to;
    }
    return false;
  });
  const iconClasses = computed(() => {
    if (isActive.value) return 'text-white';
    if (props.href) return 'text-surface-300 group-hover:text-white';
    return 'text-surface-300 group-hover:text-white';
  });
  const labelText = computed(() => {
    if (props.localeKey) return t(`navigation_drawer.${props.localeKey}`);
    return props.text ?? '';
  });
</script>
