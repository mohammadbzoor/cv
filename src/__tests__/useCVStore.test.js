import { describe, it, expect, beforeEach } from 'vitest';
import { useCVStore } from '../features/cv/store/useCVStore';

describe('useCVStore Zustand Store', () => {
  beforeEach(() => {
    useCVStore.getState().resetCV();
    useCVStore.getState().clearHistory();
  });

  it('initializes with default empty CV and clean state', () => {
    const state = useCVStore.getState();

    expect(state.cvData).toBeDefined();
    expect(state.status).toBe('idle');
    expect(state.isDirty).toBe(false);
    expect(state.history).toHaveLength(0);
  });

  it('adds, updates, and removes experience items while tracking dirty state and history', () => {
    const store = useCVStore.getState();

    store.addExperience({ company: 'Tech Inc' });
    let state = useCVStore.getState();

    expect(state.cvData.experiences).toHaveLength(1);
    expect(state.cvData.experiences[0].company).toBe('Tech Inc');
    expect(state.isDirty).toBe(true);
    expect(state.status).toBe('dirty');
    expect(state.history).toHaveLength(1);

    const expId = state.cvData.experiences[0].id;
    store.updateExperience(expId, { position: 'Lead' });
    state = useCVStore.getState();

    expect(state.cvData.experiences[0].position).toBe('Lead');
    expect(state.history).toHaveLength(2);

    store.removeExperience(expId);
    state = useCVStore.getState();

    expect(state.cvData.experiences).toHaveLength(0);
  });

  it('supports undo and redo snapshots correctly', () => {
    const store = useCVStore.getState();

    store.setDocumentTitle('First Title');
    store.setDocumentTitle('Second Title');

    let state = useCVStore.getState();
    expect(state.cvData.title).toBe('Second Title');

    store.undo();
    state = useCVStore.getState();
    expect(state.cvData.title).toBe('First Title');

    store.redo();
    state = useCVStore.getState();
    expect(state.cvData.title).toBe('Second Title');
  });

  it('rejects forbidden path update attempts', () => {
    const store = useCVStore.getState();

    store.updateField('document.language', 'ar');
    const state = useCVStore.getState();

    expect(state.status).toBe('error');
    expect(state.lastError.code).toBe('FORBIDDEN_PATH_UPDATE');
    expect(state.cvData.document.language).toBe('en');
  });
});
