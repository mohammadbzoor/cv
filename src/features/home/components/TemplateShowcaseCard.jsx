import { useTranslation } from 'react-i18next';
import { TemplateThumbnail } from '../../templates/components/TemplateThumbnail';
import { getTemplateName } from '../../templates/registry/templateMetadata';

export function TemplateShowcaseCard({ template }) {
  const { t } = useTranslation('templates');
  const templateName = getTemplateName(template.id);

  return (
    <div className="p-5 bg-surface border border-border rounded-2xl shadow-2xs space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="h-44 bg-app-bg rounded-xl overflow-hidden flex items-center justify-center p-2 border border-border/40">
          <TemplateThumbnail variant={template.thumbnailVariant} />
        </div>

        <div className="space-y-1 text-start">
          <h3 className="text-sm font-bold text-foreground">{templateName}</h3>
          <p className="text-xs text-foreground-secondary leading-relaxed line-clamp-2">
            {t(template.descriptionKey)}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-foreground-secondary">
        <span>A4 • English Only</span>
        <span className="font-semibold text-primary">{template.category.toUpperCase()}</span>
      </div>
    </div>
  );
}
