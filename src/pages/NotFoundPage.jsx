import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTE_PATHS } from '../app/routePaths';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';

/**
 * NotFoundPage component.
 * Fully internationalized 404 fallback page rendered cleanly inside PublicLayout.
 */
export default function NotFoundPage() {
  const { t } = useTranslation(['designSystem', 'navigation', 'common']);

  return (
    <PageContainer className="py-12 md:py-20 flex items-center justify-center">
      <main className="max-w-md w-full bg-surface border border-border rounded-2xl p-8 text-center shadow-2xs space-y-6">
        <div className="mx-auto w-14 h-14 bg-warning-subtle text-warning rounded-full flex items-center justify-center">
          <AlertCircle className="w-7 h-7" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <p className="text-5xl font-extrabold text-primary tracking-tight">404</p>
          <h1 className="text-lg font-bold text-foreground">{t('designSystem:notFoundTitle')}</h1>
          <p className="text-xs text-foreground-secondary leading-relaxed">
            {t('designSystem:notFoundDesc')}
          </p>
        </div>

        <div>
          <Link to={ROUTE_PATHS.HOME}>
            <Button leadingIcon={Home} className="w-full">
              {t('navigation:backToHome')}
            </Button>
          </Link>
        </div>
      </main>
    </PageContainer>
  );
}
