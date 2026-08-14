import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { mockRegister } from '../services/mockAuthService';

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const startDemoSession = useAuthStore((state) => state.startDemoSession);

  const register = useCallback(
    async (formData) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mockRegister(formData);
        if (result.success) {
          startDemoSession(result.user);
          return { success: true };
        } else {
          setError(result.error);
          return { success: false, error: result.error };
        }
      } catch (err) {
        const errObj = { code: 'REGISTER_FAILED', message: err.message || 'Registration failed.' };
        setError(errObj);
        return { success: false, error: errObj };
      } finally {
        setIsLoading(false);
      }
    },
    [startDemoSession]
  );

  return { register, isLoading, error, clearError: () => setError(null) };
}
