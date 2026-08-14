import { describe, it, expect } from 'vitest';
import { shouldAutosave } from '../utils/shouldAutosave';

describe('shouldAutosave utility', () => {
  it('returns false when store is not dirty', () => {
    expect(shouldAutosave({ isDirty: false, status: 'idle' })).toBe(false);
  });

  it('returns false when status is currently saving', () => {
    expect(shouldAutosave({ isDirty: true, status: 'saving' })).toBe(false);
  });

  it('returns true when store is dirty and status is idle or dirty', () => {
    expect(shouldAutosave({ isDirty: true, status: 'idle' })).toBe(true);
    expect(shouldAutosave({ isDirty: true, status: 'dirty' })).toBe(true);
  });
});
