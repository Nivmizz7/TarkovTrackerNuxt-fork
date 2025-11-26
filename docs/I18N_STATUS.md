# i18n Status
**Last Updated**: 2025-11-25
**Status**: Partial fixes applied, manual verification pending
## Current State
The i18n plugin suppresses all warnings (`app/plugins/i18n.client.ts:69-72`), so missing keys appear as raw strings rather than console errors.
### ✅ Fixed
- Added `page.api` translations (title, description, note, endpoints, usage)
- Added `page.neededitems.searchplaceholder`
- Updated tasks page to use existing `page.tasks.filters.*` namespace
### ⏳ Pending Verification
Manual UI verification needed across `/tasks`, `/items`, `/api` and language switching.
## Known Issues
### Tasks Page (`/tasks`)
- Uses `page.tasks.filter.*` keys that may not align with locale files
- Locale files have `page.tasks.filters.*` (note the 's')
### Items Page (`/items`)
- May reference `page.items.title` but locale has `page.neededitems.title`
### API Page (`/api`)
- Missing keys added, needs verification
## Locale Files
All 6 locales in `app/locales/`:
- `en.json5` - English (primary)
- `de.json5` - German
- `es.json5` - Spanish
- `fr.json5` - French
- `ru.json5` - Russian
- `uk.json5` - Ukrainian
## Testing Checklist
```bash
npm run dev
```
- [ ] `/tasks` - Filter controls show translated text
- [ ] `/items` - Title shows "Needed Items"
- [ ] `/api` - Title and descriptions render
- [ ] `/settings` - Title shows "Settings"
- [ ] Language switching works across all pages
- [ ] No console i18n warnings in development
## Development Tip
To debug missing keys, temporarily enable warnings in `app/plugins/i18n.client.ts`:
```typescript
silentTranslationWarn: false,
missingWarn: true,
```
