import { useEffect, useRef, useCallback } from 'react';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectIsDirty, selectStatus } from '../../cv/store/cvSelectors';
import { AUTOSAVE_DEBOUNCE_MS } from '../utils/autosaveTiming';
import { shouldAutosave } from '../utils/shouldAutosave';

/**
 * Debounced autosave hook for the Builder.
 *
 * How it works:
 * - Zustand persist middleware already writes to localStorage on every state change.
 * - This hook provides UX status transitions (dirty → saving → saved) with debouncing.
 * - It does NOT create a separate persistence mechanism; it leverages the existing one.
 * - It does NOT add to undo/redo history.
 * - It does NOT use setInterval.
 *
 * Should be activated once at the Builder root level, not inside each field.
 *
 * @param {{ enabled?: boolean }} options
 */
export function useAutosave({ enabled = true } = {}) {
  const isDirty = useCVStore(selectIsDirty);
  const status = useCVStore(selectStatus);
  const markSaving = useCVStore((state) => state.markSaving);
  const markSaved = useCVStore((state) => state.markSaved);
  const markError = useCVStore((state) => state.markError);

  const timerRef = useRef(null);

  const cancelTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Manual save cancels pending autosave timer
  const cancelPendingAutosave = useCallback(() => {
    cancelTimer();
  }, [cancelTimer]);

  useEffect(() => {
    if (!enabled) return;

    if (!shouldAutosave({ isDirty, status })) {
      return;
    }

    // Cancel any pending timer when a new change arrives
    cancelTimer();

    // Start new debounced autosave cycle
    timerRef.current = setTimeout(() => {
      // Mark as saving
      markSaving();

      // Verify localStorage is available (Zustand persist has already written)
      try {
        // Test localStorage availability
        const testKey = '__autosave_test__';
        localStorage.setItem(testKey, '1');
        localStorage.removeItem(testKey);

        // Zustand persist has already persisted; mark as saved
        markSaved();
      } catch {
        markError({
          code: 'LOCAL_STORAGE_UNAVAILABLE',
          message: 'Local storage is not available. Changes may not persist.',
        });
      }

      timerRef.current = null;
    }, AUTOSAVE_DEBOUNCE_MS);

    return () => {
      cancelTimer();
    };
  }, [isDirty, status, enabled, markSaving, markSaved, markError, cancelTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelTimer();
    };
  }, [cancelTimer]);

  return { cancelPendingAutosave };
}
