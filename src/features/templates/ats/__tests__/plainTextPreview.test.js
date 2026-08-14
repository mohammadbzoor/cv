import { describe, it, expect } from 'vitest';
import { generatePlainTextCV } from '../utils/generatePlainTextCV';
import { createEmptyCV } from '../../../cv/models/cvFactories';

describe('Plain Text Reading Preview Generator', () => {
  it('21. generates structured text ordered by sectionOrder', () => {
    const cvData = createEmptyCV({
      personalInfo: { fullName: 'Alex Morgan', jobTitle: 'Software Lead', email: 'alex@example.com' },
      summary: 'Experienced engineer in React and Node.',
      experiences: [{ id: '1', position: 'Lead Engineer', company: 'TechCorp', startDate: '2020', endDate: 'Present', isCurrent: true }],
      skills: [{ id: '1', name: 'React', category: 'UI' }],
      sectionOrder: ['summary', 'skills', 'experiences'],
    });

    const text = generatePlainTextCV(cvData);
    expect(text).toContain('ALEX MORGAN');
    expect(text).toContain('Software Lead');
    expect(text).toContain('alex@example.com');
    expect(text).toContain('=== PROFESSIONAL SUMMARY ===');
    expect(text).toContain('=== SKILLS ===');
    expect(text).toContain('=== WORK EXPERIENCE ===');

    const summaryIdx = text.indexOf('PROFESSIONAL SUMMARY');
    const skillsIdx = text.indexOf('SKILLS');
    const expIdx = text.indexOf('WORK EXPERIENCE');

    expect(summaryIdx).toBeLessThan(skillsIdx);
    expect(skillsIdx).toBeLessThan(expIdx);
  });

  it('22. omits hidden sections from plain text output', () => {
    const cvData = createEmptyCV({
      personalInfo: { fullName: 'Alex Morgan', email: 'alex@example.com' },
      summary: 'Hidden summary text',
      skills: [{ id: '1', name: 'React' }],
      hiddenSections: ['summary'],
    });

    const text = generatePlainTextCV(cvData);
    expect(text).not.toContain('PROFESSIONAL SUMMARY');
    expect(text).not.toContain('Hidden summary text');
    expect(text).toContain('SKILLS');
  });

  it('23. omits empty sections from plain text output', () => {
    const cvData = createEmptyCV({
      personalInfo: { fullName: 'Alex Morgan' },
      summary: '',
      experiences: [],
      skills: [{ id: '1', name: 'React' }],
    });

    const text = generatePlainTextCV(cvData);
    expect(text).not.toContain('WORK EXPERIENCE');
    expect(text).toContain('SKILLS');
  });

  it('24. formats contact information with pipe separators', () => {
    const cvData = createEmptyCV({
      personalInfo: {
        fullName: 'Alex Morgan',
        email: 'alex@example.com',
        phone: '+15550192834',
        location: 'San Francisco, CA',
      },
    });

    const text = generatePlainTextCV(cvData);
    expect(text).toContain('alex@example.com | +15550192834 | San Francisco, CA');
  });
});
