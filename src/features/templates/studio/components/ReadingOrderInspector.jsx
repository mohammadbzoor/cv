import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import { generatePlainTextCV } from '../../ats/utils/generatePlainTextCV';
import { runReadingOrderDiagnostics } from '../utils/runReadingOrderDiagnostics';

export function ReadingOrderInspector({ cvData }) {
  const { t } = useTranslation('templates');

  const diagnostics = runReadingOrderDiagnostics(cvData);
  const plainText = generatePlainTextCV(cvData);

  return (
    <div className="space-y-4 text-start">
      {/* Diagnostic Alerts */}
      {diagnostics.length > 0 && (
        <div className="space-y-2">
          {diagnostics.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                item.type === 'warning'
                  ? 'bg-warning-subtle text-warning border-warning/20'
                  : 'bg-info-subtle text-info border-info/20'
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">{t(`inspector.${item.id}.title`, { defaultValue: item.title })}</span>
                <span className="text-foreground-secondary">{t(`inspector.${item.id}.desc`, { defaultValue: item.desc })}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Structured Stream */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-foreground block">
          {t('inspector.streamTitle', { defaultValue: 'Extracted Plain Text Flow' })}
        </span>
        <pre
          lang="en"
          dir="ltr"
          className="p-4 bg-surface-elevated border border-border rounded-xl font-mono text-xs text-foreground-secondary whitespace-pre-wrap leading-relaxed select-text max-h-96 overflow-y-auto"
        >
          {plainText || t('noPlainTextContent')}
        </pre>
      </div>
    </div>
  );
}
