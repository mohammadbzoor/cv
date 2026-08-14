import { useTranslation } from 'react-i18next';
import { Scale } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { TemplateComparisonDialog } from '../../components/TemplateComparisonDialog';

export function TemplateCompareTray({
  comparedTemplates = [],
  comparedTemplateIds = [],
  isCompareOpen,
  onOpenCompare,
  onCloseCompare,
  onClearCompare,
  onSelectTemplate,
}) {
  const { t } = useTranslation('templates');

  if (comparedTemplateIds.length === 0) return null;

  return (
    <>
      <div className="p-3 bg-secondary-subtle/70 border border-secondary/20 rounded-xl flex items-center justify-between gap-3 text-xs text-start">
        <span className="font-semibold text-foreground">
          {t('compareSelectedCount', { count: comparedTemplateIds.length })}
        </span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="xs"
            leadingIcon={Scale}
            onClick={onOpenCompare}
            disabled={comparedTemplateIds.length < 2}
          >
            {t('openComparison')}
          </Button>
          <button
            type="button"
            onClick={onClearCompare}
            className="text-foreground-secondary hover:text-foreground underline text-[11px] cursor-pointer"
          >
            {t('clearComparison')}
          </button>
        </div>
      </div>

      <TemplateComparisonDialog
        templates={comparedTemplates}
        isOpen={isCompareOpen}
        onClose={onCloseCompare}
        onSelect={onSelectTemplate}
      />
    </>
  );
}
