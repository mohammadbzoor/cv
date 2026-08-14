/**
 * Helper to preserve and restore scroll position of preview containers.
 */
export function preservePreviewScroll(element) {
  if (!element) return () => {};

  const scrollTop = element.scrollTop;
  const scrollLeft = element.scrollLeft;

  return () => {
    try {
      element.scrollTop = scrollTop;
      element.scrollLeft = scrollLeft;
    } catch {
      // ignore scroll restore errors
    }
  };
}
