import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';

/**
 * Mandatory ATS Disclaimer Notice Component.
 * Enforces standardized ATS wording without false 100% guarantees.
 */
export function ATSDisclaimer({ className = '' }) {
  const { t } = useTranslation('templates');

  return (
    <div
      className={`p-3 bg-secondary-subtle/60 border border-secondary/20 rounded-xl text-xs text-foreground-secondary flex items-start gap-2.5 ${className}`}
      role="note"
    >
      <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
      <span className="leading-relaxed font-medium">
        {t('atsDisclaimer', {
          defaultValue:
            'These templates prioritize clear structure and readable text. Parsing behavior may vary between applicant tracking systems.',
        })}
      </span>
    </div>
  );
}
