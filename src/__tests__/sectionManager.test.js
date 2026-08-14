import { describe, it, expect } from 'vitest';
import { getSectionLabel } from '../features/builder/utils/getSectionLabel';

describe('Section Manager Utilities', () => {
  it('returns readable section labels', () => {
    expect(getSectionLabel('personalInfo')).toBe('Personal Information');
    expect(getSectionLabel('experiences')).toBe('Work Experience');
    expect(getSectionLabel('education')).toBe('Education');
    expect(getSectionLabel('skills')).toBe('Skills');
  });

  it('handles section reordering indices safely', () => {
    const order = ['summary', 'experiences', 'education'];
    // Move index 1 (experiences) up (-1)
    const index = 1;
    const targetIndex = index - 1;
    const updated = [...order];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    expect(updated).toEqual(['experiences', 'summary', 'education']);
  });
});
