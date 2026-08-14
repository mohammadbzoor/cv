import { TEMPLATE_CATEGORIES } from '../constants/templateConstants';

/**
 * Pure function filtering template list by selected category.
 *
 * @param {Array} templates Array of template metadata definitions.
 * @param {string} category Selected category key ('all' | 'ats' | 'specialized').
 * @returns {Array} Filtered array of template objects.
 */
export function filterTemplates(templates = [], category = TEMPLATE_CATEGORIES.ALL) {
  if (!Array.isArray(templates)) return [];
  if (!category || category === TEMPLATE_CATEGORIES.ALL) {
    return templates;
  }
  return templates.filter((t) => t.category === category);
}
