/**
 * Zustand Store Selectors for atomic component consumption.
 * Ensures stable object/array references to prevent React getSnapshot re-render loops.
 */

const EMPTY_ARRAY = Object.freeze([]);

export const selectCVData = (state) => state.cvData;
export const selectPersonalInfo = (state) => state.cvData?.personalInfo;
export const selectExperiences = (state) => state.cvData?.experiences || EMPTY_ARRAY;
export const selectEducation = (state) => state.cvData?.education || EMPTY_ARRAY;
export const selectSkills = (state) => state.cvData?.skills || EMPTY_ARRAY;
export const selectProjects = (state) => state.cvData?.projects || EMPTY_ARRAY;
export const selectCertificates = (state) => state.cvData?.certificates || EMPTY_ARRAY;
export const selectLanguages = (state) => state.cvData?.languages || EMPTY_ARRAY;
export const selectCustomSections = (state) => state.cvData?.customSections || EMPTY_ARRAY;
export const selectDesignSettings = (state) => state.cvData?.design;
export const selectTemplateId = (state) => state.cvData?.design?.templateId;
export const selectSectionOrder = (state) => state.cvData?.sectionOrder || EMPTY_ARRAY;
export const selectHiddenSections = (state) => state.cvData?.hiddenSections || EMPTY_ARRAY;

export const selectCVStatus = (state) => state.status;
export const selectStatus = selectCVStatus;
export const selectIsDirty = (state) => state.isDirty;
export const selectCanUndo = (state) => state.history.length > 0;
export const selectCanRedo = (state) => state.future.length > 0;
export const selectLastSavedAt = (state) => state.cvData?.metadata?.lastSavedAt;
export const selectLastError = (state) => state.lastError;

// Primitive Count Selectors
export const selectExperienceCount = (state) => state.cvData?.experiences?.length || 0;
export const selectEducationCount = (state) => state.cvData?.education?.length || 0;
export const selectSkillCount = (state) => state.cvData?.skills?.length || 0;
export const selectProjectCount = (state) => state.cvData?.projects?.length || 0;

export const selectCompletedSectionCount = (state) => {
  const cv = state.cvData;
  if (!cv) return 0;

  let completedSections = 0;
  if (cv.summary && cv.summary.trim() !== '') completedSections += 1;
  if (cv.experiences && cv.experiences.length > 0) completedSections += 1;
  if (cv.education && cv.education.length > 0) completedSections += 1;
  if (cv.skills && cv.skills.length > 0) completedSections += 1;
  if (cv.projects && cv.projects.length > 0) completedSections += 1;
  if (cv.certificates && cv.certificates.length > 0) completedSections += 1;
  if (cv.languages && cv.languages.length > 0) completedSections += 1;

  return completedSections;
};
