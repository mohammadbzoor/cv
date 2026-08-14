import { describe, it, expect } from 'vitest';
import { WIZARD_STEPS } from '../features/create/constants/wizardSteps';
import { getStepFields } from '../features/create/utils/getStepFields';

describe('Wizard Navigation & Step Constants', () => {
  it('defines 9 ordered wizard steps starting with welcome and ending with review', () => {
    expect(WIZARD_STEPS).toHaveLength(9);
    expect(WIZARD_STEPS[0].id).toBe('welcome');
    expect(WIZARD_STEPS[8].id).toBe('review');
  });

  it('getStepFields returns associated field paths for validation', () => {
    const personalFields = getStepFields('personal');
    expect(personalFields).toContain('personalInfo.fullName');

    const summaryFields = getStepFields('summary');
    expect(summaryFields).toEqual(['summary']);

    const welcomeFields = getStepFields('welcome');
    expect(welcomeFields).toEqual([]);
  });
});
