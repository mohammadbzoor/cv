import { describe, it, expect } from 'vitest';
import { applySuggestion } from '../features/improve/utils/applySuggestion';
import { createEmptyCV } from '../features/cv/models/cvFactories';

describe('Apply Suggestion Utility', () => {
  it('applies suggestion to summary field when original value matches', () => {
    const cv = createEmptyCV({ summary: 'Old summary text' });
    const sug = {
      id: 's1',
      fieldPath: 'summary',
      originalValue: 'Old summary text',
      suggestedValue: 'New improved summary text',
    };

    const res = applySuggestion(cv, sug);
    expect(res.success).toBe(true);
    expect(res.data.summary).toBe('New improved summary text');
  });

  it('detects ORIGINAL_VALUE_MISMATCH when original text has changed', () => {
    const cv = createEmptyCV({ summary: 'User edited summary text manually' });
    const sug = {
      id: 's1',
      fieldPath: 'summary',
      originalValue: 'Old summary text',
      suggestedValue: 'New improved summary text',
    };

    const res = applySuggestion(cv, sug);
    expect(res.success).toBe(false);
    expect(res.error.code).toBe('ORIGINAL_VALUE_MISMATCH');
  });

  it('rejects forbidden paths like schemaVersion', () => {
    const cv = createEmptyCV();
    const sug = {
      id: 's1',
      fieldPath: 'schemaVersion',
      originalValue: '1.0.0',
      suggestedValue: '2.0.0',
    };

    const res = applySuggestion(cv, sug);
    expect(res.success).toBe(false);
    expect(res.error.code).toBe('FORBIDDEN_FIELD_PATH');
  });
});
