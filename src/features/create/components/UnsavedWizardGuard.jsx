import { useEffect } from 'react';

/**
 * Attaches a beforeunload window listener when form state is dirty to prevent accidental tab closing.
 */
export function UnsavedWizardGuard({ isDirty }) {
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
