import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../hooks/useLanguage';
import { cn } from '../../../utils/cn';

/**
 * Accessible button component for toggling between Arabic and English interface languages.
 */
export function LanguageSwitcher({ className }) {
  const { t } = useTranslation('navigation');
  const { language, toggleLanguage } = useLanguage();

  const isArabic = language === 'ar';
  const targetLanguageNativeName = isArabic ? 'English' : 'العربية';
  const label = t('switchLanguage');

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium text-xs rounded-lg border',
        'min-w-[40px] min-h-[40px] px-3 py-2',
        'bg-surface border-border text-foreground-secondary',
        'hover:bg-surface-muted hover:text-foreground',
        'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
        'transition-colors cursor-pointer',
        className
      )}
      aria-label={`${label}: ${targetLanguageNativeName}`}
      title={`${label}: ${targetLanguageNativeName}`}
    >
      <Languages className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{targetLanguageNativeName}</span>
    </button>
  );
}
