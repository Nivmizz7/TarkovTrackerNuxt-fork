# TarkovTracker Documentation
## Core Stack
- **Nuxt**: 4.2.1
- **@nuxt/ui**: 4.2.0
- **Tailwind CSS**: 4.1.17 (CSS-first config)
- **Supabase**: Auth + Database
- **Pinia**: State management with localStorage persistence
See `00_VERSION_CONTRACT.md` for detailed requirements.
## Project Structure
```
app/
├── pages/           # File-based routing
├── features/        # Feature-specific components
├── components/      # Shared UI components
├── stores/          # Pinia stores
├── composables/     # Composition utilities
├── plugins/         # Nuxt plugins
├── locales/         # i18n translations
└── assets/css/      # Tailwind theme
```
## Development
```bash
npm run dev      # Start dev server
npm run build    # Production build
npx vitest       # Run tests
npx eslint app   # Lint code
```
## Documentation Index
| File | Purpose |
|------|---------|
| `00_VERSION_CONTRACT.md` | Stack requirements and patterns |
| `BACKEND_STATUS.md` | Supabase/Edge Functions status |
| `DEPENDENCIES.md` | Package inventory |
| `I18N_STATUS.md` | Translation system status |
| `z_DISCORD_RULES_LEGAL.md` | Legal/Discord info |
