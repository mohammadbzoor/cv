import { useState, useCallback } from 'react';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectCVData } from '../../cv/store/cvSelectors';

const DRAFT_NOTICE_SESSION_KEY = 'cv-platform-draft-notice-shown';

/**
 * Hook that detects a restored local draft and manages the recovery notice lifecycle.
 *
 * Uses lazy state initialization to determine if the draft notice should be displayed,
 * avoiding synchronous setState inside useEffect.
 *
 * @returns {{ showNotice: boolean, dismissNotice: () => void, startOver: () => void }}
 */
export function useDraftRecovery() {
  const cvData = useCVStore(selectCVData);
  const createNewCV = useCVStore((state) => state.createNewCV);

  const [showNotice, setShowNotice] = useState(() => {
    try {
      const alreadyShown = sessionStorage.getItem(DRAFT_NOTICE_SESSION_KEY);
      if (alreadyShown) return false;

      const hasContent = Boolean(
        cvData?.personalInfo?.fullName?.trim() ||
        cvData?.summary?.trim() ||
        (cvData?.experiences && cvData.experiences.length > 0) ||
        (cvData?.education && cvData.education.length > 0) ||
        (cvData?.skills && cvData.skills.length > 0)
      );

      if (hasContent) {
        sessionStorage.setItem(DRAFT_NOTICE_SESSION_KEY, 'true');
        return true;
      }
    } catch {
      // sessionStorage unavailable
    }
    return false;
  });

  const dismissNotice = useCallback(() => {
    setShowNotice(false);
  }, []);

  const startOver = useCallback(() => {
    createNewCV();
    setShowNotice(false);
  }, [createNewCV]);

  return { showNotice, dismissNotice, startOver };
}
