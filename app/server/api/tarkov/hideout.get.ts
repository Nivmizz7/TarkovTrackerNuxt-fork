import { GAME_MODES } from "~/utils/constants";

const TARKOV_HIDEOUT_QUERY = `
  query TarkovDataHideout($gameMode: GameMode) {
    hideoutStations(gameMode: $gameMode) {
      id
      name
      normalizedName
      levels {
        id
        level
        description
        constructionTime
        itemRequirements {
          id
          item {
            id
            shortName
            name
            link
            wikiLink
            image512pxLink
            gridImageLink
            baseImageLink
            iconLink
            image8xLink
            backgroundColor
          }
          count
          quantity
        }
        stationLevelRequirements {
          id
          station {
            id
            name
          }
          level
        }
        skillRequirements {
          id
          name
          level
        }
        traderRequirements {
          id
          trader {
            id
            name
          }
          value
        }
        crafts {
          id
          duration
          requiredItems {
            item {
              id
              shortName
              name
              link
              wikiLink
              image512pxLink
              gridImageLink
              baseImageLink
              iconLink
              image8xLink
              backgroundColor
            }
            count
            quantity
          }
          rewardItems {
            item {
              id
              shortName
              name
              link
              wikiLink
              image512pxLink
              gridImageLink
              baseImageLink
              iconLink
              image8xLink
              backgroundColor
            }
            count
            quantity
          }
        }
      }
    }
  }
`;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
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
      console.log(`[PROD] Hideout cache miss for: ${gameMode}`);

      const response = await $fetch("https://api.tarkov.dev/graphql", {
        method: "POST",
        body: {
          query: TARKOV_HIDEOUT_QUERY,
          variables: { gameMode },
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
      console.log(`[DEV] Fetching hideout data for: ${gameMode}`);

      const response = await $fetch("https://api.tarkov.dev/graphql", {
        method: "POST",
        body: {
          query: TARKOV_HIDEOUT_QUERY,
          variables: { gameMode },
        },
      });

      setResponseHeaders(event, {
        "X-Cache-Status": "BYPASS",
        "Cache-Control": "no-cache",
      });

      return response;
    }
  } catch (error) {
    console.error("Error fetching hideout data from tarkov.dev:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch hideout data from tarkov.dev",
    });
  }
});
