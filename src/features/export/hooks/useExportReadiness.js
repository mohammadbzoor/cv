import { useCVStore } from '../../cv/store/useCVStore';
import { selectCVData } from '../../cv/store/cvSelectors';
import { validateCVForExport } from '../../cv/utils/validateCVData';

/**
 * Hook that evaluates CV export readiness by delegating to validateCVForExport.
 * Does NOT modify CV data or record history.
 *
 * @returns {{ isReady: boolean, errors: Array<{ path: string, code: string, message: string }>, warningCount: number, refresh: () => void }}
 */
export function useExportReadiness() {
  const cvData = useCVStore(selectCVData);

  const result = validateCVForExport(cvData);

  return {
    isReady: result.success,
    errors: result.errors,
    warningCount: result.errors.length,
    refresh: () => {
      // Force re-evaluation by reading latest store state
      // Since this hook is reactive to store changes, this is a no-op hint
    },
  };
}
