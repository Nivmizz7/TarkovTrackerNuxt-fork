/**
 * Composable for calling Supabase Edge Functions
 * Provides typed methods for common edge function operations
 */

type GameMode = 'pvp' | 'pve'

interface ProgressData {
  level?: number
  faction?: string
  taskCompletions?: Record<string, boolean>
  taskObjectives?: Record<string, boolean>
  hideoutModules?: Record<string, number>
  hideoutParts?: Record<string, number>
}

export const useEdgeFunctions = () => {
  const { $supabase } = useNuxtApp();

  /**
   * Update user progress for a specific game mode
   * @param gameMode The game mode (pvp or pve)
   * @param progressData The progress data to update
   */
  const updateProgress = async (gameMode: GameMode, progressData: ProgressData) => {
    const { data, error } = await $supabase.client.functions.invoke('progress-update', {
      body: { gameMode, progressData },
      method: 'POST',
    });

    if (error) {
      console.error('Progress update failed:', error);
      throw error;
    }

    return data;
  };

  /**
   * Create a new team
   * @param name Team name
   * @param password Team password
   * @param maxMembers Maximum number of team members (2-10)
   */
  const createTeam = async (name: string, password: string, maxMembers = 5) => {
    const { data, error } = await $supabase.client.functions.invoke('team-create', {
      body: { name, password, maxMembers },
      method: 'POST',
    });

    if (error) {
      console.error('Team creation failed:', error);
      throw error;
    }

    return data;
  };

  /**
   * Join an existing team
   * @param teamId The ID of the team to join
   * @param password The team password
   */
  const joinTeam = async (teamId: string, password: string) => {
    const { data, error } = await $supabase.client.functions.invoke('team-join', {
      body: { teamId, password },
      method: 'POST',
    });

    if (error) {
      console.error('Team join failed:', error);
      throw error;
    }

    return data;
  };

  /**
   * Leave a team
   * @param teamId The ID of the team to leave
   */
  const leaveTeam = async (teamId: string) => {
    const { data, error } = await $supabase.client.functions.invoke('team-leave', {
      body: { teamId },
      method: 'POST',
    });

    if (error) {
      console.error('Team leave failed:', error);
      throw error;
    }

    return data;
  };

  /**
   * Kick a member from a team (owner only)
   * @param teamId The ID of the team
   * @param memberId The ID of the member to kick
   */
  const kickTeamMember = async (teamId: string, memberId: string) => {
    const { data, error } = await $supabase.client.functions.invoke('team-kick', {
      body: { teamId, memberId },
      method: 'POST',
    });

    if (error) {
      console.error('Team member kick failed:', error);
      throw error;
    }

    return data;
  };

  /**
   * Revoke an API token
   * @param tokenId The ID of the token to revoke
   */
  const revokeToken = async (tokenId: string) => {
    const { data, error } = await $supabase.client.functions.invoke('token-revoke', {
      body: { tokenId },
      method: 'DELETE',
    });

    if (error) {
      console.error('Token revocation failed:', error);
      throw error;
    }

    return data;
  };

  return {
    // Progress management
    updateProgress,

    // Team management
    createTeam,
    joinTeam,
    leaveTeam,
    kickTeamMember,

    // API token management
    revokeToken,
  };
};
