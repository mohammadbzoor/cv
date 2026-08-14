import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useCVStore } from '../features/cv/store/useCVStore';
import { applySuggestion } from '../features/improve/utils/applySuggestion';
import { validateCVForExport } from '../features/cv/utils/validateCVData';
import { getPrintDocumentName } from '../features/export/utils/getPrintDocumentName';
import { printCV } from '../features/export/services/printService';
import { featureFlags } from '../features/release/config/featureFlags';
import { shouldAutosave } from '../features/autosave/utils/shouldAutosave';

describe('Sprint 11 Integration Flows', () => {
  let originalWindow;
  let originalDocument;

  beforeEach(() => {
    useCVStore.getState().createNewCV();
    useCVStore.getState().clearHistory();

    originalWindow = globalThis.window;
    originalDocument = globalThis.document;

    const classListSet = new Set();
    globalThis.document = {
      title: 'Original Title',
      body: {
        classList: {
          add: (cls) => classListSet.add(cls),
          remove: (cls) => classListSet.delete(cls),
          contains: (cls) => classListSet.has(cls),
        },
      },
      querySelector: vi.fn(),
    };
  });

  afterEach(() => {
    globalThis.window = originalWindow;
    globalThis.document = originalDocument;
  });

  // ── 1. Create to Builder Flow ──
  describe('Create to Builder Flow', () => {
    it('1. initializes with default CV structure', () => {
      const state = useCVStore.getState();
      expect(state.cvData.schemaVersion).toBe(1);
      expect(state.cvData.document.language).toBe('en');
      expect(state.cvData.document.direction).toBe('ltr');
    });

    it('2. updates personal info correctly', () => {
      useCVStore.getState().updatePersonalInfo({ fullName: 'Jane Doe', email: 'jane@example.com' });
      const state = useCVStore.getState();
      expect(state.cvData.personalInfo.fullName).toBe('Jane Doe');
      expect(state.cvData.personalInfo.email).toBe('jane@example.com');
      expect(state.isDirty).toBe(true);
    });

    it('3. marks status as saved when markSaved is called', () => {
      useCVStore.getState().updatePersonalInfo({ fullName: 'Jane Doe' });
      useCVStore.getState().markSaved();
      const state = useCVStore.getState();
      expect(state.status).toBe('saved');
      expect(state.isDirty).toBe(false);
      expect(state.cvData.metadata.lastSavedAt).toBeDefined();
    });

    it('4. retains templateId across personal info updates', () => {
      useCVStore.getState().setTemplate('developer');
      useCVStore.getState().updatePersonalInfo({ fullName: 'Jane Doe' });
      const state = useCVStore.getState();
      expect(state.cvData.design.templateId).toBe('developer');
      expect(state.cvData.personalInfo.fullName).toBe('Jane Doe');
    });
  });

  // ── 2. Template Flow ──
  describe('Template Flow', () => {
    it('5. changes template without altering personal info or experiences', () => {
      useCVStore.getState().updatePersonalInfo({ fullName: 'Alice' });
      useCVStore.getState().addExperience({ position: 'Engineer' });

      useCVStore.getState().setTemplate('professional-ats');
      const state = useCVStore.getState();

      expect(state.cvData.design.templateId).toBe('professional-ats');
      expect(state.cvData.personalInfo.fullName).toBe('Alice');
      expect(state.cvData.experiences).toHaveLength(1);
    });

    it('6. supports Undo to revert template selection', () => {
      useCVStore.getState().setTemplate('classic-ats');
      useCVStore.getState().setTemplate('developer');

      useCVStore.getState().undo();
      expect(useCVStore.getState().cvData.design.templateId).toBe('classic-ats');
    });

    it('7. supports Redo to re-apply template selection', () => {
      useCVStore.getState().setTemplate('classic-ats');
      useCVStore.getState().setTemplate('developer');

      useCVStore.getState().undo();
      useCVStore.getState().redo();
      expect(useCVStore.getState().cvData.design.templateId).toBe('developer');
    });
  });

  // ── 3. Match Skill Flow ──
  describe('Match Skill Flow', () => {
    it('8. adds a new skill cleanly to store', () => {
      useCVStore.getState().addSkill({ name: 'TypeScript', level: 'intermediate' });
      const skills = useCVStore.getState().cvData.skills;
      expect(skills.some((s) => s.name === 'TypeScript')).toBe(true);
    });

    it('9. prevents duplicate skill additions when checked', () => {
      useCVStore.getState().addSkill({ name: 'React', level: 'advanced' });
      const existing = useCVStore.getState().cvData.skills;
      const isDuplicate = existing.some((s) => s.name.toLowerCase() === 'react');

      if (!isDuplicate) {
        useCVStore.getState().addSkill({ name: 'React', level: 'advanced' });
      }

      expect(useCVStore.getState().cvData.skills.filter((s) => s.name === 'React')).toHaveLength(1);
    });

    it('10. undo removes the newly added skill', () => {
      const initialCount = useCVStore.getState().cvData.skills.length;
      useCVStore.getState().addSkill({ name: 'GraphQL' });
      expect(useCVStore.getState().cvData.skills.length).toBe(initialCount + 1);

      useCVStore.getState().undo();
      expect(useCVStore.getState().cvData.skills.length).toBe(initialCount);
    });

    it('11. document language remains en and direction remains ltr after skill additions', () => {
      useCVStore.getState().addSkill({ name: 'Node.js' });
      const cv = useCVStore.getState().cvData;
      expect(cv.document.language).toBe('en');
      expect(cv.document.direction).toBe('ltr');
    });
  });

  // ── 4. Improve Suggestion Flow ──
  describe('Improve Suggestion Flow', () => {
    it('12. applies valid suggestion to target path cleanly', () => {
      useCVStore.getState().updatePersonalInfo({ fullName: 'Bob Martin' });
      const cvData = useCVStore.getState().cvData;

      const suggestion = {
        id: 'sug-1',
        fieldPath: 'summary',
        originalValue: '',
        suggestedValue: 'Experienced developer specializing in React and Node.js.',
        rationale: 'Add comprehensive professional summary',
      };

      const result = applySuggestion(cvData, suggestion);
      expect(result.success).toBe(true);
      expect(result.data.summary).toBe('Experienced developer specializing in React and Node.js.');
    });

    it('13. rejects conflicting suggestion if originalValue does not match current state', () => {
      useCVStore.getState().updateField('summary', 'Current Summary Text');
      const cvData = useCVStore.getState().cvData;

      const suggestion = {
        id: 'sug-2',
        fieldPath: 'summary',
        originalValue: 'Different Original Text',
        suggestedValue: 'New Suggested Summary',
      };

      const result = applySuggestion(cvData, suggestion);
      expect(result.success).toBe(false);
      expect(result.error.code).toBe('ORIGINAL_VALUE_MISMATCH');
    });

    it('14. preserves non-targeted fields when applying a suggestion', () => {
      useCVStore.getState().updatePersonalInfo({ fullName: 'Charlie' });
      const cvData = useCVStore.getState().cvData;

      const suggestion = {
        id: 'sug-3',
        fieldPath: 'summary',
        originalValue: '',
        suggestedValue: 'Summary text',
      };

      const result = applySuggestion(cvData, suggestion);
      expect(result.success).toBe(true);
      expect(result.data.personalInfo.fullName).toBe('Charlie');
    });
  });

  // ── 5. Export & Print Flow ──
  describe('Export & Print Flow', () => {
    it('15. allows print for a complete CV', () => {
      useCVStore.getState().updatePersonalInfo({ fullName: 'David Miller', email: 'david@example.com' });
      useCVStore.getState().updateField('summary', 'Senior Full Stack Software Engineer');
      const cvData = useCVStore.getState().cvData;

      const validation = validateCVForExport(cvData);
      expect(validation.success).toBe(true);
    });

    it('16. prevents print when fullName is missing', () => {
      useCVStore.getState().updatePersonalInfo({ fullName: '' });
      const cvData = useCVStore.getState().cvData;

      const validation = validateCVForExport(cvData);
      expect(validation.success).toBe(false);
    });

    it('17. prevents print when contact info is completely missing', () => {
      useCVStore.getState().updatePersonalInfo({ fullName: 'Eve', email: '', phone: '' });
      const cvData = useCVStore.getState().cvData;

      const validation = validateCVForExport(cvData);
      expect(validation.success).toBe(false);
    });

    it('18. generates safe sanitized print filename', () => {
      const filename = getPrintDocumentName({ fullName: 'Dr. Jane M. O\'Connor-Smith!' });
      expect(filename).toBe('dr-jane-m-oconnor-smith-resume');
    });

    it('19. restores original document.title after print mock', () => {
      const addEventListenerMock = vi.fn();
      globalThis.window = {
        print: vi.fn(),
        addEventListener: addEventListenerMock,
        removeEventListener: vi.fn(),
      };

      globalThis.document.querySelector.mockReturnValue({});
      globalThis.document.title = 'Original Title';

      printCV({ documentTitle: 'printed-filename' });

      const handler = addEventListenerMock.mock.calls.find((call) => call[0] === 'afterprint')?.[1];
      if (handler) handler();

      expect(globalThis.document.title).toBe('Original Title');
    });

    it('20. returns error when document element is missing', () => {
      globalThis.window = { print: vi.fn() };
      globalThis.document.querySelector.mockReturnValue(null);

      const result = printCV({ documentTitle: 'missing-doc' });
      expect(result.success).toBe(false);
      expect(result.error.code).toBe('CV_DOCUMENT_NOT_FOUND');
    });
  });

  // ── 6. Autosave Flow ──
  describe('Autosave Flow', () => {
    it('21. shouldAutosave is true when store is dirty', () => {
      expect(shouldAutosave({ isDirty: true, status: 'dirty' })).toBe(true);
    });

    it('22. shouldAutosave is false when store is clean', () => {
      expect(shouldAutosave({ isDirty: false, status: 'saved' })).toBe(false);
    });

    it('23. markSaving transitions status to saving', () => {
      useCVStore.getState().markSaving();
      expect(useCVStore.getState().status).toBe('saving');
    });

    it('24. markSaved transitions status to saved', () => {
      useCVStore.getState().markSaved();
      expect(useCVStore.getState().status).toBe('saved');
      expect(useCVStore.getState().isDirty).toBe(false);
    });
  });

  // ── 7. Feature Flags Flow ──
  describe('Feature Flags', () => {
    it('25. featureFlags contains enableDevelopmentRoutes property', () => {
      expect(featureFlags).toHaveProperty('enableDevelopmentRoutes');
      expect(typeof featureFlags.enableDevelopmentRoutes).toBe('boolean');
    });
  });
});
