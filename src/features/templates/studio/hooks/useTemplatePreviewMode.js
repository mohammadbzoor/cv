import { useState, useCallback } from 'react';

export function useTemplatePreviewMode() {
  const [activeTab, setActiveTab] = useState('visual'); // 'visual' | 'plaintext' | 'ats'
  const [zoomLevel, setZoomLevel] = useState(1); // 0.5, 0.75, 1
  const [isFullscreen, setIsFullscreen] = useState(false);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(1.25, Number((prev + 0.1).toFixed(2))));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(0.4, Number((prev - 0.1).toFixed(2))));
  }, []);

  return {
    activeTab,
    setActiveTab,
    zoomLevel,
    setZoomLevel,
    resetZoom,
    handleZoomIn,
    handleZoomOut,
    isFullscreen,
    setIsFullscreen,
  };
}
