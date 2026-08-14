import { CheckCircle2, Eye, LayoutTemplate } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { TemplateThumbnail } from './TemplateThumbnail';
import { TemplateCompatibilityBadge } from './TemplateCompatibilityBadge';
import { cn } from '../../../utils/cn';

/**
 * Gallery Card representing a single resume template.
 */
export function TemplateCard({
  template,
  isSelected = false,
  onSelect,
  onPreview,
  className,
}) {
  const { t } = useTranslation('templates');

  return (
    <Card
      className={cn(
        'p-5 space-y-4 shadow-2xs transition-all flex flex-col justify-between relative',
        isSelected ? 'border-primary ring-2 ring-primary/20 bg-primary-subtle/20' : 'hover:border-border-hover',
        className
      )}
    >
      <div className="space-y-3">
        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-3 end-3 z-10 bg-primary text-on-primary px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('selected')}</span>
          </div>
        )}

        {/* Thumbnail Preview */}
        <div className="cursor-pointer overflow-hidden rounded-lg group" onClick={() => onPreview(template)}>
          <TemplateThumbnail variant={template.thumbnailVariant} className="group-hover:scale-102 transition-transform duration-200" />
        </div>

        {/* Info */}
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-base font-bold text-foreground">{t(template.nameKey)}</h3>
            <TemplateCompatibilityBadge level={template.compatibilityLevel} />
          </div>

          <p className="text-xs text-foreground-secondary leading-relaxed line-clamp-2">
            {t(template.descriptionKey)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-border/60">
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
    </Card>
  );
}
