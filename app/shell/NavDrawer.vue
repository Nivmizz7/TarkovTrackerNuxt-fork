<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    leave-active-class="transition-opacity duration-300 ease-in"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="belowMd && mobileExpanded"
      class="fixed inset-0 z-40 bg-black/60"
      @click="closeMobileDrawer"
    />
  </Transition>
  <aside
    class="bg-sidebar border-surface-700/50 fixed inset-y-0 left-0 z-50 flex flex-col border-r shadow-[inset_0_1px_0_rgba(255,255,255,0.03),inset_0_-1px_0_rgba(0,0,0,0.6),1px_0_0_rgba(0,0,0,0.55)] transition-all duration-300"
    :class="[sidebarWidth]"
  >
    <div
      class="scrollbar-thin relative z-10 flex h-full flex-col overflow-x-hidden overflow-y-auto"
    >
      <NuxtLink
        to="/"
        class="group mt-1 flex shrink-0 flex-col items-center px-3 py-1.5 transition-opacity hover:opacity-90"
      >
        <div
          :class="isCollapsed ? 'w-8' : 'w-32.5'"
          class="relative mx-auto transition-all duration-200"
        >
          <NuxtImg
            :src="
              isCollapsed
                ? '/img/logos/tarkovtrackerlogo-mini.webp'
                : '/img/logos/tarkovtrackerlogo-light.webp'
            "
            class="h-auto w-full"
            preload
          />
        </div>
        <div v-if="!isCollapsed" class="mt-1 text-center">
          <div class="text-base leading-tight font-medium text-white">TarkovTracker.org</div>
        </div>
      </NuxtLink>
      <template v-if="!isCollapsed">
        <DrawerLevel :is-collapsed="false" />
        <DrawerGameSettings />
      </template>
      <template v-else>
        <DrawerLevel :is-collapsed="true" />
      </template>
      <div class="bg-surface-800 mx-3 my-2 h-px shrink-0" />
      <DrawerLinks :is-collapsed="isCollapsed" />
      <div class="bg-surface-800 mx-3 my-2 h-px shrink-0" />
      <div class="flex flex-col gap-0.5">
        <div v-if="!isCollapsed" class="px-4 py-2">
          <h3 class="text-surface-400 text-xs font-semibold tracking-wider uppercase">
            {{ t('navigation_drawer.section_external', 'External') }}
          </h3>
        </div>
        <ul class="flex flex-col gap-0.5 px-1">
          <DrawerItem
            avatar="/img/logos/tarkovdevlogo.webp"
            locale-key="tarkovdev"
            href="https://tarkov.dev/"
            :is-collapsed="isCollapsed"
          />
          <DrawerItem
            avatar="/img/logos/tarkovmonitorlogo.avif"
            locale-key="tarkovmonitor"
            href="https://github.com/the-hideout/TarkovMonitor"
            :is-collapsed="isCollapsed"
          />
          <DrawerItem
            avatar="/img/logos/ratscannerlogo.webp"
            locale-key="ratscanner"
            href="https://github.com/RatScanner/RatScanner"
            :is-collapsed="isCollapsed"
          />
          <DrawerItem
            avatar="/img/logos/tarkovchangeslogo.svg"
            locale-key="tarkovchanges"
            href="https://tarkov-changes.com/"
            :is-collapsed="isCollapsed"
          />
        </ul>
      </div>
    </div>
  </aside>
</template>
<script setup lang="ts">
  import { computed, defineAsyncComponent, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useSharedBreakpoints } from '@/composables/useSharedBreakpoints';
  import { useAppStore } from '@/stores/useApp';
  const { t } = useI18n({ useScope: 'global' });
  const { belowMd } = useSharedBreakpoints();
  const appStore = useAppStore();
  const mobileExpanded = computed(() => appStore.mobileDrawerExpanded);
  watch(belowMd, (isMobile) => {
    if (!isMobile) {
      appStore.setMobileDrawerExpanded(false);
    }
  });
  const closeMobileDrawer = () => {
    appStore.setMobileDrawerExpanded(false);
  };
  const isCollapsed = computed(() => {
    if (belowMd.value) {
      return !mobileExpanded.value;
    }
    return appStore.drawerRail;
  });
  const sidebarWidth = computed(() => {
    if (belowMd.value) {
      return mobileExpanded.value ? 'w-56' : 'w-16';
    }
    return appStore.drawerRail ? 'w-16' : 'w-56';
  });
  const DrawerLinks = defineAsyncComponent(() => import('@/features/drawer/DrawerLinks.vue'));
  const DrawerLevel = defineAsyncComponent(() => import('@/features/drawer/DrawerLevel.vue'));
  const DrawerGameSettings = defineAsyncComponent(
    () => import('@/features/drawer/DrawerGameSettings.vue')
  );
  const DrawerItem = defineAsyncComponent(() => import('@/features/drawer/DrawerItem.vue'));
</script>
