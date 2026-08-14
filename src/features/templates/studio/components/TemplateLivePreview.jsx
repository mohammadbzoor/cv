import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Maximize2, Minimize2, CheckCircle2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { TemplateRenderer } from '../../components/TemplateRenderer';
import { ReadingOrderInspector } from './ReadingOrderInspector';
import { ATSStructurePanel } from '../../ats/components/ATSStructurePanel';
import { TemplatePreviewTabs } from './TemplatePreviewTabs';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';

export function TemplateLivePreview({
  activeTemplate,
  cvData,
  isSampleData,
  onFieldCommit,
  previewMode,
}) {
  const { t } = useTranslation('templates');

  const {
    activeTab,
    setActiveTab,
    zoomLevel,
    setZoomLevel,
    resetZoom,
    handleZoomIn,
    handleZoomOut,
    isFullscreen,
    setIsFullscreen,
  } = previewMode;

  // Optional keyboard shortcuts for Zoom (Ctrl/Cmd + Plus, Minus, 0)
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && activeTab === 'visual') {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          handleZoomIn();
        } else if (e.key === '-') {
          e.preventDefault();
          handleZoomOut();
        } else if (e.key === '0') {
          e.preventDefault();
          resetZoom();
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, handleZoomIn, handleZoomOut, resetZoom]);

  const zoomStyles = {
    transform: `scale(${zoomLevel})`,
    transformOrigin: 'top center',
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-4 md:p-6 space-y-4 shadow-2xs text-start">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        {/* Source Badge */}
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold ${
              isSampleData
                ? 'bg-warning-subtle text-warning border border-warning/20'
                : 'bg-success-subtle text-success border border-success/20'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isSampleData ? t('previewingSampleData') : t('previewingYourCv')}</span>
          </span>
        </div>

        {/* Tabs */}
        <TemplatePreviewTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Visual Preview Tab */}
      {activeTab === 'visual' && (
        <div className="space-y-3">
          {/* Zoom & Fullscreen Toolbar */}
          <div className="flex items-center justify-between text-xs text-foreground-secondary px-1 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold">{t('zoom')}:</span>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1 rounded border border-border bg-surface hover:bg-surface-muted transition-colors cursor-pointer"
                title="Zoom Out (Ctrl+-)"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setZoomLevel(0.5)}
                className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${zoomLevel === 0.5 ? 'bg-primary text-on-primary font-bold' : 'bg-surface border-border'}`}
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(0.75)}
                className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${zoomLevel === 0.75 ? 'bg-primary text-on-primary font-bold' : 'bg-surface border-border'}`}
              >
                75%
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${zoomLevel === 1 ? 'bg-primary text-on-primary font-bold' : 'bg-surface border-border'}`}
              >
                100%
              </button>

              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1 rounded border border-border bg-surface hover:bg-surface-muted transition-colors cursor-pointer"
                title="Zoom In (Ctrl++)"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              {zoomLevel !== 1 && (
                <button
                  type="button"
                  onClick={resetZoom}
                  className="p-1 rounded border border-border bg-surface hover:bg-surface-muted transition-colors text-danger cursor-pointer"
                  title="Reset Zoom (Ctrl+0)"
                  aria-label="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              size="xs"
              leadingIcon={Maximize2}
              onClick={() => setIsFullscreen(true)}
            >
              {t('fullscreen')}
            </Button>
          </div>

          {/* Canvas Sheet Area */}
          <div className="bg-app-bg border border-border/80 rounded-xl p-4 md:p-8 flex justify-center items-start min-h-[600px] overflow-auto">
            <div
              lang="en"
              dir="ltr"
              className="w-full max-w-[800px] bg-white text-slate-900 shadow-2xl rounded border border-slate-200 transition-transform duration-200"
              style={zoomStyles}
            >
              <TemplateRenderer
                templateId={activeTemplate.id}
                cvData={cvData}
                editable={true}
                onFieldCommit={onFieldCommit}
              />
            </div>
          </div>
        </div>
      )}

      {/* Plain Text Reading Tab */}
      {activeTab === 'plaintext' && (
        <div className="p-2">
          <ReadingOrderInspector cvData={cvData} />
        </div>
      )}

      {/* ATS Structure Check Tab */}
      {activeTab === 'ats' && (
        <div className="p-2">
          <ATSStructurePanel cvData={cvData} templateMetadata={activeTemplate} />
        </div>
      )}

      {/* Fullscreen Modal */}
      <Modal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        title={`${activeTemplate.id.toUpperCase()} — Fullscreen Live Preview`}
        size="lg"
      >
        <div className="space-y-4 text-start">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="xs"
              leadingIcon={Minimize2}
              onClick={() => setIsFullscreen(false)}
            >
              {t('exitFullscreen')}
            </Button>
          </div>

          <div className="bg-app-bg p-6 rounded-xl flex justify-center overflow-auto max-h-[75vh]">
            <div lang="en" dir="ltr" className="w-full max-w-[850px] bg-white shadow-xl rounded border border-slate-200 p-2">
              <TemplateRenderer
                templateId={activeTemplate.id}
                cvData={cvData}
                editable={true}
                onFieldCommit={onFieldCommit}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
