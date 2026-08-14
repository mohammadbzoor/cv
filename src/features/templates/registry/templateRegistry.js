import { TEMPLATES_METADATA } from './templateMetadata';
import { DEFAULT_TEMPLATE_ID, TEMPLATE_CATEGORIES } from '../constants/templateConstants';

const templateMap = new Map(TEMPLATES_METADATA.map((item) => [item.id, item]));

/**
 * Returns template definition by ID with safe fallback to DEFAULT_TEMPLATE_ID.
 *
 * @param {string} id Template identifier.
 * @returns {object} Template definition object.
 */
export function getTemplateById(id) {
  if (id && templateMap.has(id)) {
    return templateMap.get(id);
  }
  return templateMap.get(DEFAULT_TEMPLATE_ID);
}

/**
 * Returns default template definition.
 */
export function getDefaultTemplate() {
  return templateMap.get(DEFAULT_TEMPLATE_ID);
}

/**
 * Returns list of all available template definitions.
 */
export function getAvailableTemplates() {
  return TEMPLATES_METADATA.filter((t) => t.isAvailable);
}

/**
 * Returns template definitions filtered by category.
 */
export function getTemplatesByCategory(category) {
  if (!category || category === TEMPLATE_CATEGORIES.ALL) {
    return getAvailableTemplates();
  }
  return getAvailableTemplates().filter((t) => t.category === category);
}

export function isTemplateAvailable(id) {
  const item = templateMap.get(id);
  return Boolean(item && item.isAvailable);
}

export const templateRegistry = Object.freeze({
  templates: TEMPLATES_METADATA,
  templateMap,
  getTemplateById,
  getDefaultTemplate,
  getAvailableTemplates,
  getTemplatesByCategory,
  isTemplateAvailable,
});
