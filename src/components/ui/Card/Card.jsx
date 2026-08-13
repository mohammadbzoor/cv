import { cn } from '../../../utils/cn';

const cardVariants = {
  default: 'bg-surface border border-border',
  elevated: 'bg-surface-elevated shadow-sm border border-border',
  outlined: 'bg-transparent border border-border-strong',
  muted: 'bg-surface-muted border border-border/60',
};

export function Card({ variant = 'default', className, children, ...props }) {
  return (
    <div className={cn('rounded-xl', cardVariants[variant], className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('px-6 pt-6 pb-2', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ as: Tag = 'h3', className, children, ...props }) {
  return (
    <Tag className={cn('text-lg font-bold text-foreground', className)} {...props}>
      {children}
    </Tag>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-sm text-foreground-secondary mt-1', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn('px-6 pb-6 pt-2 flex items-center gap-3', className)} {...props}>
      {children}
    </div>
  );
}
