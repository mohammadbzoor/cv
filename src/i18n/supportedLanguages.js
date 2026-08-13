/**
 * Centralized list of supported interface languages.
 * App interface supports Arabic (RTL) and English (LTR).
 */
export const SUPPORTED_LANGUAGES = Object.freeze([
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
  },
]);

export const DEFAULT_LANGUAGE = 'ar';
export const FALLBACK_LANGUAGE = 'en';
export const LANGUAGE_STORAGE_KEY = 'cv-platform-language';
