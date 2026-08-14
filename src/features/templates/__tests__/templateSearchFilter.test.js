import { describe, it, expect } from 'vitest';
import { getAvailableTemplates } from '../registry/templateRegistry';
import { TEMPLATE_CATEGORIES, COMPATIBILITY_LEVELS } from '../constants/templateConstants';

describe('Template Search & Filter Utilities', () => {
  const allTemplates = getAvailableTemplates();

  it('9. filters templates by category correctly', () => {
    const atsOnly = allTemplates.filter((t) => t.category === TEMPLATE_CATEGORIES.ATS);
    expect(atsOnly).toHaveLength(5);

    const specOnly = allTemplates.filter((t) => t.category === TEMPLATE_CATEGORIES.SPECIALIZED);
    expect(specOnly).toHaveLength(1);
  });

  it('10. filters templates by compatibility level correctly', () => {
    const atsOpt = allTemplates.filter((t) => t.compatibilityLevel === COMPATIBILITY_LEVELS.ATS_OPTIMIZED);
    expect(atsOpt).toHaveLength(5);

    const visual = allTemplates.filter((t) => t.compatibilityLevel === COMPATIBILITY_LEVELS.VISUALLY_ENHANCED);
    expect(visual).toHaveLength(1);
  });

  it('11. search query matches recommended roles', () => {
    const devMatches = allTemplates.filter((t) =>
      t.recommendedFor.some((r) => r.toLowerCase().includes('frontend'))
    );
    expect(devMatches.length).toBeGreaterThan(0);
    expect(devMatches[0].id).toBe('developer');
  });

  it('12. search query matches template ID or traits', () => {
    const compactMatches = allTemplates.filter((t) =>
      t.id.includes('compact') || t.keyTraits.some((tr) => tr.toLowerCase().includes('compact'))
    );
    expect(compactMatches).toHaveLength(1);
    expect(compactMatches[0].id).toBe('compact-ats');
  });
});
