import nextLanguageDetector from 'next-language-detector';

import en from '../lang/en.json';
import es from '../lang/es.json';

export type SupportedLocales = 'en' | 'es';

export const DEFAULT_LOCALE = 'en';

export const locales: { [k: string]: SupportedLocales } = {
  en: 'en',
  es: 'es',
};

export const localeMessages = {
  es,
  en,
};

export type LocaleMessages = {
  en: typeof en;
  es: typeof es;
};

export const languageDetector = nextLanguageDetector({
  supportedLngs: Object.keys(locales),
  fallbackLng: DEFAULT_LOCALE,
});
