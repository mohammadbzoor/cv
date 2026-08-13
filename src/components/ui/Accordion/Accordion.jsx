import { createContext, useContext, useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../utils/cn';

const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

/**
 * Accessible Accordion component supporting single and multiple open items.
 * Built with semantic buttons, aria-expanded, aria-controls, and smooth Chevron rotation.
 */
export function Accordion({
  type = 'single',
  collapsible = true,
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}) {
  const [internalValue, setInternalValue] = useState(() => {
    if (defaultValue !== undefined) return defaultValue;
    return type === 'multiple' ? [] : null;
  });

  const activeValue = value !== undefined ? value : internalValue;

  function toggleItem(itemValue) {
    let nextValue;
    if (type === 'multiple') {
      const list = Array.isArray(activeValue) ? activeValue : [];
      nextValue = list.includes(itemValue)
        ? list.filter((v) => v !== itemValue)
        : [...list, itemValue];
    } else {
      if (activeValue === itemValue) {
        nextValue = collapsible ? null : itemValue;
      } else {
        nextValue = itemValue;
      }
    }

    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  function isItemOpen(itemValue) {
    if (type === 'multiple') {
      return Array.isArray(activeValue) && activeValue.includes(itemValue);
    }
    return activeValue === itemValue;
  }

  return (
    <AccordionContext.Provider value={{ toggleItem, isItemOpen }}>
      <div className={cn('divide-y divide-border border-y border-border', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, disabled = false, children, className }) {
  const itemId = useId();
  const triggerId = `${itemId}-trigger`;
  const contentId = `${itemId}-content`;

  return (
    <AccordionItemContext.Provider value={{ value, disabled, triggerId, contentId }}>
      <div className={cn('py-1', className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ children, className }) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionTrigger must be used within AccordionItem and Accordion');
  }

  const { toggleItem, isItemOpen } = accordionContext;
  const { value, disabled, triggerId, contentId } = itemContext;

  const isOpen = isItemOpen(value);

  return (
    <button
      id={triggerId}
      type="button"
      aria-expanded={isOpen}
      aria-controls={contentId}
      disabled={disabled}
      onClick={() => toggleItem(value)}
      className={cn(
        'flex items-center justify-between w-full py-3.5 px-2 text-start text-sm font-semibold text-foreground',
        'hover:text-primary transition-colors cursor-pointer',
        'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1 rounded-md',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          'w-4 h-4 text-foreground-secondary shrink-0 transition-transform duration-200 ease-in-out',
          isOpen && 'rotate-180 text-primary'
        )}
        aria-hidden="true"
      />
    </button>
  );
}

export function AccordionContent({ children, className }) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionContent must be used within AccordionItem and Accordion');
  }

  const { isItemOpen } = accordionContext;
  const { value, triggerId, contentId } = itemContext;

  const isOpen = isItemOpen(value);

  if (!isOpen) return null;

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={cn('px-2 pb-4 pt-1 text-sm text-foreground-secondary leading-relaxed', className)}
    >
      {children}
    </div>
  );
}
