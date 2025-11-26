# Project Dependencies
**Last Updated**: 2025-11-25
## Active Packages
### Core Framework
- `nuxt` (^4.2.1) - Core framework
- `vue` (^3.5) - Reactive framework
- `vue-router` - Routing
### UI & Styling
- **@nuxt/ui** (^4.2.0) - Primary UI component library
- **Tailwind CSS** (^4.1.17) - Utility-first CSS via `@tailwindcss/postcss`
- **SASS** - Scoped component styles (`<style lang="scss">`)
- **@iconify-json/mdi** - Material Design Icons
### State & Data
- `@pinia/nuxt` - State management
- `pinia-plugin-persistedstate` - localStorage persistence
- `@supabase/supabase-js` - Backend/Database integration
- `graphology` - Graph data structures (task dependencies)
### Utilities
- `vue-i18n` - Internationalization
- `qrcode` - QR codes for token transfer
- `d3` - Map visualization in `TarkovMap.vue`
- `@vueuse/core` - Vue composition utilities
## Optimization Opportunities
### D3.js
- Large library used only in `TarkovMap.vue`
- Consider lighter SVG libraries if complex D3 features aren't needed
### QR Code
- `qrcode` (~35KB gzipped) used only in `TokenCard.vue`
- Options:
  - **Lazy loading**: Dynamic import when token card opens
  - **Lighter alternatives**: `uqr`, `qrcode-generator`
## Configuration Notes
- **Mode**: SPA (`ssr: false`)
- **Deployment**: Cloudflare Pages preset
- **Auto-imports**: Enabled for Vue/Nuxt composables
