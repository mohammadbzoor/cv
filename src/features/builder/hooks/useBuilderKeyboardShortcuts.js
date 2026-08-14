import { useEffect } from 'react';

/**
 * Attaches keyboard listeners for Builder Studio:
 * - Ctrl/Cmd + S: Save draft
 * - Ctrl/Cmd + Z: Undo (when not focusing input/textarea)
 * - Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y: Redo
 */
export function useBuilderKeyboardShortcuts({ onSave, onUndo, onRedo, canUndo, canRedo }) {
  useEffect(() => {
    function handleKeyDown(event) {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      const targetTag = (event.target?.tagName || '').toLowerCase();
      const isInputFocused =
        targetTag === 'input' || targetTag === 'textarea' || event.target?.isContentEditable;

      // Save Draft: Ctrl/Cmd + S
      if (isCtrlOrCmd && event.key.toLowerCase() === 's') {
        event.preventDefault();
        if (typeof onSave === 'function') {
          onSave();
        }
        return;
      }

      // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if (
        (isCtrlOrCmd && event.shiftKey && event.key.toLowerCase() === 'z') ||
        (isCtrlOrCmd && event.key.toLowerCase() === 'y')
      ) {
        if (!isInputFocused) {
          event.preventDefault();
          if (canRedo && typeof onRedo === 'function') {
            onRedo();
          }
        }
        return;
      }

      // Undo: Ctrl/Cmd + Z
      if (isCtrlOrCmd && event.key.toLowerCase() === 'z') {
        if (!isInputFocused) {
          event.preventDefault();
          if (canUndo && typeof onUndo === 'function') {
            onUndo();
          }
        }
        return;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSave, onUndo, onRedo, canUndo, canRedo]);
}
