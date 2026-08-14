/**
 * Autosave timing constants.
 * Centralized to allow easy adjustment and testing.
 */

/** Debounce delay in milliseconds before triggering autosave after the last change. */
export const AUTOSAVE_DEBOUNCE_MS = 1000;

/** Maximum delay before forcing a save even if changes keep arriving. */
export const AUTOSAVE_MAX_DELAY_MS = 5000;
