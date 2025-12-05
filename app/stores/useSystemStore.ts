import { defineStore, type Store } from 'pinia';
import { computed, type Ref } from 'vue';
import { useSupabaseListener } from '@/composables/supabase/useSupabaseListener';
import type { SystemGetters, SystemState } from '@/types/tarkov';
/**
 * Helper to extract team ID from system store state.
 * Handles both 'team' (canonical) and 'team_id' (from database) fields.
 */
export function getTeamIdFromState(state: SystemState): string | null {
  return state.team ?? state.team_id ?? null;
}
/**
 * Helper to check if user has a team from system store state.
 */
export function hasTeamInState(state: SystemState): boolean {
  return !!(state.team ?? state.team_id);
}
/**
 * System store definition with getters for user tokens and team info
 */
export const useSystemStore = defineStore<string, SystemState, SystemGetters>('system', {
  state: (): SystemState => ({}),
  getters: {
    userTokens(state) {
      return state?.tokens || [];
    },
    userTokenCount(state) {
      return state?.tokens?.length || 0;
    },
    userTeam(state): string | null {
      return getTeamIdFromState(state);
    },
    userTeamIsOwn(state) {
      const { $supabase } = useNuxtApp();
      const teamId = getTeamIdFromState(state);
      return teamId === $supabase.user?.id;
    },
  },
});
// Type for the system store instance to avoid circular reference
interface SystemStoreInstance {
  systemStore: Store<string, SystemState, SystemGetters>;
  isSubscribed: Ref<boolean>;
  /** Whether initial data fetch has completed (true even if no data was found) */
  hasInitiallyLoaded: Ref<boolean>;
  cleanup: () => void;
  /** Get the current team ID (handles both team and team_id fields) */
  getTeamId: () => string | null;
  /** Check if user has a team */
  hasTeam: () => boolean;
}
// Singleton instance to prevent multiple listener setups
let systemStoreInstance: SystemStoreInstance | null = null;
export function useSystemStoreWithSupabase(): SystemStoreInstance {
  // Return cached instance if it exists
  if (systemStoreInstance) {
    return systemStoreInstance;
  }
  const systemStore = useSystemStore();
  const { $supabase } = useNuxtApp();
  const handleSystemSnapshot = (data: Record<string, unknown> | null) => {
    if (data && 'team_id' in data) {
      const teamId = (data as { team_id: string | null }).team_id;
      systemStore.$patch({
        team: teamId,
        team_id: teamId,
      } as Partial<SystemState>);
    } else if (data === null) {
      systemStore.$patch({ team: null, team_id: null } as Partial<SystemState>);
    }
  };
  // Computed reference to the system document - passed as ref for reactivity
  const systemFilter = computed(() => {
    return $supabase.user?.loggedIn && $supabase.user?.id
      ? `user_id=eq.${$supabase.user.id}`
      : undefined;
  });
  // Setup Supabase listener with reactive filter ref
  const { cleanup, isSubscribed, hasInitiallyLoaded } = useSupabaseListener({
    store: systemStore,
    table: 'user_system',
    filter: systemFilter,
    storeId: 'system',
    onData: handleSystemSnapshot,
  });
  // Helper functions that provide properly typed access to team state
  const getTeamId = (): string | null => {
    return getTeamIdFromState(systemStore.$state);
  };
  const hasTeam = (): boolean => {
    return hasTeamInState(systemStore.$state);
  };
  // Cache the instance
  const instance: SystemStoreInstance = {
    systemStore,
    isSubscribed,
    hasInitiallyLoaded,
    cleanup,
    getTeamId,
    hasTeam,
  };
  systemStoreInstance = instance;
  return instance;
}
