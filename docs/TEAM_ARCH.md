# Team Flows: Supabase Edge Functions vs Cloudflare Workers

Goal: deliver a lightweight, low-abuse team workflow (create / invite / join / leave / rename / kick) while keeping costs predictable for ~1.5–2.5k DAU.

## Current state
- App calls Supabase Edge Functions (`team-create`, `team-join`, `team-leave`, `team-kick`) via `useEdgeFunctions`.
- Pinia stores (`system`, `team`, `progress`) subscribe to Supabase tables for realtime syncing.
- No Cloudflare Worker in front of the team APIs.

## Decision frame

| Concern | Supabase Edge Function | Cloudflare Worker |
| --- | --- | --- |
| Auth & RLS | Native: JWT from Supabase, Row Level Security on tables | Needs custom JWT verification against Supabase and manual RLS enforcement |
| Data proximity | Runs next to Postgres; minimal latency for DB writes | Adds a hop; must call Supabase REST/RPC from the Worker |
| Rate limiting | Per-function rate limits are limited on free tier; add logic in function | Cloudflare `fetch` handler can use built-in durable rate limiting or KV/R2 to meter requests cheaply |
| Cold starts | Small; good for occasional calls | Also small on Workers; both are fine for this workload |
| Cost predictability | Free tier can burn if every call hits DB; each function invocation counts | Worker CPU is cheap; can cache/deny before touching Supabase |
| Secrets/config | Stored in Supabase function env | Stored in Worker env vars / secrets |
| Vendor features | Realtime, RLS, DB migrations already set up | Edge caching, bot mitigation, IP-based controls easy to add |

## Recommended split
- **Put the business source of truth in Supabase**: `teams` table (id, owner_id, name, password/hash, max_members), `team_members` join table, and any audit rows. Keep RLS strict.
- **Put traffic shaping and invitation UX in Cloudflare Workers** (front-door pattern) — see `docs/TEAM_GATEWAY.md` for the concrete Worker we scaffolded:
  - Validate session JWT (pass through from client) and enforce a simple per-IP + per-user rate limit for create/join/leave.
  - For invite links, issue short-lived signed tokens (KV) so the app can open `/team?team=...&code=...` without exposing raw team password. KV write/read is cheap and avoids DB churn for casual clicks.
  - Reject obvious abuse (burst creation, repeated wrong passwords) before calling Supabase.
- **Keep Supabase Edge Functions** lean:
  - Perform the actual DB mutations under RLS.
  - Validate ownership and member counts.
  - Hash team passwords, never store plaintext.
  - Return minimal fields to update Pinia stores.

## Practical flow
1) Client -> Cloudflare Worker `/api/team/create`  
   - Rate limit by IP + user.  
   - On pass, forward to Supabase Edge Function `team-create`.
2) Worker -> Supabase Edge Function  
   - Function writes to `teams` + `team_members`.  
   - Returns `team_id`, invite payload.
3) Worker -> KV invite token (optional)  
   - Store `{team_id, code}` with TTL; return short invite URL.
4) Client uses Supabase realtime to sync `team` / `team_members`.
5) Leave/disband: same front-door -> edge function flow; function cleans membership and owner invariants.

## Cost/abuse guardrails
- Rate limit at Worker: e.g., 10 create attempts / hour / IP, 30 join attempts / 10 minutes / IP+user.
- Cache failed password attempts in KV to slow brute force.
- Keep Supabase function work minimal: 1–2 SQL statements per call.
- Prefer hashed team join codes; rotate on owner request to invalidate leaked links.

## Why this split
- Supabase already holds auth + data and gives us RLS; we avoid re-implementing consistency.
- Cloudflare Workers are better for shielding Supabase from noisy traffic and handling invite token TTL cheaply.
- The client code stays the same: call a single `/api/team/*` endpoint; Worker proxies to Supabase as needed.

## Next steps
- Define tables + RLS for `teams` and `team_members` (if not already).
- Add a Cloudflare Worker `team-gateway` that proxies to Supabase functions and enforces rate limits + invite token TTL.
- Update `useEdgeFunctions` (or a new composable) to call the Worker URLs instead of direct Supabase functions when available, falling back to Supabase in dev.
