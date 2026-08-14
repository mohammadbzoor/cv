import { FileText, Trash2, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/Button';

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function SelectedFile({ file, onRemove, onReplace }) {
  const { t } = useTranslation('upload');

  if (!file) return null;

  return (
    <div className="p-4 bg-surface border border-border rounded-xl flex items-center justify-between gap-4 shadow-2xs">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-primary-subtle text-primary flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-foreground truncate">{file.name}</p>
          <p className="text-[11px] text-foreground-secondary font-mono">{formatBytes(file.size)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          leadingIcon={RefreshCw}
          onClick={onReplace}
        >
          {t('replaceFile')}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          leadingIcon={Trash2}
          onClick={onRemove}
          className="text-error border-error/30 hover:bg-error-subtle/30"
        >
          {t('removeFile')}
        </Button>
      </div>
    </div>
  );
}
