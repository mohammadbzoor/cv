import { useTranslation } from 'react-i18next';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export function ATSCheckItem({ check, status = 'passed' }) {
  const { t } = useTranslation('templates');

  let icon = <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" aria-hidden="true" />;
  let badgeClass = 'bg-success-subtle text-success border-success/20';

  if (status === 'warning') {
    icon = <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" aria-hidden="true" />;
    badgeClass = 'bg-warning-subtle text-warning border-warning/20';
  } else if (status === 'failed') {
    icon = <XCircle className="w-4 h-4 text-danger shrink-0 mt-0.5" aria-hidden="true" />;
    badgeClass = 'bg-danger-subtle text-danger border-danger/20';
  }

  const title = t(check.titleKey, { defaultValue: check.id });
  const desc = check.reason || t(check.descKey, { defaultValue: '' });

  return (
    <div className="p-3 bg-surface border border-border rounded-xl flex items-start gap-3">
      {icon}
      <div className="space-y-0.5 flex-1 text-start">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-bold text-foreground">{title}</span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${badgeClass}`}>
            {status}
          </span>
        </div>
        {desc && <p className="text-xs text-foreground-secondary leading-relaxed">{desc}</p>}
      </div>
    </div>
  );
}
