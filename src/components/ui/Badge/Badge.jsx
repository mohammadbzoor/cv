import { cn } from '../../../utils/cn';

const variantStyles = {
  neutral: 'bg-surface-muted text-foreground-secondary border-border',
  primary: 'bg-primary-subtle text-primary border-primary/15',
  secondary: 'bg-secondary-subtle text-secondary border-secondary/15',
  success: 'bg-success-subtle text-success border-success/15',
  warning: 'bg-warning-subtle text-warning border-warning/15',
  danger: 'bg-danger-subtle text-danger border-danger/15',
  accent: 'bg-accent-subtle text-accent border-accent/15',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

/**
 * Non-interactive status label component.
 * Use for categorization, tagging, and status indication.
 */
export function Badge({ variant = 'neutral', size = 'md', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
