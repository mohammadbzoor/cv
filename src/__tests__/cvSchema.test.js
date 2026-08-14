import { describe, it, expect } from 'vitest';
import { cvSchema } from '../features/cv/models/cvSchema';
import { createEmptyCV } from '../features/cv/models/cvFactories';

describe('cvSchema structural validation', () => {
  it('validates empty default CV object successfully', () => {
    const defaultCv = createEmptyCV();
    const result = cvSchema.safeParse(defaultCv);

    expect(result.success).toBe(true);
  });

  it('rejects document language other than en', () => {
    const invalidCv = createEmptyCV({
      document: { language: 'ar', direction: 'ltr' },
    });

    const result = cvSchema.safeParse(invalidCv);
    expect(result.success).toBe(false);
  });

  it('rejects document direction other than ltr', () => {
    const invalidCv = createEmptyCV({
      document: { language: 'en', direction: 'rtl' },
    });

    const result = cvSchema.safeParse(invalidCv);
    expect(result.success).toBe(false);
  });
});
