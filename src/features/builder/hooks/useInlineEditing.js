import { useState } from 'react';

/**
 * Custom hook managing inline editing field state.
 */
export function useInlineEditing() {
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [draftValue, setDraftValue] = useState('');

  function startEditing(fieldId, initialValue = '') {
    setEditingFieldId(fieldId);
    setDraftValue(initialValue);
  }

  function cancelEditing() {
    setEditingFieldId(null);
    setDraftValue('');
  }

  function commitEditing(onCommit) {
    if (typeof onCommit === 'function') {
      onCommit(draftValue);
    }
    setEditingFieldId(null);
    setDraftValue('');
  }

  return {
    editingFieldId,
    draftValue,
    setDraftValue,
    startEditing,
    cancelEditing,
    commitEditing,
    isEditing: (fieldId) => editingFieldId === fieldId,
  };
}
