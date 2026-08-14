import { useTranslation } from 'react-i18next';
import { SearchX, RotateCcw } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';

export function TemplateStudioEmptyState({ onClearFilters }) {
  const { t } = useTranslation('templates');

  return (
    <div className="p-8 bg-surface border border-border rounded-2xl text-center space-y-4 shadow-2xs my-4">
      <div className="p-3 bg-surface-muted rounded-full w-12 h-12 flex items-center justify-center mx-auto text-foreground-secondary">
        <SearchX className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold text-foreground">
          {t('noTemplatesFound')}
        </h3>
        <p className="text-xs text-foreground-secondary max-w-sm mx-auto leading-relaxed">
          {t('noTemplatesFoundDesc', { defaultValue: 'Try adjusting your search terms or clearing category filters.' })}
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        leadingIcon={RotateCcw}
        onClick={onClearFilters}
      >
        {t('clearFilters')}
      </Button>
    </div>
  );
}
