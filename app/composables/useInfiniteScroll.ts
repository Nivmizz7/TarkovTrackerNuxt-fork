import { type ComputedRef, computed, isRef, onMounted, onUnmounted, type Ref, ref, watch } from 'vue';
export function useInfiniteScroll(
  sentinelRef: Ref<HTMLElement | null> | ComputedRef<HTMLElement | null>,
  onLoadMore: () => void,
  options: {
    rootMargin?: string;
    threshold?: number;
    enabled?: boolean | Ref<boolean> | ComputedRef<boolean>;
  } = {}
) {
  const { rootMargin = '200px', threshold = 0 } = options;
  const enabledOption = options.enabled ?? true;
  // Make enabled reactive whether passed as boolean or Ref
  const enabled = computed(() => (isRef(enabledOption) ? enabledOption.value : enabledOption));
  let observer: IntersectionObserver | null = null;
  const isLoading = ref(false);
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target?.isIntersecting && enabled.value && !isLoading.value) {
      isLoading.value = true;
      onLoadMore();
      // Use nextTick-style timing to allow DOM to update before next check
      requestAnimationFrame(() => {
        isLoading.value = false;
        // Re-check if sentinel is still visible after loading (handles fast scroll)
        checkAndLoadMore();
      });
    }
  };
  // Manual check for when intersection might have been missed
  const checkAndLoadMore = () => {
    if (!enabled.value || isLoading.value || !sentinelRef.value) return;
    const rect = sentinelRef.value.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    // If sentinel is within viewport + rootMargin, trigger load
    const margin = parseInt(rootMargin) || 200;
    if (rect.top < viewportHeight + margin) {
      isLoading.value = true;
      onLoadMore();
      requestAnimationFrame(() => {
        isLoading.value = false;
      });
    }
  };
  const createObserver = () => {
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
    // Also do an initial check in case sentinel is already visible
    requestAnimationFrame(checkAndLoadMore);
  };
  const stop = () => {
    observer?.disconnect();
    observer = null;
  };
  // Watch for sentinel element changes (e.g. when v-if renders it)
  watch(
    sentinelRef,
    (el, oldEl) => {
      if (el !== oldEl) {
        if (observer) {
          observer.disconnect();
          if (el) {
            observer.observe(el);
            // Check if newly rendered sentinel is already visible
            requestAnimationFrame(checkAndLoadMore);
          }
        }
      }
    },
    { flush: 'post' }
  );
  // Watch enabled state to restart observer when re-enabled
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
