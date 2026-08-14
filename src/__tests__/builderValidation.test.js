import { describe, it, expect } from 'vitest';
import { sanitizePrimaryColor, validateFontFamily } from '../features/builder/utils/builderValidation';

describe('Builder Design Validation Utilities', () => {
  it('validates and sanitizes primary Hex color strings', () => {
    expect(sanitizePrimaryColor('#1a2b3c')).toBe('#1a2b3c');
    expect(sanitizePrimaryColor('#fff')).toBe('#fff');
    expect(sanitizePrimaryColor('javascript:alert(1)')).toBe('#344553');
    expect(sanitizePrimaryColor('red')).toBe('#344553');
  });

  it('verifies font family against safe allowlist', () => {
    expect(validateFontFamily('Inter')).toBe('Inter');
    expect(validateFontFamily('Georgia')).toBe('Georgia');
    expect(validateFontFamily('Comic Sans')).toBe('Inter'); // Fallback
  });
});
