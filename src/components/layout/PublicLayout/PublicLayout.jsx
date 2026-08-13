import { AppLayout } from '../AppLayout';
import { ScrollToTop } from '../ScrollToTop';

/**
 * Public Layout wrapper.
 * Combines ScrollToTop automatic behavior with standard AppLayout structure.
 */
export function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <AppLayout />
    </>
  );
}
