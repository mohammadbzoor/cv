import { forwardRef, useId, useEffect, useRef } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../../utils/cn';

/**
 * Accessible checkbox component built on native <input type="checkbox">.
 * Supports checked, unchecked, indeterminate, disabled, label, description, and error states.
 */
export const Checkbox = forwardRef(function Checkbox(
  {
    label,
    description,
    error,
    disabled,
    required,
    indeterminate = false,
    className,
    inputClassName,
    id: providedId,
    checked,
    defaultChecked,
    onChange,
    ...props
  },
  forwardedRef
) {
  const generatedId = useId();
  const checkboxId = providedId || generatedId;
  const descriptionId = `${checkboxId}-description`;
  const errorId = `${checkboxId}-error`;

  const innerRef = useRef(null);
  const ref = forwardedRef || innerRef;

  const hasError = Boolean(error);
  const describedBy = hasError ? errorId : description ? descriptionId : undefined;

  useEffect(() => {
    const target = typeof ref === 'function' ? innerRef.current : ref?.current;
    if (target) {
      target.indeterminate = Boolean(indeterminate);
    }
  }, [ref, indeterminate]);

  return (
    <div className={cn('space-y-1', className)}>
      <label
        htmlFor={checkboxId}
        className={cn(
          'inline-flex items-start gap-3 select-none cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled}
            required={required}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={cn(
              'peer appearance-none w-5 h-5 rounded-md border',
              'bg-surface text-primary transition-colors cursor-pointer',
              'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1',
              'checked:bg-primary checked:border-primary',
              'disabled:cursor-not-allowed',
              hasError
                ? 'border-danger focus-visible:ring-danger/40'
                : 'border-border hover:border-border-strong',
              inputClassName
            )}
            {...props}
          />
          <Check
            className="w-3.5 h-3.5 text-on-primary absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
            aria-hidden="true"
          />
          {indeterminate && (
            <Minus
              className="w-3.5 h-3.5 text-on-primary absolute pointer-events-none opacity-100 transition-opacity"
              aria-hidden="true"
            />
          )}
        </div>

        {(label || description) && (
          <div className="text-sm">
            {label && (
              <span className="font-medium text-foreground">
                {label}
                {required && (
                  <span className="text-danger ms-1" aria-hidden="true">*</span>
                )}
              </span>
            )}
            {description && (
              <p id={descriptionId} className="text-xs text-foreground-secondary mt-0.5">
                {description}
              </p>
            )}
          </div>
        )}
      </label>

      {hasError && (
        <p id={errorId} className="text-xs text-danger ms-8" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
