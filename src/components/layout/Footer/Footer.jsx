import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '../Logo';
import { NAVIGATION_ITEMS } from '../../../constants/navigation';
import { cn } from '../../../utils/cn';

/**
 * Application Footer component.
 * Renders platform summary, navigation links, architectural notice, and dynamic copyright statement.
 */
export function Footer({ className }) {
  const { t } = useTranslation(['pages', 'navigation', 'common']);

  const footerItems = NAVIGATION_ITEMS.filter((item) => item.showInFooter);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-surface border-t border-border mt-auto', className)}>
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Description */}
          <div className="md:col-span-6 space-y-3">
            <Logo />
            <p className="text-xs text-foreground-secondary max-w-sm leading-relaxed">
              {t('pages:footerDescription')}
            </p>
            <p className="text-[11px] text-foreground-muted max-w-sm leading-normal">
              {t('pages:cvEnglishNotice')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
              {t('navigation:primaryNav')}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {footerItems.map(({ id, labelKey, path }) => (
                <Link
                  key={id}
                  to={path}
                  className="text-foreground-secondary hover:text-foreground transition-colors py-1"
                >
                  {t(labelKey)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground-muted">
          <p>
            &copy; {currentYear} {t('common:appTitle')} — {t('common:rightsReserved')}
          </p>
          <div className="flex items-center gap-4">
            <span className="cursor-default">{t('pages:privacy')}</span>
            <span>•</span>
            <span className="cursor-default">{t('pages:terms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
