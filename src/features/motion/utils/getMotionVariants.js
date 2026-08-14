import { MOTION_TOKENS } from '../constants/motionTokens';

/**
 * Utility generating CSS inline styles or class maps for subtle entry animations.
 *
 * @param {{ delay?: number, direction?: 'up'|'down'|'none', isReducedMotion?: boolean }} options
 * @returns {React.CSSProperties}
 */
export function getMotionStyles({ delay = 0, direction = 'up', isReducedMotion = false } = {}) {
  if (isReducedMotion) {
    return {
      opacity: 1,
      transform: 'none',
      transition: 'none',
    };
  }

  let transformValue = 'translateY(0)';
  if (direction === 'up') transformValue = 'translateY(12px)';
  if (direction === 'down') transformValue = 'translateY(-12px)';
  if (direction === 'none') transformValue = 'none';

  return {
    transitionProperty: 'opacity, transform',
    transitionDuration: MOTION_TOKENS.durationNormal,
    transitionTimingFunction: MOTION_TOKENS.easeStandard,
    transitionDelay: `${delay}ms`,
    initialTransform: transformValue,
  };
}
