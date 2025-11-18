<template>
  <!-- Navigation Drawer -->
  <NavDrawer />

  <!-- Application Bar-->
  <AppBar />

  <!-- Main View -->
  <v-main
    style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding-bottom: 0 !important;
      margin-bottom: 0 !important;
    "
  >
    <!-- <div id="tracker-page-background"> -->
    <div
      id="tracker-page-background"
      style="flex: 1 1 auto; display: flex; flex-direction: column"
    >
      <div
        id="tracker-page-background-blur"
        class="d-flex flex-column justify-space-between"
        style="
          flex: 1 1 auto;
          min-height: 100%;
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        "
      >
        <div class="flex-grow-1" style="padding: 8px 8px 0">
          <slot />
        </div>
        <AppFooter
          style="margin-top: auto; flex-shrink: 0; margin-bottom: 0 !important"
        />
      </div>
    </div>
    <!-- </div> -->
  </v-main>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const backgroundImage = computed(() => {
  const bg = route.meta.background || "sunset";
  return `url(/img/background/${bg}.webp)`;
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

<style lang="scss" scoped>
#tracker-page-background {
  background-image: v-bind(backgroundImage);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  margin-bottom: 0;
  padding-bottom: 0;
}
#tracker-page-background-blur {
  background: rgba(
    255,
    255,
    255,
    0.01
  ); // Make sure this color has an opacity of less than 1
  backdrop-filter: blur(8px) brightness(30%);
  min-height: 100%;
  min-width: 100%;
  margin-bottom: 0;
  padding-bottom: 0;
}
.main-content {
  flex: 1;
}

// Global overrides to ensure no bottom spacing
:deep(.v-main) {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

:deep(.v-main__wrap) {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}
</style>
