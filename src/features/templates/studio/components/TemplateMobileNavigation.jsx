import { useTranslation } from 'react-i18next';
import { LayoutTemplate, Eye, Sliders } from 'lucide-react';

export function TemplateMobileNavigation({ activeTab, onTabChange }) {
  const { t } = useTranslation('templates');

  return (
    <div className="flex md:hidden items-center justify-around bg-surface border-b border-border p-2 sticky top-16 z-20 text-xs font-semibold shadow-2xs">
      <button
        type="button"
        onClick={() => onTabChange('templates')}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors cursor-pointer min-h-[44px] ${
          activeTab === 'templates' ? 'bg-primary-subtle text-primary font-bold' : 'text-foreground-secondary'
        }`}
      >
        <LayoutTemplate className="w-4 h-4" />
        <span>1. {t('mobileTabs.templates', { defaultValue: 'Templates' })}</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange('preview')}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors cursor-pointer min-h-[44px] ${
          activeTab === 'preview' ? 'bg-primary-subtle text-primary font-bold' : 'text-foreground-secondary'
        }`}
      >
        <Eye className="w-4 h-4" />
        <span>2. {t('mobileTabs.preview', { defaultValue: 'Preview' })}</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange('customize')}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors cursor-pointer min-h-[44px] ${
          activeTab === 'customize' ? 'bg-primary-subtle text-primary font-bold' : 'text-foreground-secondary'
        }`}
      >
        <Sliders className="w-4 h-4" />
        <span>3. {t('mobileTabs.customize', { defaultValue: 'Customize' })}</span>
      </button>
    </div>
  );
}
