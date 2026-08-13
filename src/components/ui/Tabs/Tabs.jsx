import { createContext, useContext, useState, useId } from 'react';
import { cn } from '../../../utils/cn';

const TabsContext = createContext(null);

/**
 * Compound WAI-ARIA Tabbed interface component.
 * Supports controlled/uncontrolled state, keyboard navigation (Arrows/Home/End) with RTL awareness.
 */
export function Tabs({
  defaultValue,
  value,
  onValueChange,
  orientation = 'horizontal',
  children,
  className,
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeValue = value !== undefined ? value : internalValue;
  const baseId = useId();

  function changeValue(val) {
    if (value === undefined) {
      setInternalValue(val);
    }
    onValueChange?.(val);
  }

  return (
    <TabsContext.Provider
      value={{ activeValue, changeValue, orientation, baseId }}
    >
      <div
        className={cn(
          orientation === 'vertical' ? 'flex gap-4' : 'space-y-4',
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ 'aria-label': ariaLabel, children, className }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsList must be used within Tabs');

  const { orientation } = context;

  function handleKeyDown(event) {
    const list = event.currentTarget;
    const tabs = Array.from(list.querySelectorAll('[role="tab"]:not([disabled])'));
    const index = tabs.indexOf(document.activeElement);

    if (index === -1) return;

    const isRTL = document.documentElement.dir === 'rtl';
    let nextIndex;

    if (event.key === 'ArrowRight') {
      nextIndex = isRTL ? index - 1 : index + 1;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = isRTL ? index + 1 : index - 1;
    } else if (event.key === 'ArrowDown' && orientation === 'vertical') {
      nextIndex = index + 1;
    } else if (event.key === 'ArrowUp' && orientation === 'vertical') {
      nextIndex = index - 1;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    if (nextIndex < 0) nextIndex = tabs.length - 1;
    if (nextIndex >= tabs.length) nextIndex = 0;

    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={cn(
        'inline-flex p-1 rounded-xl bg-surface-muted border border-border/60',
        orientation === 'vertical' ? 'flex-col items-stretch' : 'items-center gap-1',
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, disabled = false, children, className }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const { activeValue, changeValue, baseId } = context;
  const isSelected = activeValue === value;

  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <button
      id={tabId}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      onClick={() => changeValue(value)}
      className={cn(
        'px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer',
        'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isSelected
          ? 'bg-surface text-foreground shadow-2xs font-semibold'
          : 'text-foreground-secondary hover:text-foreground hover:bg-surface/50',
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  const { activeValue, baseId } = context;
  const isSelected = activeValue === value;

  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!isSelected) return null;

  return (
    <div
      id={panelId}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={tabId}
      className={cn('focus-visible:ring-2 focus-visible:ring-focus-ring rounded-lg', className)}
    >
      {children}
    </div>
  );
}
