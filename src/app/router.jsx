/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';
import { PublicLayout } from '../components/layout/PublicLayout';
import { RouteLoadingFallback } from '../components/feedback/RouteLoadingFallback';
import { featureFlags } from '../features/release/config/featureFlags';

import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

// Lazy-loaded pages for code splitting
const CreatePage = lazy(() => import('../pages/CreatePage'));
const UploadPage = lazy(() => import('../pages/UploadPage'));
const AnalyzePage = lazy(() => import('../pages/AnalyzePage'));
const MatchPage = lazy(() => import('../pages/MatchPage'));
const ImprovePage = lazy(() => import('../pages/ImprovePage'));
const TemplatesPage = lazy(() => import('../pages/TemplatesPage'));
const HelpPage = lazy(() => import('../pages/HelpPage'));
const BuilderPage = lazy(() => import('../pages/BuilderPage'));
const DesignSystemPage = lazy(() => import('../pages/DesignSystemPage'));
const CVStorePage = lazy(() => import('../pages/CVStorePage'));

/**
 * Builds development routes conditionally based on feature flags.
 * When disabled (production default), these paths render NotFoundPage.
 */
function getDevelopmentRoutes() {
  if (featureFlags.enableDevelopmentRoutes) {
    return [
      {
        path: ROUTE_PATHS.DESIGN_SYSTEM,
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <DesignSystemPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATHS.CV_STORE,
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <CVStorePage />
          </Suspense>
        ),
      },
    ];
  }

  // In production, dev routes show NotFound
  return [
    {
      path: ROUTE_PATHS.DESIGN_SYSTEM,
      element: <NotFoundPage />,
    },
    {
      path: ROUTE_PATHS.CV_STORE,
      element: <NotFoundPage />,
    },
  ];
}

/**
 * Main router definition for CV Platform.
 * Uses React.lazy for code splitting on heavy pages.
 * Development routes are hidden in production by default.
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
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <CreatePage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATHS.UPLOAD,
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <UploadPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATHS.ANALYZE,
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <AnalyzePage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATHS.MATCH,
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <MatchPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATHS.IMPROVE,
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <ImprovePage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATHS.TEMPLATES,
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <TemplatesPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATHS.HELP,
        element: (
          <Suspense fallback={<RouteLoadingFallback />}>
            <HelpPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATHS.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: ROUTE_PATHS.BUILDER,
    element: (
      <Suspense fallback={<RouteLoadingFallback />}>
        <BuilderPage />
      </Suspense>
    ),
  },
  ...getDevelopmentRoutes(),
]);
