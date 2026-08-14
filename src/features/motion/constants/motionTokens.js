/**
 * Motion Tokens for CV Platform.
 * Standardizes animation durations, easing curves, and stagger delays.
 */

export const MOTION_TOKENS = Object.freeze({
  durationFast: '150ms',
  durationNormal: '300ms',
  durationSlow: '500ms',

  durationFastMs: 150,
  durationNormalMs: 300,
  durationSlowMs: 500,

  easeStandard: 'cubic-bezier(0.2, 0.0, 0.0, 1.0)',
  easeEnter: 'cubic-bezier(0.0, 0.0, 0.2, 1.0)',
  easeExit: 'cubic-bezier(0.4, 0.0, 1.0, 1.0)',

  staggerSmallMs: 50,
  staggerNormalMs: 100,

  distanceSmall: '8px',
  distanceNormal: '16px',
});
