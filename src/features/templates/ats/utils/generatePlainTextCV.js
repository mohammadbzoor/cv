/**
 * Transforms CV data into structured plain text ordered by sectionOrder.
 * Omits empty or hidden sections.
 *
 * @param {object} cvData
 * @returns {string}
 */
export function generatePlainTextCV(cvData) {
  if (!cvData) return '';

  const lines = [];
  const personal = cvData.personalInfo || {};
  const sectionOrder = cvData.sectionOrder || [
    'summary',
    'experiences',
    'education',
    'skills',
    'projects',
    'certificates',
    'languages',
  ];
  const hidden = new Set(cvData.hiddenSections || []);

  // Header Contact
  if (personal.fullName) lines.push(personal.fullName.toUpperCase());
  if (personal.jobTitle) lines.push(personal.jobTitle);

  const contactParts = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.github,
    personal.website,
  ].filter(Boolean);

  if (contactParts.length > 0) {
    lines.push(contactParts.join(' | '));
  }

  lines.push('');

  sectionOrder.forEach((sec) => {
    if (hidden.has(sec)) return;

    if (sec === 'summary' && cvData.summary?.trim()) {
      lines.push('=== PROFESSIONAL SUMMARY ===');
      lines.push(cvData.summary.trim());
      lines.push('');
    }

    if (sec === 'skills' && Array.isArray(cvData.skills) && cvData.skills.length > 0) {
      lines.push('=== SKILLS ===');
      const skillNames = cvData.skills.map((s) => s.name).filter(Boolean);
      if (skillNames.length > 0) {
        lines.push(skillNames.join(', '));
        lines.push('');
      }
    }

    if (sec === 'experiences' && Array.isArray(cvData.experiences) && cvData.experiences.length > 0) {
      lines.push('=== WORK EXPERIENCE ===');
      cvData.experiences.forEach((exp) => {
        const titleLine = [exp.position, exp.company].filter(Boolean).join(' - ');
        const dateLine = [exp.startDate, exp.isCurrent ? 'Present' : exp.endDate].filter(Boolean).join(' to ');
        if (titleLine) lines.push(`${titleLine} (${dateLine})`);
        if (exp.location) lines.push(`Location: ${exp.location}`);
        if (exp.description) lines.push(exp.description);
        if (Array.isArray(exp.achievements) && exp.achievements.length > 0) {
          exp.achievements.forEach((ach) => lines.push(`* ${ach}`));
        }
        lines.push('');
      });
    }

    if (sec === 'projects' && Array.isArray(cvData.projects) && cvData.projects.length > 0) {
      lines.push('=== PROJECTS ===');
      cvData.projects.forEach((proj) => {
        if (proj.name) lines.push(proj.name);
        if (proj.description) lines.push(proj.description);
        if (Array.isArray(proj.technologies) && proj.technologies.length > 0) {
          lines.push(`Technologies: ${proj.technologies.join(', ')}`);
        }
        if (proj.url || proj.repositoryUrl) lines.push(`Link: ${proj.url || proj.repositoryUrl}`);
        lines.push('');
      });
    }

    if (sec === 'education' && Array.isArray(cvData.education) && cvData.education.length > 0) {
      lines.push('=== EDUCATION ===');
      cvData.education.forEach((edu) => {
        const degreeLine = [edu.degree, edu.field ? `in ${edu.field}` : null, edu.institution].filter(Boolean).join(' ');
        const dateLine = [edu.startDate, edu.endDate].filter(Boolean).join(' - ');
        lines.push(`${degreeLine} (${dateLine})`);
        if (edu.description) lines.push(edu.description);
        lines.push('');
      });
    }

    if (sec === 'certificates' && Array.isArray(cvData.certificates) && cvData.certificates.length > 0) {
      lines.push('=== CERTIFICATIONS ===');
      cvData.certificates.forEach((cert) => {
        lines.push(`* ${cert.name} - ${cert.issuer || ''} (${cert.issueDate || ''})`);
      });
      lines.push('');
    }

    if (sec === 'languages' && Array.isArray(cvData.languages) && cvData.languages.length > 0) {
      lines.push('=== LANGUAGES ===');
      const langs = cvData.languages.map((l) => `${l.name} (${l.proficiency})`).join(', ');
      lines.push(langs);
      lines.push('');
    }
  });

  return lines.join('\n').trim();
}
