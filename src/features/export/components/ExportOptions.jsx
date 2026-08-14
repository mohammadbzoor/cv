import { useTranslation } from 'react-i18next';

/**
 * Displays static export configuration options (read-only).
 * Shows document properties: page size, language, direction, template.
 */
export function ExportOptions({ documentName, templateName }) {
  const { t } = useTranslation('export');

  const options = [
    { label: t('documentName'), value: documentName || 'cv-resume' },
    { label: t('template'), value: templateName || 'Classic ATS' },
    { label: t('pageSize'), value: 'A4' },
    { label: t('language'), value: 'English' },
    { label: t('direction'), value: 'LTR' },
  ];

  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <div key={opt.label} className="flex items-center justify-between text-xs px-3 py-2 bg-surface-muted rounded-md">
          <span className="text-foreground-secondary font-medium">{opt.label}</span>
          <span className="text-foreground font-semibold" dir="ltr" lang="en">{opt.value}</span>
        </div>
      ))}
    </div>
  );
}
