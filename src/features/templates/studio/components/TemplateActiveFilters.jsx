import { useTranslation } from 'react-i18next';
import { X, RotateCcw } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';

export function TemplateActiveFilters({ appliedFilters = [], onRemoveFilter, onClearAll }) {
  const { t } = useTranslation('templates');

  if (appliedFilters.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
      <span className="text-foreground-secondary font-medium">{t('activeFilters')}:</span>

      {appliedFilters.map((chip, idx) => (
        <span
          key={chip.id || `${chip.type}-${chip.label || idx}`}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-subtle text-primary border border-primary/20 rounded-full font-semibold"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={() => onRemoveFilter(chip.type)}
            className="p-0.5 rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
            aria-label={`${t('removeFilter')}: ${chip.label}`}
            title={`${t('removeFilter')}: ${chip.label}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      <Button
        type="button"
        variant="ghost"
        size="xs"
        leadingIcon={RotateCcw}
        onClick={onClearAll}
        className="text-danger hover:text-danger-hover"
      >
        {t('clearFilters')}
      </Button>
    </div>
  );
}
