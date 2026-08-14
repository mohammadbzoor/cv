import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTE_PATHS } from '../../../app/routePaths';
import { Logo } from '../Logo';
import { DesktopNavigation } from '../DesktopNavigation';
import { MobileNavigation } from '../MobileNavigation';
import { ThemeToggle } from '../../ui/ThemeToggle';
import { LanguageSwitcher } from '../../ui/LanguageSwitcher';
import { AccountMenu } from './AccountMenu';
import { DemoSessionBanner } from '../../../features/auth/components/DemoSessionBanner';
import { cn } from '../../../utils/cn';

/**
 * Top Application Navbar component.
 * Sticky header housing logo, desktop navigation, language/theme toggles, Account Menu, and mobile drawer trigger.
 */
export function Navbar({ className }) {
  const { t } = useTranslation('navigation');

  return (
    <>
      <DemoSessionBanner />
      <header className={cn('sticky top-0 z-40 bg-surface border-b border-border shadow-2xs', className)}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Right Tools & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <AccountMenu />
              <Link
                to={ROUTE_PATHS.CREATE}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg',
                  'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active',
                  'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
                  'transition-colors shadow-2xs'
                )}
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('createCv')}</span>
              </Link>
            </div>

            {/* Mobile Drawer Trigger */}
            <MobileNavigation />
          </div>
        </div>
      </header>
    </>
  );
}
