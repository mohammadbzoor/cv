/**
 * Shared Template Pure Helper Utilities.
 */

export function isSectionEmpty(cvData, sectionKey) {
  if (!cvData) return true;

  switch (sectionKey) {
    case 'summary':
      return !cvData.summary || cvData.summary.trim() === '';
    case 'experiences':
      return !Array.isArray(cvData.experiences) || cvData.experiences.length === 0;
    case 'education':
      return !Array.isArray(cvData.education) || cvData.education.length === 0;
    case 'skills':
      return !Array.isArray(cvData.skills) || cvData.skills.length === 0;
    case 'projects':
      return !Array.isArray(cvData.projects) || cvData.projects.length === 0;
    case 'certificates':
      return !Array.isArray(cvData.certificates) || cvData.certificates.length === 0;
    case 'languages':
      return !Array.isArray(cvData.languages) || cvData.languages.length === 0;
    default:
      return false;
  }
}

export function getOrderedVisibleSections(cvData) {
  if (!cvData) return [];
  const order = cvData.sectionOrder || [
    'summary',
    'experiences',
    'education',
    'skills',
    'projects',
    'certificates',
    'languages',
  ];
  const hidden = new Set(cvData.hiddenSections || []);

  return order.filter((sec) => !hidden.has(sec) && !isSectionEmpty(cvData, sec));
}

export function sanitizeContactHref(value, type = 'url') {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed === '') return null;

  if (type === 'email') {
    return trimmed.startsWith('mailto:') ? trimmed : `mailto:${trimmed}`;
  }

  if (type === 'phone') {
    return trimmed.startsWith('tel:') ? trimmed : `tel:${trimmed}`;
  }

  if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
    return trimmed;
  }

  return `https://${trimmed}`;
}
