import { cn } from '../../../utils/cn';

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

/**
 * Centered responsive layout container wrapper.
 * Provides consistent maximum widths and horizontal padding across application pages.
 */
export function PageContainer({
  size = 'lg',
  as: Tag = 'div',
  children,
  className,
  ...props
}) {
  return (
    <Tag
      className={cn(
        'w-full mx-auto px-4',
        sizeClasses[size] || sizeClasses.lg,
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
