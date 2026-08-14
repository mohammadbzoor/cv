import { describe, it, expect } from 'vitest';
import { buildTemplateRecommendation } from '../utils/buildTemplateRecommendation';
import { createEmptyCV } from '../../../cv/models/cvFactories';
import { useCVStore } from '../../../cv/store/useCVStore';

describe('Smart Template Fit Recommendation Engine', () => {
  it('1. recommends Classic or Compact ATS for student / junior level with few experiences', () => {
    const cvData = createEmptyCV({
      experiences: [{ company: 'Internship Co', position: 'Junior Dev' }],
    });
    const rec = buildTemplateRecommendation({ careerLevel: 'student', targetRole: 'general' }, cvData);
    expect(['classic-ats', 'compact-ats']).toContain(rec.recommendedTemplateId);
  });

  it('2. recommends Technical Prime ATS or Developer Portfolio for software & tech roles', () => {
    const cvData = createEmptyCV({
      experiences: [
        { company: 'Tech Solutions', position: 'Senior Software Engineer' },
        { company: 'Cloud Inc', position: 'DevOps Lead' },
      ],
      projects: [{ name: 'React App' }, { name: 'Node Microservice' }],
      skills: [{ name: 'React' }, { name: 'JavaScript' }, { name: 'Node.js' }],
    });
    const rec = buildTemplateRecommendation({ careerLevel: 'senior', targetRole: 'software' }, cvData);
    expect(['technical-prime-ats', 'developer']).toContain(rec.recommendedTemplateId);
  });

  it('3. recommends Executive ATS for executive career level in management', () => {
    const cvData = createEmptyCV({
      experiences: [
        { company: 'Global Corp', position: 'VP of Engineering' },
        { company: 'Enterprise Inc', position: 'Director of Technology' },
      ],
    });
    const rec = buildTemplateRecommendation({ careerLevel: 'executive', targetRole: 'management' }, cvData);
    expect(rec.recommendedTemplateId).toBe('executive-ats');
  });

  it('4. recommendation is deterministic for identical inputs and CV data', () => {
    const cvData = createEmptyCV({ experiences: [{ company: 'Test Co' }] });
    const rec1 = buildTemplateRecommendation({ careerLevel: 'mid', targetRole: 'software' }, cvData);
    const rec2 = buildTemplateRecommendation({ careerLevel: 'mid', targetRole: 'software' }, cvData);

    expect(rec1.recommendedTemplateId).toBe(rec2.recommendedTemplateId);
    expect(rec1.score).toBe(rec2.score);
  });

  it('5. applying recommendation changes templateId only without altering CV content', () => {
    useCVStore.getState().resetCV();
    useCVStore.getState().updatePersonalInfo({ fullName: 'Alice Recommended' });
    useCVStore.getState().setTemplate('compact-ats');

    const rec = buildTemplateRecommendation({ targetRole: 'software' }, useCVStore.getState().cvData);
    useCVStore.getState().setTemplate(rec.recommendedTemplateId);

    const updated = useCVStore.getState().cvData;
    expect(updated.design.templateId).toBe(rec.recommendedTemplateId);
    expect(updated.personalInfo.fullName).toBe('Alice Recommended');
  });
});
