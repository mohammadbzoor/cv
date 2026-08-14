import { useTranslation } from 'react-i18next';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';
import { SettingsSection } from './SettingsSection';

export function AppearanceSettings() {
  const { t } = useTranslation('settings');
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      id: 'light',
      label: t('themeLight'),
      icon: Sun,
      bgClass: 'bg-[#F7F5F1] text-[#202A30] border-[#D8D6D0]',
    },
    {
      id: 'dark',
      label: t('themeDark'),
      icon: Moon,
      bgClass: 'bg-[#171C1F] text-[#EDF0EE] border-[#374145]',
    },
    {
      id: 'system',
      label: t('themeSystem'),
      icon: Monitor,
      bgClass: 'bg-surface-elevated text-foreground border-border',
    },
  ];

  return (
    <SettingsSection
      id="appearance"
      title={t('appearanceTitle')}
      description={t('appearanceDesc')}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
        {themes.map((item) => {
          const isSelected = theme === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTheme(item.id)}
              aria-pressed={isSelected}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all cursor-pointer text-center relative ${
                isSelected
                  ? 'border-primary ring-2 ring-focus-ring ring-offset-1 bg-surface-elevated'
                  : 'border-border hover:border-border-strong bg-surface'
              }`}
            >
              <div className={`p-3 rounded-full ${item.bgClass}`}>
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>

              <span className="text-xs font-bold text-foreground">{item.label}</span>

              {isSelected && (
                <div className="absolute top-2 end-2 p-1 bg-primary text-on-primary rounded-full">
                  <Check className="w-3 h-3" aria-hidden="true" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </SettingsSection>
  );
}
