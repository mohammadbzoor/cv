import { useTranslation } from 'react-i18next';
import { LayoutTemplate, Check, X } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { TemplateThumbnail } from './TemplateThumbnail';
import { TemplateCompatibilityBadge } from './TemplateCompatibilityBadge';
import { getTemplateName } from '../registry/templateMetadata';

export function TemplateComparisonDialog({ templates = [], isOpen, onClose, onSelect }) {
  const { t } = useTranslation('templates');

  if (!templates || templates.length === 0) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('compareTemplatesTitle')}
      size="lg"
    >
      <div className="space-y-6 text-start">
        <p className="text-xs text-foreground-secondary leading-relaxed">
          {t('compareTemplatesDesc')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((tpl) => {
            const templateName = getTemplateName(tpl.id);

            return (
              <div key={tpl.id} className="p-4 bg-surface border border-border rounded-2xl space-y-4 shadow-2xs flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Thumbnail */}
                  <div className="h-48 bg-app-bg rounded-xl overflow-hidden flex items-center justify-center p-2 border border-border/40">
                    <TemplateThumbnail variant={tpl.thumbnailVariant} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-foreground">{templateName}</h3>
                      <TemplateCompatibilityBadge level={tpl.compatibilityLevel} />
                    </div>
                    <p className="text-xs text-foreground-secondary leading-relaxed">{t(tpl.descriptionKey)}</p>
                  </div>

                  {/* Attributes comparison list */}
                  <div className="space-y-2 border-t border-border/60 pt-3 text-xs">
                    <div>
                      <span className="font-bold text-foreground block">{t('categoryLabel')}:</span>
                      <span className="text-foreground-secondary capitalize">{tpl.category}</span>
                    </div>

                    <div>
                      <span className="font-bold text-foreground block">{t('recommendedFor')}:</span>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {tpl.recommendedFor?.map((role) => (
                          <span key={role} className="px-2 py-0.5 bg-surface-muted border border-border rounded text-[11px]">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-foreground block">{t('keyTraits')}:</span>
                      <ul className="list-disc list-inside text-foreground-secondary space-y-0.5 pt-1">
                        {tpl.keyTraits?.map((trait) => (
                          <li key={trait}>{trait}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-foreground">{t('customizationSupport')}:</span>
                      <span className="text-success font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Color & Density
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  leadingIcon={LayoutTemplate}
                  onClick={() => {
                    onClose();
                    onSelect(tpl.id);
                  }}
                  className="w-full mt-4"
                >
                  {t('useTemplate')}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
