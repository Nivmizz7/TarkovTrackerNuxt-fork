import { defineI18nConfig } from '#i18n';
export default defineI18nConfig(() => {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: isProd,
    silentFallbackWarn: isProd,
    missingWarn: !isProd,
    fallbackWarn: !isProd,
  };
});
