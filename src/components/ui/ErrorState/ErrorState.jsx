import { AlertTriangle } from 'lucide-react';
import { cn } from '../../../utils/cn';

/**
 * Reusable view component for error messages, failed network requests, or component exceptions.
 */
export function ErrorState({
  icon: Icon = AlertTriangle,
  title,
  description,
  action,
  details,
  role = 'alert',
  className,
  ...props
}) {
  return (
    <section
      role={role || undefined}
      className={cn(
        'flex flex-col items-center justify-center p-6 md:p-8 text-center rounded-2xl border',
        'bg-danger-subtle/30 border-danger/20 text-foreground space-y-4',
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="p-3 bg-danger-subtle text-danger rounded-full shadow-2xs mb-1">
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>
      )}

      {title && (
        <h3 className="text-base md:text-lg font-bold text-foreground max-w-md">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-xs md:text-sm text-foreground-secondary max-w-md leading-relaxed">
          {description}
        </p>
      )}

      {details && (
        <details className="w-full max-w-md text-start mt-2">
          <summary className="text-xs font-medium text-foreground-secondary cursor-pointer hover:text-foreground">
            Error Details
          </summary>
          <pre className="mt-2 p-3 bg-surface border border-border rounded-lg text-xs font-mono overflow-x-auto text-danger max-h-40">
            {typeof details === 'string' ? details : JSON.stringify(details, null, 2)}
          </pre>
        </details>
      )}

      {action && <div className="pt-2">{action}</div>}
    </section>
  );
}
