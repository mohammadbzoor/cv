import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';

/**
 * Displays export readiness validation results.
 * Shows errors that prevent export and provides guidance for fixing them.
 */
export function ExportReadiness({ isReady, errors }) {
  const { t } = useTranslation('export');

  if (isReady) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-success-subtle text-success rounded-lg text-xs font-medium">
        <span>✓</span>
        <span>{t('readyToExport')}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-3 py-2 bg-danger-subtle text-danger rounded-lg text-xs font-medium">
        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{t('notReady')}</span>
      </div>
      <ul className="space-y-1 text-xs text-foreground-secondary" role="list" aria-label={t('requiredFields')}>
        {errors.map((error, index) => (
          <li key={`${error.code}-${index}`} className="flex items-start gap-2 px-3 py-1.5 bg-surface-muted rounded-md">
            <span className="text-danger shrink-0 mt-0.5">•</span>
            <span>{error.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
