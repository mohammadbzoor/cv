import { describe, it, expect } from 'vitest';
import { useCVStore } from '../features/cv/store/useCVStore';
import { createEmptyCV } from '../features/cv/models/cvFactories';

describe('Zustand Template Selection & Data Preservation', () => {
  it('updates templateId without mutating or resetting personalInfo, summary, or experiences', () => {
    const store = useCVStore.getState();
    const initialCv = createEmptyCV({
      title: 'My Custom Resume',
      personalInfo: { fullName: 'Alex Mercer', email: 'alex@example.com' },
      experiences: [{ company: 'Global Solutions' }],
    });

    store.replaceCVData(initialCv);

    expect(useCVStore.getState().cvData.design.templateId).toBe('classic-ats');

    // Change template to professional-ats
    store.setTemplate('professional-ats');

    const updatedCv = useCVStore.getState().cvData;
    expect(updatedCv.design.templateId).toBe('professional-ats');
    expect(updatedCv.personalInfo.fullName).toBe('Alex Mercer');
    expect(updatedCv.personalInfo.email).toBe('alex@example.com');
    expect(updatedCv.experiences).toHaveLength(1);
    expect(updatedCv.experiences[0].company).toBe('Global Solutions');
    expect(useCVStore.getState().isDirty).toBe(true);
  });
});
