import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

/**
 * Main router definition for CV Platform.
 * Configured with current foundational routes and structure prepared for future phase expansions.
 */
export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTE_PATHS.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);
