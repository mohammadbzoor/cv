import { useTranslation } from 'react-i18next';
import { LayoutTemplate, CheckCircle2, Info } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { TemplateRenderer } from './TemplateRenderer';
import { TemplateCompatibilityBadge } from './TemplateCompatibilityBadge';
import { getTemplateName } from '../registry/templateMetadata';
import { templatePreviewData } from '../data/templatePreviewData';

export function TemplateDetailsDialog({ template, isOpen, onClose, onSelect, onSelectAndOpenBuilder }) {
  const { t } = useTranslation('templates');

  if (!template) return null;

  const templateName = getTemplateName(template.id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={templateName}
      size="md"
    >
      <div className="space-y-6 text-start">
        {/* Full Interactive Document Preview */}
        <div className="h-96 bg-slate-100 rounded-xl overflow-y-auto p-4 border border-border/40 relative shadow-inner">
          <div className="w-full max-w-[800px] mx-auto bg-white shadow-md">
            {/* 
              Scale it down or let it scroll. Since it's a dialog, scrolling is fine and often better 
              than extreme downscaling that makes it unreadable. 
            */}
            <TemplateRenderer
              templateId={template.id}
              cvData={templatePreviewData}
              isInteractive={false}
              lang="en"
              dir="ltr"
            />
          </div>
        </div>

        {/* Info Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-foreground">{templateName}</h3>
            <TemplateCompatibilityBadge level={template.compatibilityLevel} />
          </div>

          <p className="text-xs text-foreground-secondary leading-relaxed">
            {t(template.descriptionKey)}
          </p>
        </div>

        {/* Details Grid */}
        <div className="space-y-3 border-t border-b border-border/60 py-4 text-xs">
          <div>
            <span className="font-bold text-foreground block mb-1">{t('recommendedFor')}:</span>
            <div className="flex flex-wrap gap-1.5">
              {template.recommendedFor?.map((role) => (
                <span key={role} className="px-2.5 py-1 bg-surface border border-border rounded-md font-medium text-foreground">
                  {role}
                </span>
              ))}
            </div>
          </div>

          {template.keyTraits && (
            <div>
              <span className="font-bold text-foreground block mb-1">{t('keyTraits')}:</span>
              <ul className="list-disc list-inside text-foreground-secondary space-y-0.5">
                {template.keyTraits.map((trait) => (
                  <li key={trait}>{trait}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-3 bg-secondary-subtle/50 border border-secondary/20 rounded-xl text-foreground-secondary flex items-start gap-2">
            <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
            <span className="leading-relaxed">{t('atsDisclaimer')}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            {t('cancel', { defaultValue: 'Close' })}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            leadingIcon={CheckCircle2}
            onClick={() => {
              onSelect(template.id);
            }}
          >
            {t('useTemplate')}
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            leadingIcon={LayoutTemplate}
            onClick={() => {
              onClose();
              if (onSelectAndOpenBuilder) onSelectAndOpenBuilder(template.id);
            }}
          >
            {t('useAndOpenBuilder', { defaultValue: 'Select & Open Builder' })}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
