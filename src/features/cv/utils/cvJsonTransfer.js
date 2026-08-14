import { normalizeCVData } from './normalizeCVData';
import { validateCVData } from './validateCVData';

/**
 * Serializes CV data object into formatted JSON string.
 *
 * @param {object} cvData CV data object.
 * @returns {string} Formatted JSON string.
 */
export function serializeCVData(cvData) {
  const normalized = normalizeCVData(cvData);
  return JSON.stringify(normalized, null, 2);
}

/**
 * Parses and validates raw JSON input string into normalized CV data object.
 *
 * @param {string} jsonString Raw JSON text string.
 * @returns {{ success: boolean, data?: object, errors: Array<{ path: string, code: string, message: string }> }}
 */
export function parseCVDataJSON(jsonString) {
  if (typeof jsonString !== 'string' || !jsonString.trim()) {
    return {
      success: false,
      errors: [{ path: 'json', code: 'EMPTY_INPUT', message: 'Input text is empty.' }],
    };
  }

  let parsedRaw;
  try {
    parsedRaw = JSON.parse(jsonString);
  } catch (err) {
    return {
      success: false,
      errors: [
        {
          path: 'json',
          code: 'INVALID_JSON_SYNTAX',
          message: err instanceof Error ? err.message : 'Invalid JSON syntax.',
        },
      ],
    };
  }

  const normalized = normalizeCVData(parsedRaw);
  const validation = validateCVData(normalized);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  return {
    success: true,
    data: validation.data,
    errors: [],
  };
}

/**
 * Triggers client-side browser download of CV data as a .json file.
 * Sanitizes filename to prevent malicious or invalid path characters.
 *
 * @param {object} cvData CV data object.
 */
export function downloadCVDataJSON(cvData) {
  const normalized = normalizeCVData(cvData);
  const jsonString = serializeCVData(normalized);

  const rawTitle = normalized.title || 'cv_draft';
  const sanitizedTitle = rawTitle
    .toLowerCase()
    .replace(/[^a-z0-9_-]/gi, '_')
    .replace(/_+/g, '_')
    .substring(0, 50);

  const filename = `${sanitizedTitle || 'cv_draft'}.json`;

  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();

  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
