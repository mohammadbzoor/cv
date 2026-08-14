import { useTranslation } from 'react-i18next';
import { Eye, FileText, ShieldCheck } from 'lucide-react';

export function TemplatePreviewTabs({ activeTab, onTabChange }) {
  const { t } = useTranslation('templates');

  return (
    <div className="flex items-center gap-1 bg-surface-muted p-1 rounded-xl border border-border/60 text-xs font-semibold">
      <button
        type="button"
        onClick={() => onTabChange('visual')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer min-h-[38px] ${
          activeTab === 'visual' ? 'bg-surface text-foreground shadow-2xs font-bold' : 'text-foreground-secondary hover:text-foreground'
        }`}
      >
        <Eye className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
        <span>{t('tabVisualPreview')}</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange('plaintext')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer min-h-[38px] ${
          activeTab === 'plaintext' ? 'bg-surface text-foreground shadow-2xs font-bold' : 'text-foreground-secondary hover:text-foreground'
        }`}
      >
        <FileText className="w-3.5 h-3.5 text-secondary" aria-hidden="true" />
        <span>{t('tabPlainTextReading')}</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange('ats')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer min-h-[38px] ${
          activeTab === 'ats' ? 'bg-surface text-foreground shadow-2xs font-bold' : 'text-foreground-secondary hover:text-foreground'
        }`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-success" aria-hidden="true" />
        <span>{t('tabStructureCheck')}</span>
      </button>
    </div>
  );
}
