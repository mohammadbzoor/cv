import { useTranslation } from 'react-i18next';
import { Search, X } from 'lucide-react';
import { Input } from '../../../../components/ui/Input';

export function TemplateSearch({ value, onChange, onClear }) {
  const { t } = useTranslation('templates');

  return (
    <div className="relative w-full">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('searchPlaceholder')}
        leadingIcon={Search}
        aria-label={t('searchPlaceholder')}
        trailingIcon={
          value ? (
            <button
              type="button"
              onClick={onClear}
              className="p-1 rounded hover:bg-surface-muted transition-colors text-foreground-secondary cursor-pointer"
              aria-label={t('clearSearch')}
              title={t('clearSearch')}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : null
        }
      />
    </div>
  );
}
