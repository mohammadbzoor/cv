import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sliders, Undo2, Redo2, ArrowRight, ArrowLeft } from 'lucide-react';
import { ROUTE_PATHS } from '../../../../app/routePaths';
import { Button } from '../../../../components/ui/Button';
import { useLanguage } from '../../../../hooks/useLanguage';

export function TemplateStickyActions({
  activeTemplateId,
  activeTemplateName,
  onUseTemplate,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isMobile = false,
}) {
  const { t } = useTranslation('templates');
  const { isRTL } = useLanguage();
  const ActionArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      className={
        isMobile
          ? 'fixed bottom-0 inset-x-0 z-30 p-3 bg-surface border-t border-border shadow-xl flex items-center justify-between gap-2'
          : 'p-4 bg-surface border border-border rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-4 text-start'
      }
    >
      <div className="text-start space-y-0.5 min-w-0">
        <div className="text-xs font-bold text-foreground truncate">
          {t('selectedTemplateLabel')}: <span className="text-primary">{activeTemplateName}</span>
        </div>
        {!isMobile && (
          <div className="text-[11px] text-foreground-secondary">
            {t('preservesDataNotice')}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          type="button"
          variant="ghost"
          size="xs"
          disabled={!canUndo}
          onClick={onUndo}
          title={t('undo', { defaultValue: 'Undo (Ctrl+Z)' })}
          aria-label={t('undo', { defaultValue: 'Undo' })}
          className="min-h-[44px] min-w-[44px]"
        >
          <Undo2 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="xs"
          disabled={!canRedo}
          onClick={onRedo}
          title={t('redo', { defaultValue: 'Redo (Ctrl+Y)' })}
          aria-label={t('redo', { defaultValue: 'Redo' })}
          className="min-h-[44px] min-w-[44px]"
        >
          <Redo2 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="primary"
          size={isMobile ? 'sm' : 'md'}
          leadingIcon={Sliders}
          trailingIcon={ActionArrow}
          onClick={() => onUseTemplate(activeTemplateId)}
          className="min-h-[44px]"
        >
          {t('useTemplateAndOpenBuilder')}
        </Button>
      </div>
    </div>
  );
}
