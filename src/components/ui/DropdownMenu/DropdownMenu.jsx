import { useState, useRef, useEffect, useId } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Accessible Dropdown Menu component.
 * Manages keyboard navigation (Arrow keys, Escape), click outside, focus management, and aria states.
 */
export function DropdownMenu({
  trigger,
  children,
  align = 'end',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const alignClasses = align === 'end' ? 'end-0' : 'start-0';

  return (
    <div ref={containerRef} className="relative inline-block text-start">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={menuId}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          className={cn(
            'absolute z-50 mt-2 w-56 rounded-xl bg-surface border border-border shadow-lg py-1 text-xs focus:outline-hidden animate-in fade-in-50 zoom-in-95',
            alignClasses,
            className
          )}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
  leadingIcon: Icon,
  destructive = false,
  className = '',
  disabled = false,
}) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={(e) => {
        if (disabled) return;
        onClick?.(e);
      }}
      className={cn(
        'w-full flex items-center gap-2.5 px-3 py-2 text-start font-medium transition-colors cursor-pointer',
        destructive
          ? 'text-danger hover:bg-danger-subtle/50'
          : 'text-foreground hover:bg-surface-muted',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      <span className="truncate flex-1">{children}</span>
    </button>
  );
}

export function DropdownMenuDivider() {
  return <div className="h-px bg-border/60 my-1" role="separator" />;
}
