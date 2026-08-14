import { PlusCircle, Upload, BarChart3, Target, Sparkles, LayoutTemplate, Sliders, Printer } from 'lucide-react';
import { ROUTE_PATHS } from '../../../app/routePaths';

export const HOME_SERVICES = Object.freeze([
  {
    id: 'create',
    icon: PlusCircle,
    titleKey: 'home:services.create.title',
    descKey: 'home:services.create.desc',
    route: ROUTE_PATHS.CREATE,
  },
  {
    id: 'upload',
    icon: Upload,
    titleKey: 'home:services.upload.title',
    descKey: 'home:services.upload.desc',
    route: ROUTE_PATHS.UPLOAD,
  },
  {
    id: 'analyze',
    icon: BarChart3,
    titleKey: 'home:services.analyze.title',
    descKey: 'home:services.analyze.desc',
    route: ROUTE_PATHS.ANALYZE,
  },
  {
    id: 'match',
    icon: Target,
    titleKey: 'home:services.match.title',
    descKey: 'home:services.match.desc',
    route: ROUTE_PATHS.MATCH,
  },
  {
    id: 'improve',
    icon: Sparkles,
    titleKey: 'home:services.improve.title',
    descKey: 'home:services.improve.desc',
    route: ROUTE_PATHS.IMPROVE,
  },
  {
    id: 'templates',
    icon: LayoutTemplate,
    titleKey: 'home:services.templates.title',
    descKey: 'home:services.templates.desc',
    route: ROUTE_PATHS.TEMPLATES,
  },
  {
    id: 'builder',
    icon: Sliders,
    titleKey: 'home:services.builder.title',
    descKey: 'home:services.builder.desc',
    route: ROUTE_PATHS.BUILDER,
  },
  {
    id: 'export',
    icon: Printer,
    titleKey: 'home:services.export.title',
    descKey: 'home:services.export.desc',
    route: ROUTE_PATHS.BUILDER,
  },
]);
