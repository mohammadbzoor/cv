import { normalizeCVData } from '../utils/normalizeCVData';

export const CURRENT_STORE_VERSION = 1;

/**
 * Migration function for persisted localStorage Zustand state.
 * Upgrades old draft payloads to current schema version safely.
 *
 * @param {unknown} persistedState Raw state read from localStorage.
 * @param {number} version Version of stored state.
 * @returns {object} Migrated and normalized state object.
 */
export function migrateCVState(persistedState, version) {
  if (!persistedState || typeof persistedState !== 'object') {
    return {
      cvData: normalizeCVData(null),
      isDirty: false,
    };
  }

  // Branch migration logic based on version
  if (version < CURRENT_STORE_VERSION) {
    // Future v1 -> v2 migration steps will be added here
  }

  const rawState = /** @type {Record<string, any>} */ (persistedState);

  return {
    cvData: normalizeCVData(rawState.cvData),
    isDirty: Boolean(rawState.isDirty),
  };
}
