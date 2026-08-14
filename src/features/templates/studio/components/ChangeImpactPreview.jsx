import { useTranslation } from 'react-i18next';
import { CheckCircle2, RotateCcw, Info } from 'lucide-react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';

export function ChangeImpactPreview({ isOpen, onClose, onConfirm, actionType = 'switch-template', targetName = '' }) {
  const { t } = useTranslation('templates');

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('changeImpact.title', { defaultValue: 'Confirm Template Change' })}
      size="sm"
    >
      <div className="space-y-4 text-start">
        <div className="p-3 bg-info-subtle border border-info/20 rounded-xl text-xs text-foreground-secondary flex items-start gap-2.5">
          <Info className="w-4 h-4 text-info shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            {t('changeImpact.notice', { defaultValue: 'Switching template layout preserves all your text content, experience entries, and section settings.' })}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-surface border border-border rounded-lg space-y-1">
            <span className="font-bold text-foreground block">{t('changeImpact.willChange', { defaultValue: 'What will change:' })}</span>
            <span className="text-foreground-secondary block">
              {actionType === 'switch-template'
                ? t('changeImpact.templateLayoutChange', { name: targetName, defaultValue: `Template layout updated to ${targetName}` })
                : actionType === 'reset-order'
                  ? t('changeImpact.resetOrderChange', { defaultValue: 'Section sequence reset to template recommended order' })
                  : t('changeImpact.saferDefaultsChange', { defaultValue: 'Design settings reset to safer readability defaults' })}
            </span>
          </div>

          <div className="p-2.5 bg-surface border border-border rounded-lg space-y-1">
            <span className="font-bold text-success block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t('changeImpact.willRemain', { defaultValue: 'What will remain intact:' })}</span>
            </span>
            <ul className="list-disc list-inside text-foreground-secondary space-y-0.5">
              <li>{t('changeImpact.preserveText', { defaultValue: 'All personal details & summary text' })}</li>
              <li>{t('changeImpact.preserveExperiences', { defaultValue: 'All work experience & project entries' })}</li>
              <li>{t('changeImpact.preserveUndo', { defaultValue: 'Undo/Redo is available anytime (Ctrl+Z)' })}</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            {t('cancel', { defaultValue: 'Cancel' })}
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {t('confirmChange', { defaultValue: 'Confirm & Apply' })}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
