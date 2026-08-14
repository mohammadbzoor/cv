/**
 * Validates the print environment before attempting window.print().
 *
 * @returns {{ valid: boolean, error?: { code: string, message: string } }}
 */
export function validatePrintEnvironment() {
  if (typeof window === 'undefined' || typeof window.print !== 'function') {
    return {
      valid: false,
      error: {
        code: 'PRINT_NOT_SUPPORTED',
        message: 'Browser print API is not available in this environment.',
      },
    };
  }

  const cvDocument = document.querySelector('[data-cv-document]');
  if (!cvDocument) {
    return {
      valid: false,
      error: {
        code: 'CV_DOCUMENT_NOT_FOUND',
        message: 'CV document element was not found in the current page.',
      },
    };
  }

  return { valid: true };
}
