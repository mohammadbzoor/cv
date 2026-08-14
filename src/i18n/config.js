import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE, LANGUAGE_STORAGE_KEY } from './supportedLanguages';

import arCommon from './locales/ar/common.json';
import arNavigation from './locales/ar/navigation.json';
import arHome from './locales/ar/home.json';
import arDesignSystem from './locales/ar/designSystem.json';
import arFeedback from './locales/ar/feedback.json';
import arPages from './locales/ar/pages.json';
import arCv from './locales/ar/cv.json';
import arCreate from './locales/ar/create.json';

import enCommon from './locales/en/common.json';
import enNavigation from './locales/en/navigation.json';
import enHome from './locales/en/home.json';
import enDesignSystem from './locales/en/designSystem.json';
import enFeedback from './locales/en/feedback.json';
import enPages from './locales/en/pages.json';
import enCv from './locales/en/cv.json';
import enCreate from './locales/en/create.json';

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
        feedback: arFeedback,
        pages: arPages,
        cv: arCv,
        create: arCreate,
      },
      en: {
        common: enCommon,
        navigation: enNavigation,
        home: enHome,
        designSystem: enDesignSystem,
        feedback: enFeedback,
        pages: enPages,
        cv: enCv,
        create: enCreate,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: FALLBACK_LANGUAGE,
    defaultNS: 'common',
    ns: ['common', 'navigation', 'home', 'designSystem', 'feedback', 'pages', 'cv', 'create'],
    interpolation: {
      escapeValue: false, // React already escapes string values
    },
    debug: false,
  });

export default i18n;
