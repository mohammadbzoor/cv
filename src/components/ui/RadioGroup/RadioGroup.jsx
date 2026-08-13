import { forwardRef, useId } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Radio group component built on native <fieldset>, <legend>, and <input type="radio">.
 * Supports vertical and horizontal orientation, descriptions, error states, and keyboard navigation.
 */
export const RadioGroup = forwardRef(function RadioGroup(
  {
    name: providedName,
    label,
    options = [],
    value,
    defaultValue,
    onChange,
    required,
    disabled,
    error,
    helperText,
    orientation = 'vertical',
    className,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const groupName = providedName || `radio-${generatedId}`;
  const helperId = `${groupName}-helper`;
  const errorId = `${groupName}-error`;

  const hasError = Boolean(error);
  const describedBy = hasError ? errorId : helperText ? helperId : undefined;

  return (
    <fieldset
      ref={ref}
      aria-invalid={hasError || undefined}
      aria-describedby={describedBy}
      className={cn('space-y-2 border-0 p-0 m-0', className)}
      {...props}
    >
      {label && (
        <legend className="text-sm font-medium text-foreground mb-2">
          {label}
          {required && (
            <span className="text-danger ms-1" aria-hidden="true">*</span>
          )}
        </legend>
      )}

      <div
        className={cn(
          orientation === 'horizontal' ? 'flex flex-wrap gap-5' : 'space-y-3'
        )}
      >
        {options.map((opt) => {
          const optId = `${groupName}-${opt.value}`;
          const isOptionDisabled = disabled || opt.disabled;

          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className={cn(
                'inline-flex items-start gap-3 select-none cursor-pointer',
                isOptionDisabled && 'cursor-not-allowed opacity-50'
              )}
            >
              <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                <input
                  id={optId}
                  type="radio"
                  name={groupName}
                  value={opt.value}
                  checked={value !== undefined ? value === opt.value : undefined}
                  defaultChecked={defaultValue !== undefined ? defaultValue === opt.value : undefined}
                  onChange={onChange}
                  disabled={isOptionDisabled}
                  required={required}
                  className={cn(
                    'peer appearance-none w-5 h-5 rounded-full border',
                    'bg-surface text-primary transition-colors cursor-pointer',
                    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1',
                    'checked:border-primary',
                    'disabled:cursor-not-allowed',
                    hasError
                      ? 'border-danger focus-visible:ring-danger/40'
                      : 'border-border hover:border-border-strong'
                  )}
                />
                <span className="w-2.5 h-2.5 rounded-full bg-primary absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>

              <div className="text-sm">
                <span className="font-medium text-foreground">{opt.label}</span>
                {opt.description && (
                  <p className="text-xs text-foreground-secondary mt-0.5">
                    {opt.description}
                  </p>
                )}
              </div>
            </label>
          );
        })}
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
    </fieldset>
  );
});
