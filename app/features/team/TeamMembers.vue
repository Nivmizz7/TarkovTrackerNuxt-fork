<template>
  <GenericCard icon="mdi-account-group" icon-color="white" highlight-color="secondary">
    <template #title>
      {{ $t('page.team.card.manageteam.title') }}
    </template>
    <template #content>
      <template v-if="allMembers.length > 0">
        <div class="p-4">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="teammate in allMembers" :key="teammate">
              <TeamMemberCard :teammember="teammate" :is-team-owner-view="isCurrentUserTeamOwner" />
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="allMembers.length === 0">
        <div class="p-4 text-center">
          {{ $t('page.team.card.manageteam.no_members') }}
        </div>
      </template>
      <template v-else></template>
    </template>
  </GenericCard>
</template>
<script setup lang="ts">
  import GenericCard from '@/components/ui/GenericCard.vue';
  import TeamMemberCard from '@/features/team/TeamMemberCard.vue';
  import { useTeamStoreWithSupabase } from '@/stores/useTeamStore';
  const { $supabase } = useNuxtApp();
  const { teamStore } = useTeamStoreWithSupabase();
  const teamMembers = computed<string[]>(() => teamStore.members || []);
  const isCurrentUserTeamOwner = computed(() => {
    const currentTeamOwner = teamStore.owner;
    const currentSupabaseUID = $supabase.user.id;
    return currentTeamOwner === currentSupabaseUID;
  });
  const allMembers = computed(() => {
    const currentUID = $supabase.user.id;
    if (!currentUID) return teamMembers.value;
    const hasCurrentUser = teamMembers.value.includes(currentUID);
    if (hasCurrentUser) {
      return [...teamMembers.value].sort((a, b) => {
        if (a === currentUID) return -1;
        if (b === currentUID) return 1;
        return 0;
      });
    } else {
      return [currentUID, ...teamMembers.value];
    }
  });
</script>
