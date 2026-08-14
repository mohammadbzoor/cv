import { describe, it, expect } from 'vitest';
import { calculateContentPressure } from '../utils/calculateContentPressure';
import { evaluateSafeCustomization } from '../utils/evaluateSafeCustomization';
import { runReadingOrderDiagnostics } from '../utils/runReadingOrderDiagnostics';
import { createEmptyCV } from '../../../cv/models/cvFactories';
import { useCVStore } from '../../../cv/store/useCVStore';

describe('Template Studio State & Rare Features', () => {
  it('13. ContentPressureMeter returns comfortable level for empty/minimal CV', () => {
    const cvData = createEmptyCV();
    const pressure = calculateContentPressure(cvData, { density: 'balanced' });
    expect(pressure.level).toBe('comfortable');
    expect(pressure.barPercent).toBeLessThan(50);
  });

  it('14. ContentPressureMeter increases pressure level for dense text content', () => {
    const cvData = createEmptyCV({
      summary: 'A '.repeat(200),
      experiences: [
        { position: 'Engineer', company: 'Co 1', description: 'B '.repeat(300), achievements: ['Achievement 1', 'Achievement 2'] },
        { position: 'Lead', company: 'Co 2', description: 'C '.repeat(300), achievements: ['Achievement 3'] },
      ],
      skills: [{ name: 'S1' }, { name: 'S2' }, { name: 'S3' }, { name: 'S4' }, { name: 'S5' }],
    });
    const pressure = calculateContentPressure(cvData, { density: 'comfortable', fontSize: 'lg' });
    expect(['dense', 'overflow-risk']).toContain(pressure.level);
  });

  it('15. SafeCustomizationGuard detects light text color warning', () => {
    const warnings = evaluateSafeCustomization({ primaryColor: '#ffffff' });
    expect(warnings).toContain('lightColorWarning');
  });

  it('16. SafeCustomizationGuard detects hidden dividers + understated headings warning', () => {
    const warnings = evaluateSafeCustomization({ showSectionDividers: false, headingStyle: 'understated' });
    expect(warnings).toContain('hiddenDividersWeakHeadingsWarning');
  });

  it('17. ReadingOrderInspector detects missing contact info warning', () => {
    const cvData = createEmptyCV({ personalInfo: { fullName: 'No Contact Person' } });
    const diagnostics = runReadingOrderDiagnostics(cvData);
    const missingContact = diagnostics.find((d) => d.id === 'missingContact');
    expect(missingContact).toBeDefined();
    expect(missingContact.type).toBe('warning');
  });

  it('18. switching template in store records history and supports undo and redo', () => {
    useCVStore.getState().resetCV();
    const initialTpl = useCVStore.getState().cvData.design.templateId;

    useCVStore.getState().setTemplate('executive-ats');
    expect(useCVStore.getState().cvData.design.templateId).toBe('executive-ats');

    useCVStore.getState().undo();
    expect(useCVStore.getState().cvData.design.templateId).toBe(initialTpl);

    useCVStore.getState().redo();
    expect(useCVStore.getState().cvData.design.templateId).toBe('executive-ats');
  });
});
