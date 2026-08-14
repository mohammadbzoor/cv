import { useEffect, useRef, useState } from 'react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';
import { MOTION_TOKENS } from '../constants/motionTokens';

/**
 * Component that reveals its children with a subtle fade/slide animation when scrolled into view.
 * Uses IntersectionObserver for high-performance scroll triggers.
 * Respects prefers-reduced-motion.
 */
export function MotionReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  as: Component = 'div',
  ...props
}) {
  const prefersReducedMotion = useReducedMotionPreference();
  const [isVisible, setIsVisible] = useState(() => {
    if (prefersReducedMotion) return true;
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return true;
    return false;
  });

  const elementRef = useRef(null);

  useEffect(() => {
    if (isVisible) return;

    const elem = elementRef.current;
    if (!elem) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(elem);

    return () => {
      if (elem) observer.unobserve(elem);
    };
  }, [isVisible]);

  if (prefersReducedMotion) {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  let transformInitial = 'translateY(16px)';
  if (direction === 'down') transformInitial = 'translateY(-16px)';
  if (direction === 'none') transformInitial = 'none';

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : transformInitial,
    transitionProperty: 'opacity, transform',
    transitionDuration: MOTION_TOKENS.durationNormal,
    transitionTimingFunction: MOTION_TOKENS.easeStandard,
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <Component ref={elementRef} style={style} className={className} {...props}>
      {children}
    </Component>
  );
}
