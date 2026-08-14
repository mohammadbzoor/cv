import { mockServiceClient } from '../../ai-services/services/mockServiceClient';
import { MOCK_MATCH_RESULT } from '../../ai-services/mocks/mockMatchResult';
import { matchResponseSchema } from '../../ai-services/contracts/serviceContracts';
import { createServiceError } from '../../ai-services/utils/createServiceError';

export async function runMatchService({ jobDescription, shouldFail = false, signal } = {}) {
  if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length < 100) {
    throw createServiceError(
      'JOB_DESCRIPTION_TOO_SHORT',
      'Job description text is too short. Please provide at least 100 characters.',
      400
    );
  }

  return mockServiceClient({
    data: MOCK_MATCH_RESULT,
    schema: matchResponseSchema,
    delay: 750,
    shouldFail,
    signal,
  });
}
