/**
 * Centralized Builder constants, zoom boundaries, and security allowlists.
 */

export const DEFAULT_ZOOM = 1.0;
export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 1.5;
export const ZOOM_STEP = 0.1;

export const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{3}){1,2}$/;

export const SAFE_FONT_FAMILIES = Object.freeze([
  { id: 'Inter', name: 'Inter (Sans-serif)', fallback: 'Inter, system-ui, sans-serif' },
  { id: 'Arial', name: 'Arial (Clean Sans)', fallback: 'Arial, Helvetica, sans-serif' },
  { id: 'Georgia', name: 'Georgia (Classic Serif)', fallback: 'Georgia, serif' },
  { id: 'System Sans', name: 'System UI', fallback: 'system-ui, -apple-system, sans-serif' },
]);
