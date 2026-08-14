import { useTranslation } from 'react-i18next';
import { Layers, CheckCircle2, AlertCircle, EyeOff, Circle } from 'lucide-react';
import { getSectionLabel } from '../../../builder/utils/getSectionLabel';

export function ContentCoverageMap({ cvData, onSelectSection }) {
  const { t } = useTranslation('templates');

  if (!cvData) return null;

  const sectionKeys = cvData.sectionOrder || [
    'summary',
    'experiences',
    'education',
    'skills',
    'projects',
    'certificates',
    'languages',
  ];
  const hiddenSet = new Set(cvData.hiddenSections || []);

  const items = sectionKeys.map((sec) => {
    const isHidden = hiddenSet.has(sec);
    let status = 'empty';

    if (sec === 'summary') {
      if (cvData.summary?.trim()) status = 'complete';
    } else if (sec === 'experiences') {
      const len = cvData.experiences?.length || 0;
      status = len >= 2 ? 'complete' : len === 1 ? 'partial' : 'empty';
    } else if (sec === 'education') {
      status = (cvData.education?.length || 0) > 0 ? 'complete' : 'empty';
    } else if (sec === 'skills') {
      const len = cvData.skills?.length || 0;
      status = len >= 5 ? 'complete' : len > 0 ? 'partial' : 'empty';
    } else if (sec === 'projects') {
      status = (cvData.projects?.length || 0) > 0 ? 'complete' : 'empty';
    } else if (sec === 'certificates') {
      status = (cvData.certificates?.length || 0) > 0 ? 'complete' : 'empty';
    } else if (sec === 'languages') {
      status = (cvData.languages?.length || 0) > 0 ? 'complete' : 'empty';
    }

    if (isHidden) status = 'hidden';

    return { key: sec, status };
  });

  return (
    <div className="p-4 bg-surface border border-border rounded-xl space-y-3 text-start">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div className="flex items-center gap-1.5 font-bold text-xs text-foreground">
          <Layers className="w-4 h-4 text-secondary" aria-hidden="true" />
          <span>{t('coverage.title', { defaultValue: 'Section Content Coverage Map' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
        {items.map(({ key, status }) => {
          let icon = <Circle className="w-3.5 h-3.5 text-foreground-muted" />;
          let badgeClass = 'bg-surface-muted text-foreground-muted';

          if (status === 'complete') {
            icon = <CheckCircle2 className="w-3.5 h-3.5 text-success" />;
            badgeClass = 'bg-success-subtle text-success border-success/20';
          } else if (status === 'partial') {
            icon = <AlertCircle className="w-3.5 h-3.5 text-warning" />;
            badgeClass = 'bg-warning-subtle text-warning border-warning/20';
          } else if (status === 'hidden') {
            icon = <EyeOff className="w-3.5 h-3.5 text-foreground-secondary" />;
            badgeClass = 'bg-surface-elevated text-foreground-secondary';
          }

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectSection?.(key)}
              className="p-2 rounded-lg border border-border/60 bg-surface-muted hover:bg-surface-elevated transition-colors flex items-center justify-between gap-1.5 text-start cursor-pointer"
            >
              <div className="flex items-center gap-1.5 truncate">
                {icon}
                <span className="font-semibold text-foreground truncate">{getSectionLabel(key)}</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase border shrink-0 ${badgeClass}`}>
                {t(`coverage.status.${status}`, { defaultValue: status })}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
