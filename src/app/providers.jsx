import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from '../contexts/ThemeProvider';

/**
 * AppProviders component.
 * Centralized root wrapper for all application context providers.
 */
export function AppProviders() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
