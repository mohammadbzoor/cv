import { forwardRef, useId, useState } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Toggle switch component built on semantic <button role="switch">.
 * Supports controlled and uncontrolled states, label, description, and RTL/LTR thumb animation.
 */
export const Switch = forwardRef(function Switch(
  {
    label,
    description,
    checked,
    defaultChecked = false,
    onChange,
    disabled = false,
    className,
    id: providedId,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const switchId = providedId || generatedId;
  const descriptionId = `${switchId}-description`;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked !== undefined ? checked : internalChecked;

  function handleClick() {
    if (disabled) return;
    const nextState = !isChecked;
    if (checked === undefined) {
      setInternalChecked(nextState);
    }
    onChange?.(nextState);
  }

  return (
    <div className={cn('inline-flex items-start gap-3 select-none', className)}>
      <button
        ref={ref}
        id={switchId}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-describedby={description ? descriptionId : undefined}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          'relative inline-flex items-center shrink-0 w-11 h-6 rounded-full p-0.5 mt-0.5',
          'transition-colors duration-200 ease-in-out cursor-pointer',
          'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          isChecked ? 'bg-primary' : 'bg-surface-muted border border-border'
        )}
        {...props}
      >
        <span
          className={cn(
            'pointer-events-none inline-block w-5 h-5 rounded-full shadow-xs',
            'transition-transform duration-200 ease-in-out',
            isChecked
              ? 'bg-on-primary ltr:translate-x-5 rtl:-translate-x-5'
              : 'bg-foreground-muted ltr:translate-x-0 rtl:translate-x-0'
          )}
        />
      </button>

      {(label || description) && (
        <label
          htmlFor={switchId}
          onClick={handleClick}
          className={cn(
            'text-sm cursor-pointer',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          {label && <span className="font-medium text-foreground">{label}</span>}
          {description && (
            <p id={descriptionId} className="text-xs text-foreground-secondary mt-0.5">
              {description}
            </p>
          )}
        </label>
      )}
    </div>
  );
});
