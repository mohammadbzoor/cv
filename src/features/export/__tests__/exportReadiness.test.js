import { describe, it, expect } from 'vitest';
import { validateCVForExport } from '../../cv/utils/validateCVData';

describe('exportReadiness validation', () => {
  it('fails export readiness when fullName is missing', () => {
    const invalidCv = {
      id: 'test-cv-1',
      title: 'My Resume',
      schemaVersion: 1,
      document: { language: 'en', direction: 'ltr' },
      personalInfo: { fullName: '', email: 'test@example.com' },
      summary: 'Experienced developer',
      experiences: [],
      education: [],
      skills: [],
      projects: [],
      certificates: [],
      languages: [],
      customSections: [],
      sectionOrder: ['summary'],
      hiddenSections: [],
      design: { templateId: 'classic-ats', pageSize: 'A4' },
      metadata: { createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' },
    };

    const result = validateCVForExport(invalidCv);
    expect(result.success).toBe(false);
    expect(result.errors.some((e) => e.path === 'personalInfo.fullName')).toBe(true);
  });

  it('fails export readiness when contact info (both email and phone) is missing', () => {
    const invalidCv = {
      id: 'test-cv-2',
      title: 'My Resume',
      schemaVersion: 1,
      document: { language: 'en', direction: 'ltr' },
      personalInfo: { fullName: 'Alex Smith', email: '', phone: '' },
      summary: 'Developer summary',
      experiences: [],
      education: [],
      skills: [],
      projects: [],
      certificates: [],
      languages: [],
      customSections: [],
      sectionOrder: ['summary'],
      hiddenSections: [],
      design: { templateId: 'classic-ats', pageSize: 'A4' },
      metadata: { createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' },
    };

    const result = validateCVForExport(invalidCv);
    expect(result.success).toBe(false);
    expect(result.errors.some((e) => e.path === 'personalInfo.contact')).toBe(true);
  });

  it('passes export readiness for a valid CV with name, contact, and content', () => {
    const validCv = {
      id: 'test-cv-3',
      title: 'My Resume',
      schemaVersion: 1,
      document: { language: 'en', direction: 'ltr' },
      personalInfo: { fullName: 'Alex Smith', email: 'alex@example.com' },
      summary: 'Senior Software Engineer with 5+ years experience.',
      experiences: [
        { id: 'exp-1', position: 'Developer', company: 'Tech Corp', startDate: '2020', endDate: 'Present', isCurrent: true, description: 'Built apps' }
      ],
      education: [],
      skills: [{ id: 'sk-1', name: 'React', category: 'Technical' }],
      projects: [],
      certificates: [],
      languages: [],
      customSections: [],
      sectionOrder: ['summary', 'experiences', 'skills'],
      hiddenSections: [],
      design: { templateId: 'classic-ats', pageSize: 'A4' },
      metadata: { createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' },
    };

    const result = validateCVForExport(validCv);
    expect(result.success).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
