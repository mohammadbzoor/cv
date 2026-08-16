import { useTranslation } from 'react-i18next';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { calculateReadabilityWarnings, getSaferDesignSettings } from '../utils/calculateReadabilityWarnings';

export function SafetySettings({ cvData, onApplySafeDefaults }) {
  const { t } = useTranslation(['builder', 'templates']);
  const { level, issues, recommendations } = calculateReadabilityWarnings(cvData);

  function handleApplySafer() {
    if (!cvData || !cvData.design) return;
    const safer = getSaferDesignSettings(cvData.design);
    onApplySafeDefaults(safer);
  }

  return (
    <div className="space-y-4 text-start">
      <div className="flex items-center gap-2 mb-2">
        {level === 'safe' && <ShieldCheck className="w-5 h-5 text-success" />}
        {level === 'review' && <AlertTriangle className="w-5 h-5 text-warning" />}
        {level === 'warning' && <ShieldAlert className="w-5 h-5 text-danger" />}
        <h4 className="text-sm font-bold text-foreground">
          {t(`templates:safety.level_${level}`, { defaultValue: level.toUpperCase() })}
        </h4>
      </div>

      {issues.length === 0 ? (
        <p className="text-xs text-foreground-secondary">
          {t('templates:safety.allGood', { defaultValue: 'Your current design settings are optimal for readability.' })}
        </p>
      ) : (
        <div className="space-y-3">
          <ul className="text-xs space-y-2">
            {issues.map((issue, idx) => (
              <li key={idx} className="flex gap-2 text-foreground-secondary">
                <span className="shrink-0 mt-0.5">•</span>
                <span>
                  <strong>{t(`templates:safety.issues.${issue}`, { defaultValue: issue })}:</strong>{' '}
                  {t(`templates:safety.recommendations.${issue}`, { defaultValue: recommendations[idx] })}
                </span>
              </li>
            ))}
          </ul>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleApplySafer}
            className="w-full text-xs mt-2"
          >
            {t('templates:safety.applySaferDefaults', { defaultValue: 'Apply Safer Defaults' })}
          </Button>
        </div>
      )}
    </div>
  );
}
