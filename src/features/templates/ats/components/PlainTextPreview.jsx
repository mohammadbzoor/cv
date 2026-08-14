import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { generatePlainTextCV } from '../utils/generatePlainTextCV';

export function PlainTextPreview({ cvData }) {
  const { t } = useTranslation('templates');
  const [copied, setCopied] = useState(false);

  const plainTextContent = generatePlainTextCV(cvData);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(plainTextContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-3 text-start">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-foreground">{t('plainTextReadingTitle')}</span>
        <Button
          type="button"
          variant="outline"
          size="xs"
          leadingIcon={copied ? Check : Copy}
          onClick={handleCopy}
          disabled={!plainTextContent}
        >
          {copied ? t('copiedText') : t('copyPlainText')}
        </Button>
      </div>

      <div
        lang="en"
        dir="ltr"
        className="p-4 bg-surface-elevated border border-border rounded-xl font-mono text-xs text-foreground-secondary whitespace-pre-wrap leading-relaxed select-text max-h-[500px] overflow-y-auto"
      >
        {plainTextContent || t('noPlainTextContent')}
      </div>
    </div>
  );
}
