import { mockServiceClient } from '../../ai-services/services/mockServiceClient';
import { MOCK_IMPROVEMENT_RESULT } from '../../ai-services/mocks/mockImprovementResult';
import { improvementResponseSchema } from '../../ai-services/contracts/serviceContracts';

export async function runImproveService({ shouldFail = false, signal } = {}) {
  return mockServiceClient({
    data: MOCK_IMPROVEMENT_RESULT,
    schema: improvementResponseSchema,
    delay: 700,
    shouldFail,
    signal,
  });
}
