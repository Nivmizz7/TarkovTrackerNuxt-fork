import { defineVitestConfig } from '@nuxt/test-utils/config';
import { configDefaults } from 'vitest/config';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'test-anon-key';
const LOG_LEVEL = process.env.VITE_LOG_LEVEL || 'warn';
export default defineVitestConfig({
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(SUPABASE_URL),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(SUPABASE_ANON_KEY),
    'import.meta.env.VITE_LOG_LEVEL': JSON.stringify(LOG_LEVEL),
  },
  test: {
    environment: 'nuxt',
    globals: true,
    setupFiles: ['./tests/test-setup.ts'],
    exclude: [...configDefaults.exclude, 'workers/**', '**/node_modules/**'],
    clearMocks: true,
    logHeapUsage: false,
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
        maxForks: 1,
        minForks: 1,
      },
    },
    fileParallelism: false,
    maxConcurrency: 1,
    testTimeout: 30000,
    watch: false,
    reporters: ['default'],
    passWithNoTests: true,
  },
});
