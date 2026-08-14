import { describe, it, expect } from 'vitest';
import { clearProjectLocalData, KNOWN_PROJECT_KEYS } from '../../../utils/clearLocalData';
import { profileSettingsSchema } from '../schemas/profileSettingsSchema';

describe('Settings Utilities & Schemas', () => {
  it('22. profileSettingsSchema passes valid display name and email', () => {
    const valid = profileSettingsSchema.safeParse({ displayName: 'Sam Taylor', email: 'sam@example.com' });
    expect(valid.success).toBe(true);
  });

  it('23. profileSettingsSchema rejects short names or bad emails', () => {
    const badName = profileSettingsSchema.safeParse({ displayName: 'S', email: 'sam@example.com' });
    const badEmail = profileSettingsSchema.safeParse({ displayName: 'Sam Taylor', email: 'not-an-email' });
    expect(badName.success).toBe(false);
    expect(badEmail.success).toBe(false);
  });

  it('24. clearProjectLocalData removes target key without wiping entire localStorage', () => {
    const storageMap = new Map();
    globalThis.localStorage = {
      setItem: (k, v) => storageMap.set(k, v),
      getItem: (k) => storageMap.get(k) || null,
      removeItem: (k) => storageMap.delete(k),
      clear: () => storageMap.clear(),
    };

    localStorage.setItem(KNOWN_PROJECT_KEYS.CV_DRAFT, '{"test":1}');
    localStorage.setItem('unrelated-key', 'keep-me');

    clearProjectLocalData('cv-draft');

    expect(localStorage.getItem(KNOWN_PROJECT_KEYS.CV_DRAFT)).toBeNull();
    expect(localStorage.getItem('unrelated-key')).toBe('keep-me');
  });

  it('25. clearProjectLocalData("all") removes only known project keys', () => {
    const storageMap = new Map();
    globalThis.localStorage = {
      setItem: (k, v) => storageMap.set(k, v),
      getItem: (k) => storageMap.get(k) || null,
      removeItem: (k) => storageMap.delete(k),
    };

    localStorage.setItem(KNOWN_PROJECT_KEYS.CV_DRAFT, 'draft');
    localStorage.setItem(KNOWN_PROJECT_KEYS.THEME, 'dark');
    localStorage.setItem('external-app-key', 'preserve-this');

    clearProjectLocalData('all');

    expect(localStorage.getItem(KNOWN_PROJECT_KEYS.CV_DRAFT)).toBeNull();
    expect(localStorage.getItem(KNOWN_PROJECT_KEYS.THEME)).toBeNull();
    expect(localStorage.getItem('external-app-key')).toBe('preserve-this');
  });
});
