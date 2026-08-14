import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

/**
 * Conditionally renders animated vs static fallback version of content depending on prefers-reduced-motion.
 */
export function ReducedMotionFallback({ animatedContent, fallbackContent }) {
  const prefersReducedMotion = useReducedMotionPreference();
  return prefersReducedMotion ? fallbackContent : animatedContent;
}
