import { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeContext } from './ThemeContext';

const STORAGE_KEY = 'cv-platform-theme';
const VALID_THEMES = ['light', 'dark', 'system'];

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_THEMES.includes(stored)) {
      return stored;
    }
  } catch {
    // Silent fail when localStorage is unavailable
  }
  return 'system';
}

function resolveTheme(theme) {
  return theme === 'system' ? getSystemTheme() : theme;
}

function applyThemeToDOM(resolved) {
  const root = document.documentElement;
  root.classList.toggle('dark', resolved === 'dark');
  root.style.colorScheme = resolved;
}

/**
 * Provides theme state and controls to the component tree.
 * Applies the .dark class to document.documentElement and persists preference to localStorage.
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getStoredTheme);

  // Derive resolved theme synchronously from state — no separate useState needed
  const resolvedTheme = resolveTheme(theme);

  const setTheme = useCallback((newTheme) => {
    if (!VALID_THEMES.includes(newTheme)) return;
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Silent fail
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const currentResolved = resolveTheme(prev);
      const next = currentResolved === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Silent fail
      }
      return next;
    });
  }, []);

  // Apply theme class to DOM whenever resolvedTheme changes
  useEffect(() => {
    applyThemeToDOM(resolvedTheme);
  }, [resolvedTheme]);

  // Listen for OS-level color scheme changes when mode is "system"
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      applyThemeToDOM(getSystemTheme());
      // Trigger re-render so derived resolvedTheme recalculates
      setThemeState((prev) => prev);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
