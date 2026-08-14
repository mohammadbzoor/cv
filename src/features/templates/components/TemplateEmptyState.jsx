import { LayoutTemplate } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../../../components/ui/EmptyState';

export function TemplateEmptyState() {
  const { t } = useTranslation('templates');

  return (
    <EmptyState
      icon={LayoutTemplate}
      title={t('noTemplatesFound')}
      description={t('pageDesc')}
    />
  );
}
