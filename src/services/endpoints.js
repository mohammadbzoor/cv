/**
 * Endpoint definitions for future backend API integration.
 * Centralizing API paths prevents hardcoded URLs across feature services.
 */
export const API_ENDPOINTS = Object.freeze({
  ANALYZE: '/cv/analyze',
  MATCH: '/cv/match',
  IMPROVE: '/cv/improve',
  UPLOAD: '/cv/upload',
});
