let warnedNodeEnv = false;
let warnedLocalhostEnabled = false;
/**
 * Build strict CORS headers for a given request origin.
 *
 * Security: Do NOT use wildcard origins for authenticated requests.
 * Only allow known front-end origins in production; include localhost in dev.
 *
 * Fail-secure behavior:
 * - Unset or unknown NODE_ENV is treated as production (localhost disabled)
 * - NODE_ENV should be set explicitly to avoid warnings (unless localhost CORS is explicitly enabled)
 *
 * Localhost origins are only added when ALL conditions are met:
 * - (NODE_ENV === "development" OR ALLOW_LOCALHOST_CORS_DEV === "true")
 * - AND ALLOW_LOCALHOST_CORS === "true"
 */
function getAllowedOrigins(): string[] {
  const defaults = ['https://tarkovtracker.org', 'https://www.tarkovtracker.org'];

  const extra =
    Deno.env
      .get('SUPABASE_ALLOWED_ORIGINS')
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  // Compute flags that determine localhost allowance
  const nodeEnv = Deno.env.get('NODE_ENV');
  const isDevelopment = nodeEnv === 'development';
  const explicitDevOptIn = Deno.env.get('ALLOW_LOCALHOST_CORS_DEV') === 'true';
  const isNonProduction = isDevelopment || explicitDevOptIn;
  const allowLocalhostCors = Deno.env.get('ALLOW_LOCALHOST_CORS') === 'true';
  const localhostWillBeEnabled = isNonProduction && allowLocalhostCors;

  // Fail-secure: warn when NODE_ENV is unset and localhost CORS will be disabled
  if (!nodeEnv && !localhostWillBeEnabled && !warnedNodeEnv) {
    console.error(
      '[CORS] SECURITY WARNING: NODE_ENV is not set. Treating as production (localhost CORS disabled). ' +
        'Set NODE_ENV=development or NODE_ENV=production explicitly.'
    );
    warnedNodeEnv = true;
  }

  // Require BOTH development mode (explicit) AND ALLOW_LOCALHOST_CORS flag
  const local: string[] = [];
  if (localhostWillBeEnabled) {
    local.push('http://localhost:3000', 'http://127.0.0.1:3000');

    // Log when localhost is enabled for auditability
    if (!warnedLocalhostEnabled) {
      if (explicitDevOptIn && !isDevelopment) {
        console.warn(
          '[CORS] Localhost origins enabled via ALLOW_LOCALHOST_CORS_DEV flag ' +
            `(NODE_ENV is '${nodeEnv || 'unset'}', not 'development')`
        );
      } else if (isDevelopment) {
        console.info('[CORS] Localhost origins enabled in development environment');
      }
      warnedLocalhostEnabled = true;
    }
  }

  // De-duplicate while preserving order
  const set = new Set<string>([...defaults, ...extra, ...local]);
  return Array.from(set);
}
/**
 * Compute CORS headers for a request.
 * - Echoes Origin when it's in the allowlist
 * - Adds proper Vary header for caches
 */
export function corsHeadersFor(req: Request): Record<string, string> {
  const origin = req.headers.get('Origin');
  const allowed = getAllowedOrigins();
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    Vary: 'Origin',
  };
  if (origin && allowed.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}
// Backward-compat export to avoid immediate runtime breakage in places where
// a Request object is not available. This intentionally does NOT include an
// origin and should only be used for pre-flight responses that aren't
// security-sensitive. Prefer using corsHeadersFor(req) everywhere.
export const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  Vary: 'Origin',
};
