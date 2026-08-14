import { STORAGE_KEYS } from '../models/cvConstants';
import { CURRENT_STORE_VERSION, migrateCVState } from './cvMigrations';

/**
 * Zustand persistence configuration object for local draft storage.
 * Ensures transient UI state (history, errors, status) is omitted from localStorage.
 */
export const cvPersistOptions = {
  name: STORAGE_KEYS.CV_DRAFT,
  version: CURRENT_STORE_VERSION,
  migrate: (persistedState, version) => migrateCVState(persistedState, version),
  partialize: (state) => ({
    cvData: state.cvData,
    isDirty: state.isDirty,
  }),
};
