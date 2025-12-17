import type { H3Event } from 'h3';

export interface SupabaseConfig {
  url: string;
  serviceKey: string;
  anonKey: string;
}

/**
 * Load Supabase configuration (URL + service keys) from the environment.
 * Throws an error if any required variable is missing so routes can fail fast.
 */
export function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.SB_URL || process.env.SUPABASE_URL || '';
  const serviceKey = process.env.SB_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const anonKey = process.env.SB_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

  if (!url || !serviceKey || !anonKey) {
    throw new Error(
      '[supabaseAdmin] Missing required environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and SUPABASE_ANON_KEY must all be set'
    );
  }

  return { url, serviceKey, anonKey };
}

/**
 * Create a helper around Supabase REST so routes can query tables with the service role.
 */
export function createRestFetch(config: Pick<SupabaseConfig, 'url' | 'serviceKey'>) {
  return async (path: string, init?: RequestInit) => {
    const url = `${config.url}/rest/v1/${path}`;
    const headers = {
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init?.headers as Record<string, string> | undefined),
    };

    return fetch(url, { ...init, headers });
  };
}

/**
 * Helper to call Supabase auth endpoint for JWT verification.
 */
export async function fetchAuthUser(_event: H3Event, authHeader: string, config: SupabaseConfig) {
  const response = await fetch(`${config.url}/auth/v1/user`, {
    headers: {
      Authorization: authHeader,
      apikey: config.anonKey,
    },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as { id: string } | null;
}
