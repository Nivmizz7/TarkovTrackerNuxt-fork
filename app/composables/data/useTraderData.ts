import { computed } from "vue";
import { useMetadataStore } from "@/stores/metadata";
import type { Trader } from "@/types/tarkov";

/**
 * Composable for trader data, now using the metadata store
 */
export function useTraderData() {
  const metadataStore = useMetadataStore();

  // Reactive data from store
  const traders = computed(() => metadataStore.sortedTraders);
  const loading = computed(() => metadataStore.loading);
  const error = computed(() => metadataStore.error);

  // Utility functions that delegate to the store
  const getTraderById = (traderId: string): Trader | undefined => {
    return metadataStore.getTraderById(traderId);
  };

  const getTraderByName = (traderName: string): Trader | undefined => {
    return metadataStore.getTraderByName(traderName);
  };

  return {
    // Reactive data
    traders,
    // Loading states
    loading,
    error,
    // Utility functions
    getTraderById,
    getTraderByName,
  };
}
