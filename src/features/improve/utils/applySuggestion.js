import { updateByPath } from '../../cv/utils/updateByPath';

const FORBIDDEN_PATHS = new Set(['schemaVersion', 'document.language', 'document.direction', 'metadata.createdAt']);

/**
 * Pure Utility applying a single suggestion item to CV data.
 *
 * @param {object} cvData Complete CV data object.
 * @param {object} suggestion Suggestion item object ({ fieldPath, originalValue, suggestedValue, type }).
 * @returns {object} { success: boolean, data?: object, error?: object }
 */
export function applySuggestion(cvData, suggestion) {
  if (!cvData || typeof cvData !== 'object') {
    return {
      success: false,
      error: { code: 'INVALID_INPUT', message: 'CV data is invalid.' },
    };
  }

  if (!suggestion || !suggestion.fieldPath) {
    return {
      success: false,
      error: { code: 'INVALID_FIELD_PATH', message: 'Suggestion field path is missing.' },
    };
  }

  const { fieldPath, originalValue, suggestedValue } = suggestion;

  if (FORBIDDEN_PATHS.has(fieldPath)) {
    return {
      success: false,
      error: { code: 'FORBIDDEN_FIELD_PATH', message: `Field path '${fieldPath}' is forbidden.` },
    };
  }

  // Resolve current value at fieldPath
  const parts = fieldPath.split('.');
  let current = cvData;
  for (const p of parts) {
    if (current && typeof current === 'object' && p in current) {
      current = current[p];
    } else {
      current = undefined;
      break;
    }
  }

  if (current !== undefined && typeof current === 'string' && current.trim() !== (originalValue || '').trim()) {
    return {
      success: false,
      error: {
        code: 'ORIGINAL_VALUE_MISMATCH',
        path: fieldPath,
        message: 'Original text has been modified since suggestion generation.',
      },
    };
  }

  if (current === suggestedValue) {
    return {
      success: false,
      error: { code: 'NO_CHANGE', path: fieldPath, message: 'Current value already matches suggestion.' },
    };
  }

  const updatedData = updateByPath(cvData, fieldPath, suggestedValue);

  return {
    success: true,
    data: updatedData,
  };
}
