import { mockServiceClient } from '../../ai-services/services/mockServiceClient';
import { MOCK_ANALYSIS_RESULT } from '../../ai-services/mocks/mockAnalysisResult';
import { analysisResponseSchema } from '../../ai-services/contracts/serviceContracts';

/**
 * Service execution function for CV Structural Analysis.
 *
 * @param {object} params Parameters.
 * @param {boolean} [params.shouldFail=false] Forces mock failure.
 * @param {AbortSignal} [params.signal] AbortController signal.
 * @returns {Promise<object>} Validated analysis result.
 */
export async function runAnalyzeService({ shouldFail = false, signal } = {}) {
  return mockServiceClient({
    data: MOCK_ANALYSIS_RESULT,
    schema: analysisResponseSchema,
    delay: 700,
    shouldFail,
    signal,
  });
}
