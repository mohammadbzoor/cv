/**
 * Determines whether an autosave cycle should proceed.
 *
 * @param {{ isDirty: boolean, status: string }} storeState
 * @returns {boolean}
 */
export function shouldAutosave({ isDirty, status }) {
  // Only autosave if there are unsaved changes
  if (!isDirty) return false;

  // Don't trigger autosave if already saving
  if (status === 'saving') return false;

  return true;
}
