import { STORAGE_KEYS } from '../features/cv/models/cvConstants';
import { AUTH_STORAGE_KEYS } from '../features/auth/constants/authConstants';
import { LANGUAGE_STORAGE_KEY } from '../i18n/supportedLanguages';

export const KNOWN_PROJECT_KEYS = Object.freeze({
  THEME: 'cv-platform-theme',
  LANGUAGE: LANGUAGE_STORAGE_KEY,
  CV_DRAFT: STORAGE_KEYS.CV_DRAFT,
  DEMO_SESSION: AUTH_STORAGE_KEYS.DEMO_SESSION,
  SETTINGS: 'cv-platform-settings',
  DRAFT_NOTICE: 'cv-platform-draft-notice-shown',
});

/**
 * Clears specific local storage keys owned by the application.
 * Never uses indiscriminate localStorage.clear() to avoid wiping unrelated domain storage.
 *
 * @param {'cv-draft'|'settings'|'demo-session'|'all'} target
 */
export function clearProjectLocalData(target) {
  try {
    if (target === 'cv-draft') {
      localStorage.removeItem(KNOWN_PROJECT_KEYS.CV_DRAFT);
      sessionStorage.removeItem(KNOWN_PROJECT_KEYS.DRAFT_NOTICE);
    } else if (target === 'settings') {
      localStorage.removeItem(KNOWN_PROJECT_KEYS.SETTINGS);
    } else if (target === 'demo-session') {
      localStorage.removeItem(KNOWN_PROJECT_KEYS.DEMO_SESSION);
    } else if (target === 'all') {
      Object.values(KNOWN_PROJECT_KEYS).forEach((key) => {
        try {
          localStorage.removeItem(key);
          sessionStorage.removeItem(key);
        } catch {
          // ignore
        }
      });
    }
  } catch {
    // Fail silently if localStorage is blocked
  }
}
