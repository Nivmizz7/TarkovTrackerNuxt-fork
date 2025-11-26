import type { RouterConfig } from "@nuxt/schema";

// Custom router configuration to handle OAuth redirects
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Ignore hash if it contains OAuth tokens (from Supabase redirect)
    // This prevents Vue Router from trying to use OAuth tokens as DOM selectors
    if (to.hash && to.hash.includes("access_token")) {
      // Don't scroll, let Supabase handle the OAuth flow
      return false;
    }
    // If there's a saved position (browser back/forward), use it
    if (savedPosition) {
      return savedPosition;
    }
    // If there's a hash (like #section), scroll to it
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    // Default: scroll to top on route change
    return { top: 0 };
  },
};
