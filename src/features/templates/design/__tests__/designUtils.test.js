import { describe, it, expect } from 'vitest';
import { getEffectiveDesignValues } from '../utils/getEffectiveDesignValues';
import { calculateReadabilityWarnings, getSaferDesignSettings } from '../utils/calculateReadabilityWarnings';
import { getDesignDifferences } from '../utils/getDesignDifferences';
import { getPresetSettings, DESIGN_PRESETS } from '../utils/applyDesignPreset';
import { getTemplateDesignVariables } from '../utils/getTemplateDesignVariables';

describe('Design Utilities', () => {
  describe('getEffectiveDesignValues', () => {
    it('returns empty object if no design provided', () => {
      expect(getEffectiveDesignValues(null)).toEqual({});
    });

    it('applies balanced density baseline by default', () => {
      const result = getEffectiveDesignValues({});
      expect(result.density).toBe('balanced');
      expect(result.sectionSpacing).toBe('normal');
      expect(result.itemSpacing).toBe('normal');
      expect(result.paragraphSpacing).toBe('normal');
      expect(result.lineHeight).toBe('normal');
    });

    it('applies comfortable density baseline', () => {
      const result = getEffectiveDesignValues({ density: 'comfortable' });
      expect(result.sectionSpacing).toBe('relaxed');
      expect(result.itemSpacing).toBe('relaxed');
      expect(result.paragraphSpacing).toBe('relaxed');
      expect(result.lineHeight).toBe('relaxed');
      expect(result.margins).toBe('spacious');
    });

    it('applies compact density baseline', () => {
      const result = getEffectiveDesignValues({ density: 'compact' });
      expect(result.sectionSpacing).toBe('tight');
      expect(result.itemSpacing).toBe('tight');
      expect(result.paragraphSpacing).toBe('tight');
      expect(result.lineHeight).toBe('tight');
      expect(result.margins).toBe('compact');
    });

    it('overrides baseline with explicit non-normal settings', () => {
      const result = getEffectiveDesignValues({
        density: 'compact',
        sectionSpacing: 'relaxed',
      });
      // Explicit override takes precedence
      expect(result.sectionSpacing).toBe('relaxed');
      // Density baseline still applies to others
      expect(result.itemSpacing).toBe('tight');
    });

    it('preserves other design properties', () => {
      const result = getEffectiveDesignValues({
        density: 'balanced',
        primaryColor: '#ff0000',
        fontFamily: 'Arial',
      });
      expect(result.primaryColor).toBe('#ff0000');
      expect(result.fontFamily).toBe('Arial');
    });
  });

  describe('calculateReadabilityWarnings', () => {
    it('returns safe level for good design', () => {
      const cvData = {
        design: { fontSize: 'md', density: 'balanced', primaryColor: '#000000', showSectionDividers: true }
      };
      const result = calculateReadabilityWarnings(cvData);
      expect(result.level).toBe('safe');
      expect(result.issues.length).toBe(0);
    });

    it('detects SMALL_FONT_COMPACT_DENSITY', () => {
      const cvData = { design: { fontSize: 'sm', density: 'compact' } };
      const result = calculateReadabilityWarnings(cvData);
      expect(result.issues).toContain('SMALL_FONT_COMPACT_DENSITY');
      expect(result.level).toBe('review');
    });

    it('detects LOW_CONTRAST_PRIMARY_COLOR', () => {
      const cvData = { design: { primaryColor: '#f8fafc' } }; // Very light color
      const result = calculateReadabilityWarnings(cvData);
      expect(result.issues).toContain('LOW_CONTRAST_PRIMARY_COLOR');
      expect(result.level).toBe('warning');
    });

    it('detects HIDDEN_DIVIDERS_UNDERSTATED_HEADINGS', () => {
      const cvData = { design: { showSectionDividers: false, headingStyle: 'understated' } };
      const result = calculateReadabilityWarnings(cvData);
      expect(result.issues).toContain('HIDDEN_DIVIDERS_UNDERSTATED_HEADINGS');
    });

    it('detects TIGHT_LINE_HEIGHT_LONG_SUMMARY', () => {
      const longSummary = 'A'.repeat(301);
      const cvData = { summary: longSummary, design: { lineHeight: 'tight' } };
      const result = calculateReadabilityWarnings(cvData);
      expect(result.issues).toContain('TIGHT_LINE_HEIGHT_LONG_SUMMARY');
    });

    it('detects INLINE_SKILLS_OVERFLOW_RISK', () => {
      const skills = Array.from({ length: 16 }, (_, i) => ({ id: String(i) }));
      const cvData = { skills, design: { skillsPresentation: 'inline' } };
      const result = calculateReadabilityWarnings(cvData);
      expect(result.issues).toContain('INLINE_SKILLS_OVERFLOW_RISK');
    });

    it('detects TOO_MANY_ACHIEVEMENTS', () => {
      const achievements = Array.from({ length: 7 }, (_, i) => String(i));
      const cvData = { experiences: [{ achievements }], design: {} };
      const result = calculateReadabilityWarnings(cvData);
      expect(result.issues).toContain('TOO_MANY_ACHIEVEMENTS');
    });
  });

  describe('getSaferDesignSettings', () => {
    it('fixes font size', () => {
      const safe = getSaferDesignSettings({ fontSize: 'sm' });
      expect(safe.fontSize).toBe('md');
    });

    it('fixes line height', () => {
      const safe = getSaferDesignSettings({ lineHeight: 'tight' });
      expect(safe.lineHeight).toBe('normal');
    });

    it('fixes understated headings without dividers', () => {
      const safe = getSaferDesignSettings({ showSectionDividers: false, headingStyle: 'understated' });
      expect(safe.headingStyle).toBe('standard');
    });

    it('fixes low contrast primary color', () => {
      const safe = getSaferDesignSettings({ primaryColor: '#ffffff' });
      expect(safe.primaryColor).toBe('#1e293b');
    });

    it('does not touch already safe settings', () => {
      const safe = getSaferDesignSettings({ fontSize: 'md', lineHeight: 'normal', primaryColor: '#000000' });
      expect(safe.fontSize).toBe('md');
      expect(safe.lineHeight).toBe('normal');
      expect(safe.primaryColor).toBe('#000000');
    });
  });

  describe('getDesignDifferences', () => {
    it('returns empty array if designs are same', () => {
      expect(getDesignDifferences({ fontSize: 'md' }, { fontSize: 'md' })).toEqual([]);
    });

    it('identifies changed keys', () => {
      const diffs = getDesignDifferences(
        { fontSize: 'md', density: 'balanced' },
        { fontSize: 'lg', density: 'compact' }
      );
      expect(diffs).toHaveLength(2);
      expect(diffs[0].key).toBe('fontSize');
      expect(diffs[0].oldValue).toBe('md');
      expect(diffs[0].newValue).toBe('lg');
    });
  });

  describe('applyDesignPreset', () => {
    it('returns null for unknown preset', () => {
      expect(getPresetSettings('unknown')).toBeNull();
    });

    it('returns correct preset settings', () => {
      const atsSafe = getPresetSettings('ats-safe');
      expect(atsSafe).toBeDefined();
      expect(atsSafe.fontFamily).toBe('Arial');
      expect(atsSafe.density).toBe('balanced');
    });
  });

  describe('getTemplateDesignVariables', () => {
    it('outputs valid CSS custom properties', () => {
      const vars = getTemplateDesignVariables({ primaryColor: '#123456', fontSize: 'lg', showSectionDividers: false });
      expect(vars['--cv-primary-color']).toBe('#123456');
      expect(vars['--cv-font-size']).toBe('1.0rem');
      expect(vars['--cv-divider-width']).toBe('0px');
      expect(vars['--cv-divider-color']).toBe('transparent');
    });
  });
});
