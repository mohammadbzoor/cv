import { describe, it, expect } from 'vitest';
import { clampZoomScale, calculateFitScale } from '../features/builder/utils/calculatePreviewScale';

describe('Preview Zoom Utilities', () => {
  it('clamps zoom values between 0.5 and 1.5', () => {
    expect(clampZoomScale(0.2)).toBe(0.5);
    expect(clampZoomScale(2.0)).toBe(1.5);
    expect(clampZoomScale(1.2)).toBe(1.2);
    expect(clampZoomScale(NaN)).toBe(1.0);
  });

  it('calculates fit scale ratio based on container width', () => {
    const scaleLarge = calculateFitScale(1200, 794);
    expect(scaleLarge).toBeLessThanOrEqual(1.5);

    const scaleSmall = calculateFitScale(400, 794);
    expect(scaleSmall).toBeGreaterThanOrEqual(0.5);
  });
});
