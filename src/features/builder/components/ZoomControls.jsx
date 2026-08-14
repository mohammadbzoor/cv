import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/Button';

/**
 * Live Preview Zoom Control Toolbar.
 */
export function ZoomControls({ zoomScale, onZoomIn, onZoomOut, onZoomReset, onZoomFit }) {
  const { t } = useTranslation('builder');
  const percentage = Math.round(zoomScale * 100);

  return (
    <div className="flex items-center gap-1.5 bg-surface border border-border px-2 py-1 rounded-xl shadow-2xs text-xs">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onZoomOut}
        aria-label={t('zoomOut')}
        title={t('zoomOut')}
      >
        <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
      </Button>

      <span className="font-mono font-bold text-foreground px-1.5 min-w-[42px] text-center select-none">
        {percentage}%
      </span>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onZoomIn}
        aria-label={t('zoomIn')}
        title={t('zoomIn')}
      >
        <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
      </Button>

      <div className="w-px h-4 bg-border/80 my-auto mx-0.5" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onZoomFit}
        aria-label={t('zoomFit')}
        title={t('zoomFit')}
      >
        <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onZoomReset}
        aria-label={t('zoomReset')}
        title={t('zoomReset')}
      >
        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
      </Button>
    </div>
  );
}
