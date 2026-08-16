import { useTranslation } from 'react-i18next';
import { Select } from '../../../../components/ui/Select';
import { Input } from '../../../../components/ui/Input';
import { Switch } from '../../../../components/ui/Switch';
import { SAFE_FONT_FAMILIES } from '../../../builder/constants/builderConstants';
import {
  SUPPORTED_FONT_SIZES,
  SUPPORTED_HEADING_STYLES,
} from '../../../cv/models/cvConstants';
import { sanitizePrimaryColor, validateFontFamily } from '../../../builder/utils/builderValidation';

export function StyleSettings({ design, onChange }) {
  const { t } = useTranslation(['builder', 'templates']);

  const fontOptions = SAFE_FONT_FAMILIES.map((f) => ({
    value: f.id,
    label: f.name,
  }));

  const fontSizeOptions = SUPPORTED_FONT_SIZES.map((s) => ({
    value: s,
    label: t(`templates:fontSize.${s}`, { defaultValue: s }),
  }));

  const headingStyleOptions = SUPPORTED_HEADING_STYLES.map((h) => ({
    value: h,
    label: t(`templates:headingStyles.${h}`, { defaultValue: h }),
  }));

  function handleColorChange(e) {
    const raw = e.target.value;
    const sanitized = sanitizePrimaryColor(raw, design.primaryColor || '#1e293b');
    onChange({ primaryColor: sanitized });
  }

  function handleFontChange(e) {
    const font = validateFontFamily(e.target.value);
    onChange({ fontFamily: font });
  }

  return (
    <div className="space-y-4">
      {/* Primary Color */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground block">
          {t('builder:designSettings.primaryColor')}
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={design.primaryColor || '#1e293b'}
            onChange={handleColorChange}
            aria-label={t('builder:designSettings.primaryColor')}
            className="w-10 h-10 rounded-lg cursor-pointer border border-border bg-transparent p-0.5 shrink-0"
          />
          <Input
            value={design.primaryColor || '#1e293b'}
            onChange={handleColorChange}
            placeholder="#1e293b"
            lang="en"
            dir="ltr"
            className="font-mono text-xs"
          />
        </div>
      </div>

      <Select
        label={t('builder:designSettings.fontFamily')}
        options={fontOptions}
        value={design.fontFamily || 'Inter'}
        onChange={handleFontChange}
      />

      <Select
        label={t('builder:designSettings.fontSize')}
        options={fontSizeOptions}
        value={design.fontSize || 'md'}
        onChange={(e) => onChange({ fontSize: e.target.value })}
      />

      <Select
        label={t('templates:headingStyle')}
        options={headingStyleOptions}
        value={design.headingStyle || 'standard'}
        onChange={(e) => onChange({ headingStyle: e.target.value })}
      />

      {/* Dividers Toggle */}
      <div className="flex items-center justify-between p-3 bg-surface-muted rounded-xl border border-border/60">
        <span className="text-xs font-bold text-foreground">{t('templates:showSectionDividers')}</span>
        <Switch
          checked={design.showSectionDividers !== false}
          onChange={(checked) => onChange({ showSectionDividers: checked })}
          aria-label={t('templates:showSectionDividers')}
        />
      </div>
    </div>
  );
}
