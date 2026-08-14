/**
 * Standardized Service Error Object Creator.
 *
 * @param {string} code Error code string.
 * @param {string} message Descriptive message.
 * @param {number|null} [status=null] Optional HTTP status.
 * @param {unknown} [details=null] Optional detailed metadata.
 * @returns {object} Serializable service error object.
 */
export function createServiceError(code, message, status = null, details = null) {
  return Object.freeze({
    code: code || 'UNKNOWN_ERROR',
    message: message || 'An unexpected service error occurred.',
    status: status || null,
    details: details || null,
  });
}
