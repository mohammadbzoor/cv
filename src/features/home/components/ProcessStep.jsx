import { useTranslation } from 'react-i18next';

export function ProcessStep({ step }) {
  const { t } = useTranslation('home');

  return (
    <div className="relative p-6 bg-surface border border-border rounded-2xl shadow-2xs space-y-3">
      <div className="text-3xl font-extrabold text-primary-subtle font-mono">
        {step.stepNumber}
      </div>
      <h3 className="text-base font-bold text-foreground">
        {t(step.titleKey)}
      </h3>
      <p className="text-xs text-foreground-secondary leading-relaxed">
        {t(step.descKey)}
      </p>
    </div>
  );
}
