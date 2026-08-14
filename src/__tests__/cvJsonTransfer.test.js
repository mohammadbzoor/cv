import { describe, it, expect } from 'vitest';
import { serializeCVData, parseCVDataJSON } from '../features/cv/utils/cvJsonTransfer';
import { createEmptyCV } from '../features/cv/models/cvFactories';

describe('cvJsonTransfer', () => {
  it('performs clean serialization and parsing roundtrip', () => {
    const original = createEmptyCV({
      title: 'Fullstack Resume',
      summary: 'Experienced developer',
    });

    const jsonStr = serializeCVData(original);
    const parsed = parseCVDataJSON(jsonStr);

    expect(parsed.success).toBe(true);
    expect(parsed.data.title).toBe('Fullstack Resume');
    expect(parsed.data.summary).toBe('Experienced developer');
  });

  it('handles invalid JSON syntax gracefully', () => {
    const result = parseCVDataJSON('{ invalid json syntax ');

    expect(result.success).toBe(false);
    expect(result.errors[0].code).toBe('INVALID_JSON_SYNTAX');
  });
});
