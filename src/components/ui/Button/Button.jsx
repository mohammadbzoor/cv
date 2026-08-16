import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

const variantStyles = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active border-transparent',
  secondary:
    'bg-secondary text-on-secondary hover:bg-secondary-hover active:bg-secondary-active border-transparent',
  outline:
    'bg-transparent text-foreground border-border hover:bg-surface-muted active:bg-surface',
  ghost:
    'bg-transparent text-foreground-secondary border-transparent hover:bg-surface-muted hover:text-foreground',
  danger:
    'bg-danger text-on-danger hover:bg-danger/90 active:bg-danger/80 border-transparent',
};

const sizeStyles = {
  xs: 'px-2 py-1 text-[11px] gap-1',
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2.5',
  icon: 'p-2.5',
};

/**
 * Reusable button component supporting multiple variants, sizes, loading state, and icon slots.
 */
export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    leadingIcon: LeadingIcon,
    trailingIcon: TrailingIcon,
    children,
    className,
    type = 'button',
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg border',
        'transition-colors cursor-pointer',
        'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
      )}
      {!loading && LeadingIcon && (
        <LeadingIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
      )}
      {children}
      {!loading && TrailingIcon && (
        <TrailingIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
      )}
    </button>
  );
});
