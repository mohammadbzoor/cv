import { describe, it, expect } from 'vitest';
import { mapStoreToForm } from '../features/create/utils/mapStoreToForm';
import { mapFormToStore } from '../features/create/utils/mapFormToStore';
import { createEmptyCV } from '../features/cv/models/cvFactories';

describe('Form Mapping Utilities', () => {
  it('mapStoreToForm converts store data into clean form state', () => {
    const cv = createEmptyCV({
      title: 'My Engineering CV',
      personalInfo: { fullName: 'John Doe', email: 'john@example.com' },
    });

    const formState = mapStoreToForm(cv);

    expect(formState.title).toBe('My Engineering CV');
    expect(formState.personalInfo.fullName).toBe('John Doe');
    expect(formState.document.language).toBe('en');
    expect(formState.document.direction).toBe('ltr');
  });

  it('mapFormToStore converts form values back into normalized store data preserving English LTR rules', () => {
    const formState = {
      title: 'Updated CV Title',
      personalInfo: { fullName: 'Jane Smith', email: 'jane@example.com' },
      experiences: [{ id: 'exp_1', company: 'Tech Corp' }],
    };

    const storeData = mapFormToStore(formState);

    expect(storeData.title).toBe('Updated CV Title');
    expect(storeData.personalInfo.fullName).toBe('Jane Smith');
    expect(storeData.document.language).toBe('en');
    expect(storeData.document.direction).toBe('ltr');
    expect(storeData.experiences).toHaveLength(1);
    expect(storeData.experiences[0].id).toBe('exp_1');
  });
});
