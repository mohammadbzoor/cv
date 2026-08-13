import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTE_PATHS } from '../../../app/routePaths';
import { cn } from '../../../utils/cn';

/**
 * Platform Logo component.
 * Links to homepage with brand icon and title.
 */
export function Logo({ compact = false, showText = true, className }) {
  const { t } = useTranslation('common');

  return (
    <Link
      to={ROUTE_PATHS.HOME}
      className={cn(
        'inline-flex items-center gap-2.5 group rounded-lg',
        'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
        className
      )}
      aria-label={t('appTitle')}
    >
      <div className="p-2 bg-primary text-on-primary rounded-lg shadow-2xs group-hover:bg-primary-hover transition-colors shrink-0">
        <FileText className="w-5 h-5" aria-hidden="true" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
            {t('appTitle')}
          </span>
          {!compact && (
            <span className="text-[10px] text-foreground-secondary font-mono leading-none mt-0.5">
              {t('version')}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
