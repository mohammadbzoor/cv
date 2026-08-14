import { useTranslation } from 'react-i18next';
import { TEMPLATE_CATEGORIES } from '../constants/templateConstants';
import { cn } from '../../../utils/cn';

/**
 * Filter Tabs Bar for Template Gallery.
 */
export function TemplateFilters({ selectedCategory, onSelectCategory, className }) {
  const { t } = useTranslation('templates');

  const filterOptions = [
    { id: TEMPLATE_CATEGORIES.ALL, labelKey: 'templates:categories.all' },
    { id: TEMPLATE_CATEGORIES.ATS, labelKey: 'templates:categories.ats' },
    { id: TEMPLATE_CATEGORIES.SPECIALIZED, labelKey: 'templates:categories.specialized' },
  ];

  return (
    <div className={cn('flex items-center gap-1.5 overflow-x-auto p-1 bg-surface-muted border border-border rounded-xl', className)}>
      {filterOptions.map((opt) => {
        const isSelected = selectedCategory === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelectCategory(opt.id)}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer',
              isSelected ? 'bg-surface text-primary shadow-2xs' : 'text-foreground-secondary hover:text-foreground'
            )}
          >
            {t(opt.labelKey)}
          </button>
        );
      })}
    </div>
  );
}
