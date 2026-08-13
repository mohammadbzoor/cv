import { forwardRef, useId, useState } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Multi-line text input with label, helper/error messages, and optional character counter.
 * Error state takes priority over helperText display.
 */
export const Textarea = forwardRef(function Textarea(
  {
    label,
    helperText,
    error,
    required,
    disabled,
    maxLength,
    showCharacterCount = false,
    rows = 4,
    className,
    id: providedId,
    onChange,
    value,
    defaultValue,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const textareaId = providedId || generatedId;
  const helperId = `${textareaId}-helper`;
  const errorId = `${textareaId}-error`;

  const [charCount, setCharCount] = useState(
    () => String(value ?? defaultValue ?? '').length
  );

  const hasError = Boolean(error);
  const describedBy = hasError ? errorId : helperText ? helperId : undefined;

  function handleChange(e) {
    setCharCount(e.target.value.length);
    onChange?.(e);
  }

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-foreground">
          {label}
          {required && (
            <span className="text-danger ms-1" aria-hidden="true">*</span>
          )}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={cn(
          'w-full rounded-lg border px-3 py-2 text-sm resize-y',
          'bg-surface text-foreground placeholder:text-foreground-muted',
          'transition-colors',
          'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          hasError
            ? 'border-danger focus-visible:ring-danger/40'
            : 'border-border hover:border-border-strong',
          className
        )}
        {...props}
      />

      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
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
        {showCharacterCount && maxLength != null && (
          <span
            className={cn(
              'text-xs tabular-nums shrink-0',
              charCount >= maxLength ? 'text-danger' : 'text-foreground-muted'
            )}
          >
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
});
