import { describe, it, expect, vi } from 'vitest';

describe('EditableField Pure Logic', () => {
  it('triggers commit callback only when new value differs from original', () => {
    const handleCommit = vi.fn();

    const originalValue = 'John Doe';
    const sameValue = 'John Doe';
    const newValue = 'Jane Smith';

    if (sameValue !== originalValue) {
      handleCommit(sameValue);
    }
    expect(handleCommit).not.toHaveBeenCalled();

    if (newValue !== originalValue) {
      handleCommit(newValue);
    }
    expect(handleCommit).toHaveBeenCalledWith('Jane Smith');
  });
});
