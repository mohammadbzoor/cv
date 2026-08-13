import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NAVIGATION_ITEMS } from '../../../constants/navigation';
import { ROUTE_PATHS } from '../../../app/routePaths';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { ThemeToggle } from '../../ui/ThemeToggle';
import { LanguageSwitcher } from '../../ui/LanguageSwitcher';
import { Logo } from '../Logo';
import { cn } from '../../../utils/cn';

/**
 * Mobile Navigation Drawer component.
 * Accessible slide-over menu triggered on mobile viewports.
 * Reuses Modal primitive for focus trap and backdrop management.
 */
export function MobileNavigation({ className }) {
  const { t } = useTranslation(['navigation', 'common']);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Sync drawer closure with location changes without setState in effect
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setIsOpen(false);
  }

  const mobileItems = NAVIGATION_ITEMS.filter((item) => item.showInMobile);

  function handleCreateClick() {
    setIsOpen(false);
    navigate(ROUTE_PATHS.CREATE);
  }

  return (
    <div className={cn('md:hidden', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t('navigation:openMenu')}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-lg border',
          'bg-surface border-border text-foreground-secondary',
          'hover:bg-surface-muted hover:text-foreground',
          'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
          'transition-colors cursor-pointer'
        )}
      >
        <Menu className="w-5 h-5" aria-hidden="true" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeLabel={t('navigation:closeMenu')}
        size="sm"
        className="m-0 rounded-b-2xl rounded-t-none top-0 self-start"
      >
        <div className="space-y-6 pt-2 pb-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <Logo compact />
          </div>

          {/* Navigation Links */}
          <nav aria-label={t('navigation:primaryNav')} className="space-y-1">
            {mobileItems.map(({ id, labelKey, path, icon: Icon }) => (
              <NavLink
                key={id}
                to={path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-subtle text-primary font-semibold'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-surface-muted'
                  )
                }
              >
                {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
                <span>{t(labelKey)}</span>
              </NavLink>
            ))}
          </nav>

          {/* CTA & Preferences */}
          <div className="pt-4 border-t border-border/60 space-y-4">
            <Button
              className="w-full"
              leadingIcon={Plus}
              onClick={handleCreateClick}
            >
              {t('navigation:createCv')}
            </Button>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-foreground-secondary font-medium">
                {t('common:theme')} / {t('common:language')}
              </span>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
