import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import DesignSystemPage from '../pages/DesignSystemPage';

/**
 * Main router definition for CV Platform.
 * Configured with foundational routes and design system showcase.
 */
export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTE_PATHS.DESIGN_SYSTEM,
    element: <DesignSystemPage />,
  },
  {
    path: ROUTE_PATHS.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);
