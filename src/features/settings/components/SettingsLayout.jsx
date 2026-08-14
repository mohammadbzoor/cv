import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SETTINGS_SECTIONS } from '../constants/settingsSections';
import { SettingsNavigation } from './SettingsNavigation';
import { ProfileSettings } from './ProfileSettings';
import { AppearanceSettings } from './AppearanceSettings';
import { LanguageSettings } from './LanguageSettings';
import { NotificationSettings } from './NotificationSettings';
import { PrivacySettings } from './PrivacySettings';
import { LocalDataSettings } from './LocalDataSettings';
import { AccountSettings } from './AccountSettings';
import { PageContainer } from '../../../components/layout/PageContainer';
import { PageHeader } from '../../../components/layout/PageHeader';

export function SettingsLayout() {
  const { t } = useTranslation('settings');
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <PageContainer className="py-6 md:py-10 space-y-8">
      <PageHeader
        title={t('pageTitle')}
        description={t('pageDesc')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar & Mobile Select Navigation */}
        <aside className="lg:col-span-1 bg-surface border border-border rounded-2xl p-4 shadow-2xs">
          {/* Mobile Select dropdown */}
          <div className="lg:hidden">
            <label htmlFor="settings-section-select" className="sr-only">
              Select Settings Section
            </label>
            <select
              id="settings-section-select"
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {SETTINGS_SECTIONS.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {t(sec.labelKey)}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <SettingsNavigation
              activeSection={activeSection}
              onSelectSection={setActiveSection}
            />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-2xs">
          {activeSection === 'profile' && <ProfileSettings />}
          {activeSection === 'appearance' && <AppearanceSettings />}
          {activeSection === 'language' && <LanguageSettings />}
          {activeSection === 'notifications' && <NotificationSettings />}
          {activeSection === 'privacy' && <PrivacySettings />}
          {activeSection === 'local-data' && <LocalDataSettings />}
          {activeSection === 'account' && <AccountSettings />}
        </main>
      </div>
    </PageContainer>
  );
}
