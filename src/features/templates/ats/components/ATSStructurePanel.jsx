import { useTranslation } from 'react-i18next';
import { ShieldCheck, BarChart2 } from 'lucide-react';
import { runATSStructureCheck } from '../checks/runATSStructureCheck';
import { ATSCheckItem } from './ATSCheckItem';
import { ATSDisclaimer } from './ATSDisclaimer';

export function ATSStructurePanel({ cvData, templateMetadata }) {
  const { t } = useTranslation('templates');

  const result = runATSStructureCheck(cvData, templateMetadata);

  return (
    <div className="space-y-4 text-start">
      <ATSDisclaimer />

      {/* Score Header */}
      <div className="p-4 bg-surface border border-border rounded-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary-subtle text-primary rounded-xl">
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">{t('atsStructureCheckTitle')}</h3>
            <p className="text-xs text-foreground-secondary">{t('atsStructureCheckDesc')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-success-subtle text-success px-3 py-1.5 rounded-xl border border-success/20 font-bold text-sm shrink-0">
          <BarChart2 className="w-4 h-4" />
          <span>{result.score} / 100</span>
        </div>
      </div>

      {/* Checks List */}
      <div className="space-y-2">
        {result.failed.map((check) => (
          <ATSCheckItem key={check.id} check={check} status="failed" />
        ))}

        {result.warnings.map((check) => (
          <ATSCheckItem key={check.id} check={check} status="warning" />
        ))}

        {result.passed.map((check) => (
          <ATSCheckItem key={check.id} check={check} status="passed" />
        ))}
      </div>
    </div>
  );
}
