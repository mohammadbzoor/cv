/**
 * Normalizes HTTP or application errors into a standardized format.
 *
 * @typedef {Object} NormalizedError
 * @property {string} message - Human-readable error message.
 * @property {number|null} status - HTTP status code if available, otherwise null.
 * @property {unknown} details - Raw error details or response payload.
 */

/**
 * Transforms an Axios or generic JavaScript error into a unified structure.
 *
 * @param {unknown} error - The error object to normalize.
 * @returns {NormalizedError} Standardized error representation.
 */
export function normalizeError(error) {
  if (error && typeof error === 'object' && 'isAxiosError' in error && error.isAxiosError) {
    const axiosError = /** @type {import('axios').AxiosError} */ (error);
    return {
      message: axiosError.response?.data?.message || axiosError.message || 'An unexpected API error occurred',
      status: axiosError.response?.status || null,
      details: axiosError.response?.data || null,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      status: null,
      details: error.stack || null,
    };
  }

  return {
    message: typeof error === 'string' ? error : 'An unknown error occurred',
    status: null,
    details: error || null,
  };
}
