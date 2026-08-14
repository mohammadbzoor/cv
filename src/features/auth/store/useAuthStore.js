import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AUTH_STATUS, DEMO_USER } from '../constants/authConstants';
import { authPersistOptions } from './authPersistence';

/**
 * Zustand Auth Store for Front-End Demo Authentication.
 * Manages demo session state, user details, and status.
 * NEVER stores passwords or tokens.
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      status: AUTH_STATUS.ANONYMOUS,
      lastError: null,
      isDemo: true,

      startDemoSession: (customDetails = {}) => {
        const userObj = {
          ...DEMO_USER,
          displayName: customDetails.displayName || customDetails.fullName || DEMO_USER.displayName,
          email: customDetails.email || DEMO_USER.email,
        };

        set({
          user: userObj,
          status: AUTH_STATUS.AUTHENTICATED,
          lastError: null,
          isDemo: true,
        });
      },

      endDemoSession: () => {
        set({
          user: null,
          status: AUTH_STATUS.ANONYMOUS,
          lastError: null,
          isDemo: true,
        });
      },

      updateUserProfile: (partialProfile) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({
          user: {
            ...currentUser,
            displayName: partialProfile.displayName ?? currentUser.displayName,
            email: partialProfile.email ?? currentUser.email,
          },
        });
      },

      setAuthLoading: () => {
        set({ status: AUTH_STATUS.AUTHENTICATING, lastError: null });
      },

      setAuthError: (errorObj) => {
        set({
          status: AUTH_STATUS.ERROR,
          lastError: typeof errorObj === 'string' ? { code: 'AUTH_ERROR', message: errorObj } : errorObj,
        });
      },

      clearAuthError: () => {
        set({ lastError: null });
      },
    }),
    authPersistOptions
  )
);
