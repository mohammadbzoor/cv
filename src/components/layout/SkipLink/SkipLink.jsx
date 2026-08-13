import { useTranslation } from 'react-i18next';
import { cn } from '../../../utils/cn';

/**
 * Accessible Skip to Main Content link for keyboard and screen reader users.
 */
export function SkipLink({ className }) {
  const { t } = useTranslation('navigation');

  return (
    <a
      href="#main-content"
      className={cn(
        'sr-only focus:not-sr-only',
        'focus:fixed focus:top-4 focus:start-4 focus:z-50',
        'focus:px-4 focus:py-2.5 focus:bg-primary focus:text-on-primary',
        'focus:font-medium focus:text-sm focus:rounded-lg focus:shadow-md',
        'focus:outline-2 focus:outline-focus-ring focus:outline-offset-2',
        'transition-all',
        className
      )}
    >
      {t('skipToContent')}
    </a>
  );
}
