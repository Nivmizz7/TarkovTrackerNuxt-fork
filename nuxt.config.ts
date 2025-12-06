// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const appDir = resolve(__dirname, 'app');

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  srcDir: 'app',

  runtimeConfig: {
    // Server-only (private) runtime config
    github: {
      botToken: process.env.GITHUB_BOT_TOKEN || '',
      repoOwner: process.env.GITHUB_REPO_OWNER || 'tarkovtracker-org',
      repoName: process.env.GITHUB_REPO_NAME || 'tarkovtrackernuxt',
    },

    supabaseUrl: process.env.SB_URL || process.env.SUPABASE_URL || '',
    supabaseServiceKey: process.env.SB_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    supabaseAnonKey: process.env.SB_ANON_KEY || process.env.SUPABASE_ANON_KEY || '',

    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000',
      teamGatewayUrl: process.env.NUXT_PUBLIC_TEAM_GATEWAY_URL || '',
      tokenGatewayUrl: process.env.NUXT_PUBLIC_TOKEN_GATEWAY_URL || '',
    },
  },

  devtools: {
    enabled: process.env.NODE_ENV === 'development',
    timeline: {
      enabled: true,
    },
  },

  serverDir: resolve(__dirname, 'app/server'),

  nitro: {
    preset: 'cloudflare-pages',
    cloudflare: {
      pages: {
        routes: {
          include: ['/*'],
          exclude: ['/_fonts/*', '/_nuxt/*', '/img/*', '/favicon.ico', '/robots.txt'],
        },
      },
    },
  },

  routeRules: {
    // Prerender the index page for zero-invocation loading of the SPA shell
    '/': { prerender: true },
    // ...your other rules here
  },

  vite: {
    plugins: [
      VueI18nPlugin({
        // your i18n plugin options here if you use it
      }),
    ],
  },
});
