<template>
  <ul class="flex flex-col gap-1 px-1">
    <DrawerItem
      icon="i-heroicons-squares-2x2"
      icon-color="brand-400"
      locale-key="home"
      to="/"
      :is-collapsed="props.isCollapsed"
    ></DrawerItem>
    <DrawerItem
      icon="i-heroicons-clipboard-document-list"
      icon-color="accent-400"
      locale-key="tasks"
      to="/tasks"
      :is-collapsed="props.isCollapsed"
    ></DrawerItem>
    <DrawerItem
      icon="i-heroicons-cube"
      icon-color="brand-300"
      locale-key="neededitems"
      to="/neededitems"
      :is-collapsed="props.isCollapsed"
    ></DrawerItem>
    <DrawerItem
      icon="i-heroicons-briefcase"
      icon-color="accent-300"
      locale-key="traders"
      to="/traders"
      :is-collapsed="props.isCollapsed"
    ></DrawerItem>
    <DrawerItem
      icon="i-heroicons-home"
      icon-color="accent-300"
      locale-key="hideout"
      to="/hideout"
      :is-collapsed="props.isCollapsed"
    ></DrawerItem>
    <DrawerItem
      icon="i-heroicons-user-group"
      icon-color="brand-400"
      locale-key="team"
      to="/team"
      :is-collapsed="props.isCollapsed"
    ></DrawerItem>
    <template v-if="props.isCollapsed">
      <DrawerItem
        icon="i-heroicons-bug-ant"
        icon-color="error-300"
        locale-key="report_issue"
        to="/report-issue"
        :is-collapsed="props.isCollapsed"
      ></DrawerItem>
    </template>
    <template v-else>
      <li class="px-1">
        <UButton
          to="/report-issue"
          color="error"
          variant="soft"
          block
          class="justify-between gap-2 rounded-md border border-error-500/30 bg-error-500/10 px-3 py-2 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          <span class="flex items-center gap-2">
            <UIcon name="i-heroicons-bug-ant" class="h-5 w-5 text-error-200" />
            <span>{{ t('navigation_drawer.report_issue') }}</span>
          </span>
          <UIcon name="i-heroicons-arrow-up-right-20-solid" class="h-4 w-4 text-white/70" />
        </UButton>
      </li>
    </template>
    <DrawerItem
      icon="i-heroicons-cog-6-tooth"
      locale-key="settings"
      to="/settings"
      :is-collapsed="props.isCollapsed"
    ></DrawerItem>
  </ul>
</template>
<script setup>
  import { useI18n } from 'vue-i18n';
  import DrawerItem from '@/features/drawer/DrawerItem.vue';
  const { t } = useI18n({ useScope: 'global' });
  const props = defineProps({
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  });
</script>
