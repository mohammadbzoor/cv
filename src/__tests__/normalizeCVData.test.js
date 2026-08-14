import { describe, it, expect } from 'vitest';
import { normalizeCVData } from '../features/cv/utils/normalizeCVData';

describe('normalizeCVData utility', () => {
  it('supplies defaults for null or empty inputs', () => {
    const normalized = normalizeCVData(null);

    expect(normalized).toBeDefined();
    expect(normalized.document.language).toBe('en');
    expect(normalized.document.direction).toBe('ltr');
    expect(normalized.design.pageSize).toBe('A4');
  });

  it('assigns missing IDs to list items', () => {
    const raw = {
      experiences: [{ company: 'Acme Corp' }],
    };

    const normalized = normalizeCVData(raw);

    expect(normalized.experiences[0].id).toBeDefined();
    expect(normalized.experiences[0].company).toBe('Acme Corp');
  });

  it('forces document language en and direction ltr regardless of raw input', () => {
    const raw = {
      document: { language: 'ar', direction: 'rtl' },
    };

    const normalized = normalizeCVData(raw);

    expect(normalized.document.language).toBe('en');
    expect(normalized.document.direction).toBe('ltr');
  });
});
