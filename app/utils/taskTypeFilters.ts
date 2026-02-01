import type { Task } from '@/types/tarkov';
export interface TaskTypeFilterOptions {
  showKappa: boolean;
  showLightkeeper: boolean;
  showNonSpecial: boolean;
  userPrestigeLevel: number;
  prestigeTaskMap: Map<string, number>;
  prestigeTaskIds: string[];
  excludedTaskIds: Set<string>;
}
/**
 * Filter tasks by type settings (Kappa, Lightkeeper, non-special)
 * Uses OR logic: show task if it matches ANY enabled category
 * Also filters out tasks not available for the user's game edition and prestige level
 *
 * @param taskList - Array of tasks to filter
 * @param options - Filter options including category toggles, prestige data, and edition exclusions
 * @returns Filtered array of tasks
 */
export function filterTasksByTypeSettings(
  taskList: Task[],
  options: TaskTypeFilterOptions
): Task[] {
  const {
    showKappa,
    showLightkeeper,
    showNonSpecial,
    userPrestigeLevel,
    prestigeTaskMap,
    prestigeTaskIds,
    excludedTaskIds,
  } = options;
  return taskList.filter((task) => {
    // Filter out tasks not available for user's game edition
    if (excludedTaskIds.has(task.id)) return false;
    // Filter prestige-gated tasks ("New Beginning")
    // Only show the task that matches the user's current prestige level
    if (prestigeTaskIds.includes(task.id)) {
      const taskPrestigeLevel = prestigeTaskMap.get(task.id);
      if (taskPrestigeLevel !== userPrestigeLevel) {
        return false;
      }
    }
    const isKappaRequired = task.kappaRequired === true;
    const isLightkeeperRequired = task.lightkeeperRequired === true;
    const isNonSpecial = !isKappaRequired && !isLightkeeperRequired;
    // OR logic: show if task matches ANY enabled category
    // A task can be both Kappa and Lightkeeper required - show if either filter is on
    // Note: Lightkeeper's own tasks are treated as normal tasks (gated by unlock requirement)
    if (isKappaRequired && showKappa) return true;
    if (isLightkeeperRequired && showLightkeeper) return true;
    if (isNonSpecial && showNonSpecial) return true;
    // Task doesn't match any enabled filter
    return false;
  });
}
/**
 * Build filter options from store values
 * Helper to create TaskTypeFilterOptions from common store getters
 */
export function buildTaskTypeFilterOptions(
  preferencesStore: {
    getHideNonKappaTasks: boolean;
    getShowLightkeeperTasks: boolean;
    getShowNonSpecialTasks: boolean;
  },
  tarkovStore: {
    getPrestigeLevel: () => number;
    getGameEdition: () => number | undefined;
  },
  metadataStore: {
    prestigeTaskMap: Map<string, number>;
    prestigeTaskIds: string[];
    getExcludedTaskIdsForEdition: (edition: number | undefined) => Set<string>;
  }
): TaskTypeFilterOptions {
  return {
    showKappa: !preferencesStore.getHideNonKappaTasks,
    showLightkeeper: preferencesStore.getShowLightkeeperTasks,
    showNonSpecial: preferencesStore.getShowNonSpecialTasks,
    userPrestigeLevel: tarkovStore.getPrestigeLevel(),
    prestigeTaskMap: metadataStore.prestigeTaskMap,
    prestigeTaskIds: metadataStore.prestigeTaskIds,
    excludedTaskIds: metadataStore.getExcludedTaskIdsForEdition(tarkovStore.getGameEdition()),
  };
}
