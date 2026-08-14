import { AUTH_STORAGE_KEYS } from '../constants/authConstants';

/**
 * Zustand persistence options for Auth store.
 * ONLY stores demo user session preference.
 * NEVER stores passwords, tokens, or credentials.
 */
export const authPersistOptions = {
  name: AUTH_STORAGE_KEYS.DEMO_SESSION,
  partialize: (state) => ({
    user: state.user,
    status: state.status,
    isDemo: state.isDemo,
  }),
};
