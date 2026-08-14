import { z } from 'zod';
import {
  cvSchema,
  experienceSchema,
  educationSchema,
  projectSchema,
  certificateSchema,
} from '../../cv/models/cvSchema';

/**
 * Helper refinement function to check if endDate is not before startDate (YYYY-MM format).
 */
function isValidDateRange(startDate, endDate) {
  if (!startDate || !endDate || startDate.trim() === '' || endDate.trim() === '') {
    return true;
  }
  return endDate >= startDate;
}

const wizardExperienceSchema = experienceSchema.refine(
  (data) => data.isCurrent || isValidDateRange(data.startDate, data.endDate),
  {
    message: 'create:validation.endDateBeforeStartDate',
    path: ['endDate'],
  }
);

const wizardEducationSchema = educationSchema.refine(
  (data) => isValidDateRange(data.startDate, data.endDate),
  {
    message: 'create:validation.endDateBeforeStartDate',
    path: ['endDate'],
  }
);

const wizardProjectSchema = projectSchema.refine(
  (data) => isValidDateRange(data.startDate, data.endDate),
  {
    message: 'create:validation.endDateBeforeStartDate',
    path: ['endDate'],
  }
);

const wizardCertificateSchema = certificateSchema.refine(
  (data) => isValidDateRange(data.issueDate, data.expiryDate),
  {
    message: 'create:validation.expiryBeforeIssueDate',
    path: ['expiryDate'],
  }
);

/**
 * Extended Zod Schema for Create CV Wizard form state.
 */
export const createCVWizardSchema = cvSchema.extend({
  experiences: z.array(wizardExperienceSchema),
  education: z.array(wizardEducationSchema),
  projects: z.array(wizardProjectSchema),
  certificates: z.array(wizardCertificateSchema),
});
