import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';

/**
 * Prominent Demo Notice displayed on Auth pages.
 * Clarifies that authentication is currently a front-end demo.
 */
export function AuthDemoNotice({ className = '' }) {
  const { t } = useTranslation('auth');

  return (
    <div
      className={`p-3 bg-secondary-subtle/60 border border-secondary/20 rounded-xl text-xs text-foreground-secondary flex items-start gap-2.5 ${className}`}
      role="note"
    >
      <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
      <span className="leading-relaxed">{t('demoNotice')}</span>
    </div>
  );
}
