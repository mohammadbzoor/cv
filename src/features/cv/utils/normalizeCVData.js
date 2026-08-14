import { generateId } from '../../../utils/generateId';
import { createEmptyCV } from '../models/cvFactories';
import {
  CV_DOCUMENT_LANGUAGE,
  CV_DOCUMENT_DIRECTION,
  DEFAULT_SECTION_ORDER,
  DEFAULT_TEMPLATE_ID,
  SUPPORTED_PAGE_SIZES,
  SUPPORTED_DENSITIES,
  SUPPORTED_HEADING_STYLES,
} from '../models/cvConstants';

/**
 * Sanitizes and normalizes raw/persisted CV data object.
 * Guarantees structural defaults, missing item IDs, sectionOrder validity, and document language/direction enforcement.
 *
 * @param {unknown} input Input object.
 * @returns {object} Normalized CV data object.
 */
export function normalizeCVData(input) {
  const base = createEmptyCV();

  if (!input || typeof input !== 'object') {
    return base;
  }

  const raw = /** @type {Record<string, any>} */ (input);

  const document = {
    language: CV_DOCUMENT_LANGUAGE,
    direction: CV_DOCUMENT_DIRECTION,
  };

  const personalInfo = {
    ...base.personalInfo,
    ...(raw.personalInfo && typeof raw.personalInfo === 'object' ? raw.personalInfo : {}),
  };

  const rawDesign = raw.design && typeof raw.design === 'object' ? raw.design : {};

  const design = {
    ...base.design,
    ...rawDesign,
    templateId: typeof rawDesign.templateId === 'string' && rawDesign.templateId.trim() !== ''
      ? rawDesign.templateId
      : DEFAULT_TEMPLATE_ID,
    pageSize: SUPPORTED_PAGE_SIZES.includes(rawDesign.pageSize)
      ? rawDesign.pageSize
      : 'A4',
    density: SUPPORTED_DENSITIES.includes(rawDesign.density)
      ? rawDesign.density
      : 'balanced',
    showSectionDividers: typeof rawDesign.showSectionDividers === 'boolean'
      ? rawDesign.showSectionDividers
      : true,
    headingStyle: SUPPORTED_HEADING_STYLES.includes(rawDesign.headingStyle)
      ? rawDesign.headingStyle
      : 'standard',
  };

  const metadata = {
    ...base.metadata,
    ...(raw.metadata && typeof raw.metadata === 'object' ? raw.metadata : {}),
  };

  function normalizeList(arr, idPrefix) {
    if (!Array.isArray(arr)) return [];
    return arr.map((item) => {
      if (!item || typeof item !== 'object') return item;
      return {
        ...item,
        id: item.id && typeof item.id === 'string' && item.id.trim() !== ''
          ? item.id
          : generateId(idPrefix),
      };
    });
  }

  const experiences = normalizeList(raw.experiences, 'exp');
  const education = normalizeList(raw.education, 'edu');
  const skills = normalizeList(raw.skills, 'skill');
  const projects = normalizeList(raw.projects, 'proj');
  const certificates = normalizeList(raw.certificates, 'cert');
  const languages = normalizeList(raw.languages, 'lang');
  const customSections = normalizeList(raw.customSections, 'custom');

  // Normalize sectionOrder: unique values + append missing defaults
  let sectionOrder = Array.isArray(raw.sectionOrder)
    ? [...new Set(raw.sectionOrder)]
    : [...DEFAULT_SECTION_ORDER];

  DEFAULT_SECTION_ORDER.forEach((sec) => {
    if (!sectionOrder.includes(sec)) {
      sectionOrder.push(sec);
    }
  });

  const hiddenSections = Array.isArray(raw.hiddenSections)
    ? [...new Set(raw.hiddenSections)]
    : [];

  return {
    ...base,
    ...raw,
    id: typeof raw.id === 'string' && raw.id.trim() !== '' ? raw.id : base.id,
    title: typeof raw.title === 'string' && raw.title.trim() !== '' ? raw.title : base.title,
    schemaVersion: base.schemaVersion,

    document,
    personalInfo,
    summary: typeof raw.summary === 'string' ? raw.summary : base.summary,

    experiences,
    education,
    skills,
    projects,
    certificates,
    languages,
    customSections,

    sectionOrder,
    hiddenSections,

    design,
    metadata,
  };
}
