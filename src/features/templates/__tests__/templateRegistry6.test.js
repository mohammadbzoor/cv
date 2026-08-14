import { describe, it, expect } from 'vitest';
import {
  TEMPLATES_METADATA,
  getTemplateName,
} from '../registry/templateMetadata';
import {
  getTemplateById,
  getDefaultTemplate,
} from '../registry/templateRegistry';
import { DEFAULT_TEMPLATE_ID, COMPATIBILITY_LEVELS, TEMPLATE_CATEGORIES } from '../constants/templateConstants';

describe('Template Registry (6 Templates System)', () => {
  it('1. contains exactly 6 registered templates with unique IDs', () => {
    expect(TEMPLATES_METADATA).toHaveLength(6);
    const ids = TEMPLATES_METADATA.map((t) => t.id);
    expect(new Set(ids).size).toBe(6);
  });

  it('2. sets technical-prime-ats as default template ID', () => {
    expect(DEFAULT_TEMPLATE_ID).toBe('technical-prime-ats');
    const defaultTpl = getDefaultTemplate();
    expect(defaultTpl.id).toBe('technical-prime-ats');
  });

  it('3. getTemplateById returns technical-prime-ats as fallback for invalid IDs', () => {
    const fallback = getTemplateById('invalid-non-existent-id');
    expect(fallback.id).toBe('technical-prime-ats');
  });

  it('4. getTemplateById preserves valid existing template IDs', () => {
    const classic = getTemplateById('classic-ats');
    const dev = getTemplateById('developer');
    expect(classic.id).toBe('classic-ats');
    expect(dev.id).toBe('developer');
  });

  it('5. all 6 templates have valid metadata structures', () => {
    TEMPLATES_METADATA.forEach((tpl) => {
      expect(tpl.id).toBeDefined();
      expect(tpl.nameKey).toContain('templates:items.');
      expect(tpl.descriptionKey).toContain('templates:items.');
      expect(tpl.category).toBeDefined();
      expect(tpl.compatibilityLevel).toBeDefined();
      expect(tpl.component).toBeDefined();
      expect(tpl.thumbnailVariant).toBeDefined();
      expect(Array.isArray(tpl.supportedSections)).toBe(true);
      expect(Array.isArray(tpl.recommendedFor)).toBe(true);
      expect(Array.isArray(tpl.keyTraits)).toBe(true);
    });
  });

  it('6. developer template is classified as VISUALLY_ENHANCED', () => {
    const dev = getTemplateById('developer');
    expect(dev.compatibilityLevel).toBe(COMPATIBILITY_LEVELS.VISUALLY_ENHANCED);
    expect(dev.category).toBe(TEMPLATE_CATEGORIES.SPECIALIZED);
  });

  it('7. ATS templates are classified as ATS_OPTIMIZED', () => {
    const atsIds = ['technical-prime-ats', 'classic-ats', 'professional-ats', 'compact-ats', 'executive-ats'];
    atsIds.forEach((id) => {
      const tpl = getTemplateById(id);
      expect(tpl.compatibilityLevel).toBe(COMPATIBILITY_LEVELS.ATS_OPTIMIZED);
    });
  });

  it('8. getTemplateName returns human readable names for all 6 templates', () => {
    expect(getTemplateName('technical-prime-ats')).toBe('Technical Prime ATS');
    expect(getTemplateName('classic-ats')).toBe('Classic ATS');
    expect(getTemplateName('professional-ats')).toBe('Professional ATS');
    expect(getTemplateName('compact-ats')).toBe('Compact ATS');
    expect(getTemplateName('executive-ats')).toBe('Executive ATS');
    expect(getTemplateName('developer')).toBe('Developer Portfolio');
  });
});
