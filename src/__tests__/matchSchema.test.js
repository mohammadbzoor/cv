import { describe, it, expect } from 'vitest';
import { matchResponseSchema } from '../features/ai-services/contracts/serviceContracts';
import { MOCK_MATCH_RESULT } from '../features/ai-services/mocks/mockMatchResult';
import { runMatchService } from '../features/match/services/matchService';

describe('Job Match Service & Schema', () => {
  it('validates deterministic MOCK_MATCH_RESULT correctly', () => {
    const res = matchResponseSchema.safeParse(MOCK_MATCH_RESULT);
    expect(res.success).toBe(true);
  });

  it('runMatchService rejects short job description text under 100 characters', async () => {
    await expect(runMatchService({ jobDescription: 'Short text' })).rejects.toThrow();
  });
});
