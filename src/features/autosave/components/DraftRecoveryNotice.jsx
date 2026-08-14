import { useTranslation } from 'react-i18next';
import { FileText, RefreshCw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';

/**
 * Draft Recovery Notice.
 * Shown when a local draft is restored after page load.
 * Provides "Continue editing" and "Start over" actions.
 */
export function DraftRecoveryNotice({ onContinue, onStartOver }) {
  const { t } = useTranslation('export');
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div
        data-draft-recovery
        className="bg-primary-subtle border border-primary/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-2 text-primary">
          <FileText className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span className="text-sm font-medium">{t('draftRestored')}</span>
        </div>

        <div className="flex items-center gap-2 ms-auto">
          <Button
            type="button"
            variant="primary"
            size="sm"
            leadingIcon={RefreshCw}
            onClick={onContinue}
          >
            {t('continueEditing')}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            leadingIcon={Trash2}
            onClick={() => setShowConfirm(true)}
          >
            {t('startOver')}
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          onStartOver?.();
        }}
        title={t('startOverConfirmTitle')}
        description={t('startOverConfirmDesc')}
        confirmLabel={t('startOver')}
        cancelLabel={t('common:cancel', { ns: 'common' })}
        variant="danger"
      />
    </>
  );
}
