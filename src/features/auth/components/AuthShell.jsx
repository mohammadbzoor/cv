import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTE_PATHS } from '../../../app/routePaths';
import { ThemeToggle } from '../../../components/ui/ThemeToggle';
import { LanguageSwitcher } from '../../../components/ui/LanguageSwitcher';
import { useLanguage } from '../../../hooks/useLanguage';

/**
 * Shell container for Auth pages with header controls (Back Home, Theme, Language).
 */
export function AuthShell({ children }) {
  const { t } = useTranslation(['common', 'auth']);
  const { isRTL } = useLanguage();
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-app-bg text-foreground flex flex-col justify-between p-4 sm:p-6 md:p-10">
      {/* Top Header */}
      <header className="flex items-center justify-between max-w-6xl w-full mx-auto pb-4">
        <Link
          to={ROUTE_PATHS.HOME}
          className="inline-flex items-center gap-2 text-xs font-semibold text-foreground-secondary hover:text-foreground transition-colors"
        >
          <BackIcon className="w-4 h-4" aria-hidden="true" />
          <span>{t('auth:backToHome')}</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-foreground-secondary py-4 border-t border-border/40">
        <span>CV Platform — Professional Resume Studio</span>
      </footer>
    </div>
  );
}
