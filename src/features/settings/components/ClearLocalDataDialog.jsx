import { useTranslation } from 'react-i18next';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';

/**
 * Confirmation dialog for clearing local project data targets.
 */
export function ClearLocalDataDialog({ isOpen, onClose, onConfirm, target }) {
  const { t } = useTranslation(['settings', 'common']);

  const dialogTitles = {
    'cv-draft': t('settings:clearCvDraftTitle'),
    'settings': t('settings:clearSettingsTitle'),
    'demo-session': t('settings:clearDemoSessionTitle'),
    'all': t('settings:clearAllTitle'),
  };

  const dialogDescs = {
    'cv-draft': t('settings:clearCvDraftDesc'),
    'settings': t('settings:clearSettingsDesc'),
    'demo-session': t('settings:clearDemoSessionDesc'),
    'all': t('settings:clearAllDesc'),
  };

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={dialogTitles[target] || t('settings:clearDataTitle')}
      description={dialogDescs[target] || t('settings:clearDataDesc')}
      confirmLabel={t('settings:clearConfirmButton')}
      cancelLabel={t('common:cancel')}
      destructive={true}
    />
  );
}
