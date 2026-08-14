import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectCVData } from '../../cv/store/cvSelectors';
import { createCVWizardSchema } from '../schemas/createCVWizardSchema';
import { mapStoreToForm } from '../utils/mapStoreToForm';
import { mapFormToStore } from '../utils/mapFormToStore';
import { getStepFields } from '../utils/getStepFields';
import { focusFirstError } from '../utils/focusFirstError';
import { validateCVForExport } from '../../cv/utils/validateCVData';

/**
 * Custom hook encapsulating React Hook Form state and Zustand store synchronization for the Create CV Wizard.
 */
export function useCreateCVWizard() {
  const cvData = useCVStore(selectCVData);
  const replaceCVData = useCVStore((state) => state.replaceCVData);
  const resetCV = useCVStore((state) => state.resetCV);
  const markSaved = useCVStore((state) => state.markSaved);

  const [saveSuccessMessage, setSaveSuccessMessage] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const methods = useForm({
    resolver: zodResolver(createCVWizardSchema),
    defaultValues: mapStoreToForm(cvData),
    mode: 'onTouched',
  });

  const { trigger, getValues, reset, formState } = methods;

  /**
   * Validates step fields and advances step if valid.
   */
  async function validateAndAdvance(currentStepId, onAdvance) {
    const stepFields = getStepFields(currentStepId);

    if (!stepFields || stepFields.length === 0) {
      onAdvance();
      return true;
    }

    const isValid = await trigger(stepFields);
    if (isValid) {
      onAdvance();
      return true;
    } else {
      setTimeout(() => focusFirstError(formState.errors), 50);
      return false;
    }
  }

  /**
   * Saves current form progress as draft into Zustand Store and localStorage.
   */
  function handleSaveDraft() {
    const currentValues = getValues();
    const updatedStoreData = mapFormToStore(currentValues);

    const success = replaceCVData(updatedStoreData);
    if (success) {
      markSaved();
      setSaveSuccessMessage('Draft saved successfully!');
      setTimeout(() => setSaveSuccessMessage(null), 3000);
    }
  }

  /**
   * Resets form and store to fresh empty state.
   */
  function handleResetDraft() {
    resetCV();
    const emptyStore = useCVStore.getState().cvData;
    reset(mapStoreToForm(emptyStore));
    setIsFinished(false);
  }

  /**
   * Finalizes the wizard, performing export readiness validation.
   */
  function handleFinishWizard() {
    const currentValues = getValues();
    const updatedStoreData = mapFormToStore(currentValues);

    const readiness = validateCVForExport(updatedStoreData);
    if (!readiness.success) {
      return false;
    }

    replaceCVData(updatedStoreData);
    markSaved();
    setIsFinished(true);
    return true;
  }

  return {
    methods,
    cvData,
    isFinished,
    saveSuccessMessage,
    validateAndAdvance,
    handleSaveDraft,
    handleResetDraft,
    handleFinishWizard,
  };
}
