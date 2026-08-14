import { useState } from 'react';
import { WIZARD_STEPS } from '../constants/wizardSteps';

/**
 * Custom hook managing step index navigation.
 */
export function useWizardNavigation(initialStep = 0) {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStep);

  function goToStep(index) {
    if (index >= 0 && index < WIZARD_STEPS.length) {
      setCurrentStepIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function goToNextStep() {
    if (currentStepIndex < WIZARD_STEPS.length - 1) {
      goToStep(currentStepIndex + 1);
    }
  }

  function goToPreviousStep() {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  }

  return {
    currentStepIndex,
    currentStep: WIZARD_STEPS[currentStepIndex],
    totalSteps: WIZARD_STEPS.length,
    goToStep,
    goToNextStep,
    goToPreviousStep,
  };
}
