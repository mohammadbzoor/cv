/**
 * Intelligent Density Calculator for ATS Templates.
 * Automatically scales typography and spacing based on the content density of the CV.
 */

export function calculateSmartDensity(cvData, manualOverride = null) {
  // If the user explicitly sets a density that is not 'auto', respect it.
  if (manualOverride && manualOverride !== 'auto') {
    return getDensityTokens(manualOverride);
  }

  if (!cvData) return getDensityTokens('normal');

  const experiences = cvData.experiences || [];
  const projects = cvData.projects || [];
  const education = cvData.education || [];
  const certificates = cvData.certificates || [];

  // Calculate the total length of all descriptions
  const descriptionWeight = [...experiences, ...projects].reduce((sum, item) => {
    return sum + Math.round(String(item.description || '').length / 150);
  }, 0);

  // Total density score
  const densityScore =
    experiences.length +
    projects.length +
    education.length +
    certificates.length +
    descriptionWeight;

  let densityTier = 'normal';
  if (densityScore > 16) {
    densityTier = 'very-dense';
  } else if (densityScore > 10) {
    densityTier = 'dense';
  }

  return getDensityTokens(densityTier);
}

export function getDensityTokens(tier) {
  switch (tier) {
    case 'ultra-compact':
      return {
        '--base-font': '9.5px',
        '--line-height': '1.20',
        '--section-gap': '5px',
        '--item-gap': '2.5px',
      };
    case 'very-dense':
    case 'compact':
      return {
        '--base-font': '10px',
        '--line-height': '1.35',
        '--section-gap': '8px',
        '--item-gap': '4px',
      };
    case 'dense':
      return {
        '--base-font': '10.6px',
        '--line-height': '1.42',
        '--section-gap': '10px',
        '--item-gap': '5px',
      };
    case 'normal':
    case 'comfortable':
    default:
      return {
        '--base-font': '11.3px',
        '--line-height': '1.5',
        '--section-gap': '13px',
        '--item-gap': '7px',
      };
  }
}
