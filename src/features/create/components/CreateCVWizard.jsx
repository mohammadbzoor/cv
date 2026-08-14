import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useWizardNavigation } from '../hooks/useWizardNavigation';
import { useCreateCVWizard } from '../hooks/useCreateCVWizard';

import { WizardProgress } from './WizardProgress';
import { WizardNavigation } from './WizardNavigation';
import { UnsavedWizardGuard } from './UnsavedWizardGuard';
import { CheckCircle } from 'lucide-react';

import { WelcomeStep } from '../steps/WelcomeStep';
import { PersonalInfoStep } from '../steps/PersonalInfoStep';
import { SummaryStep } from '../steps/SummaryStep';
import { ExperienceStep } from '../steps/ExperienceStep';
import { EducationStep } from '../steps/EducationStep';
import { SkillsStep } from '../steps/SkillsStep';
import { ProjectsStep } from '../steps/ProjectsStep';
import { AdditionalInfoStep } from '../steps/AdditionalInfoStep';
import { ReviewStep } from '../steps/ReviewStep';

export function CreateCVWizard() {
  const { t } = useTranslation('create');
  const {
    currentStepIndex,
    currentStep,
    totalSteps,
    goToStep,
    goToNextStep,
    goToPreviousStep,
  } = useWizardNavigation(0);

  const {
    methods,
    cvData,
    isFinished,
    saveSuccessMessage,
    validateAndAdvance,
    handleSaveDraft,
    handleResetDraft,
    handleFinishWizard,
  } = useCreateCVWizard();

  const isFormDirty = methods.formState.isDirty;
  const hasExistingData = Boolean(
    cvData?.personalInfo?.fullName ||
      cvData?.summary ||
      cvData?.experiences?.length > 0 ||
      cvData?.education?.length > 0
  );

  async function handleNextClick() {
    await validateAndAdvance(currentStep.id, goToNextStep);
  }

  function handleFinishClick() {
    handleFinishWizard();
  }

  return (
    <FormProvider {...methods}>
      <UnsavedWizardGuard isDirty={isFormDirty} />

      <div className="space-y-6">
        {/* Success Save Banner */}
        {saveSuccessMessage && (
          <div className="p-3 bg-success-subtle border border-success text-success text-xs font-semibold rounded-xl flex items-center gap-2 shadow-2xs">
            <CheckCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t(saveSuccessMessage, saveSuccessMessage)}</span>
          </div>
        )}

        {/* Wizard Progress Stepper */}
        <WizardProgress
          currentStepIndex={currentStepIndex}
          onStepClick={goToStep}
        />

        {/* Step Component Rendering */}
        <div className="pt-2">
          {currentStepIndex === 0 && (
            <WelcomeStep
              onStart={goToNextStep}
              onResetDraft={handleResetDraft}
              hasExistingData={hasExistingData}
            />
          )}

          {currentStepIndex === 1 && <PersonalInfoStep />}
          {currentStepIndex === 2 && <SummaryStep />}
          {currentStepIndex === 3 && <ExperienceStep />}
          {currentStepIndex === 4 && <EducationStep />}
          {currentStepIndex === 5 && <SkillsStep />}
          {currentStepIndex === 6 && <ProjectsStep />}
          {currentStepIndex === 7 && <AdditionalInfoStep />}

          {currentStepIndex === 8 && (
            <ReviewStep
              onJumpToStep={goToStep}
              isFinished={isFinished}
              isSubmitting={methods.formState.isSubmitting}
            />
          )}
        </div>

        {/* Wizard Bottom Navigation Bar */}
        <WizardNavigation
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          onPrevious={goToPreviousStep}
          onNext={handleNextClick}
          onSaveDraft={handleSaveDraft}
          onFinish={handleFinishClick}
          isSubmitting={methods.formState.isSubmitting}
        />
      </div>
    </FormProvider>
  );
}
