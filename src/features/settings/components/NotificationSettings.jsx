import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';
import { Switch } from '../../../components/ui/Switch';
import { SettingsSection } from './SettingsSection';

const NOTIFICATIONS_STORAGE_KEY = 'cv-platform-notification-prefs';

export function NotificationSettings() {
  const { t } = useTranslation('settings');

  const [prefs, setPrefs] = useState(() => {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return {
      productUpdates: true,
      draftReminders: true,
      exportReminders: false,
    };
  });

  const togglePref = (key) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <SettingsSection
      id="notifications"
      title={t('notificationsTitle')}
      description={t('notificationsDesc')}
    >
      <div className="space-y-4 max-w-lg">
        {/* Notice */}
        <div className="p-3 bg-secondary-subtle/50 border border-secondary/20 rounded-xl text-xs text-foreground-secondary flex items-start gap-2.5">
          <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
          <span className="leading-relaxed">{t('notificationLocalNotice')}</span>
        </div>

        {/* Toggles */}
        <div className="space-y-3 bg-surface p-4 border border-border rounded-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-foreground">{t('prefProductUpdates')}</div>
              <div className="text-[11px] text-foreground-secondary">{t('prefProductUpdatesDesc')}</div>
            </div>
            <Switch
              checked={prefs.productUpdates}
              onChange={() => togglePref('productUpdates')}
              aria-label={t('prefProductUpdates')}
            />
          </div>

          <div className="h-px bg-border/60" />

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-foreground">{t('prefDraftReminders')}</div>
              <div className="text-[11px] text-foreground-secondary">{t('prefDraftRemindersDesc')}</div>
            </div>
            <Switch
              checked={prefs.draftReminders}
              onChange={() => togglePref('draftReminders')}
              aria-label={t('prefDraftReminders')}
            />
          </div>

          <div className="h-px bg-border/60" />

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-foreground">{t('prefExportReminders')}</div>
              <div className="text-[11px] text-foreground-secondary">{t('prefExportRemindersDesc')}</div>
            </div>
            <Switch
              checked={prefs.exportReminders}
              onChange={() => togglePref('exportReminders')}
              aria-label={t('prefExportReminders')}
            />
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}
