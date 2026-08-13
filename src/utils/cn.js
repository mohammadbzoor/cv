/**
 * Merges class name strings, filtering out falsy values.
 * Lightweight alternative to clsx/classnames without external dependencies.
 *
 * @param {...(string|boolean|null|undefined)} inputs - Class name values to merge.
 * @returns {string} Merged class name string.
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
