import { generateId } from '../../../utils/generateId';
import {
  CURRENT_CV_SCHEMA_VERSION,
  CV_DOCUMENT_LANGUAGE,
  CV_DOCUMENT_DIRECTION,
  DEFAULT_TEMPLATE_ID,
  DEFAULT_SECTION_ORDER,
} from './cvConstants';

/**
 * Creates a new Experience item object with default values.
 *
 * @param {Partial<import('../../../types').ExperienceItem>} [overrides={}]
 * @returns {object} Fresh Experience item object.
 */
export function createExperience(overrides = {}) {
  return {
    id: generateId('exp'),
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    achievements: [],
    ...overrides,
  };
}

/**
 * Creates a new Education item object with default values.
 *
 * @param {object} [overrides={}]
 * @returns {object} Fresh Education item object.
 */
export function createEducation(overrides = {}) {
  return {
    id: generateId('edu'),
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    ...overrides,
  };
}

/**
 * Creates a new Skill item object with default values.
 *
 * @param {object} [overrides={}]
 * @returns {object} Fresh Skill item object.
 */
export function createSkill(overrides = {}) {
  return {
    id: generateId('skill'),
    name: '',
    category: '',
    level: null,
    ...overrides,
  };
}

/**
 * Creates a new Project item object with default values.
 *
 * @param {object} [overrides={}]
 * @returns {object} Fresh Project item object.
 */
export function createProject(overrides = {}) {
  return {
    id: generateId('proj'),
    name: '',
    description: '',
    technologies: [],
    url: '',
    repositoryUrl: '',
    startDate: '',
    endDate: '',
    ...overrides,
  };
}

/**
 * Creates a new Certificate item object with default values.
 *
 * @param {object} [overrides={}]
 * @returns {object} Fresh Certificate item object.
 */
export function createCertificate(overrides = {}) {
  return {
    id: generateId('cert'),
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    ...overrides,
  };
}

/**
 * Creates a new Language item object with default values.
 *
 * @param {object} [overrides={}]
 * @returns {object} Fresh Language item object.
 */
export function createLanguage(overrides = {}) {
  return {
    id: generateId('lang'),
    name: '',
    proficiency: 'fluent',
    ...overrides,
  };
}

/**
 * Creates a new Custom Section object with default values.
 *
 * @param {object} [overrides={}]
 * @returns {object} Fresh Custom Section object.
 */
export function createCustomSection(overrides = {}) {
  return {
    id: generateId('custom'),
    title: 'Custom Section',
    type: 'text',
    items: [],
    ...overrides,
  };
}

/**
 * Creates a fresh, empty CV document data object with safe default values.
 *
 * @param {object} [overrides={}]
 * @returns {object} Fresh CV Document Data object.
 */
export function createEmptyCV(overrides = {}) {
  const now = new Date().toISOString();

  return {
    id: generateId('cv'),
    title: 'Untitled CV',
    schemaVersion: CURRENT_CV_SCHEMA_VERSION,

    document: {
      language: CV_DOCUMENT_LANGUAGE,
      direction: CV_DOCUMENT_DIRECTION,
    },

    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      photo: null,
    },

    summary: '',
    experiences: [],
    education: [],
    skills: [],
    projects: [],
    certificates: [],
    languages: [],
    customSections: [],

    sectionOrder: [...DEFAULT_SECTION_ORDER],
    hiddenSections: [],

    design: {
      templateId: DEFAULT_TEMPLATE_ID,
      primaryColor: '#1e293b',
      fontFamily: 'Inter',
      fontSize: 'md',
      lineHeight: 'normal',
      pageSize: 'A4',
      margins: 'normal',
      sectionSpacing: 'normal',
      density: 'balanced',
      showSectionDividers: true,
      headingStyle: 'standard',
    },

    metadata: {
      createdAt: now,
      updatedAt: now,
      lastSavedAt: null,
    },

    ...overrides,
  };
}
