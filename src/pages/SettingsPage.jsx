import { useTranslation } from 'react-i18next';
import { SettingsLayout } from '../features/settings/components/SettingsLayout';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export default function SettingsPage() {
  const { t } = useTranslation('settings');

  useDocumentMetadata({
    title: `${t('pageTitle')} — CV Platform`,
    description: t('pageDesc'),
  });

  return <SettingsLayout />;
}
