import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

/**
 * Accesses the current language context state and controls.
 *
 * @returns {{ language: string, direction: string, isRTL: boolean, setLanguage: function, toggleLanguage: function }}
 * @throws {Error} If used outside of LanguageProvider.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      'useLanguage must be used within a LanguageProvider. ' +
      'Wrap your component tree with <LanguageProvider>.'
    );
  }
  return context;
}
