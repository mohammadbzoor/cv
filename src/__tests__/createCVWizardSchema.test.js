import { describe, it, expect } from 'vitest';
import { createCVWizardSchema } from '../features/create/schemas/createCVWizardSchema';
import { createEmptyCV } from '../features/cv/models/cvFactories';

describe('createCVWizardSchema', () => {
  it('validates default empty CV state structurally', () => {
    const emptyCv = createEmptyCV();
    const result = createCVWizardSchema.safeParse(emptyCv);

    expect(result.success).toBe(true);
  });

  it('rejects experience entry where endDate is prior to startDate', () => {
    const cv = createEmptyCV({
      experiences: [
        {
          id: 'exp_1',
          company: 'Acme',
          position: 'Engineer',
          startDate: '2023-05',
          endDate: '2021-01',
          isCurrent: false,
        },
      ],
    });

    const result = createCVWizardSchema.safeParse(cv);

    expect(result.success).toBe(false);
  });

  it('allows current role with empty endDate', () => {
    const cv = createEmptyCV({
      experiences: [
        {
          id: 'exp_1',
          company: 'Acme',
          position: 'Engineer',
          startDate: '2023-05',
          endDate: '',
          isCurrent: true,
        },
      ],
    });

    const result = createCVWizardSchema.safeParse(cv);

    expect(result.success).toBe(true);
  });
});
