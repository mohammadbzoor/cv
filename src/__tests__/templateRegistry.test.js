import { describe, it, expect } from 'vitest';
import {
  templateRegistry,
  getTemplateById,
  getDefaultTemplate,
  getAvailableTemplates,
} from '../features/templates/registry/templateRegistry';

describe('Template Registry System', () => {
  it('contains exactly 6 static template definitions with unique IDs', () => {
    expect(templateRegistry.templates).toHaveLength(6);
    const available = getAvailableTemplates();
    expect(available).toHaveLength(6);

    const ids = available.map((t) => t.id);
    expect(ids).toEqual([
      'technical-prime-ats',
      'classic-ats',
      'professional-ats',
      'compact-ats',
      'executive-ats',
      'developer',
    ]);
    expect(new Set(ids).size).toBe(6);
  });

  it('getDefaultTemplate returns technical-prime-ats template', () => {
    const defaultTemplate = getDefaultTemplate();
    expect(defaultTemplate.id).toBe('technical-prime-ats');
  });

  it('getTemplateById returns requested template or fallback to technical-prime-ats when invalid', () => {
    const prof = getTemplateById('professional-ats');
    expect(prof.id).toBe('professional-ats');

    const invalid = getTemplateById('non-existent-template');
    expect(invalid.id).toBe('technical-prime-ats');
  });
});
