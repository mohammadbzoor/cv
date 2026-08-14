import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createDefaultCVData } from '../models/cvDefaults';
import {
  createExperience,
  createEducation,
  createSkill,
  createProject,
  createCertificate,
  createLanguage,
  createCustomSection,
} from '../models/cvFactories';
import { normalizeCVData } from '../utils/normalizeCVData';
import { validateCVData } from '../utils/validateCVData';
import { updateByPath } from '../utils/updateByPath';
import { cvPersistOptions } from './cvPersistence';
import { MAX_HISTORY_SNAPSHOTS } from '../models/cvConstants';

function pushHistory(state) {
  const currentSnapshots = state.history || [];
  const nextHistory = [...currentSnapshots, state.cvData].slice(-MAX_HISTORY_SNAPSHOTS);
  return {
    history: nextHistory,
    future: [],
  };
}

/**
 * Primary Zustand Store for CV Data Management.
 * Handles state mutations, versioned local persistence, structural validation, and undo/redo snapshots.
 */
export const useCVStore = create(
  persist(
    (set, get) => ({
      cvData: createDefaultCVData(),
      status: 'idle',
      isDirty: false,
      lastError: null,
      history: [],
      future: [],

      // --- Core Document Actions ---

      createNewCV: (overrides = {}) => {
        const newCv = createDefaultCVData(overrides);
        set({
          cvData: newCv,
          status: 'idle',
          isDirty: false,
          lastError: null,
          history: [],
          future: [],
        });
      },

      replaceCVData: (rawNewData) => {
        const normalized = normalizeCVData(rawNewData);
        const validation = validateCVData(normalized);

        if (!validation.success) {
          set({
            status: 'error',
            lastError: {
              code: 'INVALID_IMPORTED_DATA',
              message: 'Imported data failed structural validation schema.',
              details: validation.errors,
            },
          });
          return false;
        }

        const state = get();
        set({
          ...pushHistory(state),
          cvData: validation.data,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
        return true;
      },

      resetCV: () => {
        const state = get();
        const emptyCv = createDefaultCVData();
        set({
          ...pushHistory(state),
          cvData: emptyCv,
          status: 'idle',
          isDirty: false,
          lastError: null,
        });
      },

      updateField: (path, value) => {
        const forbiddenPaths = [
          'schemaVersion',
          'metadata.createdAt',
          'document.language',
          'document.direction',
        ];

        if (forbiddenPaths.includes(path)) {
          set({
            status: 'error',
            lastError: {
              code: 'FORBIDDEN_PATH_UPDATE',
              message: `Updating restricted system path '${path}' is not allowed.`,
              path,
            },
          });
          return;
        }

        const state = get();
        try {
          const updatedCv = updateByPath(state.cvData, path, value);
          updatedCv.metadata.updatedAt = new Date().toISOString();

          set({
            ...pushHistory(state),
            cvData: updatedCv,
            status: 'dirty',
            isDirty: true,
            lastError: null,
          });
        } catch (err) {
          set({
            status: 'error',
            lastError: {
              code: 'PATH_UPDATE_FAILED',
              message: err instanceof Error ? err.message : 'Path update failed.',
              path,
            },
          });
        }
      },

      updatePersonalInfo: (partialInfo) => {
        const state = get();
        const updatedCv = {
          ...state.cvData,
          personalInfo: {
            ...state.cvData.personalInfo,
            ...partialInfo,
          },
          metadata: {
            ...state.cvData.metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      updateDesignSettings: (partialSettings) => {
        const state = get();
        const updatedCv = {
          ...state.cvData,
          design: {
            ...state.cvData.design,
            ...partialSettings,
            pageSize: 'A4', // Fixed to A4
          },
          metadata: {
            ...state.cvData.metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      setTemplate: (templateId) => {
        get().updateDesignSettings({ templateId });
      },

      setDocumentTitle: (title) => {
        const state = get();
        const updatedCv = {
          ...state.cvData,
          title,
          metadata: {
            ...state.cvData.metadata,
            updatedAt: new Date().toISOString(),
          },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      // --- List Actions (Experience, Education, Skills, etc.) ---

      addExperience: (overrides = {}) => {
        const state = get();
        const newItem = createExperience(overrides);
        const updatedCv = {
          ...state.cvData,
          experiences: [...state.cvData.experiences, newItem],
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      updateExperience: (id, partial) => {
        const state = get();
        const index = state.cvData.experiences.findIndex((item) => item.id === id);
        if (index === -1) {
          set({
            status: 'error',
            lastError: { code: 'ITEM_NOT_FOUND', message: `Experience '${id}' not found.`, path: `experiences.${id}` },
          });
          return;
        }

        const nextList = [...state.cvData.experiences];
        nextList[index] = { ...nextList[index], ...partial };

        const updatedCv = {
          ...state.cvData,
          experiences: nextList,
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      removeExperience: (id) => {
        const state = get();
        const updatedCv = {
          ...state.cvData,
          experiences: state.cvData.experiences.filter((item) => item.id !== id),
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      reorderExperiences: (startIndex, endIndex) => {
        const state = get();
        const list = [...state.cvData.experiences];
        if (startIndex < 0 || startIndex >= list.length || endIndex < 0 || endIndex >= list.length) {
          set({
            status: 'error',
            lastError: { code: 'INVALID_REORDER', message: 'Reorder indices out of bounds.' },
          });
          return;
        }

        const [removed] = list.splice(startIndex, 1);
        list.splice(endIndex, 0, removed);

        const updatedCv = {
          ...state.cvData,
          experiences: list,
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      addEducation: (overrides = {}) => {
        const state = get();
        const newItem = createEducation(overrides);
        const updatedCv = {
          ...state.cvData,
          education: [...state.cvData.education, newItem],
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      updateEducation: (id, partial) => {
        const state = get();
        const index = state.cvData.education.findIndex((item) => item.id === id);
        if (index === -1) {
          set({
            status: 'error',
            lastError: { code: 'ITEM_NOT_FOUND', message: `Education '${id}' not found.` },
          });
          return;
        }

        const nextList = [...state.cvData.education];
        nextList[index] = { ...nextList[index], ...partial };

        const updatedCv = {
          ...state.cvData,
          education: nextList,
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      removeEducation: (id) => {
        const state = get();
        const updatedCv = {
          ...state.cvData,
          education: state.cvData.education.filter((item) => item.id !== id),
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      reorderEducation: (startIndex, endIndex) => {
        const state = get();
        const list = [...state.cvData.education];
        if (startIndex < 0 || startIndex >= list.length || endIndex < 0 || endIndex >= list.length) {
          set({ status: 'error', lastError: { code: 'INVALID_REORDER', message: 'Reorder index out of bounds.' } });
          return;
        }

        const [removed] = list.splice(startIndex, 1);
        list.splice(endIndex, 0, removed);

        const updatedCv = {
          ...state.cvData,
          education: list,
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      addSkill: (overrides = {}) => {
        const state = get();
        const newItem = createSkill(overrides);
        const updatedCv = {
          ...state.cvData,
          skills: [...state.cvData.skills, newItem],
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      updateSkill: (id, partial) => {
        const state = get();
        const index = state.cvData.skills.findIndex((item) => item.id === id);
        if (index === -1) {
          set({ status: 'error', lastError: { code: 'ITEM_NOT_FOUND', message: `Skill '${id}' not found.` } });
          return;
        }

        const nextList = [...state.cvData.skills];
        nextList[index] = { ...nextList[index], ...partial };

        const updatedCv = {
          ...state.cvData,
          skills: nextList,
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      removeSkill: (id) => {
        const state = get();
        const updatedCv = {
          ...state.cvData,
          skills: state.cvData.skills.filter((item) => item.id !== id),
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      reorderSkills: (startIndex, endIndex) => {
        const state = get();
        const list = [...state.cvData.skills];
        if (startIndex < 0 || startIndex >= list.length || endIndex < 0 || endIndex >= list.length) {
          set({ status: 'error', lastError: { code: 'INVALID_REORDER', message: 'Reorder index out of bounds.' } });
          return;
        }

        const [removed] = list.splice(startIndex, 1);
        list.splice(endIndex, 0, removed);

        const updatedCv = {
          ...state.cvData,
          skills: list,
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      addProject: (overrides = {}) => {
        const state = get();
        const newItem = createProject(overrides);
        const updatedCv = {
          ...state.cvData,
          projects: [...state.cvData.projects, newItem],
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      updateProject: (id, partial) => {
        const state = get();
        const index = state.cvData.projects.findIndex((item) => item.id === id);
        if (index === -1) {
          set({ status: 'error', lastError: { code: 'ITEM_NOT_FOUND', message: `Project '${id}' not found.` } });
          return;
        }

        const nextList = [...state.cvData.projects];
        nextList[index] = { ...nextList[index], ...partial };

        const updatedCv = {
          ...state.cvData,
          projects: nextList,
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      removeProject: (id) => {
        const state = get();
        const updatedCv = {
          ...state.cvData,
          projects: state.cvData.projects.filter((item) => item.id !== id),
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      reorderProjects: (startIndex, endIndex) => {
        const state = get();
        const list = [...state.cvData.projects];
        if (startIndex < 0 || startIndex >= list.length || endIndex < 0 || endIndex >= list.length) {
          set({ status: 'error', lastError: { code: 'INVALID_REORDER', message: 'Reorder index out of bounds.' } });
          return;
        }

        const [removed] = list.splice(startIndex, 1);
        list.splice(endIndex, 0, removed);

        const updatedCv = {
          ...state.cvData,
          projects: list,
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      addCertificate: (overrides = {}) => {
        const state = get();
        const newItem = createCertificate(overrides);
        const updatedCv = {
          ...state.cvData,
          certificates: [...state.cvData.certificates, newItem],
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      updateCertificate: (id, partial) => {
        const state = get();
        const index = state.cvData.certificates.findIndex((item) => item.id === id);
        if (index === -1) {
          set({ status: 'error', lastError: { code: 'ITEM_NOT_FOUND', message: `Certificate '${id}' not found.` } });
          return;
        }

        const nextList = [...state.cvData.certificates];
        nextList[index] = { ...nextList[index], ...partial };

        const updatedCv = {
          ...state.cvData,
          certificates: nextList,
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      removeCertificate: (id) => {
        const state = get();
        const updatedCv = {
          ...state.cvData,
          certificates: state.cvData.certificates.filter((item) => item.id !== id),
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      addLanguage: (overrides = {}) => {
        const state = get();
        const newItem = createLanguage(overrides);
        const updatedCv = {
          ...state.cvData,
          languages: [...state.cvData.languages, newItem],
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      updateLanguage: (id, partial) => {
        const state = get();
        const index = state.cvData.languages.findIndex((item) => item.id === id);
        if (index === -1) {
          set({ status: 'error', lastError: { code: 'ITEM_NOT_FOUND', message: `Language '${id}' not found.` } });
          return;
        }

        const nextList = [...state.cvData.languages];
        nextList[index] = { ...nextList[index], ...partial };

        const updatedCv = {
          ...state.cvData,
          languages: nextList,
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      removeLanguage: (id) => {
        const state = get();
        const updatedCv = {
          ...state.cvData,
          languages: state.cvData.languages.filter((item) => item.id !== id),
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      addCustomSection: (overrides = {}) => {
        const state = get();
        const newItem = createCustomSection(overrides);
        const updatedCv = {
          ...state.cvData,
          customSections: [...state.cvData.customSections, newItem],
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      updateCustomSection: (id, partial) => {
        const state = get();
        const index = state.cvData.customSections.findIndex((item) => item.id === id);
        if (index === -1) {
          set({ status: 'error', lastError: { code: 'ITEM_NOT_FOUND', message: `Custom section '${id}' not found.` } });
          return;
        }

        const nextList = [...state.cvData.customSections];
        nextList[index] = { ...nextList[index], ...partial };

        const updatedCv = {
          ...state.cvData,
          customSections: nextList,
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      removeCustomSection: (id) => {
        const state = get();
        const updatedCv = {
          ...state.cvData,
          customSections: state.cvData.customSections.filter((item) => item.id !== id),
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      reorderSections: (newOrder) => {
        const state = get();
        const updatedCv = {
          ...state.cvData,
          sectionOrder: [...newOrder],
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      toggleSectionVisibility: (sectionId) => {
        const state = get();
        const currentHidden = state.cvData.hiddenSections || [];
        const isHidden = currentHidden.includes(sectionId);

        const nextHidden = isHidden
          ? currentHidden.filter((id) => id !== sectionId)
          : [...currentHidden, sectionId];

        const updatedCv = {
          ...state.cvData,
          hiddenSections: nextHidden,
          metadata: { ...state.cvData.metadata, updatedAt: new Date().toISOString() },
        };

        set({
          ...pushHistory(state),
          cvData: updatedCv,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      // --- Save & System Status Actions ---

      markSaving: () => {
        set({ status: 'saving' });
      },

      markSaved: () => {
        const state = get();
        const now = new Date().toISOString();

        set({
          cvData: {
            ...state.cvData,
            metadata: {
              ...state.cvData.metadata,
              lastSavedAt: now,
            },
          },
          status: 'saved',
          isDirty: false,
          lastError: null,
        });
      },

      markError: (errorObj) => {
        set({
          status: 'error',
          lastError: typeof errorObj === 'string'
            ? { code: 'GENERAL_ERROR', message: errorObj }
            : errorObj,
        });
      },

      clearError: () => {
        set({ lastError: null });
      },

      // --- Undo / Redo Actions ---

      undo: () => {
        const state = get();
        if (state.history.length === 0) return;

        const previousData = state.history[state.history.length - 1];
        const nextHistory = state.history.slice(0, -1);
        const nextFuture = [state.cvData, ...state.future];

        set({
          cvData: previousData,
          history: nextHistory,
          future: nextFuture,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      redo: () => {
        const state = get();
        if (state.future.length === 0) return;

        const nextData = state.future[0];
        const nextFuture = state.future.slice(1);
        const nextHistory = [...state.history, state.cvData];

        set({
          cvData: nextData,
          history: nextHistory,
          future: nextFuture,
          status: 'dirty',
          isDirty: true,
          lastError: null,
        });
      },

      clearHistory: () => {
        set({ history: [], future: [] });
      },
    }),
    cvPersistOptions
  )
);
