import { describe, it, expect } from 'vitest';
import { runATSStructureCheck } from '../checks/runATSStructureCheck';
import { getTemplateById } from '../../registry/templateRegistry';
import { createEmptyCV } from '../../../cv/models/cvFactories';

describe('ATS Structure Check System', () => {
  it('16. returns a score between 0 and 100', () => {
    const cvData = createEmptyCV({
      personalInfo: { fullName: 'Alex Morgan', email: 'alex@example.com', phone: '+15550192834' },
    });
    const tpl = getTemplateById('technical-prime-ats');
    const result = runATSStructureCheck(cvData, tpl);

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(Array.isArray(result.passed)).toBe(true);
    expect(Array.isArray(result.warnings)).toBe(true);
    expect(Array.isArray(result.failed)).toBe(true);
  });

  it('17. passes single column check for ATS templates', () => {
    const cvData = createEmptyCV({
      personalInfo: { fullName: 'Alex Morgan', email: 'alex@example.com' },
    });
    const tpl = getTemplateById('technical-prime-ats');
    const result = runATSStructureCheck(cvData, tpl);

    const singleColPass = result.passed.some((c) => c.id === 'SINGLE_COLUMN');
    expect(singleColPass).toBe(true);
  });

  it('18. generates warning when photo is present', () => {
    const cvData = createEmptyCV({
      personalInfo: { fullName: 'Alex Morgan', email: 'alex@example.com', photo: 'data:image/png;base64,123' },
    });
    const tpl = getTemplateById('technical-prime-ats');
    const result = runATSStructureCheck(cvData, tpl);

    const photoWarn = result.warnings.some((c) => c.id === 'NO_PROFILE_PHOTO');
    expect(photoWarn).toBe(true);
  });

  it('19. generates failure when contact info is missing', () => {
    const cvData = createEmptyCV({
      personalInfo: { fullName: '', email: '', phone: '' },
    });
    const tpl = getTemplateById('technical-prime-ats');
    const result = runATSStructureCheck(cvData, tpl);

    const contactFail = result.failed.some((c) => c.id === 'CONTACT_IN_BODY');
    expect(contactFail).toBe(true);
  });

  it('20. generates warning for visually enhanced developer template', () => {
    const cvData = createEmptyCV({
      personalInfo: { fullName: 'Alex Morgan', email: 'alex@example.com' },
    });
    const tpl = getTemplateById('developer');
    const result = runATSStructureCheck(cvData, tpl);

    const singleColWarn = result.warnings.some((c) => c.id === 'SINGLE_COLUMN');
    expect(singleColWarn).toBe(true);
  });
});
