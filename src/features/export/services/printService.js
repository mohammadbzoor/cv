/**
 * Print Service for CV Platform.
 * Orchestrates the Browser Print API workflow for PDF export.
 *
 * Responsibilities:
 * 1. Validate print environment (window.print, [data-cv-document]).
 * 2. Temporarily change document.title for PDF filename suggestion.
 * 3. Add printing class to body for any additional CSS hooks.
 * 4. Invoke window.print().
 * 5. Clean up: restore title, remove class.
 *
 * Does NOT:
 * - Open popups or iframes.
 * - Make network requests.
 * - Store data in URL or console.
 * - Use html2canvas, jsPDF, or external PDF libraries.
 *
 * @param {{ documentTitle: string, onBeforePrint?: () => void, onAfterPrint?: () => void }} options
 * @returns {{ success: boolean, error?: { code: string, message: string } }}
 */
export function printCV({ documentTitle, onBeforePrint, onAfterPrint } = {}) {
  // 1. Validate environment
  if (typeof window === 'undefined' || typeof window.print !== 'function') {
    return {
      success: false,
      error: {
        code: 'PRINT_NOT_SUPPORTED',
        message: 'Browser print API is not available in this environment.',
      },
    };
  }

  const cvDocument = document.querySelector('[data-cv-document]');
  if (!cvDocument) {
    return {
      success: false,
      error: {
        code: 'CV_DOCUMENT_NOT_FOUND',
        message: 'CV document element was not found on the page.',
      },
    };
  }

  // 2. Save current document title
  const originalTitle = document.title;

  // 3. Set temporary title (becomes suggested PDF filename)
  if (documentTitle && typeof documentTitle === 'string') {
    document.title = documentTitle;
  }

  // 4. Add printing state class
  document.body.classList.add('cv-printing');

  // 5. Execute callbacks
  try {
    onBeforePrint?.();
  } catch {
    // Non-critical: proceed with print even if callback fails
  }

  // 6. Register afterprint cleanup handler
  function cleanup() {
    document.title = originalTitle;
    document.body.classList.remove('cv-printing');
    try {
      onAfterPrint?.();
    } catch {
      // Non-critical
    }
    window.removeEventListener('afterprint', cleanup);
  }

  window.addEventListener('afterprint', cleanup);

  // 7. Trigger print dialog
  try {
    window.print();
  } catch {
    // If print throws, clean up immediately
    cleanup();
    return {
      success: false,
      error: {
        code: 'PRINT_FAILED',
        message: 'An unexpected error occurred while opening the print dialog.',
      },
    };
  }

  // 8. Fallback cleanup with timeout in case afterprint doesn't fire
  // Some browsers may not reliably fire afterprint
  setTimeout(() => {
    if (document.body.classList.contains('cv-printing')) {
      cleanup();
    }
  }, 5000);

  return { success: true };
}
