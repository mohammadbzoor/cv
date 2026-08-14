import { WIZARD_STEPS } from '../constants/wizardSteps';

/**
 * Returns field paths associated with a given wizard step ID.
 *
 * @param {string} stepId Wizard step identifier.
 * @returns {string[]} Array of field names.
 */
export function getStepFields(stepId) {
  const step = WIZARD_STEPS.find((s) => s.id === stepId);
  return step ? step.fields : [];
}
