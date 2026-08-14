import { useEffect } from 'react';

/**
 * Custom hook to update document title and meta description.
 *
 * @param {{ title?: string, description?: string }} options
 */
export function useDocumentMetadata({ title, description } = {}) {
  useEffect(() => {
    const originalTitle = document.title;
    if (title) {
      document.title = title;
    }

    let metaDesc = document.querySelector('meta[name="description"]');
    let originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';

    if (description) {
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
    };
  }, [title, description]);
}
