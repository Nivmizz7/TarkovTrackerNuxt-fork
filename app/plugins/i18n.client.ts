import type { I18n } from 'vue-i18n';
import { markI18nReady } from '@/composables/i18nHelpers';
import { logger } from '@/utils/logger';
import { STORAGE_KEYS } from '@/utils/storageKeys';
const SUPPORTED_LOCALES = ['en', 'de', 'es', 'fr', 'ru', 'uk', 'zh'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
const isSupportedLocale = (value: string): value is SupportedLocale =>
  SUPPORTED_LOCALES.includes(value as SupportedLocale);
function getInitialLocale(): SupportedLocale {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const savedPrefs = window.localStorage.getItem(STORAGE_KEYS.preferences);
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        if (prefs.localeOverride && isSupportedLocale(prefs.localeOverride)) {
          return prefs.localeOverride;
        }
      }
    } catch (error) {
      logger.warn('[i18n] Failed to read locale from localStorage:', error);
    }
  }
  const navLang = typeof navigator !== 'undefined' ? navigator.language : 'en';
  const resolved = (navLang || 'en').split(/[-_]/)[0] || 'en';
  return isSupportedLocale(resolved) ? resolved : 'en';
}
export default defineNuxtPlugin({
  name: 'i18n-ready',
  enforce: 'post',
  setup(nuxtApp) {
    const i18n = (nuxtApp as { $i18n?: I18n }).$i18n;
    if (i18n?.global?.locale) {
      const globalLocale = i18n.global.locale;
      if (typeof globalLocale === 'string') {
        i18n.global.locale = getInitialLocale();
      } else {
        globalLocale.value = getInitialLocale();
      }
    }
    markI18nReady();
  },
});
