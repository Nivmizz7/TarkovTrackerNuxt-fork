import { ref, computed, watch } from "vue";
import { useTarkovStore } from "@/stores/tarkov";
import { useSafeLocale, extractLanguageCode  } from "@/composables/utils/i18nHelpers";
import {
  API_GAME_MODES,
  GAME_MODES,
  LOCALE_TO_API_MAPPING,
  API_SUPPORTED_LANGUAGES,
} from "@/utils/constants";
import type { TarkovDataQueryResult, TarkovHideoutQueryResult } from "@/types/tarkov";

/**
 * Singleton state for shared Tarkov data query
 * This ensures only ONE fetch happens for the main data, regardless of how many
 * composables need to consume it.
 */

// Shared singleton state
let sharedDataQuery: ReturnType<typeof createSharedDataQuery> | null = null;
let sharedHideoutQuery: ReturnType<typeof createSharedHideoutQuery> | null = null;

function createSharedDataQuery() {
  const store = useTarkovStore();
  const locale = useSafeLocale();

  const availableLanguages = ref<string[]>([...API_SUPPORTED_LANGUAGES]);

  const apiLanguageCode = computed(() => {
    const mappedCode = LOCALE_TO_API_MAPPING[locale.value];
    if (mappedCode) {
      return mappedCode;
    }
    return extractLanguageCode(locale.value, availableLanguages.value);
  });

  const currentGameMode = computed(() => store.getCurrentGameMode());

  const apiGameMode = computed(() => {
    const mode = currentGameMode.value as keyof typeof API_GAME_MODES;
    return API_GAME_MODES[mode] || API_GAME_MODES[GAME_MODES.PVP];
  });

  const cacheKey = computed(
    () => `tarkov-data-${apiLanguageCode.value}-${apiGameMode.value}`
  );

  const { data, error, status, refresh } = useFetch<{
    data: TarkovDataQueryResult;
  }>("/api/tarkov/data", {
    query: computed(() => ({
      lang: apiLanguageCode.value,
      gameMode: apiGameMode.value,
    })),
    key: cacheKey,
    immediate: false,
  });

  const result = computed(() => data.value?.data);
  const loading = computed(() => status.value === "pending");

  // Watch for key changes (language/gamemode) and fetch
  watch(
    cacheKey,
    () => {
      refresh();
    },
    { immediate: true }
  );

  return {
    result,
    error,
    loading,
    refetch: refresh,
    languageCode: apiLanguageCode,
    gameMode: currentGameMode,
  };
}

function createSharedHideoutQuery() {
  const store = useTarkovStore();

  const currentGameMode = computed(() => store.getCurrentGameMode());

  const apiGameMode = computed(() => {
    const mode = currentGameMode.value as keyof typeof API_GAME_MODES;
    return API_GAME_MODES[mode] || API_GAME_MODES[GAME_MODES.PVP];
  });

  const cacheKey = computed(() => `tarkov-hideout-${apiGameMode.value}`);

  const { data, error, status, refresh } = useFetch<{
    data: TarkovHideoutQueryResult;
  }>("/api/tarkov/hideout", {
    query: computed(() => ({
      gameMode: apiGameMode.value,
    })),
    key: cacheKey,
    immediate: false,
  });

  const result = computed(() => data.value?.data);
  const loading = computed(() => status.value === "pending");

  // Watch for gameMode changes
  watch(
    cacheKey,
    () => {
      refresh();
    },
    { immediate: true }
  );

  return {
    result,
    error,
    loading,
    refetch: refresh,
    gameMode: currentGameMode,
  };
}

/**
 * Get the shared data query instance (singleton)
 * This ensures all composables consume from the same fetch instance
 */
export function useSharedTarkovDataQuery() {
  if (!sharedDataQuery) {
    sharedDataQuery = createSharedDataQuery();
  }
  return sharedDataQuery;
}

/**
 * Get the shared hideout query instance (singleton)
 * This ensures all composables consume from the same fetch instance
 */
export function useSharedTarkovHideoutQuery() {
  if (!sharedHideoutQuery) {
    sharedHideoutQuery = createSharedHideoutQuery();
  }
  return sharedHideoutQuery;
}