import { createServiceError } from '../utils/createServiceError';

/**
 * Universal Mock Async Service Client.
 * Simulates network latency with AbortSignal support and Zod response validation.
 *
 * @param {object} params Parameter object.
 * @param {any} params.data Data payload to return on success.
 * @param {import('zod').ZodSchema} [params.schema] Optional Zod schema for response validation.
 * @param {number} [params.delay=500] Simulated latency in ms.
 * @param {boolean} [params.shouldFail=false] Forces controlled mock error.
 * @param {AbortSignal} [params.signal] AbortController signal.
 * @returns {Promise<any>} Validated mock payload.
 */
export async function mockServiceClient({
  data,
  schema,
  delay = 500,
  shouldFail = false,
  signal,
}) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(createServiceError('REQUEST_CANCELLED', 'Service request was cancelled.', null));
      return;
    }

    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(createServiceError('REQUEST_CANCELLED', 'Service request was cancelled.', null));
        return;
      }

      if (shouldFail) {
        reject(
          createServiceError('MOCK_SERVICE_FAILED', 'Simulated intelligence service error occurred.', 500)
        );
        return;
      }

      if (schema) {
        const parsed = schema.safeParse(data);
        if (!parsed.success) {
          reject(
            createServiceError(
              'INVALID_RESPONSE',
              'Service response failed structural schema validation.',
              422,
              parsed.error.format()
            )
          );
          return;
        }
        resolve(parsed.data);
        return;
      }

      resolve(data);
    }, delay);

    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(createServiceError('REQUEST_CANCELLED', 'Service request was cancelled.', null));
      });
    }
  });
}
