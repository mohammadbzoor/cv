import { useState } from 'react';
import { clampZoomScale, calculateFitScale } from '../utils/calculatePreviewScale';
import { DEFAULT_ZOOM, ZOOM_STEP } from '../constants/builderConstants';

/**
 * Custom hook managing live preview zoom level and fit-to-container scaling.
 */
export function usePreviewZoom(initialZoom = DEFAULT_ZOOM) {
  const [zoomScale, setZoomScale] = useState(initialZoom);

  function zoomIn() {
    setZoomScale((prev) => clampZoomScale(prev + ZOOM_STEP));
  }

  function zoomOut() {
    setZoomScale((prev) => clampZoomScale(prev - ZOOM_STEP));
  }

  function zoomReset() {
    setZoomScale(DEFAULT_ZOOM);
  }

  function zoomFit(containerWidth) {
    const scale = calculateFitScale(containerWidth);
    setZoomScale(scale);
  }

  return {
    zoomScale,
    setZoomScale: (val) => setZoomScale(clampZoomScale(val)),
    zoomIn,
    zoomOut,
    zoomReset,
    zoomFit,
  };
}
