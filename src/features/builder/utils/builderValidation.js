import { HEX_COLOR_REGEX, SAFE_FONT_FAMILIES } from '../constants/builderConstants';

/**
 * Sanitizes and validates Hex primary color string to prevent CSS injection.
 *
 * @param {string} color Hex color string.
 * @param {string} fallback Default fallback hex color.
 * @returns {string} Validated hex color string.
 */
export function sanitizePrimaryColor(color, fallback = '#344553') {
  if (!color || typeof color !== 'string') return fallback;
  const trimmed = color.trim();
  if (HEX_COLOR_REGEX.test(trimmed)) {
    return trimmed;
  }
  return fallback;
}

/**
 * Validates font family string against the safe allowlist.
 *
 * @param {string} fontId Requested font family identifier.
 * @returns {string} Allowed font family name.
 */
export function validateFontFamily(fontId) {
  const matched = SAFE_FONT_FAMILIES.find((f) => f.id === fontId);
  return matched ? matched.id : SAFE_FONT_FAMILIES[0].id;
}
