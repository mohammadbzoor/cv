import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import { cn } from '../../../utils/cn';

/**
 * Accessible dropdown menu for switching between light, dark, and system themes.
 * Supports translated labels and dynamic RTL/LTR menu placement.
 */
export function ThemeToggle() {
  const { t } = useTranslation('common');
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const ActiveIcon = resolvedTheme === 'dark' ? Moon : Sun;

  const themeOptions = [
    { value: 'light', labelKey: 'light', Icon: Sun },
    { value: 'dark', labelKey: 'dark', Icon: Moon },
    { value: 'system', labelKey: 'system', Icon: Monitor },
  ];

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-lg border',
          'bg-surface border-border text-foreground-secondary',
          'hover:bg-surface-muted hover:text-foreground',
          'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
          'transition-colors cursor-pointer'
        )}
        aria-label={t('selectTheme')}
        title={t('selectTheme')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <ActiveIcon className="w-5 h-5" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className={cn(
            'absolute start-0 mt-2 py-1 w-40 rounded-lg border',
            'bg-surface-elevated border-border shadow-md z-50'
          )}
        >
          {themeOptions.map(({ value, labelKey, Icon }) => (
            <button
              key={value}
              type="button"
              role="menuitem"
              onClick={() => {
                setTheme(value);
                setIsOpen(false);
              }}
              className={cn(
                'flex items-center gap-3 w-full px-3 py-2.5 text-sm cursor-pointer',
                'hover:bg-surface-muted transition-colors text-start',
                theme === value
                  ? 'text-primary font-medium'
                  : 'text-foreground-secondary'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t(labelKey)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
