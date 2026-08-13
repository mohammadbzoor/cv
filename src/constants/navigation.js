import {
  Home,
  PlusCircle,
  FileCheck,
  Target,
  TrendingUp,
  LayoutTemplate,
  HelpCircle,
} from 'lucide-react';
import { ROUTE_PATHS } from '../app/routePaths';

/**
 * Centralized navigation configuration for CV Platform.
 * Single source of truth for desktop, mobile, and footer navigation links.
 */
export const NAVIGATION_ITEMS = Object.freeze([
  {
    id: 'home',
    labelKey: 'navigation:links.home',
    path: ROUTE_PATHS.HOME,
    icon: Home,
    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,
  },
  {
    id: 'create',
    labelKey: 'navigation:links.create',
    path: ROUTE_PATHS.CREATE,
    icon: PlusCircle,
    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,
  },
  {
    id: 'analyze',
    labelKey: 'navigation:links.analyze',
    path: ROUTE_PATHS.ANALYZE,
    icon: FileCheck,
    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,
  },
  {
    id: 'match',
    labelKey: 'navigation:links.match',
    path: ROUTE_PATHS.MATCH,
    icon: Target,
    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,
  },
  {
    id: 'improve',
    labelKey: 'navigation:links.improve',
    path: ROUTE_PATHS.IMPROVE,
    icon: TrendingUp,
    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,
  },
  {
    id: 'templates',
    labelKey: 'navigation:links.templates',
    path: ROUTE_PATHS.TEMPLATES,
    icon: LayoutTemplate,
    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,
  },
  {
    id: 'help',
    labelKey: 'navigation:links.help',
    path: ROUTE_PATHS.HELP,
    icon: HelpCircle,
    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,
  },
]);
