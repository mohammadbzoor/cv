/**
 * Authentication Constants for Demo Front-End Auth Architecture.
 */

export const DEMO_USER = Object.freeze({
  id: 'demo-user-1',
  displayName: 'Alex Morgan',
  email: 'alex.demo@example.com',
  avatarUrl: null,
  isDemo: true,
});

export const AUTH_STORAGE_KEYS = Object.freeze({
  DEMO_SESSION: 'cv-platform-demo-session',
});

export const AUTH_STATUS = Object.freeze({
  ANONYMOUS: 'anonymous',
  AUTHENTICATING: 'authenticating',
  AUTHENTICATED: 'authenticated',
  ERROR: 'error',
});
