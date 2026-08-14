/**
 * Finds the first invalid form control element in the DOM and focuses it for accessibility.
 *
 * @param {object} errors React Hook Form errors object.
 */
export function focusFirstError(errors) {
  if (!errors || Object.keys(errors).length === 0) return;

  const firstErrorElement = document.querySelector(
    '[aria-invalid="true"], input.border-error, textarea.border-error, select.border-error'
  );

  if (firstErrorElement && typeof firstErrorElement.focus === 'function') {
    firstErrorElement.focus();
  }
}
