import { COMPATIBILITY_LEVELS, TEMPLATE_CATEGORIES } from '../constants/templateConstants';
import { ClassicATSTemplate } from '../templates/ClassicATS/ClassicATSTemplate';
import { ProfessionalATSTemplate } from '../templates/ProfessionalATS/ProfessionalATSTemplate';
import { DeveloperTemplate } from '../templates/Developer/DeveloperTemplate';

/**
 * Static Metadata Definitions for all supported resume templates.
 */
export const TEMPLATES_METADATA = Object.freeze([
  {
    id: 'classic-ats',
    nameKey: 'templates:items.classicATS.name',
    descriptionKey: 'templates:items.classicATS.description',
    category: TEMPLATE_CATEGORIES.ATS,
    compatibilityLevel: COMPATIBILITY_LEVELS.ATS_OPTIMIZED,
    component: ClassicATSTemplate,
    thumbnailVariant: 'classic',
    supportedSections: ['summary', 'experiences', 'education', 'skills', 'projects', 'certificates', 'languages'],
    recommendedFor: ['Software Engineers', 'Accountants', 'General Roles', 'Fresh Graduates'],
    allowColorCustomization: true,
    allowFontCustomization: true,
    isAvailable: true,
    isPremium: false,
    version: 1,
  },
  {
    id: 'professional-ats',
    nameKey: 'templates:items.professionalATS.name',
    descriptionKey: 'templates:items.professionalATS.description',
    category: TEMPLATE_CATEGORIES.ATS,
    compatibilityLevel: COMPATIBILITY_LEVELS.ATS_OPTIMIZED,
    component: ProfessionalATSTemplate,
    thumbnailVariant: 'professional',
    supportedSections: ['summary', 'experiences', 'education', 'skills', 'projects', 'certificates', 'languages'],
    recommendedFor: ['Executives', 'Managers', 'Consultants', 'Senior Roles'],
    allowColorCustomization: true,
    allowFontCustomization: true,
    isAvailable: true,
    isPremium: false,
    version: 1,
  },
  {
    id: 'developer',
    nameKey: 'templates:items.developer.name',
    descriptionKey: 'templates:items.developer.description',
    category: TEMPLATE_CATEGORIES.SPECIALIZED,
    compatibilityLevel: COMPATIBILITY_LEVELS.VISUALLY_ENHANCED,
    component: DeveloperTemplate,
    thumbnailVariant: 'developer',
    supportedSections: ['summary', 'skills', 'projects', 'experiences', 'education', 'certificates', 'languages'],
    recommendedFor: ['Frontend Developers', 'Backend Engineers', 'Full Stack Engineers', 'DevOps'],
    allowColorCustomization: true,
    allowFontCustomization: true,
    isAvailable: true,
    isPremium: false,
    version: 1,
  },
]);
