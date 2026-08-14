import { createEmptyCV } from './cvFactories';
import { DEFAULT_TEMPLATE_ID } from './cvConstants';

/**
 * Returns a fresh instance of the default Personal Info object.
 */
export function getDefaultPersonalInfo() {
  return {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photo: null,
  };
}

/**
 * Returns a fresh instance of the default Design Settings object.
 */
export function getDefaultDesignSettings() {
  return {
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
  };
}

/**
 * Factory function creating a fresh default CV Data object.
 *
 * @param {object} [overrides={}]
 * @returns {object} Fresh default CV Data object.
 */
export function createDefaultCVData(overrides = {}) {
  return createEmptyCV(overrides);
}
