import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, FileText, ShieldCheck, Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';
import { TemplateRenderer } from './TemplateRenderer';
import { PlainTextPreview } from '../ats/components/PlainTextPreview';
import { ATSStructurePanel } from '../ats/components/ATSStructurePanel';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

export function TemplateLivePreview({
  activeTemplate,
  cvData,
  isSampleData,
  onFieldCommit,
}) {
  const { t } = useTranslation('templates');

  const [activeTab, setActiveTab] = useState('visual'); // 'visual' | 'plaintext' | 'ats'
  const [zoomLevel, setZoomLevel] = useState(1); // 0.5, 0.75, 1
  const [isFullscreen, setIsFullscreen] = useState(false);

  const zoomStyles = {
    transform: `scale(${zoomLevel})`,
    transformOrigin: 'top center',
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-4 md:p-6 space-y-4 shadow-2xs">
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
        <div className="flex items-center gap-1 bg-surface-muted p-1 rounded-xl border border-border/60 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('visual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'visual' ? 'bg-surface text-foreground shadow-2xs' : 'text-foreground-secondary hover:text-foreground'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-primary" />
            <span>{t('tabVisualPreview')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('plaintext')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'plaintext' ? 'bg-surface text-foreground shadow-2xs' : 'text-foreground-secondary hover:text-foreground'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-secondary" />
            <span>{t('tabPlainTextReading')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ats')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'ats' ? 'bg-surface text-foreground shadow-2xs' : 'text-foreground-secondary hover:text-foreground'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-success" />
            <span>{t('tabStructureCheck')}</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'visual' && (
        <div className="space-y-3">
          {/* Zoom & Fullscreen Controls */}
          <div className="flex items-center justify-between text-xs text-foreground-secondary px-1">
            <div className="flex items-center gap-2">
              <span>{t('zoom')}:</span>
              <button
                type="button"
                onClick={() => setZoomLevel(0.5)}
                className={`px-2 py-0.5 rounded border transition-colors ${zoomLevel === 0.5 ? 'bg-primary text-on-primary font-bold' : 'bg-surface border-border'}`}
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(0.75)}
                className={`px-2 py-0.5 rounded border transition-colors ${zoomLevel === 0.75 ? 'bg-primary text-on-primary font-bold' : 'bg-surface border-border'}`}
              >
                75%
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className={`px-2 py-0.5 rounded border transition-colors ${zoomLevel === 1 ? 'bg-primary text-on-primary font-bold' : 'bg-surface border-border'}`}
              >
                100%
              </button>
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

          {/* Canvas Sheet */}
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

      {activeTab === 'plaintext' && (
        <div className="p-2">
          <PlainTextPreview cvData={cvData} />
        </div>
      )}

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
        <div className="space-y-4">
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
