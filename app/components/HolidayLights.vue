<template>
  <div
    class="pointer-events-none fixed top-16 z-30 overflow-hidden transition-all duration-300"
    :style="{
      left: marginLeft,
      width: `calc(100% - ${marginLeft})`,
    }"
    aria-hidden="true"
  >
    <!-- Christmas lights -->
    <div class="relative flex h-12 w-full items-start justify-around px-2">
      <div
        v-for="(light, index) in lights"
        :key="index"
        class="light-bulb relative"
        :style="{
          marginTop: `${light.drop}px`,
          animationDelay: `${light.delay}s`,
        }"
      >
        <!-- Bulb cap -->
        <div class="mx-auto h-1.5 w-2 rounded-t-sm bg-zinc-700" />
        <!-- Bulb -->
        <div
          class="bulb h-4 w-3 rounded-b-full transition-all duration-300"
          :class="light.colorClass"
          :style="{
            animationDelay: `${light.delay}s`,
            boxShadow: `0 0 8px 2px ${light.glowColor}, 0 0 16px 4px ${light.glowColorSoft}`,
          }"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import { useSharedBreakpoints } from '@/composables/useSharedBreakpoints';
  import { useAppStore } from '@/stores/useApp';
  const appStore = useAppStore();
  const { belowMd } = useSharedBreakpoints();
  // Match the drawer margin from the layout
  const marginLeft = computed(() => {
    if (belowMd.value) return '64px';
    return appStore.drawerRail ? '64px' : '224px';
  });
  interface Light {
    colorClass: string;
    glowColor: string;
    glowColorSoft: string;
    delay: number;
    drop: number;
  }
  const lightColors = [
    { colorClass: 'bg-red-500', glowColor: '#ef4444', glowColorSoft: '#ef444440' },
    { colorClass: 'bg-success-500', glowColor: '#3a7859', glowColorSoft: '#3a785940' },
    { colorClass: 'bg-blue-500', glowColor: '#3b82f6', glowColorSoft: '#3b82f640' },
    { colorClass: 'bg-yellow-400', glowColor: '#facc15', glowColorSoft: '#facc1540' },
    { colorClass: 'bg-purple-500', glowColor: '#a855f7', glowColorSoft: '#a855f740' },
    { colorClass: 'bg-orange-500', glowColor: '#f97316', glowColorSoft: '#f9731640' },
    { colorClass: 'bg-pink-500', glowColor: '#ec4899', glowColorSoft: '#ec489940' },
    { colorClass: 'bg-info-400', glowColor: '#6d9ab0', glowColorSoft: '#6d9ab040' },
  ];
  const lightCount = 25;
  const lights = computed<Light[]>(() => {
    const fallbackColor = lightColors[0] ?? {
      colorClass: 'bg-red-500',
      glowColor: '#ef4444',
      glowColorSoft: '#ef444440',
    };
    return Array.from({ length: lightCount }, (_, i) => {
      const color = lightColors[i % lightColors.length] ?? fallbackColor;
      // Create a wave pattern for the drop
      const wavePosition = (i / lightCount) * Math.PI * 4;
      const drop = 4 + Math.sin(wavePosition) * 6;
      return {
        colorClass: color.colorClass,
        glowColor: color.glowColor,
        glowColorSoft: color.glowColorSoft,
        delay: (i % 8) * 0.15,
        drop,
      };
    });
  });
</script>
<style scoped>
  .light-bulb {
    animation: sway 3s ease-in-out infinite;
  }
  .bulb {
    animation: twinkle 2s ease-in-out infinite;
  }
  @keyframes sway {
    0%,
    100% {
      transform: rotate(-2deg);
    }
    50% {
      transform: rotate(2deg);
    }
  }
  @keyframes twinkle {
    0%,
    100% {
      opacity: 1;
      filter: brightness(1);
    }
    50% {
      opacity: 0.7;
      filter: brightness(0.8);
    }
  }
</style>
