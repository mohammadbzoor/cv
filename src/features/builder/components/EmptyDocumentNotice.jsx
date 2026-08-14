import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function EmptyDocumentNotice() {
  const { t } = useTranslation('builder');

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-3 text-slate-400">
      <FileText className="w-12 h-12 stroke-[1.5]" aria-hidden="true" />
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-slate-600">{t('emptyDocumentTitle')}</h4>
        <p className="text-xs text-slate-500 max-w-xs">{t('emptyDocumentBody')}</p>
      </div>
    </div>
  );
}
