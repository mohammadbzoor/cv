import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { mockLogin } from '../services/mockAuthService';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const startDemoSession = useAuthStore((state) => state.startDemoSession);

  const login = useCallback(
    async (credentials) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mockLogin(credentials);
        if (result.success) {
          startDemoSession(result.user);
          return { success: true };
        } else {
          setError(result.error);
          return { success: false, error: result.error };
        }
      } catch (err) {
        const errObj = { code: 'LOGIN_FAILED', message: err.message || 'Login failed.' };
        setError(errObj);
        return { success: false, error: errObj };
      } finally {
        setIsLoading(false);
      }
    },
    [startDemoSession]
  );

  return { login, isLoading, error, clearError: () => setError(null) };
}
