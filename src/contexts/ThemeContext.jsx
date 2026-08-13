import { createContext } from 'react';

/**
 * Theme context providing theme state and controls.
 * Separated from ThemeProvider to satisfy react-refresh lint rules.
 */
export const ThemeContext = createContext(null);
