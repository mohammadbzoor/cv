/**
 * Zustand Store Selectors for atomic component consumption.
 */

export const selectCVData = (state) => state.cvData;
export const selectPersonalInfo = (state) => state.cvData?.personalInfo;
export const selectExperiences = (state) => state.cvData?.experiences || [];
export const selectEducation = (state) => state.cvData?.education || [];
export const selectSkills = (state) => state.cvData?.skills || [];
export const selectProjects = (state) => state.cvData?.projects || [];
export const selectCertificates = (state) => state.cvData?.certificates || [];
export const selectLanguages = (state) => state.cvData?.languages || [];
export const selectCustomSections = (state) => state.cvData?.customSections || [];
export const selectDesignSettings = (state) => state.cvData?.design;
export const selectTemplateId = (state) => state.cvData?.design?.templateId;
export const selectSectionOrder = (state) => state.cvData?.sectionOrder || [];
export const selectHiddenSections = (state) => state.cvData?.hiddenSections || [];

export const selectCVStatus = (state) => state.status;
export const selectIsDirty = (state) => state.isDirty;
export const selectCanUndo = (state) => state.history.length > 0;
export const selectCanRedo = (state) => state.future.length > 0;
export const selectLastSavedAt = (state) => state.cvData?.metadata?.lastSavedAt;
export const selectLastError = (state) => state.lastError;

/**
 * Returns visible sections (ordered sections excluding hidden ones).
 */
export const selectVisibleSections = (state) => {
  const order = state.cvData?.sectionOrder || [];
  const hidden = new Set(state.cvData?.hiddenSections || []);
  return order.filter((sec) => !hidden.has(sec));
};

/**
 * Returns summary metrics about the CV content.
 */
export const selectCVSummaryStats = (state) => {
  const cv = state.cvData;
  if (!cv) {
    return {
      experienceCount: 0,
      educationCount: 0,
      skillCount: 0,
      projectCount: 0,
      completedSectionCount: 0,
    };
  }

  let completedSections = 0;
  if (cv.summary && cv.summary.trim() !== '') completedSections += 1;
  if (cv.experiences && cv.experiences.length > 0) completedSections += 1;
  if (cv.education && cv.education.length > 0) completedSections += 1;
  if (cv.skills && cv.skills.length > 0) completedSections += 1;
  if (cv.projects && cv.projects.length > 0) completedSections += 1;
  if (cv.certificates && cv.certificates.length > 0) completedSections += 1;
  if (cv.languages && cv.languages.length > 0) completedSections += 1;

  return {
    experienceCount: cv.experiences?.length || 0,
    educationCount: cv.education?.length || 0,
    skillCount: cv.skills?.length || 0,
    projectCount: cv.projects?.length || 0,
    completedSectionCount: completedSections,
  };
};
