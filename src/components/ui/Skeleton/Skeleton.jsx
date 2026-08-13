import { cn } from '../../../utils/cn';

const variantClasses = {
  text: 'h-4 rounded-md',
  circle: 'rounded-full',
  rectangle: 'rounded-xl',
};

/**
 * Skeleton loading placeholder component.
 * Hidden from screen readers via aria-hidden="true" by default.
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}) {
  const customStyles = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...style,
  };

  return (
    <div
      aria-hidden={ariaHidden}
      style={customStyles}
      className={cn(
        'bg-surface-muted animate-pulse',
        variantClasses[variant] || variantClasses.text,
        className
      )}
      {...props}
    />
  );
}
