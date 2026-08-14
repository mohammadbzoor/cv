import { useTranslation } from 'react-i18next';
import { Gauge, Info } from 'lucide-react';
import { calculateContentPressure } from '../utils/calculateContentPressure';

export function ContentPressureMeter({ cvData, design }) {
  const { t } = useTranslation('templates');

  const pressure = calculateContentPressure(cvData, design);
  const levelTitle = t(`pressure.${pressure.level}`, { defaultValue: pressure.level });

  return (
    <div className="p-4 bg-surface border border-border rounded-xl space-y-3 text-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold text-xs text-foreground">
          <Gauge className="w-4 h-4 text-primary" aria-hidden="true" />
          <span>{t('pressure.title', { defaultValue: 'Content Density & Page Pressure' })}</span>
        </div>

        <span className={`px-2 py-0.5 rounded text-[11px] font-bold border uppercase ${pressure.color}`}>
          {levelTitle}
        </span>
      </div>

      {/* Bar */}
      <div className="w-full bg-surface-muted h-2 rounded-full overflow-hidden border border-border/40">
        <div
          className={`h-full transition-all duration-300 ${
            pressure.level === 'comfortable'
              ? 'bg-success'
              : pressure.level === 'approaching-limit'
                ? 'bg-info'
                : pressure.level === 'dense'
                  ? 'bg-warning'
                  : 'bg-danger'
          }`}
          style={{ width: `${pressure.barPercent}%` }}
        />
      </div>

      {/* Suggestions */}
      <div className="space-y-1 text-xs text-foreground-secondary pt-1">
        {pressure.suggestions.map((key) => (
          <div key={key} className="flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <span>{t(`pressure.suggestions.${key}`, { defaultValue: key })}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
