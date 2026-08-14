import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';

/**
 * Displays the current export/print status, including errors.
 */
export function ExportStatus({ isPrinting, error }) {
  const { t } = useTranslation('export');

  if (error) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-danger-subtle text-danger rounded-lg text-xs font-medium" role="alert">
        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{t(`errors.${error.code}`, { defaultValue: error.message })}</span>
      </div>
    );
  }

  if (isPrinting) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-warning-subtle text-warning rounded-lg text-xs font-medium" role="status">
        <span className="animate-pulse">●</span>
        <span>{t('printing')}</span>
      </div>
    );
  }

  return null;
}
