import { Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

/**
 * Accessible loading spinner component built with role="status".
 */
export function Spinner({
  size = 'md',
  label = 'Loading...',
  className,
  ...props
}) {
  return (
    <span role="status" className={cn('inline-flex items-center justify-center', className)} {...props}>
      <Loader2
        className={cn('animate-spin text-current', sizeClasses[size] || sizeClasses.md)}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
