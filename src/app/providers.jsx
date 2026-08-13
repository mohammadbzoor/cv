import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from '../contexts/ThemeProvider';
import { LanguageProvider } from '../contexts/LanguageProvider';

/**
 * AppProviders component.
 * Centralized root wrapper for all application context providers.
 */
export function AppProviders() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </LanguageProvider>
  );
}
