import { ref, computed, watch, onMounted, type ComputedRef } from "vue";
import {
  useSafeLocale,
  extractLanguageCode,
} from "@/composables/utils/i18nHelpers";
import type {
  TarkovDataQueryResult,
  TarkovHideoutQueryResult,
  StaticMapData,
} from "@/types/tarkov";
import mapsData from "./maps.json";
import {
  API_GAME_MODES,
  GAME_MODES,
  API_SUPPORTED_LANGUAGES,
  LOCALE_TO_API_MAPPING,
} from "@/utils/constants";
// Singleton state
const availableLanguages = ref<string[]>([...API_SUPPORTED_LANGUAGES]);
const staticMapData = ref<StaticMapData | null>(null);

// Map data - now served locally
let mapPromise: Promise<StaticMapData> | null = null;
/**
 * Loads static map data from local source
 */
async function loadStaticMaps(): Promise<StaticMapData> {
  if (!mapPromise) {
    mapPromise = Promise.resolve(mapsData as StaticMapData);
  }
  return mapPromise;
}
// Language extraction moved to @/composables/utils/i18nHelpers.ts
/**
 * Composable for managing Tarkov API queries and language detection
 */
export function useTarkovApi() {
  // Use safe locale helper to avoid i18n context issues
  const locale = useSafeLocale();
  const languageCode = computed(() => {
    // First check explicit mapping (e.g. uk -> en)
    const mappedCode = LOCALE_TO_API_MAPPING[locale.value];
    if (mappedCode) {
      return mappedCode;
    }
    // Otherwise verify against supported languages
    return extractLanguageCode(locale.value, availableLanguages.value);
  });

  // Load static map data on mount
  onMounted(async () => {
    if (!staticMapData.value) {
      staticMapData.value = await loadStaticMaps();
    }
  });
  return {
    availableLanguages: availableLanguages,
    languageCode,
    staticMapData,
    loadStaticMaps,
  };
}
/**
 * Composable for Tarkov main data queries (tasks, maps, traders, player levels)
 * Uses server-side endpoint with Cloudflare Cache API for efficient edge caching
 */
export function useTarkovDataQuery(
  gameMode: ComputedRef<string> = computed(() => GAME_MODES.PVP)
) {
  // Get language code from the API composable to ensure consistency
  const { languageCode: apiLanguageCode } = useTarkovApi();
  const apiGameMode = computed(() => {
    const mode = gameMode.value as keyof typeof API_GAME_MODES;
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
    gameMode,
  };
}
/**
 * Composable for Tarkov hideout data queries
 * Now uses server-side endpoint with Cloudflare Cache API for better efficiency
 */
export function useTarkovHideoutQuery(
  gameMode: ComputedRef<string> = computed(() => GAME_MODES.PVP)
) {
  // Map internal game modes to API game modes
  const apiGameMode = computed(() => {
    const mode = gameMode.value as keyof typeof API_GAME_MODES;
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
    gameMode,
  };
}
