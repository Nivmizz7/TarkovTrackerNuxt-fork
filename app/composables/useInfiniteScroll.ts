import {
  type ComputedRef,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  type Ref,
  ref,
  toValue,
  watch,
} from 'vue';
import { logger } from '@/utils/logger';
export interface UseInfiniteScrollOptions {
  rootMargin?: string;
  threshold?: number;
  enabled?: boolean | Ref<boolean> | ComputedRef<boolean>;
  /** Attach a window scroll listener as a fallback when needed (opt-in). */
  useScrollFallback?: boolean;
  scrollThrottleMs?: number;
  /** Keep auto-loading while the user is at the bottom, even without new scroll events. */
  stickToBottom?: boolean;
  /** Distance from the bottom (px) to consider "at bottom" when stickToBottom is enabled. */
  stickToBottomThreshold?: number;
  /**
   * Maximum number of auto-load cycles while the sentinel remains in range.
   * Prevents runaway loops if the list doesn't grow.
   */
  maxAutoLoads?: number;
}
// Scroll fallback attaches a global window scroll listener; only enable if needed.
export function useInfiniteScroll(
  sentinelRef: Ref<HTMLElement | null> | ComputedRef<HTMLElement | null>,
  onLoadMore: () => void | Promise<void>,
  options: UseInfiniteScrollOptions = {}
) {
  const {
    rootMargin = '1500px',
    threshold = 0,
    // When true, attaches a window scroll listener; opt-in for cases without IntersectionObserver.
    useScrollFallback = false,
    scrollThrottleMs = 100,
    stickToBottom = useScrollFallback,
    stickToBottomThreshold = 200,
    maxAutoLoads = 100,
  } = options;
  const enabled = computed(() => toValue(options.enabled) ?? true);
  const shouldAttachScrollListener = useScrollFallback || stickToBottom;
  let observer: IntersectionObserver | null = null;
  const isLoading = ref(false);
  const canUseObserver = typeof IntersectionObserver !== 'undefined';
  let warnedObserverUnavailable = false;
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
  let pendingScroll = false;
  const marginPx = parseInt(rootMargin) || 1500;
  let autoLoadCount = 0;
  let stickToBottomArmed = false;
  let isStuckToBottom = false;
  const updateStickiness = () => {
    if (!stickToBottom || !stickToBottomArmed || typeof window === 'undefined') return;
    const doc = document.documentElement;
    const distanceFromBottom = doc.scrollHeight - (window.scrollY + window.innerHeight);
    isStuckToBottom = distanceFromBottom <= stickToBottomThreshold;
  };
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target?.isIntersecting && enabled.value) {
      autoLoadCount = 0;
      void checkAndLoadMore();
    }
  };
  const checkAndLoadMore = async () => {
    if (!enabled.value || isLoading.value || !sentinelRef.value) return;
    if (typeof window === 'undefined') return;
    const rect = sentinelRef.value.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const shouldLoad = rect.top < viewportHeight + marginPx || (stickToBottom && isStuckToBottom);
    if (shouldLoad) {
      if (autoLoadCount >= maxAutoLoads) {
        logger.warn('[useInfiniteScroll] Max auto-load cycles reached, pausing');
        return;
      }
      autoLoadCount += 1;
      isLoading.value = true;
      try {
        await Promise.resolve(onLoadMore());
      } catch (error) {
        // Avoid leaving isLoading stuck on errors
        logger.error('[useInfiniteScroll] Failed to load more items:', error);
      } finally {
        isLoading.value = false;
        // Re-check after DOM updates AND browser paint - sentinel may still
        // be visible if user scrolled fast and more content is needed.
        // nextTick ensures Vue's DOM update, requestAnimationFrame ensures paint.
        nextTick(() => {
          requestAnimationFrame(() => {
            if (!enabled.value || !sentinelRef.value) return;
            void checkAndLoadMore();
          });
        });
      }
    } else {
      autoLoadCount = 0;
    }
  };
  const scheduleScrollCheck = () => {
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
      void checkAndLoadMore();
      if (pendingScroll) {
        pendingScroll = false;
        scheduleScrollCheck();
      }
    }, scrollThrottleMs);
  };
  const handleScroll = () => {
    if (!enabled.value) return;
    stickToBottomArmed ||= stickToBottom;
    updateStickiness();
    autoLoadCount = 0;
    if (scrollTimeout) {
      pendingScroll = true;
      return;
    }
    scheduleScrollCheck();
  };
  const createObserver = () => {
    if (!canUseObserver) {
      if (!warnedObserverUnavailable) {
        warnedObserverUnavailable = true;
        logger.warn(
          '[useInfiniteScroll] IntersectionObserver unavailable; ' +
            'enable useScrollFallback to scroll.'
        );
      }
      return;
    }
    if (observer) {
      observer.disconnect();
    }
    observer = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    });
    if (sentinelRef.value) {
      observer.observe(sentinelRef.value);
    }
  };
  const start = () => {
    createObserver();
    if (shouldAttachScrollListener) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    nextTick(() => {
      updateStickiness();
      void checkAndLoadMore();
    });
  };
  const stop = () => {
    observer?.disconnect();
    observer = null;
    if (shouldAttachScrollListener) {
      window.removeEventListener('scroll', handleScroll);
    }
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
      scrollTimeout = null;
    }
    pendingScroll = false;
    autoLoadCount = 0;
    stickToBottomArmed = false;
    isStuckToBottom = false;
  };
  watch(
    sentinelRef,
    (el, oldEl) => {
      if (el === oldEl || !observer) return;
      observer.disconnect();
      if (el) {
        observer.observe(el);
        nextTick(() => void checkAndLoadMore());
      }
    },
    { flush: 'post' }
  );
  watch(enabled, (newEnabled) => {
    if (newEnabled) {
      start();
    } else {
      stop();
    }
  });
  onMounted(() => {
    if (enabled.value) {
      start();
    }
  });
  onUnmounted(() => {
    stop();
  });
  return {
    isLoading,
    stop,
    start,
    checkAndLoadMore,
  };
}
