/**
 * Evaluates plain text reading order diagnostics and structural anomalies.
 *
 * @param {object} cvData
 * @returns {Array<{ type: string, id: string, title: string, desc: string }>}
 */
export function runReadingOrderDiagnostics(cvData = {}) {
  const diagnostics = [];

  const personal = cvData?.personalInfo || {};
  const hasContact = Boolean(personal.email || personal.phone);

  if (!hasContact) {
    diagnostics.push({
      type: 'warning',
      id: 'missingContact',
      title: 'Missing Contact Information',
      desc: 'Email or phone number is missing from the primary header flow.',
    });
  }

  const hidden = new Set(cvData?.hiddenSections || []);
  if (hidden.has('summary') && cvData?.summary?.trim()) {
    diagnostics.push({
      type: 'info',
      id: 'hiddenSummaryData',
      title: 'Hidden Section Contains Data',
      desc: 'Summary section has content but is currently hidden from rendering.',
    });
  }

  // Check for duplicate heading names in section order
  const order = cvData?.sectionOrder || [];
  const seen = new Set();
  order.forEach((sec) => {
    if (seen.has(sec)) {
      diagnostics.push({
        type: 'warning',
        id: 'duplicateHeading',
        title: 'Duplicate Section Heading',
        desc: `Section key "${sec}" appears multiple times in section order.`,
      });
    }
    seen.add(sec);
  });

  return diagnostics;
}
