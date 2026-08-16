import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { getDesignDifferences } from '../utils/getDesignDifferences';
import { Button } from '../../../../components/ui/Button';

export function DesignDifferencePreview({ 
  oldDesign, 
  newDesign, 
  title, 
  onApply, 
  onCancel,
  applyText,
  cancelText
}) {
  const { t } = useTranslation(['builder', 'templates']);
  
  const differences = getDesignDifferences(oldDesign, newDesign);

  return (
    <div className="p-4 bg-surface border border-border rounded-xl text-start space-y-4">
      {title && <h3 className="text-sm font-bold text-foreground">{title}</h3>}
      
      {differences.length === 0 ? (
        <p className="text-xs text-foreground-secondary">
          {t('templates:noDifferences', { defaultValue: 'No visible changes.' })}
        </p>
      ) : (
        <ul className="space-y-2 text-xs">
          {differences.map((diff, idx) => (
            <li key={idx} className="flex items-center gap-2 text-foreground">
              <span className="font-semibold w-1/3 truncate">
                {t(diff.labelKey, { defaultValue: diff.key })}:
              </span>
              <span className="text-foreground-secondary line-through opacity-70">
                {t(`templates:values.${diff.oldValue}`, { defaultValue: diff.oldValue })}
              </span>
              <ArrowRight className="w-3 h-3 text-primary shrink-0 mx-1" />
              <span className="font-bold text-primary">
                {t(`templates:values.${diff.newValue}`, { defaultValue: diff.newValue })}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-end gap-2 pt-2 border-t border-border/60">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          {cancelText || t('common:cancel', { defaultValue: 'Cancel' })}
        </Button>
        <Button variant="primary" size="sm" onClick={onApply} disabled={differences.length === 0}>
          {applyText || t('common:apply', { defaultValue: 'Apply' })}
        </Button>
      </div>
    </div>
  );
}
