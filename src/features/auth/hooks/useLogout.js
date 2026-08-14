import { useCallback } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export function useLogout() {
  const endDemoSession = useAuthStore((state) => state.endDemoSession);

  const logout = useCallback(() => {
    endDemoSession();
    // Does NOT clear CV draft data
  }, [endDemoSession]);

  return { logout };
}
