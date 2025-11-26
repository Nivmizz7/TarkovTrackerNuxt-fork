import { GAME_MODES } from "~/utils/constants";
import { TARKOV_DATA_QUERY } from "~/server/utils/tarkov-queries";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const lang = (query.lang as string) || "en";
  const gameMode = (query.gameMode as string) || GAME_MODES.PVE;

  // Check if Cloudflare Cache API is available (only in Workers/Pages, not in dev)
  const isCacheAvailable =
    typeof caches !== "undefined" && (caches as any).default;

  try {
    // Only use Cloudflare Cache API in production (Cloudflare Pages/Workers)
    if (isCacheAvailable) {
      const cache = (caches as any).default as Cache;
      const url = getRequestURL(event);
      const cacheKey = new Request(url.toString());

      // Check cache first
      const cachedResponse = await cache.match(cacheKey);

      if (cachedResponse) {
        // CACHE HIT - Return immediately (no function invocation in prod)
        const data = await cachedResponse.json();

        setResponseHeaders(event, {
          "X-Cache-Status": "HIT",
          "Cache-Control": "public, max-age=43200, s-maxage=43200",
        });

        return data;
      }

      // CACHE MISS - Fetch from API
      console.log(`[PROD] Cache miss for: ${lang}-${gameMode}`);

      const response = await $fetch("https://api.tarkov.dev/graphql", {
        method: "POST",
        body: {
          query: TARKOV_DATA_QUERY,
          variables: { lang, gameMode },
        },
      });

      // Store in edge cache
      const cacheResponse = new Response(JSON.stringify(response), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=43200, s-maxage=43200",
          "X-Cache-Status": "MISS",
        },
      });

      // Non-blocking cache write if waitUntil available
      // @ts-ignore
      if (event.context.cloudflare?.context?.waitUntil) {
        event.context.cloudflare.context.waitUntil(
          cache.put(cacheKey, cacheResponse.clone())
        );
      } else {
        await cache.put(cacheKey, cacheResponse.clone());
      }

      setResponseHeaders(event, {
        "X-Cache-Status": "MISS",
        "Cache-Control": "public, max-age=43200, s-maxage=43200",
      });

      return response;
    } else {
      // DEV MODE - No caching, direct fetch
      console.log(`[DEV] Fetching data for: ${lang}-${gameMode}`);

      const response = await $fetch("https://api.tarkov.dev/graphql", {
        method: "POST",
        body: {
          query: TARKOV_DATA_QUERY,
          variables: { lang, gameMode },
        },
      });

      setResponseHeaders(event, {
        "X-Cache-Status": "BYPASS",
        "Cache-Control": "no-cache",
      });

      return response;
    }
  } catch (error) {
    console.error("Error fetching data from tarkov.dev:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch data from tarkov.dev",
    });
  }
});
