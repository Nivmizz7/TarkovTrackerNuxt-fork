/**
 * Overlay utility for applying tarkov-data-overlay corrections to tarkov.dev API data.
 *
 * Fetches overlay from GitHub and applies corrections to API responses.
 * The overlay contains corrections for incorrect data in tarkov.dev (e.g., wrong minPlayerLevel values).
 *
 * Deployment Note: Module-level cache persists across requests in long-running Node.js processes
 * but resets on cold starts in serverless/edge platforms. See fetchOverlay for TTL and fallback logic.
 */
import { createLogger } from './logger';
const logger = createLogger('Overlay');
// Overlay data structure
interface OverlayData {
  tasks?: Record<string, Record<string, unknown>>;
  tasksAdd?: Record<string, Record<string, unknown>>;
  items?: Record<string, Record<string, unknown>>;
  traders?: Record<string, Record<string, unknown>>;
  hideout?: Record<string, Record<string, unknown>>;
  editions?: Record<string, unknown>;
  $meta?: {
    version: string;
    generated: string;
    sha256: string;
  };
}
// Module-level cache behavior: cachedOverlay and cacheTimestamp persist across requests in
// long-running Node.js processes but reset on cold starts in serverless/edge platforms.
// Features a 1-hour TTL (OVERLAY_CACHE_TTL) and falls back to stale data on fetch errors.
// OVERLAY_URL can be overridden by the environment variable.
let cachedOverlay: OverlayData | null = null;
let cacheTimestamp = 0;
const OVERLAY_CACHE_TTL = 3600000; // 1 hour in milliseconds
const FETCH_TIMEOUT_MS = 5000; // 5 seconds
// GitHub raw URL for the overlay
// Note: Using raw.githubusercontent.com directly until jsDelivr cache propagates
const OVERLAY_URL =
  process.env.OVERLAY_URL?.trim() ||
  'https://raw.githubusercontent.com/tarkovtracker-org/tarkov-data-overlay/main/dist/overlay.json';
/**
 * Deep merge utility that recursively merges objects without mutation
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}
/**
 * Merge ID-keyed patches into an array of entities without mutating the original array.
 * Iterates the target array and, for each element with an `id`, deep-merges a plain-object
 * patch from sourcePatches[id]; non-object patches (including arrays) and non-entity elements
 * are left unchanged. Returns a new array with merged results.
 */
export function mergeArrayByIdPatches(
  sourcePatches: Record<string, unknown>,
  targetArray: unknown[]
): unknown[] {
  return targetArray.map((item) => {
    if (isPlainObject(item) && 'id' in item) {
      const itemId = (item as { id: string }).id;
      const patch = sourcePatches[itemId];
      if (isPlainObject(patch)) {
        return deepMerge(item as Record<string, unknown>, patch as Record<string, unknown>);
      }
    }
    return item;
  });
}
function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Record<string, unknown>
): T {
  const result: Record<string, unknown> = { ...target };
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];
    if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
      // Recursively merge nested objects
      result[key] = deepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as Record<string, unknown>
      );
    } else if (
      // Special case: merge ID-keyed object patches into array of objects
      isPlainObject(sourceValue) &&
      Array.isArray(targetValue) &&
      targetValue.length > 0 &&
      isPlainObject(targetValue[0]) &&
      'id' in targetValue[0]
    ) {
      result[key] = mergeArrayByIdPatches(sourceValue, targetValue);
    } else {
      // Replace primitive values, arrays, or when target doesn't have the key
      result[key] = sourceValue;
    }
  }
  return result as T;
}
/**
 * Validate overlay data structure
 */
function isValidOverlayData(data: unknown): data is OverlayData {
  if (!data || typeof data !== 'object') return false;
  const overlay = data as OverlayData;
  // Check for required $meta field with version
  if (!overlay.$meta || typeof overlay.$meta !== 'object') {
    logger.warn('Invalid overlay: missing $meta');
    return false;
  }
  if (typeof overlay.$meta.version !== 'string') {
    logger.warn('Invalid overlay: missing or invalid $meta.version');
    return false;
  }
  // Validate optional entity collections are records if present
  const collections = ['tasks', 'tasksAdd', 'items', 'traders', 'hideout'] as const;
  for (const collection of collections) {
    if (
      overlay[collection] !== undefined &&
      (typeof overlay[collection] !== 'object' || overlay[collection] === null)
    ) {
      logger.warn(`Invalid overlay: ${collection} is not an object`);
      return false;
    }
  }
  return true;
}
/**
 * Fetch the overlay data from CDN (with caching)
 */
async function fetchOverlay(): Promise<OverlayData | null> {
  const now = Date.now();
  // Return cached overlay if still valid
  if (cachedOverlay && now - cacheTimestamp < OVERLAY_CACHE_TTL) {
    return cachedOverlay;
  }
  try {
    // Set up abort controller with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const response = await fetch(OVERLAY_URL, { signal: controller.signal });
      if (!response.ok) {
        logger.warn(`Failed to fetch overlay: ${response.status}`);
        return cachedOverlay; // Return stale cache if available
      }
      const parsedData = await response.json();
      // Validate the parsed data before caching
      if (!isValidOverlayData(parsedData)) {
        logger.warn('Fetched overlay failed validation, using stale cache');
        return cachedOverlay;
      }
      cachedOverlay = parsedData;
      cacheTimestamp = now;
      logger.info(`Loaded overlay v${cachedOverlay.$meta?.version}`);
      return cachedOverlay;
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      logger.warn(`Fetch timeout after ${FETCH_TIMEOUT_MS}ms`);
    } else {
      logger.warn('Error fetching overlay:', error);
    }
    return cachedOverlay; // Return stale cache if available
  }
}
/**
 * Apply overlay corrections to an array of entities
 * Filters out entities marked as disabled after applying corrections
 */
function applyEntityOverlay<T extends { id: string }>(
  entities: T[],
  corrections: Record<string, Record<string, unknown>> | undefined
): T[] {
  if (!corrections || !entities) return entities;
  let appliedCount = 0;
  let disabledCount = 0;
  const result = entities
    .map((entity) => {
      const correction = corrections[entity.id];
      if (correction) {
        appliedCount++;
        logger.debug(`Applying correction to ${entity.id}:`, correction);
        // Deep merge the correction into the entity (recursively merges nested objects)
        return deepMerge(entity as Record<string, unknown>, correction) as T;
      }
      return entity;
    })
    .filter((entity) => {
      // Filter out entities marked as disabled in the overlay
      const disabled = (entity as Record<string, unknown>).disabled;
      if (disabled === true) {
        disabledCount++;
        logger.debug(`Filtering out disabled entity: ${entity.id}`);
        return false;
      }
      return true;
    });
  logger.info(
    `Applied ${appliedCount} corrections out of ${Object.keys(corrections).length} available`
  );
  if (disabledCount > 0) {
    logger.info(`Filtered out ${disabledCount} disabled entities`);
  }
  return result;
}
type ObjectiveAddEntry = Record<string, unknown>;
const DEFAULT_OVERLAY_OBJECTIVE_TYPE = 'giveItem';
const DEFAULT_OVERLAY_OBJECTIVE_COUNT = 1;
function expandObjectiveAdditions(additions: unknown[]): ObjectiveAddEntry[] {
  const expanded: ObjectiveAddEntry[] = [];
  for (const [index, entry] of additions.entries()) {
    if (!isPlainObject(entry)) continue;
    const baseId = typeof entry.id === 'string' ? entry.id : `overlay-objective-${index}`;
    const items = Array.isArray(entry.items) ? entry.items.filter(isPlainObject) : [];
    const description =
      typeof entry.description === 'string'
        ? entry.description
        : 'Hand over the found in raid item';
    const foundInRaid =
      typeof entry.foundInRaid === 'boolean'
        ? entry.foundInRaid
        : description.toLowerCase().includes('found in raid');
    const count = typeof entry.count === 'number' ? entry.count : DEFAULT_OVERLAY_OBJECTIVE_COUNT;
    // Expand multi-item objectives into individual objectives
    if (!entry.type && items.length > 1) {
      for (const [itemIndex, item] of items.entries()) {
        const itemObj = item as Record<string, unknown>;
        const itemId = typeof itemObj.id === 'string' ? itemObj.id : `item-${itemIndex}`;
        const itemName = typeof itemObj.name === 'string' ? itemObj.name : 'item';
        expanded.push({
          ...entry,
          id: `${baseId}:${itemId}`,
          type: DEFAULT_OVERLAY_OBJECTIVE_TYPE,
          count,
          foundInRaid,
          description: `Hand over the found in raid item: ${itemName}`,
          items: [item],
        });
      }
      continue;
    }
    expanded.push({
      ...entry,
      type: entry.type ?? (items.length > 0 ? DEFAULT_OVERLAY_OBJECTIVE_TYPE : entry.type),
      count,
      foundInRaid,
    });
  }
  return expanded;
}
function applyTaskObjectiveAdditions<T extends { id: string }>(task: T): T {
  if (!isPlainObject(task)) return task;
  const obj = task as Record<string, unknown>;
  const additions = Array.isArray(obj.objectivesAdd) ? obj.objectivesAdd : [];
  if (additions.length === 0) return task;
  const existing = Array.isArray(obj.objectives) ? obj.objectives : [];
  const expanded = expandObjectiveAdditions(additions);
  if (expanded.length === 0) return task;
  const { objectivesAdd, ...rest } = obj;
  return {
    ...(rest as T),
    objectives: [...existing, ...expanded],
  };
}
const OBJECTIVE_TYPE_PREFIXES: Array<{ prefix: string; type: string }> = [
  { prefix: 'eliminate', type: 'shoot' },
  { prefix: 'locate and mark', type: 'mark' },
  { prefix: 'mark', type: 'mark' },
  { prefix: 'stash', type: 'plantItem' },
  { prefix: 'plant', type: 'plantItem' },
  { prefix: 'place', type: 'plantItem' },
  { prefix: 'hand over', type: 'giveItem' },
  { prefix: 'find and hand over', type: 'giveItem' },
  { prefix: 'find', type: 'findItem' },
  { prefix: 'locate', type: 'visit' },
  { prefix: 'recon', type: 'visit' },
  { prefix: 'eat', type: 'useItem' },
  { prefix: 'drink', type: 'useItem' },
  { prefix: 'use', type: 'useItem' },
  { prefix: 'launch', type: 'useItem' },
];
function inferObjectiveType(entry: Record<string, unknown>): string | undefined {
  if (typeof entry.type === 'string' && entry.type.length > 0) {
    return entry.type;
  }
  const hasMarkerItem = isPlainObject(entry.markerItem);
  if (hasMarkerItem) {
    return 'mark';
  }
  const description = typeof entry.description === 'string' ? entry.description.trim() : '';
  const lower = description.toLowerCase();
  for (const { prefix, type } of OBJECTIVE_TYPE_PREFIXES) {
    if (lower.startsWith(prefix)) {
      if (type === 'plantItem' && isPlainObject(entry.questItem)) {
        return 'plantQuestItem';
      }
      if (type === 'giveItem' && isPlainObject(entry.questItem)) {
        return 'giveQuestItem';
      }
      if (type === 'findItem' && isPlainObject(entry.questItem)) {
        return 'findQuestItem';
      }
      return type;
    }
  }
  return undefined;
}
function normalizeObjectiveEntry(entry: Record<string, unknown>): Record<string, unknown> {
  const description = typeof entry.description === 'string' ? entry.description : '';
  const type = inferObjectiveType(entry) ?? entry.type;
  const foundInRaid =
    typeof entry.foundInRaid === 'boolean'
      ? entry.foundInRaid
      : description.toLowerCase().includes('found in raid');
  return { ...entry, type, foundInRaid };
}
function normalizeObjectiveList(list: unknown) {
  if (!Array.isArray(list)) return list;
  return list.map((entry) => (isPlainObject(entry) ? normalizeObjectiveEntry(entry) : entry));
}
type OverlayTaskAddition = Record<string, unknown> & { id: string };
function normalizeTaskAdditions(
  additions: Record<string, Record<string, unknown>> | undefined
): OverlayTaskAddition[] {
  if (!additions) return [];
  return Object.values(additions)
    .filter((entry): entry is Record<string, unknown> & { id: string } => {
      return isPlainObject(entry) && typeof entry.id === 'string' && entry.disabled !== true;
    })
    .map((entry) => {
      const factionName = typeof entry.factionName === 'string' ? entry.factionName : 'Any';
      const objectives = normalizeObjectiveList(entry.objectives);
      const failConditions = normalizeObjectiveList(entry.failConditions);
      return { ...entry, factionName, objectives, failConditions };
    });
}
/**
 * Apply overlay corrections to tarkov.dev API response
 *
 * @param data - The raw API response from tarkov.dev
 * @returns The data with overlay corrections applied
 */
type OverlayTargetData = {
  tasks?: Array<{ id: string }>;
  items?: Array<{ id: string }>;
  traders?: Array<{ id: string }>;
  hideoutStations?: Array<{ id: string }>;
};
export async function applyOverlay<T extends { data?: OverlayTargetData }>(data: T): Promise<T> {
  const overlay = await fetchOverlay();
  if (!overlay || !data?.data) {
    return data;
  }
  const result = { ...data, data: { ...data.data } };
  // Apply task corrections and inject overlay task additions
  if (Array.isArray(result.data.tasks)) {
    const correctedTasks = applyEntityOverlay(
      result.data.tasks as Array<{ id: string }>,
      overlay.tasks
    ).map((task) => applyTaskObjectiveAdditions(task));
    const addedTasks = applyEntityOverlay(
      normalizeTaskAdditions(overlay.tasksAdd),
      overlay.tasks
    ).map((task) => applyTaskObjectiveAdditions(task));
    const existingIds = new Set(correctedTasks.map((task) => task.id));
    const dedupedAdditions = addedTasks.filter((task) => !existingIds.has(task.id));
    result.data.tasks = [...correctedTasks, ...dedupedAdditions];
  }
  // Apply item corrections (if present)
  if (overlay.items && Array.isArray(result.data.items)) {
    result.data.items = applyEntityOverlay(
      result.data.items as Array<{ id: string }>,
      overlay.items
    );
  }
  // Apply trader corrections (if present)
  if (overlay.traders && Array.isArray(result.data.traders)) {
    result.data.traders = applyEntityOverlay(
      result.data.traders as Array<{ id: string }>,
      overlay.traders
    );
  }
  // Apply hideout corrections (if present)
  if (overlay.hideout && Array.isArray(result.data.hideoutStations)) {
    result.data.hideoutStations = applyEntityOverlay(
      result.data.hideoutStations as Array<{ id: string }>,
      overlay.hideout
    );
  }
  return result;
}
