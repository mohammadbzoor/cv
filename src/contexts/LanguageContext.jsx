import { createContext } from 'react';

/**
 * LanguageContext providing interface language state and controls.
 * Separated from LanguageProvider to satisfy react-refresh lint rules.
 */
export const LanguageContext = createContext(null);
