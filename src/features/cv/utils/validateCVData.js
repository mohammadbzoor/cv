import { cvSchema } from '../models/cvSchema';

/**
 * Performs structural schema validation using Zod.
 * Ensures the CV object data tree adheres to required types and document rules.
 *
 * @param {unknown} data Input data object.
 * @returns {{ success: boolean, data?: object, errors: Array<{ path: string, code: string, message: string }> }}
 */
export function validateCVData(data) {
  const result = cvSchema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
      errors: [],
    };
  }

  const formattedErrors = result.error.issues.map((issue) => ({
    path: issue.path.join('.'),
    code: issue.code,
    message: issue.message,
  }));

  return {
    success: false,
    errors: formattedErrors,
  };
}

/**
 * Validates minimum required content completeness for exporting CV documents (PDF/ATS).
 *
 * @param {unknown} data CV Data object.
 * @returns {{ success: boolean, errors: Array<{ path: string, code: string, message: string }> }}
 */
export function validateCVForExport(data) {
  const structuralResult = validateCVData(data);
  const errors = [...structuralResult.errors];

  if (!structuralResult.success) {
    return {
      success: false,
      errors,
    };
  }

  const cv = structuralResult.data;

  if (!cv.personalInfo.fullName || cv.personalInfo.fullName.trim() === '') {
    errors.push({
      path: 'personalInfo.fullName',
      code: 'MISSING_REQUIRED_FIELD',
      message: 'Full name is required for document export.',
    });
  }

  const hasEmail = cv.personalInfo.email && cv.personalInfo.email.trim() !== '';
  const hasPhone = cv.personalInfo.phone && cv.personalInfo.phone.trim() !== '';
  if (!hasEmail && !hasPhone) {
    errors.push({
      path: 'personalInfo.contact',
      code: 'MISSING_CONTACT_INFO',
      message: 'At least one contact method (email or phone) is required for export.',
    });
  }

  const hasSummary = cv.summary && cv.summary.trim() !== '';
  const hasExperience = cv.experiences && cv.experiences.length > 0;
  const hasEducation = cv.education && cv.education.length > 0;

  if (!hasSummary && !hasExperience && !hasEducation) {
    errors.push({
      path: 'content',
      code: 'EMPTY_CV_CONTENT',
      message: 'CV must contain summary, experience, or education items for export.',
    });
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
