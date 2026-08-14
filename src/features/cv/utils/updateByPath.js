/**
 * Safely and immutably updates a nested property value within an object tree given a dot-separated string path.
 * Protects against prototype pollution vulnerabilities.
 *
 * @param {object} obj Target root object.
 * @param {string} path Dot-separated property path (e.g. 'personalInfo.fullName', 'experiences.0.position').
 * @param {any} value New value to set.
 * @returns {object} Fresh object tree with updated path.
 * @throws {Error} If path is empty, invalid, or attempts prototype pollution.
 */
export function updateByPath(obj, path, value) {
  if (!obj || typeof obj !== 'object') {
    throw new Error('TARGET_NOT_OBJECT');
  }

  if (typeof path !== 'string' || !path.trim()) {
    throw new Error('INVALID_PATH');
  }

  const keys = path.split('.').map((k) => k.trim());
  const forbiddenKeys = new Set(['__proto__', 'prototype', 'constructor']);

  for (const key of keys) {
    if (forbiddenKeys.has(key)) {
      throw new Error('PROTOTYPE_POLLUTION_DETECTED');
    }
  }

  function setRecursive(current, index) {
    const key = keys[index];

    // Array index check
    const isArrayIndex = /^\d+$/.test(key);
    const keyOrIdx = isArrayIndex ? parseInt(key, 10) : key;

    if (index === keys.length - 1) {
      if (Array.isArray(current)) {
        const nextArray = [...current];
        nextArray[keyOrIdx] = value;
        return nextArray;
      } else {
        return {
          ...current,
          [keyOrIdx]: value,
        };
      }
    }

    const nextTarget = current ? current[keyOrIdx] : undefined;
    const nextKey = keys[index + 1];
    const isNextArrayIndex = /^\d+$/.test(nextKey);

    let nextValue;
    if (nextTarget !== undefined && nextTarget !== null) {
      nextValue = setRecursive(nextTarget, index + 1);
    } else {
      // Create empty object or array as placeholder
      const emptyChild = isNextArrayIndex ? [] : {};
      nextValue = setRecursive(emptyChild, index + 1);
    }

    if (Array.isArray(current)) {
      const nextArray = [...current];
      nextArray[keyOrIdx] = nextValue;
      return nextArray;
    } else {
      return {
        ...current,
        [keyOrIdx]: nextValue,
      };
    }
  }

  return setRecursive(obj, 0);
}
