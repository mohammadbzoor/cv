import { describe, it, expect } from 'vitest';
import { improvementResponseSchema } from '../features/ai-services/contracts/serviceContracts';
import { MOCK_IMPROVEMENT_RESULT } from '../features/ai-services/mocks/mockImprovementResult';

describe('Improvement Suggestions Schema', () => {
  it('validates deterministic MOCK_IMPROVEMENT_RESULT correctly', () => {
    const res = improvementResponseSchema.safeParse(MOCK_IMPROVEMENT_RESULT);
    expect(res.success).toBe(true);
  });
});
