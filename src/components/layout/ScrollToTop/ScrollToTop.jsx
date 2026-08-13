import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop helper component.
 * Automatically scrolls window to top on route pathname changes while preserving hash anchors.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If navigating to an anchor hash on the same page, preserve default scroll behavior
    if (hash) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pathname, hash]);

  return null;
}
