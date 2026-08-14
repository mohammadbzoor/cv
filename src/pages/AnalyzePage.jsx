import { useNavigate } from 'react-router-dom';
import { Info, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { Card } from '../components/ui/Card';
import { useAnalyzeCV } from '../features/analyze/hooks/useAnalyzeCV';
import { AnalysisOverview } from '../features/analyze/components/AnalysisOverview';
import { ROUTE_PATHS } from '../app/routePaths';

export default function AnalyzePage() {
  const { t } = useTranslation(['analyze', 'navigation']);
  const navigate = useNavigate();
  const { execute, isLoading, isSuccess, isError, data, error, retry } = useAnalyzeCV();

  const breadcrumbsItems = [
    { label: t('navigation:home'), path: ROUTE_PATHS.HOME },
    { label: t('analyze:pageTitle'), current: true },
  ];

  return (
    <PageContainer className="py-6 md:py-10 space-y-8 max-w-4xl">
      <PageHeader
        title={t('analyze:pageTitle')}
        description={t('analyze:pageDesc')}
        breadcrumbs={<Breadcrumbs items={breadcrumbsItems} />}
      />

      {/* Demo Notice Banner */}
      <div className="p-4 bg-primary-subtle border border-primary/20 rounded-xl text-xs text-primary flex items-start gap-3 shadow-2xs">
        <Info className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">{t('analyze:demoNotice')}</p>
      </div>

      {/* Action Trigger Card */}
      {!isSuccess && !isLoading && (
        <Card className="p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary-subtle text-primary flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" aria-hidden="true" />
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-bold text-foreground">{t('analyze:analyzeCurrentCV')}</h3>
            <p className="text-xs text-foreground-secondary">{t('analyze:pageDesc')}</p>
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            leadingIcon={Sparkles}
            onClick={() => execute()}
          >
            {t('analyze:runAnalysis')}
          </Button>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card className="p-12 text-center space-y-4">
          <Spinner size="lg" className="mx-auto text-primary" />
          <p className="text-sm font-bold text-foreground">{t('analyze:analyzing')}</p>
        </Card>
      )}

      {/* Error State */}
      {isError && (
        <Card className="p-6 text-center space-y-4 border-error/30 bg-error-subtle/10">
          <p className="text-sm font-bold text-error">{error?.message || 'Analysis failed.'}</p>
          <Button type="button" variant="outline" size="sm" leadingIcon={RefreshCw} onClick={retry}>
            {t('analyze:retry')}
          </Button>
        </Card>
      )}

      {/* Success Analysis Overview */}
      {isSuccess && data && (
        <div className="space-y-6">
          <AnalysisOverview result={data} />

          <div className="flex justify-between items-center pt-4 border-t border-border">
            <Button type="button" variant="outline" size="md" leadingIcon={RefreshCw} onClick={() => execute()}>
              {t('analyze:retry')}
            </Button>

            <Button
              type="button"
              variant="primary"
              size="md"
              trailingIcon={ArrowRight}
              onClick={() => navigate(ROUTE_PATHS.BUILDER)}
            >
              {t('analyze:openInBuilder')}
            </Button>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
