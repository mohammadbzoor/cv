/**
 * Formats a numeric value according to the specified locale.
 *
 * @param {number|string} value - The number to format.
 * @param {string} [locale='ar'] - Target BCP 47 locale code (e.g. 'ar' or 'en').
 * @param {Intl.NumberFormatOptions} [options] - Optional Intl.NumberFormat formatting options.
 * @returns {string} Formatted localized number string.
 */
export function formatLocalizedNumber(value, locale = 'ar', options = {}) {
  const numericValue = typeof value === 'number' ? value : Number(value);
  if (isNaN(numericValue)) {
    return String(value ?? '');
  }

  try {
    return new Intl.NumberFormat(locale, options).format(numericValue);
  } catch {
    return String(numericValue);
  }
}

/**
 * Formats a Date or timestamp string according to the specified locale.
 *
 * @param {Date|string|number} value - Date instance, timestamp, or ISO date string.
 * @param {string} [locale='ar'] - Target BCP 47 locale code (e.g. 'ar' or 'en').
 * @param {Intl.DateTimeFormatOptions} [options] - Optional Intl.DateTimeFormat options.
 * @returns {string} Formatted localized date string.
 */
export function formatLocalizedDate(value, locale = 'ar', options = {}) {
  if (!value) return '';

  const dateObj = value instanceof Date ? value : new Date(value);
  if (isNaN(dateObj.getTime())) {
    return String(value);
  }

  try {
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  } catch {
    return dateObj.toLocaleDateString();
  }
}
