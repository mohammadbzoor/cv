import { useTranslation } from 'react-i18next';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { evaluateSafeCustomization } from '../utils/evaluateSafeCustomization';

export function SafeCustomizationGuard({ design, onApplySaferDefaults }) {
  const { t } = useTranslation('templates');

  const warnings = evaluateSafeCustomization(design);

  if (warnings.length === 0) return null;

  return (
    <div className="p-3 bg-warning-subtle/80 border border-warning/30 rounded-xl space-y-2 text-start">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-bold text-xs text-warning">
          <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{t('safetyGuard.title', { defaultValue: 'Readability Guard Warning' })}</span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="xs"
          leadingIcon={ShieldCheck}
          onClick={onApplySaferDefaults}
        >
          {t('safetyGuard.applySaferDefaults', { defaultValue: 'Apply Safer Defaults' })}
        </Button>
      </div>

      <p className="text-xs text-foreground-secondary leading-relaxed">
        {t('safetyGuard.desc', { defaultValue: 'Some styling choices may reduce document readability or ATS extraction clarity.' })}
      </p>

      <ul className="list-disc list-inside text-xs text-foreground-secondary space-y-0.5">
        {warnings.map((wKey) => (
          <li key={wKey}>
            {t(`safetyGuard.warnings.${wKey}`, { defaultValue: 'Styling choice may reduce contrast or readability.' })}
          </li>
        ))}
      </ul>
    </div>
  );
}
