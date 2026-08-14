import { useState, useCallback, useMemo } from 'react';
import { getTemplateById } from '../../registry/templateRegistry';

export function useTemplateComparison(maxCompare = 2) {
  const [comparedTemplateIds, setComparedTemplateIds] = useState([]);

  const toggleCompare = useCallback((templateId) => {
    setComparedTemplateIds((prev) => {
      if (prev.includes(templateId)) {
        return prev.filter((id) => id !== templateId);
      }
      if (prev.length >= maxCompare) {
        return [prev[1], templateId];
      }
      return [...prev, templateId];
    });
  }, [maxCompare]);

  const clearComparison = useCallback(() => {
    setComparedTemplateIds([]);
  }, []);

  const comparedTemplates = useMemo(() => {
    return comparedTemplateIds.map((id) => getTemplateById(id)).filter(Boolean);
  }, [comparedTemplateIds]);

  return {
    comparedTemplateIds,
    comparedTemplates,
    toggleCompare,
    clearComparison,
    canAddMore: comparedTemplateIds.length < maxCompare,
  };
}
