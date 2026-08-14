/**
 * Generates a safe, sanitized document name for the print/save-as-PDF workflow.
 *
 * Rules:
 * 1. Uses fullName if available, otherwise title, otherwise "cv-resume".
 * 2. Appends "-resume" suffix.
 * 3. Lowercased, spaces replaced with hyphens, unsafe chars stripped.
 * 4. Max length 80 characters.
 * 5. Never includes email, phone, or date.
 * 6. Does NOT append ".pdf" — browsers add the extension automatically
 *    when saving via Print > Save as PDF.
 *
 * @param {{ fullName?: string, title?: string }} options
 * @returns {string} Safe document name (e.g., "alex-johnson-resume")
 */
export function getPrintDocumentName({ fullName, title } = {}) {
  const MAX_LENGTH = 80;
  const SUFFIX = 'resume';

  let base;

  if (fullName && typeof fullName === 'string' && fullName.trim()) {
    base = fullName.trim();
  } else if (title && typeof title === 'string' && title.trim()) {
    base = title.trim();
  } else {
    base = 'cv';
  }

  // Sanitize: lowercase, replace spaces/underscores with hyphens, strip unsafe chars
  let sanitized = base
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');

  if (!sanitized) {
    sanitized = 'cv';
  }

  // Append suffix
  const result = `${sanitized}-${SUFFIX}`;

  // Truncate to max length
  return result.slice(0, MAX_LENGTH);
}
