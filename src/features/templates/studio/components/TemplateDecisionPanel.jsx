import { useTranslation } from 'react-i18next';
import { HelpCircle, Check } from 'lucide-react';
import { getTemplateDecisionReasons } from '../utils/getTemplateDecisionReasons';
import { getTemplateName } from '../../registry/templateMetadata';

export function TemplateDecisionPanel({ templateId }) {
  const { t } = useTranslation('templates');

  const templateName = getTemplateName(templateId);
  const matrix = getTemplateDecisionReasons(templateId);

  const criteria = [
    { key: 'parsingSimplicity', label: t('decisionMatrix.parsingSimplicity', { defaultValue: 'Parsing Simplicity' }), value: matrix.parsingSimplicity },
    { key: 'onePageSuitability', label: t('decisionMatrix.onePageSuitability', { defaultValue: 'Single-Page Suitability' }), value: matrix.onePageSuitability },
    { key: 'projectEmphasis', label: t('decisionMatrix.projectEmphasis', { defaultValue: 'Project Emphasis' }), value: matrix.projectEmphasis },
    { key: 'executiveEmphasis', label: t('decisionMatrix.executiveEmphasis', { defaultValue: 'Executive Focus' }), value: matrix.executiveEmphasis },
    { key: 'visualDensity', label: t('decisionMatrix.visualDensity', { defaultValue: 'Information Density' }), value: matrix.visualDensity },
    { key: 'customizationRange', label: t('decisionMatrix.customizationRange', { defaultValue: 'Customization Range' }), value: matrix.customizationRange },
    { key: 'readingOrderComplexity', label: t('decisionMatrix.readingOrderComplexity', { defaultValue: 'Reading Order' }), value: matrix.readingOrderComplexity },
    { key: 'printStability', label: t('decisionMatrix.printStability', { defaultValue: 'Print & PDF Stability' }), value: matrix.printStability },
  ];

  return (
    <div className="p-4 bg-surface border border-border rounded-xl space-y-3 text-start">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
          {t('decisionMatrix.title', { defaultValue: 'Template Decision Matrix' })}
        </h4>
        <span className="text-[11px] font-mono text-primary font-bold">{templateName}</span>
      </div>

      <p className="text-[11px] text-foreground-secondary leading-relaxed">
        {t('decisionMatrix.desc', { defaultValue: 'Qualitative analysis of structural trade-offs to help you choose the right design.' })}
      </p>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {criteria.map((item) => (
          <div key={item.key} className="p-2 bg-surface-muted rounded-lg border border-border/60 space-y-0.5">
            <span className="text-[10px] text-foreground-secondary font-medium block truncate">{item.label}</span>
            <span className="font-bold text-foreground capitalize flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t(`decisionMatrix.values.${item.value}`, { defaultValue: item.value })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
