import { useState, useEffect, useCallback, useMemo } from 'react';
import i18n from '../i18n/config';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from '../i18n/supportedLanguages';
import { LanguageContext } from './LanguageContext';

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

function getLangMeta(langCode) {
  return SUPPORTED_LANGUAGES.find((l) => l.code === langCode) || SUPPORTED_LANGUAGES[0];
}

function applyLanguageToDOM(langCode, dir) {
  document.documentElement.lang = langCode;
  document.documentElement.dir = dir;
}

/**
 * LanguageProvider manages application interface language (ar/en) and document attributes (lang/dir).
 *
 * Architectural Note:
 * App locale controls the interface language only.
 * CV content and document direction remain English and LTR.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const meta = useMemo(() => getLangMeta(language), [language]);
  const direction = meta.direction;
  const isRTL = direction === 'rtl';

  const setLanguage = useCallback((newLang) => {
    if (newLang !== 'ar' && newLang !== 'en') return;
    setLanguageState(newLang);
    i18n.changeLanguage(newLang);
    const newMeta = getLangMeta(newLang);
    applyLanguageToDOM(newLang, newMeta.direction);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch {
      // Silent fail
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  }, [language, setLanguage]);

  // Ensure DOM document attributes and i18n instance stay synchronized
  useEffect(() => {
    applyLanguageToDOM(language, direction);
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, direction]);

  const value = useMemo(
    () => ({ language, direction, isRTL, setLanguage, toggleLanguage }),
    [language, direction, isRTL, setLanguage, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
