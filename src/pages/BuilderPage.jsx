import { useEffect } from 'react';
import { useCVStore } from '../features/cv/store/useCVStore';
import { selectCVData } from '../features/cv/store/cvSelectors';
import { BuilderLayout } from '../features/builder/components/BuilderLayout';
import { normalizeCVData } from '../features/cv/utils/normalizeCVData';

/**
 * CV Builder Page Component.
 * Responsible for state hydration guard and rendering the Studio Builder Layout.
 */
export default function BuilderPage() {
  const cvData = useCVStore(selectCVData);
  const replaceCVData = useCVStore((state) => state.replaceCVData);

  useEffect(() => {
    if (!cvData) {
      const fallback = normalizeCVData(null);
      replaceCVData(fallback);
    }
  }, [cvData, replaceCVData]);

  return <BuilderLayout />;
}
