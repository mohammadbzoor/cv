import { useId } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Universal wrapper for custom form fields to standardize labels, descriptions, required asterisks, and error messages.
 */
export function FormField({
  label,
  required,
  description,
  error,
  htmlFor: providedHtmlFor,
  children,
  className,
  id: providedId,
}) {
  const generatedId = useId();
  const fieldId = providedId || generatedId;
  const htmlFor = providedHtmlFor || `${fieldId}-input`;
  const descriptionId = `${fieldId}-description`;
  const errorId = `${fieldId}-error`;

  const hasError = Boolean(error);

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
          {label}
          {required && (
            <span className="text-danger ms-1" aria-hidden="true">*</span>
          )}
        </label>
      )}

      {children}

      {hasError && (
        <p id={errorId} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
      {!hasError && description && (
        <p id={descriptionId} className="text-xs text-foreground-muted">
          {description}
        </p>
      )}
    </div>
  );
}
