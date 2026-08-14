import { useTranslation } from 'react-i18next';
import { CheckCircle, Clock, AlertCircle, HardDrive, Loader2 } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectStatus, selectIsDirty, selectLastSavedAt } from '../../cv/store/cvSelectors';

/**
 * Enhanced Autosave Status indicator.
 * Shows precise save state with last saved time.
 * Uses aria-live="polite" only for important transitions.
 */
export function AutosaveStatus() {
  const { t, i18n } = useTranslation('export');
  const status = useCVStore(selectStatus);
  const isDirty = useCVStore(selectIsDirty);
  const lastSavedAt = useCVStore(selectLastSavedAt);

  // Format last saved time using locale-aware formatting
  const formattedTime = lastSavedAt
    ? new Intl.DateTimeFormat(i18n.language === 'ar' ? 'ar' : 'en', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(lastSavedAt))
    : null;

  if (status === 'saving') {
    return (
      <Badge variant="warning" size="sm" leadingIcon={Loader2} data-autosave-status>
        <span aria-live="polite">{t('savingLocally')}</span>
      </Badge>
    );
  }

  if (status === 'error') {
    return (
      <Badge variant="error" size="sm" leadingIcon={AlertCircle} data-autosave-status>
        <span aria-live="assertive">{t('localSaveFailed')}</span>
      </Badge>
    );
  }

  if (isDirty) {
    return (
      <Badge variant="warning" size="sm" leadingIcon={Clock} data-autosave-status>
        {t('unsavedChanges')}
      </Badge>
    );
  }

  return (
    <Badge variant="success" size="sm" leadingIcon={CheckCircle} data-autosave-status>
      <span aria-live="polite">
        {t('savedLocally')}
        {formattedTime && (
          <span className="ms-1 opacity-70 text-[10px]">({formattedTime})</span>
        )}
      </span>
    </Badge>
  );
}
