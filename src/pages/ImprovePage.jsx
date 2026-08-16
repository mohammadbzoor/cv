import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Sparkles, ArrowRight, RefreshCw, CheckCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { Card } from '../components/ui/Card';
import { useCVStore } from '../features/cv/store/useCVStore';
import { selectCVData } from '../features/cv/store/cvSelectors';
import { useImproveCV } from '../features/improve/hooks/useImproveCV';
import { DiffViewer } from '../features/improve/components/DiffViewer';
import { applySuggestion } from '../features/improve/utils/applySuggestion';
import { ROUTE_PATHS } from '../app/routePaths';

export default function ImprovePage() {
  const { t } = useTranslation(['improve', 'navigation']);
  const navigate = useNavigate();

  const cvData = useCVStore(selectCVData);
  const updateField = useCVStore((state) => state.updateField);

  const { execute, isLoading, isSuccess, isError, error, retry } = useImproveCV();
  const [suggestions, setSuggestions] = useState([]);

  const breadcrumbsItems = [
    { label: t('navigation:home'), path: ROUTE_PATHS.HOME },
    { label: t('improve:pageTitle'), current: true },
  ];

  async function handleGenerate() {
    const res = await execute();
    if (res?.suggestions) {
      setSuggestions(res.suggestions);
    }
  }

  function handleAccept(sug) {
    const res = applySuggestion(cvData, sug);
    if (res.success) {
      updateField(sug.fieldPath, sug.suggestedValue);
      setSuggestions((prev) =>
        prev.map((item) => (item.id === sug.id ? { ...item, status: 'accepted' } : item))
      );
    }
  }

  function handleReject(id) {
    setSuggestions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item))
    );
  }

  function handleAcceptAll() {
    suggestions.forEach((sug) => {
      if (sug.status === 'pending') {
        handleAccept(sug);
      }
    });
  }

  return (
    <PageContainer className="py-6 md:py-10 space-y-8 max-w-4xl">
      <PageHeader
        title={t('improve:pageTitle')}
        description={t('improve:pageDesc')}
        breadcrumbs={<Breadcrumbs items={breadcrumbsItems} />}
      />

      {/* Demo Notice Banner */}
      <div className="p-4 bg-primary-subtle border border-primary/20 rounded-xl text-xs text-primary flex items-start gap-3 shadow-2xs">
        <Info className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">{t('improve:demoNotice')}</p>
      </div>

      {/* Generate Trigger */}
      {!isSuccess && !isLoading && (
        <Card className="p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary-subtle text-primary flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" aria-hidden="true" />
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-bold text-foreground">{t('improve:runImprovement')}</h3>
            <p className="text-xs text-foreground-secondary">{t('improve:pageDesc')}</p>
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            leadingIcon={Sparkles}
            onClick={handleGenerate}
          >
            {t('improve:runImprovement')}
          </Button>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card className="p-12 text-center space-y-4">
          <Spinner size="lg" className="mx-auto text-primary" />
          <p className="text-sm font-bold text-foreground">{t('improve:improving')}</p>
        </Card>
      )}

      {/* Error State */}
      {isError && (
        <Card className="p-6 text-center space-y-4 border-error/30 bg-error-subtle/10">
          <p className="text-sm font-bold text-error">{error?.message || 'Improvement failed.'}</p>
          <Button type="button" variant="outline" size="sm" leadingIcon={RefreshCw} onClick={retry}>
            {t('improve:retryBtn')}
          </Button>
        </Card>
      )}

      {/* Suggestions List */}
      {isSuccess && suggestions.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h3 className="text-sm font-bold text-foreground">
              {t('improve:generatedSuggestions', { count: suggestions.filter((s) => s.status === 'pending').length })}
            </h3>

            <Button
              type="button"
              variant="outline"
              size="sm"
              leadingIcon={CheckCheck}
              onClick={handleAcceptAll}
            >
              {t('improve:acceptAll')}
            </Button>
          </div>

          <div className="space-y-4">
            {suggestions.map((sug) => (
              <DiffViewer
                key={sug.id}
                suggestion={sug}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border">
            <Button type="button" variant="outline" size="md" leadingIcon={RefreshCw} onClick={handleGenerate}>
              {t('improve:regenerate')}
            </Button>

            <Button
              type="button"
              variant="primary"
              size="md"
              trailingIcon={ArrowRight}
              onClick={() => navigate(ROUTE_PATHS.BUILDER_NEW)}
            >
              {t('improve:openInBuilder')}
            </Button>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
