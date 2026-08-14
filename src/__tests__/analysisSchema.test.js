import { describe, it, expect } from 'vitest';
import { analysisResponseSchema } from '../features/ai-services/contracts/serviceContracts';
import { MOCK_ANALYSIS_RESULT } from '../features/ai-services/mocks/mockAnalysisResult';

describe('Analysis Service Response Schema', () => {
  it('validates deterministic MOCK_ANALYSIS_RESULT correctly', () => {
    const res = analysisResponseSchema.safeParse(MOCK_ANALYSIS_RESULT);
    expect(res.success).toBe(true);
  });

  it('rejects analysis overallScore outside 0 to 100 range', () => {
    const invalid = { ...MOCK_ANALYSIS_RESULT, overallScore: 150 };
    const res = analysisResponseSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });
});
