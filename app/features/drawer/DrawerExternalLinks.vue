<template>
  <ul class="flex flex-col gap-1 px-1">
    <DrawerItem
      avatar="/img/logos/tarkovdevlogo.png"
      locale-key="tarkovdev"
      href="https://tarkov.dev/"
      ext-link
      :is-collapsed="props.isCollapsed"
    />
    <DrawerItem
      avatar="/img/logos/tarkovmonitorlogo.avif"
      locale-key="tarkovmonitor"
      href="https://github.com/the-hideout/TarkovMonitor"
      ext-link
      :is-collapsed="props.isCollapsed"
    />
    <DrawerItem
      avatar="/img/logos/ratscannerlogo.png"
      locale-key="ratscanner"
      href="https://ratscanner.com/"
      ext-link
      :is-collapsed="props.isCollapsed"
    />
    <DrawerItem
      avatar="/img/logos/tarkovchangeslogo.svg"
      locale-key="tarkovchanges"
      href="https://tarkov-changes.com/"
      ext-link
      :is-collapsed="props.isCollapsed"
    />
  </ul>
</template>
<script setup>
import DrawerItem from "@/features/drawer/DrawerItem.vue";
const props = defineProps({
  isCollapsed: {
    type: Boolean,
    required: true,
  },
});
</script>
