import { describe, it, expect } from 'vitest';
import { updateByPath } from '../features/cv/utils/updateByPath';

describe('updateByPath utility', () => {
  it('updates simple nested object property immutably', () => {
    const original = { personalInfo: { fullName: 'John Doe', age: 30 } };
    const updated = updateByPath(original, 'personalInfo.fullName', 'Jane Doe');

    expect(updated).not.toBe(original);
    expect(updated.personalInfo.fullName).toBe('Jane Doe');
    expect(original.personalInfo.fullName).toBe('John Doe');
  });

  it('updates nested array item property immutably', () => {
    const original = {
      experiences: [
        { id: '1', position: 'Dev' },
        { id: '2', position: 'Lead' },
      ],
    };

    const updated = updateByPath(original, 'experiences.1.position', 'Tech Lead');

    expect(updated).not.toBe(original);
    expect(updated.experiences).not.toBe(original.experiences);
    expect(updated.experiences[1].position).toBe('Tech Lead');
    expect(original.experiences[1].position).toBe('Lead');
  });

  it('throws error when prototype pollution attempt is detected', () => {
    const target = { a: 1 };
    expect(() => updateByPath(target, '__proto__.polluted', true)).toThrow('PROTOTYPE_POLLUTION_DETECTED');
    expect(() => updateByPath(target, 'constructor.prototype.polluted', true)).toThrow('PROTOTYPE_POLLUTION_DETECTED');
  });

  it('throws error for empty or invalid paths', () => {
    const target = { a: 1 };
    expect(() => updateByPath(target, '', 'val')).toThrow('INVALID_PATH');
  });
});
