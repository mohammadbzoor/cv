import { describe, it, expect } from 'vitest';
import { getTemplateDecisionReasons } from '../utils/getTemplateDecisionReasons';

describe('Template Decision Matrix & Comparison', () => {
  it('10. returns qualitative decision criteria without fake percentage claims', () => {
    const matrix = getTemplateDecisionReasons('technical-prime-ats');
    expect(matrix.parsingSimplicity).toBe('high');
    expect(matrix.readingOrderComplexity).toBe('simple');
    expect(Array.isArray(matrix.bestRoleFamilies)).toBe(true);
    expect(matrix.bestRoleFamilies).toContain('software');
  });

  it('11. returns qualitative decision criteria for compact template', () => {
    const matrix = getTemplateDecisionReasons('compact-ats');
    expect(matrix.onePageSuitability).toBe('high');
    expect(matrix.visualDensity).toBe('high');
  });

  it('12. fallback for unknown template ID returns technical-prime-ats matrix', () => {
    const matrix = getTemplateDecisionReasons('unknown-template-xyz');
    expect(matrix).toBeDefined();
    expect(matrix.parsingSimplicity).toBe('high');
  });
});
