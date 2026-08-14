import { describe, it, expect } from 'vitest';
import {
  createExperience,
  createEducation,
  createSkill,
  createProject,
  createCertificate,
  createLanguage,
  createCustomSection,
  createEmptyCV,
} from '../features/cv/models/cvFactories';

describe('cvFactories', () => {
  it('creates item factories with unique IDs and defaults', () => {
    const exp = createExperience({ company: 'Acme' });
    const edu = createEducation({ institution: 'University' });
    const skill = createSkill({ name: 'JavaScript' });
    const proj = createProject({ name: 'Portfolio' });
    const cert = createCertificate({ name: 'AWS Certified' });
    const lang = createLanguage({ name: 'English' });
    const custom = createCustomSection({ title: 'Awards' });

    expect(exp.company).toBe('Acme');
    expect(edu.institution).toBe('University');
    expect(skill.name).toBe('JavaScript');
    expect(proj.name).toBe('Portfolio');
    expect(cert.name).toBe('AWS Certified');
    expect(lang.name).toBe('English');
    expect(custom.title).toBe('Awards');
  });

  it('createEmptyCV returns valid CV document structure with English LTR constraints', () => {
    const cv1 = createEmptyCV();
    const cv2 = createEmptyCV();

    expect(cv1.id).not.toBe(cv2.id);
    expect(cv1.document.language).toBe('en');
    expect(cv1.document.direction).toBe('ltr');
    expect(cv1.design.pageSize).toBe('A4');
    expect(Array.isArray(cv1.experiences)).toBe(true);
  });
});
