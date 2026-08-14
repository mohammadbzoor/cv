import { describe, it, expect } from 'vitest';
import {
  templateRegistry,
  getTemplateById,
  getDefaultTemplate,
  getAvailableTemplates,
} from '../features/templates/registry/templateRegistry';

describe('Template Registry System', () => {
  it('contains exactly 3 static template definitions with unique IDs', () => {
    expect(templateRegistry.templates).toHaveLength(3);
    const available = getAvailableTemplates();
    expect(available).toHaveLength(3);

    const ids = available.map((t) => t.id);
    expect(ids).toEqual(['classic-ats', 'professional-ats', 'developer']);
    expect(new Set(ids).size).toBe(3);
  });

  it('getDefaultTemplate returns classic-ats template', () => {
    const defaultTemplate = getDefaultTemplate();
    expect(defaultTemplate.id).toBe('classic-ats');
  });

  it('getTemplateById returns requested template or fallback to classic-ats when invalid', () => {
    const prof = getTemplateById('professional-ats');
    expect(prof.id).toBe('professional-ats');

    const invalid = getTemplateById('non-existent-template');
    expect(invalid.id).toBe('classic-ats');
  });
});
