/**
 * Auth Selectors for Zustand Store.
 */

export const selectAuthUser = (state) => state.user;
export const selectAuthStatus = (state) => state.status;
export const selectIsAuthenticated = (state) => state.status === 'authenticated' && Boolean(state.user);
export const selectIsAuthenticating = (state) => state.status === 'authenticating';
export const selectAuthError = (state) => state.lastError;
export const selectIsDemoSession = (state) => Boolean(state.isDemo);
