import { useEffect } from 'react';

/**
 * Attaches beforeunload listener when Builder state has unsaved changes.
 */
export function BuilderUnsavedGuard({ isDirty }) {
  useEffect(() => {
    if (!isDirty) return;

    function handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = '';
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  return null;
}
