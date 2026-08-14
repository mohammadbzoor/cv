import { useTranslation } from 'react-i18next';
import { SETTINGS_SECTIONS } from '../constants/settingsSections';

export function SettingsNavigation({ activeSection, onSelectSection }) {
  const { t } = useTranslation(['settings', 'common']);

  return (
    <nav className="space-y-1" aria-label="Settings Navigation">
      {SETTINGS_SECTIONS.map((sec) => {
        const Icon = sec.icon;
        const isSelected = activeSection === sec.id;

        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => onSelectSection(sec.id)}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-start ${
              isSelected
                ? 'bg-primary text-on-primary shadow-2xs'
                : 'text-foreground-secondary hover:text-foreground hover:bg-surface-muted'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{t(sec.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
}
