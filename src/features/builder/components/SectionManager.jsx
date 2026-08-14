import { ArrowUp, ArrowDown, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getSectionLabel } from '../utils/getSectionLabel';
import { Button } from '../../../components/ui/Button';

/**
 * Section Visibility & Ordering control panel.
 */
export function SectionManager({ sectionOrder = [], hiddenSections = [], onReorder, onToggleVisibility, onResetOrder }) {
  const { t } = useTranslation(['builder', 'templates']);
  const hiddenSet = new Set(hiddenSections);

  function handleMove(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sectionOrder.length) return;

    const updated = [...sectionOrder];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    if (typeof onReorder === 'function') {
      onReorder(updated);
    }
  }

  return (
    <div className="space-y-3 bg-surface border border-border p-4 rounded-xl shadow-2xs text-start">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
          {t('builder:sectionsManager')}
        </h3>

        {typeof onResetOrder === 'function' && (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            leadingIcon={RotateCcw}
            onClick={onResetOrder}
            title={t('templates:resetRecommendedOrder')}
          >
            {t('templates:resetOrder', { defaultValue: 'Reset' })}
          </Button>
        )}
      </div>

      <ul className="space-y-2">
        {sectionOrder.map((sectionKey, index) => {
          const isHidden = hiddenSet.has(sectionKey);
          const isFirst = index === 0;
          const isLast = index === sectionOrder.length - 1;

          return (
            <li
              key={sectionKey}
              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-colors ${
                isHidden
                  ? 'bg-surface-muted border-border/60 text-foreground-muted opacity-60'
                  : 'bg-app-bg border-border text-foreground'
              }`}
            >
              <span className="font-semibold truncate me-2">
                {getSectionLabel(sectionKey)}
              </span>

              <div className="flex items-center gap-1 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={isFirst}
                  onClick={() => handleMove(index, -1)}
                  aria-label={t('builder:moveUp')}
                  title={t('builder:moveUp')}
                  className="h-7 w-7 p-0"
                >
                  <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={isLast}
                  onClick={() => handleMove(index, 1)}
                  aria-label={t('builder:moveDown')}
                  title={t('builder:moveDown')}
                  className="h-7 w-7 p-0"
                >
                  <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleVisibility(sectionKey)}
                  aria-label={isHidden ? t('builder:showSection') : t('builder:hideSection')}
                  title={isHidden ? t('builder:showSection') : t('builder:hideSection')}
                  className="h-7 w-7 p-0"
                >
                  {isHidden ? (
                    <EyeOff className="w-3.5 h-3.5 text-foreground-muted" aria-hidden="true" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
