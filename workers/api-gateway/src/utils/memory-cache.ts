type CacheEntry = {
  value: unknown;
  expiresAt: number;
};
const memoryCache = new Map<string, CacheEntry>();
const MAX_CACHE_SIZE = 1000;
let lastCleanup = 0;
const CLEANUP_INTERVAL_MS = 60000; // Cleanup at most once per minute
/**
 * Removes all expired entries from the cache.
 * Called periodically to prevent memory leaks from entries that are never accessed.
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of memoryCache.entries()) {
    if (now >= entry.expiresAt) {
      memoryCache.delete(key);
    }
  }
}
/**
 * Get a cached value by key.
 * Note: Type safety relies on caller using consistent types per key.
 * The generic T is not validated at runtime.
 */
export function getMemoryCache<T>(key: string): T | null {
  // Periodic cleanup to prevent memory leaks
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    lastCleanup = now;
    cleanupExpiredEntries();
  }
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (now >= entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.value as T;
}
export function setMemoryCache<T>(key: string, value: T, ttlSeconds: number): void {
  if (!Number.isFinite(ttlSeconds) || ttlSeconds <= 0) {
    memoryCache.delete(key);
    return;
  }
  // Evict oldest entries if cache is full (simple size-based eviction)
  if (memoryCache.size >= MAX_CACHE_SIZE && !memoryCache.has(key)) {
    const firstKey = memoryCache.keys().next().value;
    if (firstKey) memoryCache.delete(firstKey);
  }
  memoryCache.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
}
