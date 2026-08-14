import { describe, it, expect } from 'vitest';
import { getPrintDocumentName } from '../utils/getPrintDocumentName';

describe('getPrintDocumentName', () => {
  it('generates a sanitized document name from fullName', () => {
    const result = getPrintDocumentName({ fullName: 'Alex Johnson' });
    expect(result).toBe('alex-johnson-resume');
  });

  it('falls back to title if fullName is missing', () => {
    const result = getPrintDocumentName({ title: 'Senior Software Engineer CV' });
    expect(result).toBe('senior-software-engineer-cv-resume');
  });

  it('falls back to cv-resume if both fullName and title are missing', () => {
    const result = getPrintDocumentName({});
    expect(result).toBe('cv-resume');
  });

  it('strips special characters and spaces safely', () => {
    const result = getPrintDocumentName({ fullName: 'John Doe! @#$%^&*()' });
    expect(result).toBe('john-doe-resume');
  });

  it('never appends .pdf extension to avoid double extensions', () => {
    const result = getPrintDocumentName({ fullName: 'Sarah Connor' });
    expect(result).not.toContain('.pdf');
  });

  it('truncates filename to maximum 80 characters', () => {
    const longName = 'A'.repeat(100);
    const result = getPrintDocumentName({ fullName: longName });
    expect(result.length).toBeLessThanOrEqual(80);
  });
});
