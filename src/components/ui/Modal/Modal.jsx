import { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../../utils/cn';

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

/**
 * Accessible Modal Dialog component rendered via React Portal.
 * Handles focus trapping, scroll locking, Escape key closing, overlay clicks, and focus restoration.
 */
export function Modal({
  isOpen = false,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeLabel = 'Close',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  initialFocusRef,
  className,
}) {
  const generatedId = useId();
  const titleId = `${generatedId}-title`;
  const descriptionId = `${generatedId}-description`;

  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Focus trap & focus restoration logic
  useEffect(() => {
    if (!isOpen) return;

    // Save element that was focused before opening
    previousFocusRef.current = document.activeElement;

    // Lock body scroll
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus initial ref or first focusable element inside modal
    const focusTimer = setTimeout(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length > 0) {
          focusables[0].focus();
        }
      }
    }, 50);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalStyle;
      // Restore previous focus
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, initialFocusRef]);

  // Keyboard navigation & Focus trap listener
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose?.();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.disabled);

        if (focusables.length === 0) return;

        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstEl) {
            lastEl.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastEl) {
            firstEl.focus();
            event.preventDefault();
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(event) {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose?.();
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity"
      onClick={handleOverlayClick}
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          'w-full bg-surface border border-border rounded-2xl shadow-lg overflow-hidden',
          'flex flex-col max-h-[85vh]',
          sizeClasses[size] || sizeClasses.md,
          className
        )}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-border/60">
            <div>
              {title && (
                <h2 id={titleId} className="text-lg font-bold text-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descriptionId} className="text-xs text-foreground-secondary mt-1">
                  {description}
                </p>
              )}
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className={cn(
                  'p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-surface-muted',
                  'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1',
                  'transition-colors cursor-pointer shrink-0 ms-4'
                )}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto flex-1 text-sm text-foreground">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-surface-muted border-t border-border/60 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
