/**
 * Application route path constants.
 * Centralizing route path strings prevents typos and simplifies updates.
 */
export const ROUTE_PATHS = Object.freeze({
  HOME: '/',
  CREATE: '/create',
  UPLOAD: '/upload',
  ANALYZE: '/analyze',
  MATCH: '/match',
  IMPROVE: '/improve',
  TEMPLATES: '/templates',
  BUILDER: '/builder/:cvId?',
  HELP: '/help',
  NOT_FOUND: '*',
});
