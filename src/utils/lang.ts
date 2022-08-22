import en from '../lang/en.json';
import es from '../lang/es.json';

export const DEFAULT_LOCALE = 'en';

export const localeMessages = {
  es,
  en,
};

export type LocaleMessages = {
  en: typeof en;
  es: typeof es;
};

export type SupportedLocales = 'en' | 'es';
