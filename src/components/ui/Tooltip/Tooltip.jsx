import { useState, useRef, useId } from 'react';
import { cn } from '../../../utils/cn';

const sideClasses = {
  top: 'bottom-full mb-2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2',
  bottom: 'top-full mt-2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2',
  start: 'end-full me-2 top-1/2 -translate-y-1/2',
  end: 'start-full ms-2 top-1/2 -translate-y-1/2',
};

/**
 * Accessible tooltip component triggered on hover and focus.
 * Links trigger element with aria-describedby and supports logical side positioning.
 */
export function Tooltip({
  content,
  children,
  side = 'top',
  delay = 200,
  className,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);
  const tooltipId = useId();

  if (!content) return children;

  function showTooltip() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }

  function hideTooltip() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      hideTooltip();
    }
  }

  return (
    <div className="relative inline-flex items-center">
      <span
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        onKeyDown={handleKeyDown}
        aria-describedby={isVisible ? tooltipId : undefined}
        className="inline-flex items-center"
      >
        {children}
      </span>
      {isVisible && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            'absolute z-50 pointer-events-none whitespace-nowrap',
            'px-2.5 py-1 text-xs font-medium rounded-md shadow-md',
            'bg-foreground text-app-bg transition-opacity duration-150',
            sideClasses[side] || sideClasses.top,
            className
          )}
        >
          {content}
        </span>
      )}
    </div>
  );
}
