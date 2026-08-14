import { useTranslation } from 'react-i18next';
import { useCVStore } from '../store/useCVStore';
import { selectCVSummaryStats, selectCVStatus, selectIsDirty, selectCanUndo, selectCanRedo } from '../store/cvSelectors';
import { Badge } from '../../../components/ui/Badge';

export function CVDataSummary() {
  const { t } = useTranslation('cv');
  const stats = useCVStore(selectCVSummaryStats);
  const status = useCVStore(selectCVStatus);
  const isDirty = useCVStore(selectIsDirty);
  const canUndo = useCVStore(selectCanUndo);
  const canRedo = useCVStore(selectCanRedo);

  const statusVariant =
    status === 'saved' ? 'success' : status === 'saving' ? 'warning' : status === 'error' ? 'error' : 'secondary';

  return (
    <div className="bg-surface rounded-xl border border-border p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border/60 pb-3">
        <h3 className="text-sm font-bold text-foreground">{t('storeSummary')}</h3>
        <div className="flex items-center gap-2">
          <Badge variant={statusVariant} size="sm">
            {t(status)}
          </Badge>

          {isDirty && (
            <Badge variant="warning" size="sm">
              {t('dirty')}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-app-bg rounded-lg border border-border/60 text-center">
          <span className="block text-foreground-secondary text-[11px]">{t('experience')}</span>
          <span className="text-base font-bold text-foreground mt-0.5 block">{stats.experienceCount}</span>
        </div>

        <div className="p-3 bg-app-bg rounded-lg border border-border/60 text-center">
          <span className="block text-foreground-secondary text-[11px]">{t('education')}</span>
          <span className="text-base font-bold text-foreground mt-0.5 block">{stats.educationCount}</span>
        </div>

        <div className="p-3 bg-app-bg rounded-lg border border-border/60 text-center">
          <span className="block text-foreground-secondary text-[11px]">{t('skills')}</span>
          <span className="text-base font-bold text-foreground mt-0.5 block">{stats.skillCount}</span>
        </div>

        <div className="p-3 bg-app-bg rounded-lg border border-border/60 text-center">
          <span className="block text-foreground-secondary text-[11px]">{t('projects')}</span>
          <span className="text-base font-bold text-foreground mt-0.5 block">{stats.projectCount}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-foreground-secondary pt-1">
        <span>History: {canUndo ? 'Can Undo' : 'No Undo'} | {canRedo ? 'Can Redo' : 'No Redo'}</span>
        <span>Completed: {stats.completedSectionCount} sections</span>
      </div>
    </div>
  );
}
