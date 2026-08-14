import { useTranslation } from 'react-i18next';

/**
 * Step-by-step print instructions for the user.
 * Guides them through the browser's Save as PDF workflow.
 */
export function PrintInstructions() {
  const { t } = useTranslation('export');

  const steps = [
    t('instructions.step1'),
    t('instructions.step2'),
    t('instructions.step3'),
    t('instructions.step4'),
    t('instructions.step5'),
    t('instructions.step6'),
    t('instructions.step7'),
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
        {t('printInstructions')}
      </h3>
      <ol className="space-y-1.5 text-xs text-foreground-secondary list-decimal list-inside">
        {steps.map((step, index) => (
          <li key={index} className="leading-relaxed pl-1">
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
