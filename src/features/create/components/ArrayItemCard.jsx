import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/Button';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { cn } from '../../../utils/cn';

/**
 * Card container wrapper for field array items with delete confirmation dialog.
 */
export function ArrayItemCard({
  title,
  subtitle,
  onRemove,
  hasData = true,
  children,
  className,
}) {
  const { t } = useTranslation('create');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function handleConfirmDelete() {
    setIsConfirmOpen(false);
    onRemove();
  }

  function handleRemoveClick() {
    if (!hasData) {
      onRemove();
    } else {
      setIsConfirmOpen(true);
    }
  }

  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-xl p-5 space-y-4 shadow-2xs relative transition-colors',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="space-y-0.5">
          <h4 className="text-sm font-bold text-foreground">{title || 'New Item'}</h4>
          {subtitle && <p className="text-xs text-foreground-secondary">{subtitle}</p>}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleRemoveClick}
          aria-label={t('create:confirmDeleteItem')}
          className="text-foreground-secondary hover:text-error hover:bg-error-subtle shrink-0"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>

      <div>{children}</div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('create:confirmDeleteItem')}
        description={t('create:confirmDeleteDesc')}
        destructive
      />
    </div>
  );
}
