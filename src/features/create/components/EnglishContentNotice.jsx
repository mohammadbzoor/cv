import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../utils/cn';

/**
 * Notice banner reminding users that CV content fields must be written in English (LTR).
 */
export function EnglishContentNotice({ className }) {
  const { t } = useTranslation('create');

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 bg-primary-subtle border border-primary/20 rounded-xl text-xs text-primary leading-relaxed',
        className
      )}
    >
      <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
      <div className="space-y-0.5">
        <strong className="font-bold block">{t('englishNoticeTitle')}</strong>
        <p className="text-foreground-secondary">{t('englishNoticeBody')}</p>
      </div>
    </div>
  );
}
