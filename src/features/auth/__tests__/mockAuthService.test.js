import { describe, it, expect } from 'vitest';
import { mockLogin, mockRegister, mockForgotPassword } from '../services/mockAuthService';

describe('mockAuthService', () => {
  it('15. mockLogin returns demo user object without storing credentials', async () => {
    const res = await mockLogin({ email: 'user@example.com', password: 'secretpassword' });
    expect(res.success).toBe(true);
    expect(res.user.email).toBe('user@example.com');
    expect(res.user.isDemo).toBe(true);
    expect(res.user).not.toHaveProperty('password');
    expect(res.user).not.toHaveProperty('token');
  });

  it('16. mockRegister returns demo user object without storing credentials', async () => {
    const res = await mockRegister({ displayName: 'Jane Doe', email: 'jane@example.com' });
    expect(res.success).toBe(true);
    expect(res.user.displayName).toBe('Jane Doe');
    expect(res.user.isDemo).toBe(true);
    expect(res.user).not.toHaveProperty('password');
    expect(res.user).not.toHaveProperty('token');
  });

  it('17. mockForgotPassword returns explicit demo notification message', async () => {
    const res = await mockForgotPassword({ email: 'test@example.com' });
    expect(res.success).toBe(true);
    expect(res.isDemoNotice).toBe(true);
    expect(res.message).toContain('test@example.com');
  });
});
