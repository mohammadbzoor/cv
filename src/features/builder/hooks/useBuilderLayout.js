import { useState } from 'react';

/**
 * Custom hook managing active layout tab for tablet/mobile viewports ('content' | 'preview' | 'design').
 */
export function useBuilderLayout(initialTab = 'preview') {
  const [activeTab, setActiveTab] = useState(initialTab);

  return {
    activeTab,
    setActiveTab,
  };
}
