export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

/**
 * Validates file object against size, extension, and MIME type rules.
 *
 * @param {File} file Uploaded file object.
 * @returns {object} Structured validation result.
 */
export function validateFile(file) {
  const errors = [];

  if (!file || !(file instanceof File)) {
    return {
      success: false,
      errors: [{ code: 'FILE_REQUIRED', message: 'A valid file is required.' }],
    };
  }

  if (file.size === 0) {
    errors.push({ code: 'FILE_EMPTY', message: 'File is empty.' });
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    errors.push({ code: 'FILE_TOO_LARGE', message: 'File size exceeds 5 MB limit.' });
  }

  const name = file.name || '';
  const ext = name.slice(name.lastIndexOf('.')).toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    errors.push({
      code: 'FILE_EXTENSION_NOT_ALLOWED',
      message: `Extension '${ext}' is not allowed. Only .pdf and .docx are supported.`,
    });
  }

  if (file.type && !ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    // Only fail if extension also mismatched to allow desktop MIME anomalies
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      errors.push({
        code: 'FILE_TYPE_NOT_ALLOWED',
        message: `MIME type '${file.type}' is not supported.`,
      });
    }
  }

  if (name.includes('/') || name.includes('\\')) {
    errors.push({ code: 'FILE_NAME_INVALID', message: 'File name contains path characters.' });
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, file };
}
