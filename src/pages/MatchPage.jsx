import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { Card } from '../components/ui/Card';
import { useMatchCV } from '../features/match/hooks/useMatchCV';
import { MatchOverview } from '../features/match/components/MatchOverview';
import { ROUTE_PATHS } from '../app/routePaths';

export default function MatchPage() {
  const { t } = useTranslation(['match', 'navigation']);
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState('');
  const [inputError, setInputError] = useState(null);

  const { execute, isLoading, isSuccess, isError, data, error, retry } = useMatchCV();

  const breadcrumbsItems = [
    { label: t('navigation:home'), path: ROUTE_PATHS.HOME },
    { label: t('match:pageTitle'), current: true },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    if (!jobDescription || jobDescription.trim().length < 100) {
      setInputError(t('match:errors.JOB_DESCRIPTION_TOO_SHORT'));
      return;
    }

    setInputError(null);
    execute(jobDescription);
  }

  return (
    <PageContainer className="py-6 md:py-10 space-y-8 max-w-4xl">
      <PageHeader
        title={t('match:pageTitle')}
        description={t('match:pageDesc')}
        breadcrumbs={<Breadcrumbs items={breadcrumbsItems} />}
      />

      {/* Demo Notice Banner */}
      <div className="p-4 bg-primary-subtle border border-primary/20 rounded-xl text-xs text-primary flex items-start gap-3 shadow-2xs">
        <Info className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">{t('match:demoNotice')}</p>
      </div>

      {/* Job Description Input Form */}
      {!isSuccess && !isLoading && (
        <Card className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-foreground">
                <label htmlFor="job-description-input">{t('match:jobDescriptionLabel')}</label>
                <span className="font-mono text-foreground-secondary">{jobDescription.length} / 10,000</span>
              </div>
              <Textarea
                id="job-description-input"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder={t('match:jobDescriptionPlaceholder')}
                lang="en"
                dir="ltr"
                rows={8}
                maxLength={10000}
              />
              {inputError && <p role="alert" className="text-xs text-error font-semibold">{inputError}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              leadingIcon={Sparkles}
              className="w-full"
            >
              {t('match:matchCV')}
            </Button>
          </form>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card className="p-12 text-center space-y-4">
          <Spinner size="lg" className="mx-auto text-primary" />
          <p className="text-sm font-bold text-foreground">{t('match:matching')}</p>
        </Card>
      )}

      {/* Error State */}
      {isError && (
        <Card className="p-6 text-center space-y-4 border-error/30 bg-error-subtle/10">
          <p className="text-sm font-bold text-error">{error?.message || 'Match calculation failed.'}</p>
          <Button type="button" variant="outline" size="sm" leadingIcon={RefreshCw} onClick={() => retry(jobDescription)}>
            {t('match:retry')}
          </Button>
        </Card>
      )}

      {/* Match Overview Results */}
      {isSuccess && data && (
        <div className="space-y-6">
          <MatchOverview result={data} />

          <div className="flex justify-between items-center pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              size="md"
              leadingIcon={RefreshCw}
              onClick={() => {
                execute(jobDescription);
              }}
            >
              {t('match:retry')}
            </Button>

            <Button
              type="button"
              variant="primary"
              size="md"
              trailingIcon={ArrowRight}
              onClick={() => navigate(ROUTE_PATHS.BUILDER_NEW)}
            >
              {t('match:openInBuilder')}
            </Button>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
