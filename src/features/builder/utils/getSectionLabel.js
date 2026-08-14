/**
 * Maps section key to readable title label.
 *
 * @param {string} sectionKey Section identifier.
 * @returns {string} Section display title.
 */
export function getSectionLabel(sectionKey) {
  switch (sectionKey) {
    case 'personalInfo':
      return 'Personal Information';
    case 'summary':
      return 'Professional Summary';
    case 'experiences':
      return 'Work Experience';
    case 'education':
      return 'Education';
    case 'skills':
      return 'Skills';
    case 'projects':
      return 'Projects';
    case 'certificates':
      return 'Certificates';
    case 'languages':
      return 'Languages';
    default:
      return sectionKey ? sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1) : 'Section';
  }
}
