import { Check, X, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export function DiffViewer({ suggestion, onAccept, onReject }) {
  const { t } = useTranslation('improve');

  if (!suggestion) return null;

  const { id, originalValue, suggestedValue, reason, category, status } = suggestion;
  const isAccepted = status === 'accepted';
  const isRejected = status === 'rejected';

  return (
    <Card className="p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
            {suggestion.fieldPath}
          </span>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-primary-subtle text-primary rounded font-semibold">
          {category}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
        {/* Original */}
        <div className="p-3 bg-error-subtle/10 border border-error/20 rounded-xl space-y-1">
          <strong className="text-[11px] font-bold text-error block uppercase tracking-wider">{t('original')}</strong>
          <p className="text-foreground-secondary leading-relaxed font-mono text-[11px]">{originalValue}</p>
        </div>

        {/* Suggested */}
        <div className="p-3 bg-success-subtle/10 border border-success/20 rounded-xl space-y-1">
          <strong className="text-[11px] font-bold text-success block uppercase tracking-wider">{t('suggested')}</strong>
          <p className="text-foreground font-semibold leading-relaxed font-mono text-[11px]">{suggestedValue}</p>
        </div>
      </div>

      {/* Reason */}
      <p className="text-xs text-foreground-secondary italic bg-surface-muted p-2.5 rounded-lg border border-border">
        <strong>{t('reason')}:</strong> {reason}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2 pt-1">
        {isAccepted ? (
          <span className="text-xs font-bold text-success flex items-center gap-1 bg-success-subtle px-3 py-1.5 rounded-lg">
            <Check className="w-4 h-4" /> {t('accepted')}
          </span>
        ) : isRejected ? (
          <span className="text-xs font-bold text-foreground-secondary flex items-center gap-1 bg-surface-muted px-3 py-1.5 rounded-lg">
            <X className="w-4 h-4" /> {t('rejected')}
          </span>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              leadingIcon={X}
              onClick={() => onReject(id)}
            >
              {t('reject')}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              leadingIcon={Check}
              onClick={() => onAccept(suggestion)}
            >
              {t('accept')}
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
