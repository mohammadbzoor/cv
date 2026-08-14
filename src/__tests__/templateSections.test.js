import { describe, it, expect } from 'vitest';
import {
  isSectionEmpty,
  getOrderedVisibleSections,
  sanitizeContactHref,
} from '../features/templates/templates/shared/templateSharedUtils';
import { createEmptyCV } from '../features/cv/models/cvFactories';

describe('Shared Template Section & Contact Utilities', () => {
  it('identifies empty vs non-empty sections correctly', () => {
    const cv = createEmptyCV({
      summary: 'Experienced Developer',
      experiences: [{ company: 'Tech Corp' }],
      skills: [],
    });

    expect(isSectionEmpty(cv, 'summary')).toBe(false);
    expect(isSectionEmpty(cv, 'experiences')).toBe(false);
    expect(isSectionEmpty(cv, 'skills')).toBe(true);
    expect(isSectionEmpty(cv, 'education')).toBe(true);
  });

  it('getOrderedVisibleSections returns visible non-empty sections in sectionOrder', () => {
    const cv = createEmptyCV({
      summary: 'Brief overview',
      experiences: [{ company: 'Acme' }],
      sectionOrder: ['experiences', 'summary', 'skills'],
      hiddenSections: ['skills'],
    });

    const visible = getOrderedVisibleSections(cv);
    expect(visible).toEqual(['experiences', 'summary']);
  });

  it('sanitizes contact URLs cleanly', () => {
    expect(sanitizeContactHref('john@example.com', 'email')).toBe('mailto:john@example.com');
    expect(sanitizeContactHref('+15551234', 'phone')).toBe('tel:+15551234');
    expect(sanitizeContactHref('github.com/user', 'url')).toBe('https://github.com/user');
    expect(sanitizeContactHref('https://mywebsite.com', 'url')).toBe('https://mywebsite.com');
  });
});
