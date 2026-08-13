import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAVIGATION_ITEMS } from '../../../constants/navigation';
import { cn } from '../../../utils/cn';

/**
 * Desktop Navigation Bar component.
 * Renders main navigation links with active state indicators for desktop viewports.
 */
export function DesktopNavigation({ className }) {
  const { t } = useTranslation('navigation');

  const desktopItems = NAVIGATION_ITEMS.filter((item) => item.showInDesktop);

  return (
    <nav aria-label={t('primaryNav')} className={cn('hidden md:flex items-center gap-1', className)}>
      {desktopItems.map(({ id, labelKey, path }) => (
        <NavLink
          key={id}
          to={path}
          className={({ isActive }) =>
            cn(
              'px-3 py-2 text-xs font-medium rounded-lg transition-colors',
              'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1',
              isActive
                ? 'bg-primary-subtle text-primary font-semibold'
                : 'text-foreground-secondary hover:text-foreground hover:bg-surface-muted'
            )
          }
        >
          {t(labelKey)}
        </NavLink>
      ))}
    </nav>
  );
}
