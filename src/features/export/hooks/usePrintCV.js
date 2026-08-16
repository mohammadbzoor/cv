import { useState, useCallback } from 'react';
import { printCV } from '../services/printService';
import { getPrintDocumentName } from '../utils/getPrintDocumentName';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectPersonalInfo } from '../../cv/store/cvSelectors';

/**
 * Hook that manages the print/export-to-PDF workflow.
 *
 * @returns {{ executePrint: () => { success: boolean, error?: object }, isPrinting: boolean, lastError: object|null, clearError: () => void }}
 */
export function usePrintCV() {
  const [isPrinting, setIsPrinting] = useState(false);
  const [lastError, setLastError] = useState(null);
  const personalInfo = useCVStore(selectPersonalInfo);

  const executePrint = useCallback(async () => {
    setLastError(null);
    setIsPrinting(true);

    const documentTitle = getPrintDocumentName({
      fullName: personalInfo?.fullName,
      title: personalInfo?.jobTitle,
    });

    const result = await printCV({
      documentTitle,
      onBeforePrint: () => {
        // Could perform pre-print preparations here
      },
      onAfterPrint: () => {
        setIsPrinting(false);
      },
    });

    if (!result.success) {
      setLastError(result.error);
      setIsPrinting(false);
    }

    return result;
  }, [personalInfo]);

  const clearError = useCallback(() => {
    setLastError(null);
  }, []);

  return { executePrint, isPrinting, lastError, clearError };
}
