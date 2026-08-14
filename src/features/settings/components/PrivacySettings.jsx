import { useTranslation } from 'react-i18next';
import { ShieldCheck, HardDrive, EyeOff, FileLock } from 'lucide-react';
import { SettingsSection } from './SettingsSection';

export function PrivacySettings() {
  const { t } = useTranslation('settings');

  const privacyPoints = [
    {
      icon: HardDrive,
      title: t('privacyPoint1Title'),
      desc: t('privacyPoint1Desc'),
    },
    {
      icon: EyeOff,
      title: t('privacyPoint2Title'),
      desc: t('privacyPoint2Desc'),
    },
    {
      icon: FileLock,
      title: t('privacyPoint3Title'),
      desc: t('privacyPoint3Desc'),
    },
  ];

  return (
    <SettingsSection
      id="privacy"
      title={t('privacyTitle')}
      description={t('privacyDesc')}
    >
      <div className="space-y-3 max-w-lg">
        {privacyPoints.map((pt) => {
          const Icon = pt.icon;
          return (
            <div
              key={pt.title}
              className="p-4 bg-surface border border-border rounded-xl flex items-start gap-3"
            >
              <div className="p-2 bg-primary-subtle text-primary rounded-lg shrink-0 mt-0.5">
                <Icon className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-foreground">{pt.title}</div>
                <div className="text-xs text-foreground-secondary leading-relaxed">{pt.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SettingsSection>
  );
}
