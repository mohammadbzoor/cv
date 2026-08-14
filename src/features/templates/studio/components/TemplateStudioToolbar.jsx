import { useTranslation } from 'react-i18next';
import { Select } from '../../../../components/ui/Select';
import { TemplateSearch } from './TemplateSearch';
import { TemplateActiveFilters } from './TemplateActiveFilters';
import { TEMPLATE_CATEGORIES, COMPATIBILITY_LEVELS } from '../../constants/templateConstants';

export function TemplateStudioToolbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCompatibility,
  onCompatibilityChange,
  onClearFilters,
  hasActiveFilters,
  appliedFilters,
  onRemoveFilter,
}) {
  const { t } = useTranslation('templates');

  const categoryOptions = [
    { value: TEMPLATE_CATEGORIES.ALL, label: t('categories.all') },
    { value: TEMPLATE_CATEGORIES.ATS, label: t('categories.ats') },
    { value: TEMPLATE_CATEGORIES.SPECIALIZED, label: t('categories.specialized') },
  ];

  const compatibilityOptions = [
    { value: 'all', label: t('compatibility.all') },
    { value: COMPATIBILITY_LEVELS.ATS_OPTIMIZED, label: t('compatibility.atsOptimized') },
    { value: COMPATIBILITY_LEVELS.VISUALLY_ENHANCED, label: t('compatibility.visuallyEnhanced') },
  ];

  return (
    <div className="p-4 bg-surface border border-border rounded-2xl space-y-3 shadow-2xs">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search */}
        <div className="md:col-span-6">
          <TemplateSearch
            value={searchQuery}
            onChange={onSearchChange}
            onClear={() => onSearchChange('')}
          />
        </div>

        {/* Category Select */}
        <div className="md:col-span-3">
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label={t('categoryLabel')}
          />
        </div>

        {/* Compatibility Select */}
        <div className="md:col-span-3">
          <Select
            options={compatibilityOptions}
            value={selectedCompatibility}
            onChange={(e) => onCompatibilityChange(e.target.value)}
            aria-label={t('compatibilityLabel')}
          />
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <TemplateActiveFilters
          appliedFilters={appliedFilters}
          onRemoveFilter={onRemoveFilter}
          onClearAll={onClearFilters}
        />
      )}
    </div>
  );
}
