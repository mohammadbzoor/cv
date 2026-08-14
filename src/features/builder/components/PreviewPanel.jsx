import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CVPreview } from './CVPreview';
import { ZoomControls } from './ZoomControls';
import { usePreviewZoom } from '../hooks/usePreviewZoom';

/**
 * Preview Panel container hosting the zoom control bar and live A4 document.
 */
export function PreviewPanel() {
  const { t } = useTranslation('builder');
  const containerRef = useRef(null);
  const { zoomScale, zoomIn, zoomOut, zoomReset, zoomFit } = usePreviewZoom(1.0);

  function handleFit() {
    if (containerRef.current) {
      zoomFit(containerRef.current.clientWidth);
    }
  }

  return (
    <div className="flex flex-col h-full bg-app-bg relative overflow-hidden">
      {/* Top Floating Bar: Zoom & Draft Badge */}
      <div className="p-3 border-b border-border/60 flex items-center justify-between bg-surface/80 backdrop-blur shrink-0 z-10 gap-2 flex-wrap">
        <span className="text-[11px] font-semibold text-foreground-secondary px-2.5 py-1 bg-surface-muted border border-border rounded-lg">
          {t('draftPreviewBadge')}
        </span>

        <ZoomControls
          zoomScale={zoomScale}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onZoomReset={zoomReset}
          onZoomFit={handleFit}
        />
      </div>

      {/* Main Preview Scroll Area */}
      <div ref={containerRef} className="flex-1 overflow-auto relative">
        <CVPreview zoomScale={zoomScale} />
      </div>
    </div>
  );
}
