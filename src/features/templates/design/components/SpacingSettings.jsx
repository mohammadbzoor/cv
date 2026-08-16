import { useTranslation } from 'react-i18next';
import { Minimize2, Sparkles } from 'lucide-react';
import { Select } from '../../../../components/ui/Select';
import {
  SUPPORTED_LINE_HEIGHTS,
  SUPPORTED_MARGIN_SIZES,
  SUPPORTED_DENSITIES,
  SUPPORTED_ITEM_SPACINGS,
  SUPPORTED_PARAGRAPH_SPACINGS,
} from '../../../cv/models/cvConstants';
import { getEffectiveDesignValues } from '../utils/getEffectiveDesignValues';

export function SpacingSettings({ design, onChange }) {
  const { t } = useTranslation(['builder', 'templates', 'common']);

  const effective = getEffectiveDesignValues(design);

  const densityOptions = SUPPORTED_DENSITIES.map((d) => ({
    value: d,
    label: t(`templates:density.${d}`, { defaultValue: d }),
  }));

  const lineHeightOptions = SUPPORTED_LINE_HEIGHTS.map((l) => ({
    value: l,
    label: t(`templates:spacing.${l}`, { defaultValue: l }),
  }));

  const marginOptions = SUPPORTED_MARGIN_SIZES.map((m) => ({
    value: m,
    label: t(`templates:spacing.${m}`, { defaultValue: m }),
  }));

  const itemSpacingOptions = SUPPORTED_ITEM_SPACINGS.map((s) => ({
    value: s,
    label: t(`templates:spacing.${s}`, { defaultValue: s }),
  }));

  const paragraphSpacingOptions = SUPPORTED_PARAGRAPH_SPACINGS.map((s) => ({
    value: s,
    label: t(`templates:spacing.${s}`, { defaultValue: s }),
  }));

  const isUltraCompact = design.density === 'ultra-compact';

  const toggleFitToOnePage = () => {
    if (isUltraCompact) {
      onChange({
        density: 'balanced',
        fontSize: 'md',
        lineHeight: 'normal',
        margins: 'normal',
        sectionSpacing: 'normal',
        itemSpacing: 'normal',
        paragraphSpacing: 'normal',
      });
    } else {
      onChange({
        density: 'ultra-compact',
        fontSize: 'sm',
        lineHeight: 'tight',
        margins: 'compact',
        sectionSpacing: 'tight',
        itemSpacing: 'tight',
        paragraphSpacing: 'tight',
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* 1-Click Fit to 1 Page / Ultra Compact Action Button */}
      <button
        type="button"
        onClick={toggleFitToOnePage}
        className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all shadow-xs ${
          isUltraCompact
            ? 'bg-primary/10 border-primary text-primary dark:bg-primary/20 ring-1 ring-primary/30'
            : 'bg-surface-secondary/50 border-border/70 hover:bg-surface-secondary hover:border-primary/40 text-foreground'
        }`}
      >
        <span className="flex items-center gap-2.5">
          <span className={`p-1.5 rounded-lg ${isUltraCompact ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
            <Minimize2 className="w-4 h-4" />
          </span>
          <span className="text-start">
            <span className="block font-bold text-foreground">
              {t('templates:fitToOnePage', { defaultValue: 'ملاءمة صفحة واحدة (Fit to 1 Page)' })}
            </span>
            <span className="block text-[11px] text-foreground-secondary font-normal mt-0.5">
              {t('templates:ultraCompactDesc', { defaultValue: 'ضغط فائق للمسافات لاحتواء كامل السيرة في صفحة واحدة' })}
            </span>
          </span>
        </span>
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
            isUltraCompact
              ? 'bg-primary text-white shadow-xs'
              : 'bg-border text-foreground-secondary'
          }`}
        >
          {isUltraCompact ? 'مفعّل ✓' : 'ضغط فائق ⚡'}
        </span>
      </button>

      {/* Content Density Dropdown */}
      <Select
        label={t('templates:contentDensity')}
        options={densityOptions}
        value={design.density || 'balanced'}
        onChange={(e) => onChange({ density: e.target.value })}
      />

      <div className="border-t border-border/60 my-4 pt-4 space-y-4">
        <h4 className="text-xs font-semibold text-foreground-secondary uppercase tracking-wider mb-2">
          {t('templates:fineTuning', { defaultValue: 'Fine Tuning' })}
        </h4>

        {/* Line Height */}
        <Select
          label={t('builder:designSettings.lineHeight')}
          options={lineHeightOptions}
          value={design.lineHeight || 'normal'}
          onChange={(e) => onChange({ lineHeight: e.target.value })}
          helperText={design.lineHeight === 'normal' ? t('templates:effectiveValue', { value: t(`templates:spacing.${effective.lineHeight}`) }) : null}
        />

        {/* Margins */}
        <Select
          label={t('builder:designSettings.margins')}
          options={marginOptions}
          value={design.margins || 'normal'}
          onChange={(e) => onChange({ margins: e.target.value })}
          helperText={design.margins === 'normal' ? t('templates:effectiveValue', { value: t(`templates:spacing.${effective.margins}`) }) : null}
        />

        {/* Item Spacing */}
        <Select
          label={t('builder:designSettings.itemSpacing', { defaultValue: 'Item Spacing' })}
          options={itemSpacingOptions}
          value={design.itemSpacing || 'normal'}
          onChange={(e) => onChange({ itemSpacing: e.target.value })}
          helperText={design.itemSpacing === 'normal' ? t('templates:effectiveValue', { value: t(`templates:spacing.${effective.itemSpacing}`) }) : null}
        />

        {/* Paragraph Spacing */}
        <Select
          label={t('builder:designSettings.paragraphSpacing', { defaultValue: 'Paragraph Spacing' })}
          options={paragraphSpacingOptions}
          value={design.paragraphSpacing || 'normal'}
          onChange={(e) => onChange({ paragraphSpacing: e.target.value })}
          helperText={design.paragraphSpacing === 'normal' ? t('templates:effectiveValue', { value: t(`templates:spacing.${effective.paragraphSpacing}`) }) : null}
        />
      </div>
    </div>
  );
}
