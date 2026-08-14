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
import arBuilder from './locales/ar/builder.json';
import arTemplates from './locales/ar/templates.json';
import arUpload from './locales/ar/upload.json';
import arAnalyze from './locales/ar/analyze.json';
import arMatch from './locales/ar/match.json';
import arImprove from './locales/ar/improve.json';

import enCommon from './locales/en/common.json';
import enNavigation from './locales/en/navigation.json';
import enHome from './locales/en/home.json';
import enDesignSystem from './locales/en/designSystem.json';
import enFeedback from './locales/en/feedback.json';
import enPages from './locales/en/pages.json';
import enCv from './locales/en/cv.json';
import enCreate from './locales/en/create.json';
import enBuilder from './locales/en/builder.json';
import enTemplates from './locales/en/templates.json';
import enUpload from './locales/en/upload.json';
import enAnalyze from './locales/en/analyze.json';
import enMatch from './locales/en/match.json';
import enImprove from './locales/en/improve.json';

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
        builder: arBuilder,
        templates: arTemplates,
        upload: arUpload,
        analyze: arAnalyze,
        match: arMatch,
        improve: arImprove,
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
        builder: enBuilder,
        templates: enTemplates,
        upload: enUpload,
        analyze: enAnalyze,
        match: enMatch,
        improve: enImprove,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: FALLBACK_LANGUAGE,
    defaultNS: 'common',
    ns: [
      'common',
      'navigation',
      'home',
      'designSystem',
      'feedback',
      'pages',
      'cv',
      'create',
      'builder',
      'templates',
      'upload',
      'analyze',
      'match',
      'improve',
    ],
    interpolation: {
      escapeValue: false, // React already escapes string values
    },
    debug: false,
  });

export default i18n;
