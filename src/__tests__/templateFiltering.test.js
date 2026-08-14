import { describe, it, expect } from 'vitest';
import { filterTemplates } from '../features/templates/utils/filterTemplates';
import { TEMPLATE_CATEGORIES } from '../features/templates/constants/templateConstants';
import { TEMPLATES_METADATA } from '../features/templates/registry/templateMetadata';

describe('Template Filtering Utilities', () => {
  it('returns all templates when category is all or empty', () => {
    expect(filterTemplates(TEMPLATES_METADATA, TEMPLATE_CATEGORIES.ALL)).toHaveLength(3);
    expect(filterTemplates(TEMPLATES_METADATA, '')).toHaveLength(3);
  });

  it('filters templates by ATS category', () => {
    const atsOnly = filterTemplates(TEMPLATES_METADATA, TEMPLATE_CATEGORIES.ATS);
    expect(atsOnly).toHaveLength(2);
    expect(atsOnly.map((t) => t.id)).toEqual(['classic-ats', 'professional-ats']);
  });

  it('filters templates by Specialized category', () => {
    const specOnly = filterTemplates(TEMPLATES_METADATA, TEMPLATE_CATEGORIES.SPECIALIZED);
    expect(specOnly).toHaveLength(1);
    expect(specOnly[0].id).toBe('developer');
  });
});
