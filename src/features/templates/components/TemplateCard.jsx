import { CheckCircle2, Eye, LayoutTemplate, CheckSquare, Square } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { TemplateThumbnail } from './TemplateThumbnail';
import { TemplateCompatibilityBadge } from './TemplateCompatibilityBadge';
import { getTemplateName } from '../registry/templateMetadata';
import { cn } from '../../../utils/cn';

/**
 * Gallery Card representing a single resume template.
 */
export function TemplateCard({
  template,
  isSelected = false,
  isCompared = false,
  onSelect,
  onPreview,
  onToggleCompare,
  canCompare = true,
  className,
}) {
  const { t } = useTranslation('templates');

  const templateName = getTemplateName(template.id);

  return (
    <Card
      aria-current={isSelected ? 'true' : undefined}
      className={cn(
        'p-5 space-y-4 shadow-2xs transition-all flex flex-col justify-between relative border text-start',
        isSelected ? 'border-primary ring-2 ring-primary/20 bg-primary-subtle/10' : 'hover:border-border-strong bg-surface',
        className
      )}
    >
      <div className="space-y-3">
        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-3 end-3 z-10 bg-primary text-on-primary px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('selected')}</span>
          </div>
        )}

        {/* Thumbnail Preview */}
        <div
          className="cursor-pointer overflow-hidden rounded-xl border border-border/40 group bg-app-bg p-2 flex justify-center items-center h-52"
          onClick={() => onPreview(template)}
          title={t('clickToPreview')}
        >
          <TemplateThumbnail
            variant={template.thumbnailVariant}
            className="group-hover:scale-102 transition-transform duration-200"
          />
        </div>

        {/* Header Info */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-base font-bold text-foreground">{templateName}</h3>
            <TemplateCompatibilityBadge level={template.compatibilityLevel} />
          </div>

          <p className="text-xs text-foreground-secondary leading-relaxed line-clamp-2">
            {t(template.descriptionKey)}
          </p>

          {/* Key Traits Badges */}
          {Array.isArray(template.keyTraits) && template.keyTraits.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {template.keyTraits.slice(0, 2).map((trait) => (
                <span
                  key={trait}
                  className="px-2 py-0.5 bg-surface-muted text-[10px] font-semibold text-foreground-secondary rounded border border-border/60"
                >
                  {trait}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Compare Checkbox & Action Buttons */}
      <div className="space-y-3 pt-3 border-t border-border/60">
        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => onToggleCompare?.(template.id)}
            disabled={!isCompared && !canCompare}
            className={`inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
              isCompared ? 'text-primary font-bold' : canCompare ? 'text-foreground-secondary hover:text-foreground' : 'text-foreground-muted cursor-not-allowed'
            }`}
          >
            {isCompared ? (
              <CheckSquare className="w-4 h-4 text-primary" />
            ) : (
              <Square className="w-4 h-4 text-foreground-secondary" />
            )}
            <span>{t('compare')}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            leadingIcon={Eye}
            onClick={() => onPreview(template)}
            className="flex-1"
          >
            {t('preview')}
          </Button>

          <Button
            type="button"
            variant={isSelected ? 'secondary' : 'primary'}
            size="sm"
            leadingIcon={LayoutTemplate}
            onClick={() => onSelect(template.id)}
            className="flex-1"
          >
            {isSelected ? t('selected') : t('useTemplate')}
          </Button>
        </div>
      </div>
    </Card>
  );
}
