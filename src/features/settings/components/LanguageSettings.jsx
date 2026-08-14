import { useTranslation } from 'react-i18next';
import { Check, Info } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';
import { SettingsSection } from './SettingsSection';

export function LanguageSettings() {
  const { t } = useTranslation('settings');
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { id: 'ar', label: 'العربية (Arabic)', dir: 'rtl' },
    { id: 'en', label: 'English', dir: 'ltr' },
  ];

  return (
    <SettingsSection
      id="language"
      title={t('languageTitle')}
      description={t('languageDesc')}
    >
      <div className="space-y-4 max-w-lg">
        {/* Languages Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {languages.map((item) => {
            const isSelected = language === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => changeLanguage(item.id)}
                aria-pressed={isSelected}
                className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-primary-subtle/40 text-primary font-bold'
                    : 'border-border hover:border-border-strong bg-surface text-foreground font-medium'
                }`}
              >
                <span className="text-xs">{item.label}</span>
                {isSelected && <Check className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {/* Informational Notice regarding CV Document Language */}
        <div className="p-3 bg-secondary-subtle/50 border border-secondary/20 rounded-xl text-xs text-foreground-secondary flex items-start gap-2.5">
          <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
          <span className="leading-relaxed">{t('cvDocumentLanguageNotice')}</span>
        </div>
      </div>
    </SettingsSection>
  );
}
