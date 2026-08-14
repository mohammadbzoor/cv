import { ShieldCheck, LayoutTemplate, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { TemplateThumbnail } from './TemplateThumbnail';
import { TemplateCompatibilityBadge } from './TemplateCompatibilityBadge';

/**
 * Modal dialog for inspecting template details and ATS disclaimer.
 */
export function TemplateDetailsDialog({ template, isOpen, onClose, onSelect }) {
  const { t } = useTranslation('templates');

  if (!template) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t(template.nameKey)}
      size="lg"
    >
      <div className="space-y-6">
        {/* ATS Disclaimer */}
        <div className="p-4 bg-primary-subtle border border-primary/20 rounded-xl text-xs text-primary flex items-start gap-3">
          <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">{t('atsDisclaimer')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Miniature Thumbnail */}
          <div className="bg-surface-muted p-4 rounded-xl border border-border flex items-center justify-center">
            <TemplateThumbnail variant={template.thumbnailVariant} className="max-w-[200px]" />
          </div>

          {/* Metadata */}
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <TemplateCompatibilityBadge level={template.compatibilityLevel} size="md" />
              <p className="text-foreground-secondary leading-relaxed pt-1">
                {t(template.descriptionKey)}
              </p>
            </div>

            <div className="space-y-1">
              <strong className="font-bold text-foreground block">{t('recommendedFor')}</strong>
              <div className="flex flex-wrap gap-1">
                {template.recommendedFor?.map((role, i) => (
                  <span key={i} className="px-2 py-0.5 bg-surface-muted border border-border rounded text-[11px] text-foreground-secondary">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <strong className="font-bold text-foreground block">{t('supportedSections')}</strong>
              <p className="text-foreground-secondary uppercase tracking-wider font-mono text-[11px]">
                {template.supportedSections?.join(' • ')}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
          <Button type="button" variant="outline" size="md" onClick={onClose}>
            {t('close')}
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            leadingIcon={LayoutTemplate}
            onClick={() => {
              onSelect(template.id);
              onClose();
            }}
          >
            {t('useTemplate')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
