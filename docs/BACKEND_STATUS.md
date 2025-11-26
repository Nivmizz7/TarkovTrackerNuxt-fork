# Backend Status
**Last Updated**: 2025-11-25
## Current Architecture
- **Auth**: Supabase (Discord, Twitch OAuth)
- **Database**: Supabase PostgreSQL
- **Edge Functions**: Supabase Functions (deployed to Cloudflare)
- **API Caching**: Cloudflare Cache API
## Completed
### State Management
- [x] Pinia stores (tarkov, user, progress)
- [x] localStorage persistence with `pinia-plugin-persistedstate`
- [x] User-scoped localStorage with userId validation
- [x] Automatic localStorage clearing on logout
- [x] Smart merge for localStorage + Supabase data
### Supabase Integration
- [x] Auth with Discord/Twitch OAuth
- [x] `useSupabaseSync` composable for user_progress
- [x] Game mode system (PvP/PvE separate tracking)
### Edge Functions Created
- [x] `progress-update` - Transaction-safe progress updates
- [x] `team-create` - Team creation with validation
- [x] `team-join` - Password validation, capacity checks
- [x] `team-leave` - Cooldown enforcement
- [x] `team-kick` - Owner-only member removal
- [x] `token-revoke` - API token deletion
### Database Migrations
- [x] `api_tokens` table with RLS policies
- [x] `team_events` table for audit trail
## In Progress
### Team Features Frontend
- [ ] `app/features/team/TeamMembers.vue` - integrate edge functions
- [ ] `app/features/team/MyTeam.vue` - integrate edge functions
- [ ] `app/features/team/TeamInvite.vue` - integrate edge functions
### API Token Frontend
- [ ] `app/features/settings/ApiTokens.vue` - integrate edge functions
- [ ] `app/pages/api.vue` - integrate edge functions
- [ ] `token-create` edge function
- [ ] `token-list` edge function
## Testing Needed
- [ ] End-to-end validation with authenticated users
- [ ] Team collaboration with multiple users
- [ ] Data sync under various network conditions
- [ ] localStorage persistence for unauthenticated users
- [ ] User switching scenarios
- [ ] PvP/PvE game mode switching data integrity
## Deployment
- [ ] Configure Cloudflare Pages settings
- [ ] Deploy Supabase functions: `supabase functions deploy`
- [ ] Set production environment variables
