import { normalizeCVData } from '../../cv/utils/normalizeCVData';

/**
 * Transforms React Hook Form values into normalized CV Data state for Zustand store.
 *
 * @param {object} formValues React Hook Form state.
 * @returns {object} Normalized CV Data object.
 */
export function mapFormToStore(formValues) {
  const normalized = normalizeCVData(formValues);

  return {
    ...normalized,
    document: {
      language: 'en',
      direction: 'ltr',
    },
    design: {
      ...normalized.design,
      pageSize: 'A4',
    },
  };
}
