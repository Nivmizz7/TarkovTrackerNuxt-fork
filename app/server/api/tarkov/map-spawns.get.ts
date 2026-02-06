import type { TarkovMapSpawnsQueryResult } from '~/types/tarkov';
import { createTarkovFetcher, edgeCache } from '~/server/utils/edgeCache';
import { GraphQLResponseError, validateGraphQLResponse } from '~/server/utils/graphql-validation';
import { createLogger } from '~/server/utils/logger';
import { CACHE_TTL_DEFAULT, validateGameMode } from '~/server/utils/tarkov-cache-config';
import { TARKOV_MAP_SPAWNS_QUERY } from '~/server/utils/tarkov-queries';
import { API_SUPPORTED_LANGUAGES } from '~/utils/constants';
const logger = createLogger('TarkovMapSpawns');
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let lang = (query.lang as string)?.toLowerCase() || 'en';
  const gameMode = validateGameMode(query.gameMode as string);
  if (!API_SUPPORTED_LANGUAGES.includes(lang as (typeof API_SUPPORTED_LANGUAGES)[number])) {
    lang = 'en';
  }
  const cacheKey = `map-spawns-${lang}-${gameMode}`;
  const baseFetcher = createTarkovFetcher(TARKOV_MAP_SPAWNS_QUERY, { lang, gameMode });
  const fetcher = async () => {
    const rawResponse = await baseFetcher();
    try {
      validateGraphQLResponse<TarkovMapSpawnsQueryResult>(rawResponse, logger, true);
    } catch (error) {
      if (error instanceof GraphQLResponseError) {
        logger.error('GraphQL validation failed:', error.message);
        if (error.errors) {
          logger.error('GraphQL errors detail:', JSON.stringify(error.errors, null, 2));
        }
      }
      throw error;
    }
    return rawResponse;
  };
  return await edgeCache(event, cacheKey, fetcher, CACHE_TTL_DEFAULT, {
    cacheKeyPrefix: 'tarkov',
  });
});
