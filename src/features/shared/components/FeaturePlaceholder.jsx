import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components/layout/PageContainer';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Breadcrumbs } from '../../../components/layout/Breadcrumbs';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { ROUTE_PATHS } from '../../../app/routePaths';

/**
 * Reusable Feature Placeholder component for future routes under active development.
 */
export function FeaturePlaceholder({
  titleKey,
  descriptionKey,
  icon: Icon,
  breadcrumbsItems,
}) {
  const { t } = useTranslation(['pages', 'navigation', 'common']);

  const defaultBreadcrumbs = [
    { label: t('navigation:home'), path: ROUTE_PATHS.HOME },
    { label: t(titleKey), current: true },
  ];

  return (
    <PageContainer className="py-6 md:py-10 space-y-8">
      <PageHeader
        title={t(titleKey)}
        description={t(descriptionKey)}
        breadcrumbs={<Breadcrumbs items={breadcrumbsItems || defaultBreadcrumbs} />}
      />

      <div className="bg-surface rounded-2xl border border-border p-8 md:p-12 text-center shadow-2xs space-y-6">
        {Icon && (
          <div className="mx-auto w-14 h-14 bg-primary-subtle text-primary rounded-2xl flex items-center justify-center shadow-2xs">
            <Icon className="w-7 h-7" aria-hidden="true" />
          </div>
        )}

        <div className="space-y-2 max-w-md mx-auto">
          <Badge variant="primary" size="md">
            {t('pages:comingSoon')}
          </Badge>
          <h2 className="text-xl font-bold text-foreground pt-2">
            {t('pages:featureUnderDevelopment')}
          </h2>
          <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed">
            {t(descriptionKey)}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-4 justify-center">
          <Link to={ROUTE_PATHS.HOME}>
            <Button variant="outline" size="sm">
              {t('navigation:backToHome')}
            </Button>
          </Link>
          <Link to={ROUTE_PATHS.DESIGN_SYSTEM}>
            <Button variant="ghost" size="sm">
              {t('navigation:viewDesignSystem')}
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
