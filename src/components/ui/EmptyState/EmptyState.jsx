import { cn } from '../../../utils/cn';

/**
 * Reusable view component for empty lists, search results, or empty containers.
 * Does not hardcode strings; accepts all text via props.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  ...props
}) {
  return (
    <section
      className={cn(
        'flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-2xl',
        'bg-surface border border-border/80 shadow-2xs space-y-4',
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="p-3.5 bg-surface-muted text-foreground-secondary rounded-full shadow-2xs mb-1">
          <Icon className="w-7 h-7" aria-hidden="true" />
        </div>
      )}

      {title && (
        <h3 className="text-lg font-bold text-foreground max-w-md leading-snug">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-sm text-foreground-secondary max-w-md leading-relaxed">
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="pt-2 flex flex-wrap gap-3 items-center justify-center">
          {action}
          {secondaryAction}
        </div>
      )}
    </section>
  );
}
