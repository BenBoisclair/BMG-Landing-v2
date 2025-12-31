import en from './translations/en.json';
import th from './translations/th.json';
import ar from './translations/ar.json';

export const languages = {
  en: 'English',
  th: 'ไทย',
  ar: 'العربية',
} as const;

export const defaultLang = 'en' as const;

export type Language = keyof typeof languages;

export type Translations = typeof en;

const translations: Record<Language, Translations> = {
  en,
  th,
  ar,
};

/**
 * Get translations for a specific language
 * @param lang - The language code (en, th, ar)
 * @returns The translations object for the specified language
 */
export function getTranslations(lang: Language): Translations {
  return translations[lang] ?? translations[defaultLang];
}

/**
 * Extract language code from URL
 * @param url - The URL object or string
 * @returns The language code extracted from the URL path
 */
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) {
    return lang as Language;
  }
  return defaultLang;
}

/**
 * Get the URL path for a specific language
 * @param lang - The target language code
 * @param currentPath - The current URL path (optional)
 * @returns The path with the language prefix
 */
export function getLocalizedPath(lang: Language, currentPath: string = '/'): string {
  // Remove any existing language prefix from the path
  const pathWithoutLang = currentPath.replace(/^\/(en|th|ar)/, '') || '/';

  // For default language, no prefix needed
  if (lang === defaultLang) {
    return pathWithoutLang;
  }

  // Add language prefix
  return `/${lang}${pathWithoutLang === '/' ? '' : pathWithoutLang}` || `/${lang}`;
}

/**
 * Check if a language uses RTL (right-to-left) text direction
 * @param lang - The language code
 * @returns true if the language uses RTL, false otherwise
 */
export function isRTL(lang: Language): boolean {
  return lang === 'ar';
}

/**
 * Get the text direction for a language
 * @param lang - The language code
 * @returns 'rtl' for RTL languages, 'ltr' otherwise
 */
export function getTextDirection(lang: Language): 'rtl' | 'ltr' {
  return isRTL(lang) ? 'rtl' : 'ltr';
}

/**
 * Return type for the useI18n helper
 */
export interface I18nContext {
  lang: Language;
  t: Translations;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
}

/**
 * Combined i18n helper that extracts language from URL and returns all i18n context.
 * Use this to reduce boilerplate in Astro components.
 *
 * @example
 * // Before (2 lines):
 * const currentLang = getLangFromUrl(Astro.url);
 * const t = getTranslations(currentLang);
 *
 * // After (1 line):
 * const { lang, t, dir, isRTL } = useI18n(Astro.url);
 *
 * @param url - The URL object from Astro.url
 * @returns Object containing lang, translations (t), text direction (dir), and isRTL boolean
 */
export function useI18n(url: URL): I18nContext {
  const lang = getLangFromUrl(url);
  return {
    lang,
    t: getTranslations(lang),
    dir: getTextDirection(lang),
    isRTL: isRTL(lang),
  };
}
