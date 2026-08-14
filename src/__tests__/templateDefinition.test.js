import { describe, it, expect } from 'vitest';
import { validateTemplateDefinition } from '../features/templates/utils/validateTemplateDefinition';

describe('Template Definition Validation', () => {
  it('validates proper template objects', () => {
    const valid = {
      id: 'classic-ats',
      nameKey: 'templates:items.classicATS.name',
      component: () => null,
    };

    expect(validateTemplateDefinition(valid)).toBe(true);
  });

  it('rejects invalid template definitions with missing fields', () => {
    expect(validateTemplateDefinition(null)).toBe(false);
    expect(validateTemplateDefinition({ id: 'test' })).toBe(false);
    expect(validateTemplateDefinition({ nameKey: 'test', component: () => null })).toBe(false);
  });
});
