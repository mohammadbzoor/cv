/**
 * Centralized constant definitions for CV Data Model and document architecture.
 * Enforces English-only document content and LTR direction rules.
 */

export const CURRENT_CV_SCHEMA_VERSION = 1;

export const CV_DOCUMENT_LANGUAGE = 'en';
export const CV_DOCUMENT_DIRECTION = 'ltr';

export const DEFAULT_TEMPLATE_ID = 'technical-prime-ats';

export const DEFAULT_SECTION_ORDER = Object.freeze([
  'summary',
  'experiences',
  'education',
  'skills',
  'projects',
  'certificates',
  'languages',
]);

export const SUPPORTED_SECTION_TYPES = Object.freeze([
  'summary',
  'experiences',
  'education',
  'skills',
  'projects',
  'certificates',
  'languages',
  'custom',
]);

export const SUPPORTED_FONT_SIZES = Object.freeze(['sm', 'md', 'lg']);
export const SUPPORTED_LINE_HEIGHTS = Object.freeze(['tight', 'normal', 'relaxed']);
export const SUPPORTED_PAGE_SIZES = Object.freeze(['A4']);
export const SUPPORTED_MARGIN_SIZES = Object.freeze(['compact', 'normal', 'spacious']);
export const SUPPORTED_DENSITIES = Object.freeze(['comfortable', 'balanced', 'compact']);
export const SUPPORTED_HEADING_STYLES = Object.freeze(['standard', 'understated', 'prominent']);

export const SUPPORTED_PROFICIENCY_LEVELS = Object.freeze([
  'native',
  'fluent',
  'advanced',
  'intermediate',
  'basic',
]);

export const SUPPORTED_SKILL_LEVELS = Object.freeze([
  'beginner',
  'intermediate',
  'advanced',
  'expert',
]);

export const STORAGE_KEYS = Object.freeze({
  CV_DRAFT: 'cv-platform-cv-draft',
});

export const MAX_HISTORY_SNAPSHOTS = 50;
