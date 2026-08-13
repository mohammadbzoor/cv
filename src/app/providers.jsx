import { RouterProvider } from 'react-router-dom';
import { router } from './router';

/**
 * AppProviders component.
 * Acts as the centralized root wrapper for all application context providers.
 *
 * @returns {JSX.Element} The router provider wrapping the application.
 */
export function AppProviders() {
  return <RouterProvider router={router} />;
}
