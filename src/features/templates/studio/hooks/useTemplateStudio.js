import { useState, useMemo, useCallback } from 'react';
import { useCVStore } from '../../../cv/store/useCVStore';
import { selectCVData, selectTemplateId } from '../../../cv/store/cvSelectors';
import { getAvailableTemplates, getTemplateById } from '../../registry/templateRegistry';
import { getPreviewCvData } from '../../data/sampleCvData';
import { useTemplateFilters } from './useTemplateFilters';
import { useTemplateComparison } from './useTemplateComparison';
import { useTemplateRecommendation } from './useTemplateRecommendation';
import { useTemplatePreviewMode } from './useTemplatePreviewMode';

export function useTemplateStudio() {
  const cvData = useCVStore(selectCVData);
  const currentStoreTemplateId = useCVStore(selectTemplateId);
  const setTemplate = useCVStore((state) => state.setTemplate);
  const updateByPath = useCVStore((state) => state.updateByPath);
  const undo = useCVStore((state) => state.undo);
  const redo = useCVStore((state) => state.redo);
  const canUndo = useCVStore((state) => state.past?.length > 0);
  const canRedo = useCVStore((state) => state.future?.length > 0);

  const allTemplates = getAvailableTemplates();

  const [selectedStudioTemplateId, setSelectedStudioTemplateId] = useState(
    () => currentStoreTemplateId || 'technical-prime-ats'
  );

  const [activePreviewTemplate, setActivePreviewTemplate] = useState(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState('templates'); // 'templates' | 'preview' | 'customize'

  const filters = useTemplateFilters(allTemplates);
  const comparison = useTemplateComparison(2);
  const recommendation = useTemplateRecommendation(cvData);
  const previewMode = useTemplatePreviewMode();

  const activeStudioTemplate = useMemo(() => {
    return getTemplateById(selectedStudioTemplateId);
  }, [selectedStudioTemplateId]);

  const { data: previewCvData, isSample: isSampleData } = useMemo(() => {
    return getPreviewCvData(cvData);
  }, [cvData]);

  const handleSelectTemplate = useCallback((templateId) => {
    setSelectedStudioTemplateId(templateId);
    setTemplate(templateId);
  }, [setTemplate]);

  return {
    cvData,
    previewCvData,
    isSampleData,
    allTemplates,
    selectedStudioTemplateId,
    activeStudioTemplate,
    activePreviewTemplate,
    setActivePreviewTemplate,
    isCompareOpen,
    setIsCompareOpen,
    mobileTab,
    setMobileTab,
    handleSelectTemplate,
    updateByPath,
    undo,
    redo,
    canUndo,
    canRedo,
    filters,
    comparison,
    recommendation,
    previewMode,
  };
}
