import { Link } from 'react-router-dom';
import { CheckCircle2, FileText, FileCheck, ArrowRight, ArrowLeft, Layers, ShieldCheck, Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTE_PATHS } from '../app/routePaths';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';
import { useLanguage } from '../hooks/useLanguage';

/**
 * HomePage component.
 * Fully internationalized landing page confirming project foundation and calm identity.
 */
export default function HomePage() {
  const { t } = useTranslation(['home', 'navigation', 'common']);
  const { isRTL } = useLanguage();

  const ActionArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-app-bg text-foreground flex flex-col font-sans">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary text-on-primary rounded-lg shadow-2xs">
              <FileText className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">
                {t('common:appTitle')}
              </h1>
              <p className="text-xs text-foreground-secondary">{t('common:version')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-success-subtle text-success text-xs font-medium rounded-full border border-success/20">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              {t('home:badgePhase2')}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Hero Card */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-2xs text-start space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-subtle text-primary rounded-md text-xs font-semibold">
            <Code className="w-4 h-4" aria-hidden="true" />
            {t('home:heroBadge')}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-snug">
            {t('home:heroTitle')}
          </h2>
          <p className="text-foreground-secondary max-w-3xl text-sm md:text-base leading-relaxed">
            {t('home:heroDescription')}
          </p>
          <div className="pt-2 flex flex-wrap gap-4 justify-start">
            <Link
              to={ROUTE_PATHS.DESIGN_SYSTEM}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-medium text-sm rounded-lg hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 transition-colors shadow-2xs"
            >
              <span>{t('navigation:viewDesignSystem')}</span>
              <ActionArrow className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/test-404-route"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-foreground font-medium text-sm rounded-lg border border-border hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 transition-colors"
            >
              <span>{t('navigation:testNotFound')}</span>
            </Link>
          </div>
        </section>

        {/* Color Palette */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-2xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-secondary" aria-hidden="true" />
              {t('home:colorPaletteTitle')}
            </h3>
            <p className="text-xs text-foreground-secondary mt-1">
              {t('home:colorPaletteSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">Deep Slate</span>
                <span className="w-5 h-5 rounded-full bg-primary border border-border" />
              </div>
              <div className="h-10 bg-primary-subtle border border-border/60 rounded-lg px-3 flex items-center justify-between text-xs text-primary font-mono">
                <span>Primary</span>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                {t('home:deepSlateDesc')}
              </p>
            </div>

            <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">Muted Sage</span>
                <span className="w-5 h-5 rounded-full bg-secondary border border-border" />
              </div>
              <div className="h-10 bg-secondary-subtle border border-border/60 rounded-lg px-3 flex items-center justify-between text-xs text-secondary font-mono">
                <span>Secondary</span>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                {t('home:mutedSageDesc')}
              </p>
            </div>

            <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">Soft Terracotta</span>
                <span className="w-5 h-5 rounded-full bg-accent border border-border" />
              </div>
              <div className="h-10 bg-accent-subtle border border-border/60 rounded-lg px-3 flex items-center justify-between text-xs text-accent font-mono">
                <span>Accent</span>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                {t('home:softTerracottaDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* Verification Checklist */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-2xs space-y-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-success" aria-hidden="true" />
            {t('home:checkListTitle')}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-foreground-secondary">
            <li className="flex items-center gap-2.5 p-3 bg-app-bg rounded-lg border border-border/60">
              <FileCheck className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
              <span>{t('home:checkList1')}</span>
            </li>
            <li className="flex items-center gap-2.5 p-3 bg-app-bg rounded-lg border border-border/60">
              <FileCheck className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
              <span>{t('home:checkList2')}</span>
            </li>
            <li className="flex items-center gap-2.5 p-3 bg-app-bg rounded-lg border border-border/60">
              <FileCheck className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
              <span>{t('home:checkList3')}</span>
            </li>
            <li className="flex items-center gap-2.5 p-3 bg-app-bg rounded-lg border border-border/60">
              <FileCheck className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
              <span>{t('home:checkList4')}</span>
            </li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-foreground-muted">
          <p>&copy; {new Date().getFullYear()} {t('common:appTitle')} - {t('common:rightsReserved')}</p>
        </div>
      </footer>
    </div>
  );
}
