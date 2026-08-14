import { describe, it, expect } from 'vitest';
import { getAvailableTemplates } from '../../registry/templateRegistry';
import { TEMPLATE_CATEGORIES, COMPATIBILITY_LEVELS } from '../../constants/templateConstants';

describe('Template Studio Filters & Search Logic', () => {
  const templates = getAvailableTemplates();

  it('6. filters templates by search query matching name or description', () => {
    const q = 'classic';
    const matches = templates.filter((t) => t.id.includes(q) || t.keyTraits.some((tr) => tr.toLowerCase().includes(q)));
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].id).toBe('classic-ats');
  });

  it('7. filters templates by category (ATS vs Specialized)', () => {
    const ats = templates.filter((t) => t.category === TEMPLATE_CATEGORIES.ATS);
    expect(ats).toHaveLength(5);

    const spec = templates.filter((t) => t.category === TEMPLATE_CATEGORIES.SPECIALIZED);
    expect(spec).toHaveLength(1);
    expect(spec[0].id).toBe('developer');
  });

  it('8. filters templates by compatibility level', () => {
    const atsOpt = templates.filter((t) => t.compatibilityLevel === COMPATIBILITY_LEVELS.ATS_OPTIMIZED);
    expect(atsOpt).toHaveLength(5);

    const visual = templates.filter((t) => t.compatibilityLevel === COMPATIBILITY_LEVELS.VISUALLY_ENHANCED);
    expect(visual).toHaveLength(1);
  });

  it('9. combined search and category filtering works correctly', () => {
    const matches = templates.filter(
      (t) => t.category === TEMPLATE_CATEGORIES.ATS && t.id.includes('compact')
    );
    expect(matches).toHaveLength(1);
    expect(matches[0].id).toBe('compact-ats');
  });
});
