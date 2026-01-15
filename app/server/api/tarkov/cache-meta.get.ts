import { defineEventHandler, setResponseHeaders } from 'h3';
import { useRuntimeConfig } from '#imports';
import { createLogger } from '~/server/utils/logger';
const logger = createLogger('TarkovCacheMeta');
export default defineEventHandler(async (event) => {
  setResponseHeaders(event, { 'Cache-Control': 'no-store' });
  const config = useRuntimeConfig(event);
  const supabaseUrl = config.supabaseUrl as string;
  const supabaseServiceKey = config.supabaseServiceKey as string;
  if (!supabaseUrl || !supabaseServiceKey) {
    logger.error('[CacheMeta] Missing Supabase configuration for cache meta lookup.', {
      supabaseUrlPresent: Boolean(supabaseUrl),
      supabaseServiceKeyPresent: Boolean(supabaseServiceKey),
    });
    return { data: { lastPurgeAt: null } };
  }
  const url = new URL(`${supabaseUrl}/rest/v1/admin_audit_log`);
  url.searchParams.set('select', 'created_at,details');
  url.searchParams.set('action', 'eq.cache_purge');
  url.searchParams.set('order', 'created_at.desc');
  url.searchParams.set('limit', '10');
  const response = await fetch(url.toString(), {
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  if (!response.ok) {
    return { data: { lastPurgeAt: null } };
  }
  const rows = (await response.json()) as Array<{
    created_at?: string | null;
    details?: { success?: boolean } | null;
  }>;
  const lastSuccessful = rows.find((row) => row?.details?.success === true);
  return { data: { lastPurgeAt: lastSuccessful?.created_at ?? null } };
});
