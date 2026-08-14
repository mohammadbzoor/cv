import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, Download, HardDrive, CheckCircle2 } from 'lucide-react';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectCVData, selectLastSavedAt } from '../../cv/store/cvSelectors';
import { Button } from '../../../components/ui/Button';
import { SettingsSection } from './SettingsSection';
import { ClearLocalDataDialog } from './ClearLocalDataDialog';
import { clearProjectLocalData } from '../../../utils/clearLocalData';
import { useAuthStore } from '../../auth/store/useAuthStore';

export function LocalDataSettings() {
  const { t, i18n } = useTranslation(['settings', 'common']);
  const cvData = useCVStore(selectCVData);
  const lastSavedAt = useCVStore(selectLastSavedAt);
  const resetCV = useCVStore((state) => state.resetCV);
  const endDemoSession = useAuthStore((state) => state.endDemoSession);

  const [dialogTarget, setDialogTarget] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const hasDraft = Boolean(
    cvData?.personalInfo?.fullName?.trim() ||
    cvData?.summary?.trim() ||
    (cvData?.experiences && cvData.experiences.length > 0)
  );

  const formattedTime = lastSavedAt
    ? new Intl.DateTimeFormat(i18n.language === 'ar' ? 'ar' : 'en', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(lastSavedAt))
    : t('settings:neverSaved');

  const exportCvJson = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cvData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `cv-draft-export-${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch {
      // ignore
    }
  };

  const handleConfirmClear = () => {
    if (!dialogTarget) return;

    if (dialogTarget === 'cv-draft') {
      resetCV();
      clearProjectLocalData('cv-draft');
    } else if (dialogTarget === 'demo-session') {
      endDemoSession();
      clearProjectLocalData('demo-session');
    } else if (dialogTarget === 'all') {
      resetCV();
      endDemoSession();
      clearProjectLocalData('all');
    }

    setDialogTarget(null);
    setSuccessMessage(t('settings:dataClearedNotice'));
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <SettingsSection
      id="local-data"
      title={t('settings:localDataTitle')}
      description={t('settings:localDataDesc')}
    >
      <div className="space-y-4 max-w-lg">
        {successMessage && (
          <div className="p-3 bg-success-subtle text-success rounded-xl text-xs flex items-center gap-2" role="status">
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Draft Stats */}
        <div className="p-4 bg-surface border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-foreground-secondary font-medium">{t('settings:draftStatusLabel')}</span>
            <span className="font-bold text-foreground">
              {hasDraft ? t('settings:activeDraftFound') : t('settings:noDraftFound')}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-foreground-secondary font-medium">{t('settings:lastSavedLabel')}</span>
            <span className="font-mono text-foreground">{formattedTime}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            leadingIcon={Download}
            onClick={exportCvJson}
            disabled={!hasDraft}
          >
            {t('settings:exportJsonButton')}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            leadingIcon={Trash2}
            onClick={() => setDialogTarget('cv-draft')}
            disabled={!hasDraft}
          >
            {t('settings:clearCvDraftButton')}
          </Button>

          <Button
            type="button"
            variant="danger"
            size="sm"
            leadingIcon={HardDrive}
            onClick={() => setDialogTarget('all')}
          >
            {t('settings:clearAllButton')}
          </Button>
        </div>
      </div>

      <ClearLocalDataDialog
        isOpen={Boolean(dialogTarget)}
        onClose={() => setDialogTarget(null)}
        onConfirm={handleConfirmClear}
        target={dialogTarget}
      />
    </SettingsSection>
  );
}
