/**
 * Feature Flags Configuration.
 *
 * NOTE: These flags are for hiding development tools from production UI only.
 * They are NOT a security boundary — all client-side code is accessible
 * to anyone who inspects the bundle. Development pages do NOT contain
 * secrets or sensitive data.
 *
 * @property {boolean} enableDevelopmentRoutes - Controls visibility of /design-system and /cv-store routes.
 */
export const featureFlags = Object.freeze({
  enableDevelopmentRoutes:
    import.meta.env.DEV ||
    import.meta.env.VITE_ENABLE_DEVELOPMENT_ROUTES === 'true',
});
