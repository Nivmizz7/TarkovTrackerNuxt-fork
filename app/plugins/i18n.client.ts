// i18n translations
import { createI18n, type I18n, type LocaleMessages } from "vue-i18n";
// Import locale files directly
import en from "@/locales/en.json5";
import de from "@/locales/de.json5";
import es from "@/locales/es.json5";
import fr from "@/locales/fr.json5";
import ru from "@/locales/ru.json5";
import uk from "@/locales/uk.json5";
import { markI18nReady } from "@/composables/utils/i18nHelpers";

const messages = {
  en,
  de,
  es,
  fr,
  ru,
  uk,
};
// Explicitly type the combined messages structure
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppMessages = LocaleMessages<any>;
// Extract just the language code from navigator.language (e.g., 'en' from 'en-US')
const languageCode = navigator.language.split(/[-_]/)[0];
const typedMessages = messages as AppMessages;
// Explicitly type the i18n instance
export const i18n: I18n<
  AppMessages,
  Record<string, never>,
  Record<string, never>,
  string,
  false
> = createI18n({
  legacy: false,
  globalInjection: true, // Enable global injection for $t
  locale: languageCode, // Use detected language code
  fallbackLocale: "en", // Fallback locale
  messages: typedMessages, // Use the typed and merged messages
  silentTranslationWarn: true, // Suppress translation warnings
  silentFallbackWarn: true, // Suppress fallback warnings
  missingWarn: false, // Disable missing key warnings
  fallbackWarn: false, // Disable fallback warnings
});
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(i18n);
  markI18nReady();
  return { provide: { i18n } };
});
