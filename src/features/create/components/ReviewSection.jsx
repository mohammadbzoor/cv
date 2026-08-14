import { Edit3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { cn } from '../../../utils/cn';

/**
 * Review step section container with jump-to-step edit button.
 */
export function ReviewSection({ title, onEdit, isEmpty, emptyText, children, className }) {
  const { t } = useTranslation('common');

  return (
    <Card className={cn('p-5 space-y-3 shadow-2xs', className)}>
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        {onEdit && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            leadingIcon={Edit3}
            onClick={onEdit}
          >
            {t('edit')}
          </Button>
        )}
      </div>

      {isEmpty ? (
        <p className="text-xs text-foreground-muted italic py-2">
          {emptyText || 'No items added yet.'}
        </p>
      ) : (
        <div className="text-xs text-foreground space-y-2">{children}</div>
      )}
    </Card>
  );
}
