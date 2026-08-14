import { useTranslation } from 'react-i18next';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { CreateCVWizard } from '../features/create/components/CreateCVWizard';
import { ROUTE_PATHS } from '../app/routePaths';

/**
 * Create CV Page component.
 * Renders multi-step resume creation wizard inside PublicLayout page container.
 */
export default function CreatePage() {
  const { t } = useTranslation(['create', 'navigation']);

  const breadcrumbsItems = [
    { label: t('navigation:home'), path: ROUTE_PATHS.HOME },
    { label: t('create:pageTitle'), current: true },
  ];

  return (
    <PageContainer className="py-6 md:py-10 space-y-8">
      <PageHeader
        title={t('create:pageTitle')}
        description={t('create:pageDesc')}
        breadcrumbs={<Breadcrumbs items={breadcrumbsItems} />}
      />

      <CreateCVWizard />
    </PageContainer>
  );
}
