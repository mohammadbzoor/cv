import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';
import { PublicLayout } from '../components/layout/PublicLayout';

import HomePage from '../pages/HomePage';
import CreatePage from '../pages/CreatePage';
import UploadPage from '../pages/UploadPage';
import AnalyzePage from '../pages/AnalyzePage';
import MatchPage from '../pages/MatchPage';
import ImprovePage from '../pages/ImprovePage';
import TemplatesPage from '../pages/TemplatesPage';
import HelpPage from '../pages/HelpPage';
import NotFoundPage from '../pages/NotFoundPage';
import DesignSystemPage from '../pages/DesignSystemPage';
import CVStorePage from '../pages/CVStorePage';

/**
 * Main router definition for CV Platform.
 * Configured with PublicLayout route hierarchy for public pages and standalone routes for development tools.
 */
export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: ROUTE_PATHS.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTE_PATHS.CREATE,
        element: <CreatePage />,
      },
      {
        path: ROUTE_PATHS.UPLOAD,
        element: <UploadPage />,
      },
      {
        path: ROUTE_PATHS.ANALYZE,
        element: <AnalyzePage />,
      },
      {
        path: ROUTE_PATHS.MATCH,
        element: <MatchPage />,
      },
      {
        path: ROUTE_PATHS.IMPROVE,
        element: <ImprovePage />,
      },
      {
        path: ROUTE_PATHS.TEMPLATES,
        element: <TemplatesPage />,
      },
      {
        path: ROUTE_PATHS.HELP,
        element: <HelpPage />,
      },
      {
        path: ROUTE_PATHS.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: ROUTE_PATHS.DESIGN_SYSTEM,
    element: <DesignSystemPage />,
  },
  {
    path: ROUTE_PATHS.CV_STORE,
    element: <CVStorePage />,
  },
]);
