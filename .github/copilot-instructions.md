# GitHub Copilot Instructions for TarkovTracker

## Project Overview

TarkovTracker is a Nuxt 4 Single Page Application (SPA) for tracking Escape from Tarkov game progress. The app runs client-side only (`ssr: false`) with Nitro server routes for API proxying.

**Tech Stack:**

- Nuxt 4 with Vue 3 Composition API
- TypeScript (strict mode)
- Pinia for state management
- Supabase for auth, database, and realtime
- Cloudflare Pages/Workers for deployment
- Tailwind CSS v4 with SCSS
- Vitest + Vue Test Utils for testing

## Directory Structure

```
app/                    # Nuxt 4 source directory
├── pages/              # File-based routing (kebab-case)
├── features/           # Domain slices (tasks, team, hideout, maps, neededitems, traders, settings, admin)
├── components/         # Shared UI components
├── shell/              # App chrome (AppBar, NavDrawer, AppFooter)
├── stores/             # Pinia stores with persistence
├── composables/        # Reusable composition functions
├── server/api/         # Nitro server routes
├── locales/            # i18n JSON5 files (en, de, es, fr, ru, uk)
├── plugins/            # Nuxt plugins
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
supabase/functions/     # Deno-based Edge Functions (different lint rules)
workers/                # Cloudflare Workers (api-gateway, team-gateway)
```

## Commands

**Prerequisites:** Node.js >=24.12.0 and npm >=11.6.2 (see `package.json` engines). No additional environment variables are required for local development.

```bash
npm run dev             # Dev server at localhost:3000
npm run build           # Production SPA build
npm run lint            # ESLint with zero warnings (enforced by CI/pre-commit hooks)
npm run lint:fix        # Auto-fix lint issues
npm run format          # Prettier + ESLint fix (run before lint to auto-fix formatting)
npx vitest              # Run unit tests
npx vitest --ui         # Tests with dashboard
```

**Recommended workflow:** Run `npm run format` before `npm run lint` to auto-fix formatting issues. The lint step enforces zero warnings as a hard requirement in CI and pre-commit hooks.

## Code Style Requirements

### Formatting (Prettier)

- 2-space indentation
- 100-character line width
- Single quotes for strings
- Semicolons required
- Trailing commas (es5 style)
- LF line endings

### Vue Single File Components

Always use this structure:

```vue
<script setup lang="ts">
  // Indented script content (vueIndentScriptAndStyle: true)
</script>

<template>
  <!-- Template content -->
</template>

<style scoped lang="scss">
  // Indented SCSS styles
</style>
```

### Import Rules (Critical)

1. **Never use parent-relative imports** - Use `@/` or `~/` aliases instead

   ```typescript
   // WRONG
   import { foo } from '../../utils/foo';

   // CORRECT
   import { foo } from '@/utils/foo';
   ```

2. **No blank lines between import groups**
3. **Alphabetically sorted imports** (case-insensitive)
4. **Import group order:** builtin → external → internal → parent → sibling → index → object → type

### TypeScript Guidelines

- Prefer explicit types for exported functions, stores, and composables
- Avoid `any`; use `unknown` with type narrowing
- Use union/string literal types for constrained values
- Use `as const` for literal inference
- Keep types close to usage; reuse existing types

### Naming Conventions

- **Components:** PascalCase (`TaskCard.vue`)
- **Composables:** camelCase with `use` prefix (`useTaskFiltering.ts`)
- **Stores:** `useXStore` pattern (`useProgress.ts`)
- **Routes/files:** kebab-case (`needed-items.vue`)
- **Test files:** `*.test.ts` in `__tests__/` folders
- **Constants:** UPPER_SNAKE_CASE for globals

## State Management (Three-Store Architecture)

```typescript
// useMetadata - Static game data from tarkov.dev API
const metadata = useMetadata();

// useProgress - User progress state (completions, objectives)
const progress = useProgress();

// usePreferences - User settings with localStorage persistence
const preferences = usePreferences();
```

## Key Patterns

### Dual Game Mode

The app tracks PvP and PvE progress separately. Always consider both modes when working with progress data.

### Team System

Real-time sync via Supabase Broadcast with gateway-tier architecture.

### XP System

Dynamic calculation from tasks with `xpOffset` for manual adjustments.

### Error Handling

```typescript
import { logger } from '@/utils/logger';

try {
  await someAsyncOperation();
} catch (error) {
  logger.error('Feature:Action failed', { context, error });
  // Surface user-friendly message in UI
}
```

## Testing Requirements

- Test files: `*.test.ts` in `__tests__/` folders next to source
- Environment: `nuxt` (handles DOM setup automatically)
- Mock all network/Supabase calls
- Keep tests deterministic and focused

```typescript
import { describe, it, expect, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';

describe('ComponentName', () => {
  it('should do something', async () => {
    const wrapper = await mountSuspended(ComponentName);
    expect(wrapper.text()).toContain('expected');
  });
});
```

## Styling Guidelines

- Use Tailwind CSS v4 theme layer only - **no hex colors**
- SCSS for component styles with `<style scoped lang="scss">`
- Tailwind classes are auto-sorted by Prettier
- Use `@nuxt/ui` components consistently with existing patterns
- Avoid inline styles

## Localization

- Locale files: `app/locales/*.json5`
- Add keys consistently with existing namespace patterns
- Never hard-code user-facing strings in components
- Provide safe fallback strings

## Server Routes (Nitro)

Server handlers live in `app/server/api/`. Keep them small and composable.

```typescript
// app/server/api/example.get.ts
export default defineEventHandler(async (event) => {
  // Handler logic
});
```

## Security Considerations

- Never expose secrets in client code
- Use `useRuntimeConfig()` for environment values
- Keep secrets out of the repo
- Validate all user inputs on server routes

## Files to Ignore

- `supabase/functions/**` - Deno code with different lint rules
- `node_modules/`, `dist/`, `.nuxt/`

## Common Pitfalls to Avoid

1. Using SSR-only features (app is SPA-only)
2. Parent-relative imports (`../..`) - blocked by lint
3. Adding blank lines between imports
4. Using hex colors instead of Tailwind theme
5. Forgetting to mock network calls in tests
6. Adding new global state without necessity
7. Deep nesting - prefer early returns
