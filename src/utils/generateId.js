let fallbackCounter = 0;

/**
 * Generates a unique string identifier for UI data elements (e.g. experience items, skills).
 * Note: These identifiers are designed for client-side React list keying and data references,
 * not for security or cryptographic authorization tokens.
 *
 * @param {string} [prefix='id'] Optional prefix for the generated identifier.
 * @returns {string} Unique identifier string.
 */
export function generateId(prefix = 'id') {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return prefix ? `${prefix}_${crypto.randomUUID()}` : crypto.randomUUID();
  }

  // Fallback implementation using timestamp, counter, and random values
  fallbackCounter = (fallbackCounter + 1) % 10000;
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 9);
  const counterPart = fallbackCounter.toString(36);

  return `${prefix}_${timestamp}_${counterPart}_${randomPart}`;
}
