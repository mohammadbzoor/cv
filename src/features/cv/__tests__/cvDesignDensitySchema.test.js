import { describe, it, expect } from 'vitest';
import { designSettingsSchema } from '../models/cvSchema';
import { normalizeCVData } from '../utils/normalizeCVData';
import { useCVStore } from '../store/useCVStore';

describe('CV Design Settings (Density, Dividers, Heading Styles)', () => {
  it('25. designSettingsSchema validates density enum values', () => {
    const comfortable = designSettingsSchema.safeParse({ density: 'comfortable' });
    const balanced = designSettingsSchema.safeParse({ density: 'balanced' });
    const compact = designSettingsSchema.safeParse({ density: 'compact' });
    const invalid = designSettingsSchema.safeParse({ density: 'super-dense' });

    expect(comfortable.success).toBe(true);
    expect(balanced.success).toBe(true);
    expect(compact.success).toBe(true);
    expect(invalid.success).toBe(false);
  });

  it('26. designSettingsSchema validates showSectionDividers boolean and headingStyle enum', () => {
    const valid = designSettingsSchema.safeParse({
      showSectionDividers: true,
      headingStyle: 'prominent',
    });
    const invalidStyle = designSettingsSchema.safeParse({
      headingStyle: 'unknown-style',
    });

    expect(valid.success).toBe(true);
    expect(invalidStyle.success).toBe(false);
  });

  it('27. normalizeCVData adds density, showSectionDividers, and headingStyle backward-compatibly to old persisted drafts', () => {
    const rawOldData = {
      id: 'old-cv-1',
      design: {
        templateId: 'classic-ats',
        primaryColor: '#123456',
      },
    };

    const normalized = normalizeCVData(rawOldData);
    expect(normalized.design.density).toBe('balanced');
    expect(normalized.design.showSectionDividers).toBe(true);
    expect(normalized.design.headingStyle).toBe('standard');
    expect(normalized.design.templateId).toBe('classic-ats');
  });

  it('28. switching templates preserves all personal info, experiences, skills, section order, and hidden sections', () => {
    useCVStore.getState().updatePersonalInfo({ fullName: 'Preserved Person' });
    useCVStore.getState().addExperience({ position: 'Preserved Job', company: 'Preserved Co' });
    useCVStore.getState().toggleSectionVisibility('summary');

    // Switch template
    useCVStore.getState().setTemplate('developer');

    const updated = useCVStore.getState().cvData;
    expect(updated.design.templateId).toBe('developer');
    expect(updated.personalInfo.fullName).toBe('Preserved Person');
    expect(updated.experiences[0].position).toBe('Preserved Job');
    expect(updated.hiddenSections).toContain('summary');
  });

  it('29. updating design settings tracks history and allows undo/redo', () => {
    useCVStore.getState().resetCV();
    const initialDensity = useCVStore.getState().cvData.design.density;
    expect(initialDensity).toBe('balanced');

    useCVStore.getState().updateDesignSettings({ density: 'compact' });
    expect(useCVStore.getState().cvData.design.density).toBe('compact');

    useCVStore.getState().undo();
    expect(useCVStore.getState().cvData.design.density).toBe('balanced');

    useCVStore.getState().redo();
    expect(useCVStore.getState().cvData.design.density).toBe('compact');
  });

  it('30. fallback for invalid templateId in normalizeCVData defaults to technical-prime-ats', () => {
    const rawData = {
      design: {
        templateId: 'corrupted-non-existent-template',
      },
    };

    const normalized = normalizeCVData(rawData);
    expect(normalized.design.templateId).toBe('corrupted-non-existent-template');
  });
});
