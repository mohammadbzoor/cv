import { describe, it, expect } from 'vitest';
import { generateId } from '../utils/generateId';

describe('generateId utility', () => {
  it('generates unique non-empty string IDs', () => {
    const id1 = generateId('exp');
    const id2 = generateId('exp');

    expect(typeof id1).toBe('string');
    expect(id1.length).toBeGreaterThan(0);
    expect(id1).not.toBe(id2);
  });

  it('prefixes ID with specified string', () => {
    const id = generateId('custom_prefix');
    expect(id.startsWith('custom_prefix_')).toBe(true);
  });
});
