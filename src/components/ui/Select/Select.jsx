import { forwardRef, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../utils/cn';

/**
 * Accessible form select field built on native <select>.
 * Supports placeholder option, helper text, error messages, and logical RTL/LTR arrow positioning.
 */
export const Select = forwardRef(function Select(
  {
    label,
    options = [],
    placeholder,
    helperText,
    error,
    required,
    disabled,
    className,
    selectClassName,
    id: providedId,
    value,
    defaultValue,
    onChange,
    dir,
    lang,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const selectId = providedId || generatedId;
  const helperId = `${selectId}-helper`;
  const errorId = `${selectId}-error`;

  const hasError = Boolean(error);
  const describedBy = hasError ? errorId : helperText ? helperId : undefined;

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-foreground">
          {label}
          {required && (
            <span className="text-danger ms-1" aria-hidden="true">*</span>
          )}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          required={required}
          dir={dir}
          lang={lang}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full appearance-none rounded-lg border px-3 py-2 text-sm pe-10',
            'bg-surface text-foreground placeholder:text-foreground-muted',
            'transition-colors cursor-pointer',
            'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            hasError
              ? 'border-danger focus-visible:ring-danger/40'
              : 'border-border hover:border-border-strong',
            selectClassName
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-foreground-muted">
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </span>
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
