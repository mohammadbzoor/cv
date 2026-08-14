import { Card } from '../../../components/ui/Card';
import { cn } from '../../../utils/cn';

/**
 * Standardized Form Section card wrapper for wizard step contents.
 */
export function FormSection({ title, description, children, className }) {
  return (
    <Card className={cn('p-6 md:p-8 space-y-6 shadow-2xs', className)}>
      {(title || description) && (
        <div className="space-y-1 border-b border-border/60 pb-4">
          {title && <h2 className="text-xl font-bold text-foreground">{title}</h2>}
          {description && (
            <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </Card>
  );
}
