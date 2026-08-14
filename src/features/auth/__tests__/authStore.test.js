import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../store/useAuthStore';
import { useCVStore } from '../../cv/store/useCVStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.getState().endDemoSession();
  });

  it('18. starts demo session cleanly with user object', () => {
    useAuthStore.getState().startDemoSession({ displayName: 'Charlie Brown', email: 'charlie@example.com' });
    const state = useAuthStore.getState();
    expect(state.status).toBe('authenticated');
    expect(state.user.displayName).toBe('Charlie Brown');
    expect(state.user.email).toBe('charlie@example.com');
    expect(state.user.isDemo).toBe(true);
  });

  it('19. ends demo session cleanly without throwing', () => {
    useAuthStore.getState().startDemoSession();
    useAuthStore.getState().endDemoSession();
    const state = useAuthStore.getState();
    expect(state.status).toBe('anonymous');
    expect(state.user).toBeNull();
  });

  it('20. never stores passwords, tokens, or credentials in auth store', () => {
    useAuthStore.getState().startDemoSession();
    const state = useAuthStore.getState();
    expect(state).not.toHaveProperty('password');
    expect(state).not.toHaveProperty('token');
    expect(state).not.toHaveProperty('refreshToken');
    expect(state.user).not.toHaveProperty('password');
    expect(state.user).not.toHaveProperty('token');
  });

  it('21. ending demo session does not mutate or clear local CV draft data', () => {
    useCVStore.getState().updatePersonalInfo({ fullName: 'Preserved User' });
    useAuthStore.getState().startDemoSession();
    useAuthStore.getState().endDemoSession();

    const cvData = useCVStore.getState().cvData;
    expect(cvData.personalInfo.fullName).toBe('Preserved User');
  });
});
