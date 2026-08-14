import { z } from 'zod';
import {
  CURRENT_CV_SCHEMA_VERSION,
  CV_DOCUMENT_LANGUAGE,
  CV_DOCUMENT_DIRECTION,
  SUPPORTED_FONT_SIZES,
  SUPPORTED_LINE_HEIGHTS,
  SUPPORTED_PAGE_SIZES,
  SUPPORTED_MARGIN_SIZES,
} from './cvConstants';

// Helper for optional string fields accepting empty string or URL
const optionalUrlSchema = z.string().refine((val) => {
  if (!val || val.trim() === '') return true;
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
}, { message: 'INVALID_URL' });

// Helper for optional string fields accepting empty string or Email
const optionalEmailSchema = z.string().refine((val) => {
  if (!val || val.trim() === '') return true;
  return z.string().email().safeParse(val).success;
}, { message: 'INVALID_EMAIL' });

export const documentSchema = z.object({
  language: z.literal(CV_DOCUMENT_LANGUAGE),
  direction: z.literal(CV_DOCUMENT_DIRECTION),
});

export const personalInfoSchema = z.object({
  fullName: z.string().default(''),
  jobTitle: z.string().default(''),
  email: optionalEmailSchema.default(''),
  phone: z.string().default(''),
  location: z.string().default(''),
  website: optionalUrlSchema.default(''),
  linkedin: optionalUrlSchema.default(''),
  github: optionalUrlSchema.default(''),
  photo: z.string().nullable().default(null),
});

export const experienceSchema = z.object({
  id: z.string().min(1),
  company: z.string().default(''),
  position: z.string().default(''),
  location: z.string().default(''),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  isCurrent: z.boolean().default(false),
  description: z.string().default(''),
  achievements: z.array(z.string()).default([]),
});

export const educationSchema = z.object({
  id: z.string().min(1),
  institution: z.string().default(''),
  degree: z.string().default(''),
  field: z.string().default(''),
  location: z.string().default(''),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  description: z.string().default(''),
});

export const skillSchema = z.object({
  id: z.string().min(1),
  name: z.string().default(''),
  category: z.string().default(''),
  level: z.string().nullable().default(null),
});

export const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().default(''),
  description: z.string().default(''),
  technologies: z.array(z.string()).default([]),
  url: optionalUrlSchema.default(''),
  repositoryUrl: optionalUrlSchema.default(''),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
});

export const certificateSchema = z.object({
  id: z.string().min(1),
  name: z.string().default(''),
  issuer: z.string().default(''),
  issueDate: z.string().default(''),
  expiryDate: z.string().default(''),
  credentialId: z.string().default(''),
  credentialUrl: optionalUrlSchema.default(''),
});

export const languageSchema = z.object({
  id: z.string().min(1),
  name: z.string().default(''),
  proficiency: z.string().default('fluent'),
});

export const customSectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().default('Custom Section'),
  type: z.string().default('text'),
  items: z.array(z.any()).default([]),
});

export const designSettingsSchema = z.object({
  templateId: z.string().min(1).default('classic-ats'),
  primaryColor: z.string().default('#1e293b'),
  fontFamily: z.string().default('Inter'),
  fontSize: z.enum(SUPPORTED_FONT_SIZES).default('md'),
  lineHeight: z.enum(SUPPORTED_LINE_HEIGHTS).default('normal'),
  pageSize: z.enum(SUPPORTED_PAGE_SIZES).default('A4'),
  margins: z.enum(SUPPORTED_MARGIN_SIZES).default('normal'),
  sectionSpacing: z.string().default('normal'),
});

export const metadataSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  lastSavedAt: z.string().nullable().default(null),
});

export const cvSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).default('Untitled CV'),
  schemaVersion: z.number().int().positive().default(CURRENT_CV_SCHEMA_VERSION),

  document: documentSchema,
  personalInfo: personalInfoSchema,
  summary: z.string().default(''),

  experiences: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(skillSchema).default([]),
  projects: z.array(projectSchema).default([]),
  certificates: z.array(certificateSchema).default([]),
  languages: z.array(languageSchema).default([]),
  customSections: z.array(customSectionSchema).default([]),

  sectionOrder: z.array(z.string()).default([]),
  hiddenSections: z.array(z.string()).default([]),

  design: designSettingsSchema,
  metadata: metadataSchema,
});
