import { useTranslation } from 'react-i18next';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectDesignSettings } from '../../cv/store/cvSelectors';
import {
  SUPPORTED_FONT_SIZES,
  SUPPORTED_LINE_HEIGHTS,
  SUPPORTED_MARGIN_SIZES,
} from '../../cv/models/cvConstants';
import { SAFE_FONT_FAMILIES } from '../constants/builderConstants';
import { sanitizePrimaryColor, validateFontFamily } from '../utils/builderValidation';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

export function DesignPanel() {
  const { t } = useTranslation('builder');
  const design = useCVStore(selectDesignSettings) || {};
  const updateDesignSettings = useCVStore((state) => state.updateDesignSettings);

  const fontOptions = SAFE_FONT_FAMILIES.map((f) => ({
    value: f.id,
    label: f.name,
  }));

  const fontSizeOptions = SUPPORTED_FONT_SIZES.map((s) => ({
    value: s,
    label: s.charAt(0).toUpperCase() + s.slice(1),
  }));

  const lineHeightOptions = SUPPORTED_LINE_HEIGHTS.map((l) => ({
    value: l,
    label: l.charAt(0).toUpperCase() + l.slice(1),
  }));

  const marginOptions = SUPPORTED_MARGIN_SIZES.map((m) => ({
    value: m,
    label: m.charAt(0).toUpperCase() + m.slice(1),
  }));

  function handleColorChange(e) {
    const raw = e.target.value;
    const sanitized = sanitizePrimaryColor(raw, design.primaryColor || '#344553');
    updateDesignSettings({ primaryColor: sanitized });
  }

  function handleFontChange(e) {
    const font = validateFontFamily(e.target.value);
    updateDesignSettings({ fontFamily: font });
  }

  return (
    <div className="p-4 space-y-5 overflow-y-auto max-h-full">
      <h3 className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border/60 pb-2">
        {t('design')}
      </h3>

      {/* Primary Color */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground block">
          {t('designSettings.primaryColor')}
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={design.primaryColor || '#344553'}
            onChange={handleColorChange}
            aria-label={t('designSettings.primaryColor')}
            className="w-10 h-10 rounded-lg cursor-pointer border border-border bg-transparent p-0.5 shrink-0"
          />
          <Input
            value={design.primaryColor || '#344553'}
            onChange={handleColorChange}
            placeholder="#344553"
            lang="en"
            dir="ltr"
            className="font-mono text-xs"
          />
        </div>
      </div>

      {/* Font Family */}
      <Select
        label={t('designSettings.fontFamily')}
        options={fontOptions}
        value={design.fontFamily || 'Inter'}
        onChange={handleFontChange}
      />

      {/* Font Size */}
      <Select
        label={t('designSettings.fontSize')}
        options={fontSizeOptions}
        value={design.fontSize || 'medium'}
        onChange={(e) => updateDesignSettings({ fontSize: e.target.value })}
      />

      {/* Line Height */}
      <Select
        label={t('designSettings.lineHeight')}
        options={lineHeightOptions}
        value={design.lineHeight || 'normal'}
        onChange={(e) => updateDesignSettings({ lineHeight: e.target.value })}
      />

      {/* Margins */}
      <Select
        label={t('designSettings.margins')}
        options={marginOptions}
        value={design.margins || 'normal'}
        onChange={(e) => updateDesignSettings({ margins: e.target.value })}
      />

      {/* Active Template (Read-Only) */}
      <div className="space-y-1.5 pt-2">
        <label className="text-xs font-bold text-foreground block">
          {t('designSettings.template')}
        </label>
        <div className="p-3 bg-surface-muted border border-border rounded-xl text-xs font-semibold text-foreground flex items-center justify-between">
          <span>Builder Draft Engine (A4)</span>
          <span className="text-[10px] px-2 py-0.5 bg-primary-subtle text-primary rounded font-mono">Internal</span>
        </div>
      </div>
    </div>
  );
}
