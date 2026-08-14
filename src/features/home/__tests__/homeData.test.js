import { describe, it, expect } from 'vitest';
import { HOME_SERVICES } from '../data/homeServices';
import { PROCESS_STEPS } from '../data/processSteps';
import { FEATURE_HIGHLIGHTS } from '../data/featureHighlights';
import { HOME_FAQ_ITEMS } from '../data/homeFaq';
import { TEMPLATES_METADATA } from '../../templates/registry/templateMetadata';

describe('Home Data Structures', () => {
  it('1. contains unique service IDs with valid routes', () => {
    const ids = HOME_SERVICES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);

    HOME_SERVICES.forEach((service) => {
      expect(service.route).toBeDefined();
      expect(typeof service.route).toBe('string');
      expect(service.icon).toBeDefined();
    });
  });

  it('2. contains process steps ordered from 01 to 04', () => {
    expect(PROCESS_STEPS).toHaveLength(4);
    expect(PROCESS_STEPS[0].stepNumber).toBe('01');
    expect(PROCESS_STEPS[3].stepNumber).toBe('04');
  });

  it('3. feature highlights contain unique IDs and icons', () => {
    const ids = FEATURE_HIGHLIGHTS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    FEATURE_HIGHLIGHTS.forEach((f) => {
      expect(f.icon).toBeDefined();
    });
  });

  it('4. FAQ items have unique IDs and translation keys', () => {
    const ids = HOME_FAQ_ITEMS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    HOME_FAQ_ITEMS.forEach((item) => {
      expect(item.questionKey).toContain('home:faq.');
      expect(item.answerKey).toContain('home:faq.');
    });
  });

  it('5. all template showcase references exist in TEMPLATES_METADATA', () => {
    expect(TEMPLATES_METADATA.length).toBeGreaterThan(0);
    TEMPLATES_METADATA.forEach((tpl) => {
      expect(tpl.id).toBeDefined();
      expect(tpl.thumbnailVariant).toBeDefined();
    });
  });
});
