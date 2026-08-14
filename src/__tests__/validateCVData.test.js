import { describe, it, expect } from 'vitest';
import { validateCVData, validateCVForExport } from '../features/cv/utils/validateCVData';
import { createEmptyCV } from '../features/cv/models/cvFactories';

describe('validateCVData & validateCVForExport', () => {
  it('validateCVData passes structural check on empty draft', () => {
    const cv = createEmptyCV();
    const result = validateCVData(cv);

    expect(result.success).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('validateCVForExport fails on incomplete empty draft missing name and content', () => {
    const cv = createEmptyCV();
    const result = validateCVForExport(cv);

    expect(result.success).toBe(false);
    expect(result.errors.some((e) => e.code === 'MISSING_REQUIRED_FIELD')).toBe(true);
  });

  it('validateCVForExport passes when minimum export requirements are met', () => {
    const cv = createEmptyCV({
      personalInfo: {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
      },
      summary: 'Experienced software engineer.',
    });

    const result = validateCVForExport(cv);

    expect(result.success).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
