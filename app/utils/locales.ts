export const SUPPORTED_LOCALES = ['en', 'de', 'es', 'fr', 'ru', 'uk', 'zh'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const isSupportedLocale = (value: string): value is SupportedLocale =>
  SUPPORTED_LOCALES.includes(value as SupportedLocale);
