/**
 * Evaluates design settings for potential contrast or readability risks.
 *
 * @param {object} design
 * @returns {string[]}
 */
export function evaluateSafeCustomization(design = {}) {
  const warnings = [];

  const color = design.primaryColor || '#1e293b';
  // Simple luminosity check for light colors on white paper
  if (color.toLowerCase().startsWith('#f') || color.toLowerCase().startsWith('#e') || color.toLowerCase() === '#ffffff') {
    warnings.push('lightColorWarning');
  }

  if (design.density === 'compact' && design.fontSize === 'sm') {
    warnings.push('compactSmallFontWarning');
  }

  if (design.showSectionDividers === false && design.headingStyle === 'understated') {
    warnings.push('hiddenDividersWeakHeadingsWarning');
  }

  return warnings;
}
