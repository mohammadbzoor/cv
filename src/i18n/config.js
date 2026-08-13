import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE, LANGUAGE_STORAGE_KEY } from './supportedLanguages';

import arCommon from './locales/ar/common.json';
import arNavigation from './locales/ar/navigation.json';
import arHome from './locales/ar/home.json';
import arDesignSystem from './locales/ar/designSystem.json';

import enCommon from './locales/en/common.json';
import enNavigation from './locales/en/navigation.json';
import enHome from './locales/en/home.json';
import enDesignSystem from './locales/en/designSystem.json';

function getInitialLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') {
      return stored;
    }
  } catch {
    // Silent fail if localStorage is unavailable
  }
  return DEFAULT_LANGUAGE;
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        common: arCommon,
        navigation: arNavigation,
        home: arHome,
        designSystem: arDesignSystem,
      },
      en: {
        common: enCommon,
        navigation: enNavigation,
        home: enHome,
        designSystem: enDesignSystem,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: FALLBACK_LANGUAGE,
    defaultNS: 'common',
    ns: ['common', 'navigation', 'home', 'designSystem'],
    interpolation: {
      escapeValue: false, // React already escapes string values
    },
    debug: false,
  });

export default i18n;
