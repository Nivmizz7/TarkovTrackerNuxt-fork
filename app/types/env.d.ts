/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly MODE: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_LOG_LEVEL?: string;
  readonly VITE_PERF_DEBUG?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
