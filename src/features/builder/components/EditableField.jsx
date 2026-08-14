import { useState, useRef, useEffect } from 'react';

/**
 * Accessible Inline Editing component for live document editing.
 * Renders plain text during view mode and switches to input/textarea on click.
 */
export function EditableField({
  value = '',
  onCommit,
  placeholder = 'Click to edit...',
  multiline = false,
  maxLength,
  className = '',
  inputClassName = '',
  ariaLabel = 'Edit content',
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  // Sync temp value during render if external prop value changed while not editing
  if (value !== prevValue) {
    setPrevValue(value);
    if (!isEditing) {
      setTempValue(value);
    }
  }

  const inputRef = useRef(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (typeof inputRef.current.select === 'function') {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  function handleStartEditing() {
    setTempValue(value || '');
    setIsEditing(true);
  }

  function handleCancel() {
    setTempValue(value || '');
    setIsEditing(false);
  }

  function handleSave() {
    setIsEditing(false);
    const trimmed = tempValue;
    if (trimmed !== value && typeof onCommit === 'function') {
      onCommit(trimmed);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      handleCancel();
      return;
    }

    if (!multiline && event.key === 'Enter') {
      event.preventDefault();
      handleSave();
    }
  }

  if (isEditing) {
    return multiline ? (
      <textarea
        ref={inputRef}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        aria-label={ariaLabel}
        lang="en"
        dir="ltr"
        rows={3}
        className={`w-full p-1.5 text-inherit font-inherit bg-surface border-2 border-primary rounded outline-none focus:ring-2 focus:ring-primary/20 transition-all ${inputClassName}`}
      />
    ) : (
      <input
        ref={inputRef}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        aria-label={ariaLabel}
        lang="en"
        dir="ltr"
        className={`w-full p-1 text-inherit font-inherit bg-surface border-2 border-primary rounded outline-none focus:ring-2 focus:ring-primary/20 transition-all ${inputClassName}`}
      />
    );
  }

  const displayContent = value || placeholder;
  const isPlaceholder = !value;

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleStartEditing}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStartEditing();
        }
      }}
      aria-label={`${ariaLabel}: ${displayContent}`}
      lang="en"
      dir="ltr"
      className={`inline-block border border-transparent hover:border-dashed hover:border-primary/50 hover:bg-primary-subtle/30 rounded px-1 -mx-1 cursor-text transition-colors ${
        isPlaceholder ? 'text-foreground-muted italic opacity-75' : ''
      } ${className}`}
    >
      {displayContent}
    </span>
  );
}
