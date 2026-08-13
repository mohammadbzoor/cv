import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '../../../components/ui/Skeleton';
import { Spinner } from '../../../components/ui/Spinner';
import { EmptyState } from '../../../components/ui/EmptyState';
import { ErrorState } from '../../../components/ui/ErrorState';
import { Button } from '../../../components/ui/Button';
import { FileText, RefreshCw, Plus } from 'lucide-react';

export function FeedbackSection() {
  const { t } = useTranslation(['feedback', 'common']);
  const [isRetrying, setIsRetrying] = useState(false);

  function handleRetry() {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
    }, 1200);
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">حالات الواجهة والتغذية الراجعة (Feedback & States)</h2>
        <p className="text-sm text-foreground-secondary">
          مكونات حالات التحميل والفراغ والأخطاء: Skeleton و Spinner و EmptyState و ErrorState.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skeleton & Spinner Loading */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground-secondary">حالة التحميل للهيكل (Skeleton)</h3>
            <div className="p-4 bg-app-bg rounded-xl border border-border/60 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton variant="circle" width="40px" height="40px" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </div>
              </div>
              <Skeleton variant="rectangle" height="60px" />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border/60">
            <h3 className="text-sm font-semibold text-foreground-secondary">مؤشر التحميل الدائري (Spinner)</h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span className="text-xs text-foreground-secondary">صغير (sm)</span>
              </div>
              <div className="flex items-center gap-2">
                <Spinner size="md" />
                <span className="text-xs text-foreground-secondary">متوسط (md)</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Spinner size="lg" />
                <span className="text-xs text-foreground-secondary">كبير (lg)</span>
              </div>
            </div>
          </div>
        </div>

        {/* EmptyState */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground-secondary">حالة الفراغ (EmptyState)</h3>
          <EmptyState
            icon={FileText}
            title={t('feedback:emptyStateTitle')}
            description={t('feedback:emptyStateDesc')}
            action={
              <Button size="sm" leadingIcon={Plus}>
                {t('feedback:createItem')}
              </Button>
            }
          />
        </div>

        {/* ErrorState */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4 md:col-span-2">
          <h3 className="text-sm font-semibold text-foreground-secondary">حالة الخطأ (ErrorState)</h3>
          <ErrorState
            title={t('feedback:errorStateTitle')}
            description={t('feedback:errorStateDesc')}
            details="AxiosError: Request failed with status code 500 at apiClient.js:14"
            action={
              <Button
                variant="outline"
                size="sm"
                leadingIcon={RefreshCw}
                loading={isRetrying}
                onClick={handleRetry}
              >
                {t('feedback:retry')}
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
}
