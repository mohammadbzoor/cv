import { ArrowLeft, ArrowRight, Save, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../hooks/useLanguage';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

/**
 * Navigation bar for Create CV Wizard (Previous, Next, Save Draft, Finish).
 */
export function WizardNavigation({
  currentStepIndex,
  totalSteps,
  onPrevious,
  onNext,
  onSaveDraft,
  onFinish,
  isSubmitting = false,
  className,
}) {
  const { t } = useTranslation(['create', 'common']);
  const { isRTL } = useLanguage();

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 pt-6 border-t border-border/60 flex-wrap',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {!isFirstStep && (
          <Button
            type="button"
            variant="outline"
            size="md"
            leadingIcon={BackArrow}
            onClick={onPrevious}
          >
            {t('create:previous')}
          </Button>
        )}

        {!isFirstStep && (
          <Button
            type="button"
            variant="ghost"
            size="md"
            leadingIcon={Save}
            onClick={onSaveDraft}
          >
            {t('create:saveDraft')}
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 ms-auto">
        {!isLastStep ? (
          <Button
            type="button"
            variant="primary"
            size="md"
            trailingIcon={ForwardArrow}
            onClick={onNext}
          >
            {t('create:next')}
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            size="md"
            leadingIcon={CheckCircle2}
            loading={isSubmitting}
            onClick={onFinish}
          >
            {t('create:finish')}
          </Button>
        )}
      </div>
    </div>
  );
}
