import { COMPATIBILITY_LEVELS, TEMPLATE_CATEGORIES } from '../constants/templateConstants';
import { TechnicalPrimeATSTemplate } from '../templates/TechnicalPrimeATS/TechnicalPrimeATSTemplate';
import { ClassicATSTemplate } from '../templates/ClassicATS/ClassicATSTemplate';
import { ProfessionalATSTemplate } from '../templates/ProfessionalATS/ProfessionalATSTemplate';
import { CompactATSTemplate } from '../templates/CompactATS/CompactATSTemplate';
import { ExecutiveATSTemplate } from '../templates/ExecutiveATS/ExecutiveATSTemplate';
import { DeveloperTemplate } from '../templates/Developer/DeveloperTemplate';

/**
 * Static Metadata Definitions for all 6 supported resume templates.
 */
export const TEMPLATES_METADATA = Object.freeze([
  {
    id: 'technical-prime-ats',
    nameKey: 'templates:items.technicalPrimeATS.name',
    descriptionKey: 'templates:items.technicalPrimeATS.description',
    category: TEMPLATE_CATEGORIES.ATS,
    compatibilityLevel: COMPATIBILITY_LEVELS.ATS_OPTIMIZED,
    component: TechnicalPrimeATSTemplate,
    thumbnailVariant: 'technical-prime',
    supportedSections: ['summary', 'skills', 'experiences', 'projects', 'education', 'certificates', 'languages'],
    recommendedFor: ['Software Engineers', 'Technical Leads', 'DevOps Engineers', 'Systems Architects', 'IT Professionals'],
    keyTraits: ['Grouped Technical Skills', 'Single Column ATS Standard', 'Reverse Chronological', 'Clean High Contrast'],
    allowColorCustomization: true,
    allowFontCustomization: true,
    allowDensityCustomization: true,
    isAvailable: true,
    isPremium: false,
    version: 1,
  },
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
    keyTraits: ['Ultra Minimalist', 'Maximum Parser Reliability', 'Black & White Friendly'],
    allowColorCustomization: true,
    allowFontCustomization: true,
    allowDensityCustomization: true,
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
    keyTraits: ['Refined Hierarchy', 'Subtle Divider Accents', 'Corporate Readiness'],
    allowColorCustomization: true,
    allowFontCustomization: true,
    allowDensityCustomization: true,
    isAvailable: true,
    isPremium: false,
    version: 1,
  },
  {
    id: 'compact-ats',
    nameKey: 'templates:items.compactATS.name',
    descriptionKey: 'templates:items.compactATS.description',
    category: TEMPLATE_CATEGORIES.ATS,
    compatibilityLevel: COMPATIBILITY_LEVELS.ATS_OPTIMIZED,
    component: CompactATSTemplate,
    thumbnailVariant: 'compact',
    supportedSections: ['summary', 'experiences', 'education', 'skills', 'projects', 'certificates', 'languages'],
    recommendedFor: ['Single-Page Resumes', 'Early Career Professionals', 'Dense Technical CVs'],
    keyTraits: ['Tight Section Spacing', 'Single Page Optimization', 'High Information Density'],
    allowColorCustomization: true,
    allowFontCustomization: true,
    allowDensityCustomization: true,
    isAvailable: true,
    isPremium: false,
    version: 1,
  },
  {
    id: 'executive-ats',
    nameKey: 'templates:items.executiveATS.name',
    descriptionKey: 'templates:items.executiveATS.description',
    category: TEMPLATE_CATEGORIES.ATS,
    compatibilityLevel: COMPATIBILITY_LEVELS.ATS_OPTIMIZED,
    component: ExecutiveATSTemplate,
    thumbnailVariant: 'executive',
    supportedSections: ['summary', 'experiences', 'education', 'skills', 'projects', 'certificates', 'languages'],
    recommendedFor: ['Directors', 'VPs', 'C-Level Executives', 'Senior Leaders'],
    keyTraits: ['Executive Summary Box', 'Achievement Focused', 'Quantified Impact Layout'],
    allowColorCustomization: true,
    allowFontCustomization: true,
    allowDensityCustomization: true,
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
    recommendedFor: ['Frontend Developers', 'Backend Engineers', 'Full Stack Engineers', 'DevOps Engineers'],
    keyTraits: ['Project Technology Tags', 'Repository & Demo Links', 'Monospace Accents'],
    allowColorCustomization: true,
    allowFontCustomization: true,
    allowDensityCustomization: true,
    isAvailable: true,
    isPremium: false,
    version: 1,
  },
]);

/**
 * Returns a human-readable template name for a given template ID.
 *
 * @param {string} templateId
 * @returns {string}
 */
export function getTemplateName(templateId) {
  const nameMap = {
    'technical-prime-ats': 'Technical Prime ATS',
    'classic-ats': 'Classic ATS',
    'professional-ats': 'Professional ATS',
    'compact-ats': 'Compact ATS',
    'executive-ats': 'Executive ATS',
    'developer': 'Developer Portfolio',
  };
  return nameMap[templateId] || templateId || 'Technical Prime ATS';
}
