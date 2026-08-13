import { Modal } from '../Modal';
import { Button } from '../Button';

/**
 * Confirmation dialog built on top of the base Modal and Button primitives.
 * Does not hardcode strings; expects confirmLabel and cancelLabel via props.
 */
export function ConfirmDialog({
  isOpen = false,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'primary',
  loading = false,
  destructive = false,
  closeOnOverlayClick = true,
  className,
}) {
  const variant = destructive ? 'danger' : confirmVariant;

  function handleConfirm() {
    if (loading) return;
    onConfirm?.();
  }

  function handleClose() {
    if (loading) return;
    onClose?.();
  }

  const footer = (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClose}
        disabled={loading}
      >
        {cancelLabel}
      </Button>
      <Button
        variant={variant}
        size="sm"
        onClick={handleConfirm}
        loading={loading}
      >
        {confirmLabel}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      description={description}
      footer={footer}
      size="sm"
      closeOnOverlayClick={!loading && closeOnOverlayClick}
      closeOnEscape={!loading}
      className={className}
    />
  );
}
