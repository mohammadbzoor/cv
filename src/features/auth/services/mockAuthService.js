import { DEMO_USER } from '../constants/authConstants';

/**
 * Mock Auth Service for Front-End Demo.
 * Simulates async latency without storing passwords or making network requests.
 */
export async function mockLogin({ email }) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    user: {
      ...DEMO_USER,
      email: email || DEMO_USER.email,
    },
  };
}

export async function mockRegister({ displayName, email }) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    user: {
      ...DEMO_USER,
      displayName: displayName || DEMO_USER.displayName,
      email: email || DEMO_USER.email,
    },
  };
}

export async function mockForgotPassword({ email }) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: `If an account is connected to ${email} in the future backend, recovery instructions will be sent.`,
    isDemoNotice: true,
  };
}
