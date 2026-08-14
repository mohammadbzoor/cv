import { useTranslation } from 'react-i18next';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { TemplateGallery } from '../features/templates/components/TemplateGallery';
import { ROUTE_PATHS } from '../app/routePaths';

/**
 * Resume Templates Gallery Page Component.
 * Displays interactive gallery of ATS-friendly resume templates with filtering & details dialog.
 */
export default function TemplatesPage() {
  const { t } = useTranslation(['templates', 'navigation']);

  const breadcrumbsItems = [
    { label: t('navigation:home'), path: ROUTE_PATHS.HOME },
    { label: t('templates:pageTitle'), current: true },
  ];

  return (
    <PageContainer className="py-6 md:py-10 space-y-8">
      <PageHeader
        title={t('templates:pageTitle')}
        description={t('templates:pageDesc')}
        breadcrumbs={<Breadcrumbs items={breadcrumbsItems} />}
      />

      <TemplateGallery />
    </PageContainer>
  );
}
