import { MIN_ZOOM, MAX_ZOOM, DEFAULT_ZOOM } from '../constants/builderConstants';

/**
 * Calculates clamped preview scale level.
 *
 * @param {number} requestedZoom Requested zoom factor (0.5 to 1.5).
 * @returns {number} Clamped zoom factor.
 */
export function clampZoomScale(requestedZoom) {
  if (typeof requestedZoom !== 'number' || Number.isNaN(requestedZoom)) {
    return DEFAULT_ZOOM;
  }
  return Math.min(Math.max(requestedZoom, MIN_ZOOM), MAX_ZOOM);
}

/**
 * Calculates scale ratio needed to fit A4 page width (210mm ~ 794px at 96DPI) inside container width.
 *
 * @param {number} containerWidth Available container width in pixels.
 * @param {number} pageWidthPx Standard A4 width in pixels (~794px).
 * @returns {number} Calculated fit scale factor.
 */
export function calculateFitScale(containerWidth, pageWidthPx = 794) {
  if (!containerWidth || containerWidth <= 0) return DEFAULT_ZOOM;
  const paddingMargin = 48; // Account for padding
  const available = containerWidth - paddingMargin;
  const scale = available / pageWidthPx;
  return clampZoomScale(scale);
}
