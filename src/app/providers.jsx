import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from '../contexts/ThemeProvider';
import { LanguageProvider } from '../contexts/LanguageProvider';
import { AppErrorBoundary } from '../components/feedback/AppErrorBoundary';

/**
 * AppProviders component.
 * Centralized root wrapper for all application context providers.
 * AppErrorBoundary wraps the entire tree to catch unhandled render errors.
 */
export function AppProviders() {
  return (
    <AppErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LanguageProvider>
    </AppErrorBoundary>
  );
}
