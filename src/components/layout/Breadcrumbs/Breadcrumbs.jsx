import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../hooks/useLanguage';
import { cn } from '../../../utils/cn';

/**
 * Accessible Breadcrumbs component following WAI-ARIA breadcrumb pattern.
 * Supports current page indicator and dynamic RTL chevron separators.
 */
export function Breadcrumbs({ items = [], ariaLabel, className }) {
  const { t } = useTranslation('navigation');
  const { isRTL } = useLanguage();

  if (!items || items.length === 0) return null;

  const SeparatorIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <nav aria-label={ariaLabel || t('breadcrumbs')} className={cn('text-xs', className)}>
      <ol className="flex items-center flex-wrap gap-1.5 text-foreground-secondary">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.current;

          return (
            <li key={item.label || index} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <SeparatorIcon
                  className="w-3.5 h-3.5 text-foreground-muted shrink-0"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  aria-current="page"
                  className="font-medium text-foreground truncate max-w-[200px]"
                >
                  {item.label}
                </span>
              ) : item.path ? (
                <Link
                  to={item.path}
                  className="hover:text-foreground transition-colors truncate max-w-[150px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="truncate max-w-[150px]">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
