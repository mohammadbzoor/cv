import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Accesses the current theme state and controls.
 *
 * @returns {{ theme: string, resolvedTheme: string, setTheme: function, toggleTheme: function }}
 * @throws {Error} If used outside of ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Wrap your component tree with <ThemeProvider>.'
    );
  }
  return context;
}
