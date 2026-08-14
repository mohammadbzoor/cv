/**
 * Validates structural completeness of a Template definition object.
 *
 * @param {object} template Template definition.
 * @returns {boolean} True if valid.
 */
export function validateTemplateDefinition(template) {
  if (!template || typeof template !== 'object') return false;
  if (!template.id || typeof template.id !== 'string') return false;
  if (!template.nameKey || typeof template.nameKey !== 'string') return false;
  if (typeof template.component !== 'function') return false;
  return true;
}
