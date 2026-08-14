import { useTranslation } from 'react-i18next';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Badge } from '../components/ui/Badge';
import { CVDataSummary } from '../features/cv/development/CVDataSummary';
import { CVStoreInspector } from '../features/cv/development/CVStoreInspector';
import { ROUTE_PATHS } from '../app/routePaths';

/**
 * Internal Development Page for testing and inspecting the Zustand CV Store, Zod validation, and JSON transfer.
 */
export default function CVStorePage() {
  const { t } = useTranslation(['cv', 'navigation', 'common']);

  const breadcrumbsItems = [
    { label: t('navigation:home'), path: ROUTE_PATHS.HOME },
    { label: t('cv:storeTitle'), current: true },
  ];

  return (
    <PageContainer className="py-6 md:py-10 space-y-8">
      <PageHeader
        title={t('cv:storeTitle')}
        description={t('cv:storeSub')}
        breadcrumbs={<Breadcrumbs items={breadcrumbsItems} />}
        actions={
          <Badge variant="secondary" size="md">
            Development Only Route
          </Badge>
        }
      />

      <div className="p-4 bg-primary-subtle border border-primary/20 rounded-xl text-xs text-primary leading-relaxed">
        <strong className="font-bold">Notice: </strong>
        {t('cv:devToolNotice')}
      </div>

      <CVDataSummary />

      <CVStoreInspector />
    </PageContainer>
  );
}
