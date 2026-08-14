import { describe, it, expect } from 'vitest';
import { loginSchema } from '../schemas/loginSchema';
import { registerSchema } from '../schemas/registerSchema';
import { forgotPasswordSchema } from '../schemas/forgotPasswordSchema';

describe('Auth Validation Schemas', () => {
  it('8. rejects invalid email in loginSchema', () => {
    const res = loginSchema.safeParse({ email: 'invalid-email', password: '123' });
    expect(res.success).toBe(false);
  });

  it('9. rejects empty password in loginSchema', () => {
    const res = loginSchema.safeParse({ email: 'user@example.com', password: '' });
    expect(res.success).toBe(false);
  });

  it('10. requires displayName in registerSchema', () => {
    const res = registerSchema.safeParse({
      displayName: 'A',
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      acceptTerms: true,
    });
    expect(res.success).toBe(false);
  });

  it('11. rejects passwords shorter than 6 characters in registerSchema', () => {
    const res = registerSchema.safeParse({
      displayName: 'Alex Smith',
      email: 'user@example.com',
      password: '123',
      confirmPassword: '123',
      acceptTerms: true,
    });
    expect(res.success).toBe(false);
  });

  it('12. rejects password mismatch in registerSchema', () => {
    const res = registerSchema.safeParse({
      displayName: 'Alex Smith',
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'password456',
      acceptTerms: true,
    });
    expect(res.success).toBe(false);
  });

  it('13. requires acceptTerms to be true in registerSchema', () => {
    const res = registerSchema.safeParse({
      displayName: 'Alex Smith',
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      acceptTerms: false,
    });
    expect(res.success).toBe(false);
  });

  it('14. validates email in forgotPasswordSchema', () => {
    const invalid = forgotPasswordSchema.safeParse({ email: 'bad' });
    const valid = forgotPasswordSchema.safeParse({ email: 'alex@example.com' });
    expect(invalid.success).toBe(false);
    expect(valid.success).toBe(true);
  });
});
