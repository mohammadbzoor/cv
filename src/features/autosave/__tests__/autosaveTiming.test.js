import { describe, it, expect } from 'vitest';
import { AUTOSAVE_DEBOUNCE_MS, AUTOSAVE_MAX_DELAY_MS } from '../utils/autosaveTiming';

describe('autosaveTiming constants', () => {
  it('defines a reasonable debounce delay between 800ms and 1500ms', () => {
    expect(AUTOSAVE_DEBOUNCE_MS).toBeGreaterThanOrEqual(800);
    expect(AUTOSAVE_DEBOUNCE_MS).toBeLessThanOrEqual(1500);
  });

  it('defines a max delay higher than the debounce delay', () => {
    expect(AUTOSAVE_MAX_DELAY_MS).toBeGreaterThan(AUTOSAVE_DEBOUNCE_MS);
  });
});
