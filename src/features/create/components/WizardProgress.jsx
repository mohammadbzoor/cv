import { useTranslation } from 'react-i18next';
import { WIZARD_STEPS } from '../constants/wizardSteps';
import { cn } from '../../../utils/cn';

/**
 * Responsive Wizard Progress indicator.
 * Displays full horizontal stepper on desktop and a compact percentage bar on mobile viewports.
 */
export function WizardProgress({ currentStepIndex, onStepClick, className }) {
  const { t } = useTranslation('create');
  const currentStep = WIZARD_STEPS[currentStepIndex];

  return (
    <div className={cn('space-y-4', className)}>
      {/* Mobile View */}
      <div className="md:hidden space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-foreground">
          <span>
            {t(currentStep.labelKey)} ({currentStepIndex + 1} / {WIZARD_STEPS.length})
          </span>
          <span className="text-primary font-mono">
            {Math.round(((currentStepIndex + 1) / WIZARD_STEPS.length) * 100)}%
          </span>
        </div>

        <div className="w-full h-2 bg-surface-muted rounded-full overflow-hidden border border-border/60">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${((currentStepIndex + 1) / WIZARD_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Stepper */}
      <nav aria-label="Wizard Steps" className="hidden md:block">
        <ol className="flex items-center justify-between gap-2 bg-surface border border-border p-3 rounded-2xl shadow-2xs">
          {WIZARD_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCurrent = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;
            const isClickable = isCompleted;

            return (
              <li key={step.id} className="flex-1">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(index)}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={cn(
                    'w-full flex flex-col items-center gap-1.5 p-2 rounded-xl text-center transition-all',
                    isClickable ? 'cursor-pointer hover:bg-surface-muted' : 'cursor-default',
                    isCurrent && 'bg-primary-subtle text-primary font-semibold shadow-2xs',
                    isCompleted && 'text-foreground hover:text-primary',
                    !isCurrent && !isCompleted && 'text-foreground-muted opacity-60'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                      isCurrent && 'bg-primary text-on-primary',
                      isCompleted && 'bg-surface-muted text-primary border border-border',
                      !isCurrent && !isCompleted && 'bg-surface-muted text-foreground-muted'
                    )}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>

                  <span className="text-[11px] font-medium leading-tight truncate max-w-[80px]">
                    {t(step.labelKey)}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
