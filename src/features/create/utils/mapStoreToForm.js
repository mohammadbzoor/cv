import { normalizeCVData } from '../../cv/utils/normalizeCVData';

/**
 * Transforms Zustand Store cvData state into React Hook Form initial values.
 *
 * @param {object} cvData CV data from Zustand store.
 * @returns {object} Form default values object.
 */
export function mapStoreToForm(cvData) {
  const normalized = normalizeCVData(cvData);

  return {
    id: normalized.id,
    title: normalized.title,
    schemaVersion: normalized.schemaVersion,
    document: {
      language: 'en',
      direction: 'ltr',
    },
    personalInfo: {
      fullName: normalized.personalInfo?.fullName || '',
      jobTitle: normalized.personalInfo?.jobTitle || '',
      email: normalized.personalInfo?.email || '',
      phone: normalized.personalInfo?.phone || '',
      location: normalized.personalInfo?.location || '',
      website: normalized.personalInfo?.website || '',
      linkedin: normalized.personalInfo?.linkedin || '',
      github: normalized.personalInfo?.github || '',
      photo: normalized.personalInfo?.photo || null,
    },
    summary: normalized.summary || '',
    experiences: normalized.experiences || [],
    education: normalized.education || [],
    skills: normalized.skills || [],
    projects: normalized.projects || [],
    certificates: normalized.certificates || [],
    languages: normalized.languages || [],
    customSections: normalized.customSections || [],
    sectionOrder: normalized.sectionOrder || [],
    hiddenSections: normalized.hiddenSections || [],
    design: {
      ...normalized.design,
      pageSize: 'A4',
    },
    metadata: {
      ...normalized.metadata,
    },
  };
}
