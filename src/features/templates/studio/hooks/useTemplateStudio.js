import { useState, useMemo, useCallback } from 'react';
import { useCVStore } from '../../../cv/store/useCVStore';
import { selectTemplateId } from '../../../cv/store/cvSelectors';
import { getAvailableTemplates, getTemplateById } from '../../registry/templateRegistry';
import { useTemplateFilters } from './useTemplateFilters';
import { useTemplateComparison } from './useTemplateComparison';

export function useTemplateStudio() {
  const currentStoreTemplateId = useCVStore(selectTemplateId);
  const setTemplate = useCVStore((state) => state.setTemplate);

  const allTemplates = getAvailableTemplates();

  const [selectedStudioTemplateId, setSelectedStudioTemplateId] = useState(
    () => currentStoreTemplateId || 'technical-prime-ats'
  );

  const [activePreviewTemplate, setActivePreviewTemplate] = useState(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const filters = useTemplateFilters(allTemplates);
  const comparison = useTemplateComparison(2);

  const activeStudioTemplate = useMemo(() => {
    return getTemplateById(selectedStudioTemplateId);
  }, [selectedStudioTemplateId]);

  const handleSelectTemplate = useCallback((templateId) => {
    setSelectedStudioTemplateId(templateId);
    setTemplate(templateId);
  }, [setTemplate]);

  return {
    allTemplates,
    selectedStudioTemplateId,
    activeStudioTemplate,
    activePreviewTemplate,
    setActivePreviewTemplate,
    isCompareOpen,
    setIsCompareOpen,
    handleSelectTemplate,
    filters,
    comparison,
  };
}
