import { cn } from '../../../utils/cn';

/**
 * Standardized Page Header component.
 * Renders page title, description, eyebrow text, breadcrumbs, and responsive action buttons.
 */
export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  breadcrumbs,
  align = 'start',
  headingLevel: HeadingTag = 'h1',
  className,
}) {
  return (
    <header
      className={cn(
        'space-y-4 py-4 md:py-6 border-b border-border/60 mb-6 md:mb-8',
        align === 'center' && 'text-center',
        className
      )}
    >
      {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          {eyebrow && (
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider">
              {eyebrow}
            </span>
          )}
          {title && (
            <HeadingTag className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              {title}
            </HeadingTag>
          )}
          {description && (
            <p className="text-xs md:text-sm text-foreground-secondary max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className={cn('flex items-center gap-3 shrink-0', align === 'center' && 'justify-center')}>
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
