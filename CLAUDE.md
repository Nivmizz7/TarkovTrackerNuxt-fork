# CLAUDE.md

## Commands

```bash
npm run dev       # Dev :3000
npm run build     # Prod SPA
npm run format    # Prettier+ESLint (run before done)
npx vitest        # Tests
```

## Architecture

Nuxt 4 SPA (`ssr:false`), Vue 3 `<script setup>`, Tailwind v4 only (no `<style>`/hex), Supabase backend

- **Features**: `app/features/` domain slices (tasks, team, hideout, maps, traders, settings)
- **State**: useMetadata + useProgress + usePreferences → useTarkov facade
- **Style**: 2-space, 100-char, single quotes, semicolons, `@/` aliases, PascalCase components

## Rules

- Be concise—"Fixed X via Y"
- No comments unless asked
- Own all issues—fix without being asked
- Ask before complex/ambiguous tasks
- No SSR, no relative imports (`../`), no hex colors
- Errors via `logger` from `@/utils/logger`

## Testing

Vitest + Vue Test Utils, `*.test.ts` in `__tests__/`, mock Supabase/network

## Tarkov MCP Tools

- State ONLY what API returned—no "likely", "probably", "appears"
- Missing data ≠ doesn't exist: "API doesn't show [X]—check in-game"
