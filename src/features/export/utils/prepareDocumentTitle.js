/**
 * Prepares the document title for the browser print dialog.
 * This title becomes the suggested filename when the user selects "Save as PDF".
 *
 * @param {string} documentName The sanitized document name from getPrintDocumentName.
 * @returns {string} The document title string.
 */
export function prepareDocumentTitle(documentName) {
  if (!documentName || typeof documentName !== 'string') {
    return 'cv-resume';
  }
  return documentName.trim() || 'cv-resume';
}
