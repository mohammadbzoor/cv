import {
  Sparkles,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  CheckCircle2,
} from 'lucide-react';

/**
 * Centralized wizard step definitions.
 * Defines ordering, step IDs, translation keys, icons, and associated form field paths for step-by-step validation.
 */
export const WIZARD_STEPS = Object.freeze([
  {
    id: 'welcome',
    labelKey: 'create:steps.welcome.label',
    descriptionKey: 'create:steps.welcome.desc',
    icon: Sparkles,
    fields: [],
  },
  {
    id: 'personal',
    labelKey: 'create:steps.personal.label',
    descriptionKey: 'create:steps.personal.desc',
    icon: User,
    fields: [
      'personalInfo.fullName',
      'personalInfo.jobTitle',
      'personalInfo.email',
      'personalInfo.phone',
      'personalInfo.location',
      'personalInfo.website',
      'personalInfo.linkedin',
      'personalInfo.github',
    ],
  },
  {
    id: 'summary',
    labelKey: 'create:steps.summary.label',
    descriptionKey: 'create:steps.summary.desc',
    icon: FileText,
    fields: ['summary'],
  },
  {
    id: 'experience',
    labelKey: 'create:steps.experience.label',
    descriptionKey: 'create:steps.experience.desc',
    icon: Briefcase,
    fields: ['experiences'],
  },
  {
    id: 'education',
    labelKey: 'create:steps.education.label',
    descriptionKey: 'create:steps.education.desc',
    icon: GraduationCap,
    fields: ['education'],
  },
  {
    id: 'skills',
    labelKey: 'create:steps.skills.label',
    descriptionKey: 'create:steps.skills.desc',
    icon: Wrench,
    fields: ['skills'],
  },
  {
    id: 'projects',
    labelKey: 'create:steps.projects.label',
    descriptionKey: 'create:steps.projects.desc',
    icon: FolderGit2,
    fields: ['projects'],
  },
  {
    id: 'additional',
    labelKey: 'create:steps.additional.label',
    descriptionKey: 'create:steps.additional.desc',
    icon: Award,
    fields: ['certificates', 'languages'],
  },
  {
    id: 'review',
    labelKey: 'create:steps.review.label',
    descriptionKey: 'create:steps.review.desc',
    icon: CheckCircle2,
    fields: [],
  },
]);
