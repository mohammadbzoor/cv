import { useTranslation } from 'react-i18next';
import { Search, X, RotateCcw } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { TEMPLATE_CATEGORIES, COMPATIBILITY_LEVELS } from '../constants/templateConstants';

export function TemplateStudioControls({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCompatibility,
  onCompatibilityChange,
  onClearFilters,
  hasActiveFilters,
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
    <div className="p-4 bg-surface border border-border rounded-2xl space-y-4 shadow-2xs">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search */}
        <div className="md:col-span-5 relative">
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('searchPlaceholder')}
            leadingIcon={Search}
            trailingIcon={
              searchQuery ? (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="p-1 rounded hover:bg-surface-muted transition-colors text-foreground-secondary"
                  aria-label={t('clearSearch')}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : null
            }
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

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="md:col-span-1 flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              title={t('clearFilters')}
              aria-label={t('clearFilters')}
              className="px-2"
            >
              <RotateCcw className="w-4 h-4 text-danger" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
