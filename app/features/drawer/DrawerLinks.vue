<template>
  <ul class="flex flex-col gap-1 px-1">
    <DrawerItem
      icon="i-heroicons-squares-2x2"
      icon-color="brand-400"
      locale-key="home"
      to="/"
      :is-collapsed="props.isCollapsed"
    >
    </DrawerItem>
    <DrawerItem
      icon="i-heroicons-clipboard-document-list"
      icon-color="accent-400"
      locale-key="tasks"
      to="/tasks"
      :is-collapsed="props.isCollapsed"
    >
    </DrawerItem>
    <DrawerItem
      icon="i-heroicons-cube"
      icon-color="brand-300"
      locale-key="neededitems"
      to="/neededitems"
      :is-collapsed="props.isCollapsed"
    >
    </DrawerItem>
    <DrawerItem
      icon="i-heroicons-home"
      icon-color="accent-300"
      locale-key="hideout"
      to="/hideout"
      :is-collapsed="props.isCollapsed"
    >
    </DrawerItem>
    <DrawerItem
      v-show="user.loggedIn"
      icon="i-heroicons-user-group"
      icon-color="brand-400"
      locale-key="team"
      to="/team"
      :is-collapsed="props.isCollapsed"
    >
    </DrawerItem>
    <DrawerItem
      icon="i-heroicons-code-bracket"
      icon-color="accent-400"
      locale-key="api"
      to="/api"
      :is-collapsed="props.isCollapsed"
    >
    </DrawerItem>
    <DrawerItem
      icon="i-heroicons-cog-6-tooth"
      icon-color="surface-400"
      locale-key="settings"
      to="/settings"
      :is-collapsed="props.isCollapsed"
    >
    </DrawerItem>
  </ul>
</template>
<script setup>
import { computed } from "vue";
import DrawerItem from "@/features/drawer/DrawerItem.vue";
const props = defineProps({
  isCollapsed: {
    type: Boolean,
    required: true,
  },
});
const { $supabase } = useNuxtApp();
const user = computed(() => ({
  loggedIn: $supabase.user?.loggedIn ?? false,
}));
</script>
