import { forwardRef, useId } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Form input field with integrated label, helper text, error message, and icon slots.
 * Uses startIcon/endIcon naming for correct behavior in both RTL and LTR layouts.
 */
export const Input = forwardRef(function Input(
  {
    label,
    helperText,
    error,
    required,
    disabled,
    startIcon: StartIcon,
    endIcon: EndIcon,
    className,
    id: providedId,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = providedId || generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const hasError = Boolean(error);
  const describedBy = hasError ? errorId : helperText ? helperId : undefined;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
          {label}
          {required && (
            <span className="text-danger ms-1" aria-hidden="true">*</span>
          )}
        </label>
      )}

      <div className="relative">
        {StartIcon && (
          <span className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-foreground-muted">
            <StartIcon className="w-4 h-4" aria-hidden="true" />
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full rounded-lg border px-3 py-2 text-sm',
            'bg-surface text-foreground placeholder:text-foreground-muted',
            'transition-colors',
            'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            hasError
              ? 'border-danger focus-visible:ring-danger/40'
              : 'border-border hover:border-border-strong',
            StartIcon && 'ps-10',
            EndIcon && 'pe-10',
            className
          )}
          {...props}
        />

        {EndIcon && (
          <span className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-foreground-muted">
            <EndIcon className="w-4 h-4" aria-hidden="true" />
          </span>
        )}
      </div>

      {hasError && (
        <p id={errorId} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
      {!hasError && helperText && (
        <p id={helperId} className="text-xs text-foreground-muted">
          {helperText}
        </p>
      )}
    </div>
  );
});
