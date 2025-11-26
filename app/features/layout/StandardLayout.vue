<template>
  <div class="min-h-screen flex flex-col bg-background text-surface-200">
    <!-- Navigation Drawer (fixed) -->
    <NavDrawer />
    <!-- Application Bar (fixed header) -->
    <AppBar
      class="fixed top-0 right-0 z-20 transition-all duration-300 ease-in-out border-b border-white/10 bg-background/75 backdrop-blur-md"
      :style="{
        left: mainMarginLeft,
        width: 'auto',
      }"
    />
    <!-- Main content area -->
    <main
      class="flex-1 flex flex-col transition-all duration-300 ease-in-out pt-16"
      :style="{
        marginLeft: mainMarginLeft,
      }"
    >
      <div class="flex-1 min-h-0 p-2 pt-0 overflow-y-auto">
        <slot />
      </div>
    </main>
    <!-- Footer pinned to bottom when content is short -->
    <AppFooter
      class="shrink-0"
      :style="{
        marginLeft: mainMarginLeft,
        width: `calc(100% - ${mainMarginLeft})`,
      }"
    />
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";
import { useAppStore } from "@/stores/app";
import { useBreakpoints } from "@vueuse/core";
const appStore = useAppStore();
// Define breakpoints (matching Vuetify's md breakpoint at 960px)
const breakpoints = useBreakpoints({
  mobile: 0,
  md: 960,
});
const mdAndDown = breakpoints.smaller("md");
// Calculate margin-left based on sidebar state
const mainMarginLeft = computed(() => {
  if (mdAndDown.value) return "0px";
  return appStore.drawerRail ? "56px" : "224px";
});
// Lazy-load layout components
const NavDrawer = defineAsyncComponent(
  () => import("@/features/layout/NavDrawer.vue")
);
const AppFooter = defineAsyncComponent(
  () => import("@/features/layout/AppFooter.vue")
);
const AppBar = defineAsyncComponent(
  () => import("@/features/layout/AppBar.vue")
);
</script>
