import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    projects: ['vitest.happy-dom.config.ts', 'vitest.nuxt.config.ts'],
  },
});
