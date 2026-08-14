import { useTranslation } from 'react-i18next';
import { Palette, Layers, RotateCcw } from 'lucide-react';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectDesignSettings, selectSectionOrder, selectHiddenSections } from '../../cv/store/cvSelectors';
import {
  SUPPORTED_FONT_SIZES,
  SUPPORTED_LINE_HEIGHTS,
  SUPPORTED_MARGIN_SIZES,
  SUPPORTED_DENSITIES,
  SUPPORTED_HEADING_STYLES,
} from '../../cv/models/cvConstants';
import { SAFE_FONT_FAMILIES } from '../../builder/constants/builderConstants';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Switch } from '../../../components/ui/Switch';
import { Button } from '../../../components/ui/Button';
import { SectionManager } from '../../builder/components/SectionManager';
import { sanitizePrimaryColor, validateFontFamily } from '../../builder/utils/builderValidation';

export function TemplateQuickCustomization({ activeTemplate }) {
  const { t } = useTranslation(['templates', 'builder']);

  const design = useCVStore(selectDesignSettings) || {};
  const sectionOrder = useCVStore(selectSectionOrder);
  const hiddenSections = useCVStore(selectHiddenSections);

  const updateDesignSettings = useCVStore((state) => state.updateDesignSettings);
  const reorderSections = useCVStore((state) => state.reorderSections);
  const toggleSectionVisibility = useCVStore((state) => state.toggleSectionVisibility);

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

  const densityOptions = SUPPORTED_DENSITIES.map((d) => ({
    value: d,
    label: t(`density.${d}`, { defaultValue: d }),
  }));

  const headingStyleOptions = SUPPORTED_HEADING_STYLES.map((h) => ({
    value: h,
    label: t(`headingStyles.${h}`, { defaultValue: h }),
  }));

  function handleColorChange(e) {
    const sanitized = sanitizePrimaryColor(e.target.value, design.primaryColor || '#1e293b');
    updateDesignSettings({ primaryColor: sanitized });
  }

  function handleResetOrder() {
    if (activeTemplate?.supportedSections) {
      reorderSections([...activeTemplate.supportedSections]);
    }
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 space-y-6 shadow-2xs text-start">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2 font-bold text-sm text-foreground">
          <Palette className="w-4 h-4 text-primary" />
          <span>{t('quickCustomizationTitle')}</span>
        </div>
      </div>

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
            className="w-9 h-9 rounded-lg cursor-pointer border border-border bg-transparent p-0.5 shrink-0"
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

      {/* Typography & Spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          label={t('builder:designSettings.fontFamily')}
          options={fontOptions}
          value={design.fontFamily || 'Inter'}
          onChange={(e) => updateDesignSettings({ fontFamily: validateFontFamily(e.target.value) })}
        />

        <Select
          label={t('builder:designSettings.fontSize')}
          options={fontSizeOptions}
          value={design.fontSize || 'md'}
          onChange={(e) => updateDesignSettings({ fontSize: e.target.value })}
        />

        <Select
          label={t('builder:designSettings.lineHeight')}
          options={lineHeightOptions}
          value={design.lineHeight || 'normal'}
          onChange={(e) => updateDesignSettings({ lineHeight: e.target.value })}
        />

        <Select
          label={t('builder:designSettings.margins')}
          options={marginOptions}
          value={design.margins || 'normal'}
          onChange={(e) => updateDesignSettings({ margins: e.target.value })}
        />

        <Select
          label={t('contentDensity')}
          options={densityOptions}
          value={design.density || 'balanced'}
          onChange={(e) => updateDesignSettings({ density: e.target.value })}
        />

        <Select
          label={t('headingStyle')}
          options={headingStyleOptions}
          value={design.headingStyle || 'standard'}
          onChange={(e) => updateDesignSettings({ headingStyle: e.target.value })}
        />
      </div>

      {/* Dividers Toggle */}
      <div className="flex items-center justify-between p-3 bg-surface-muted rounded-xl border border-border/60">
        <span className="text-xs font-bold text-foreground">{t('showSectionDividers')}</span>
        <Switch
          checked={design.showSectionDividers !== false}
          onChange={(checked) => updateDesignSettings({ showSectionDividers: checked })}
          aria-label={t('showSectionDividers')}
        />
      </div>

      {/* Section Order & Visibility */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
            <Layers className="w-4 h-4 text-secondary" />
            <span>{t('sectionManagerTitle')}</span>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="xs"
            leadingIcon={RotateCcw}
            onClick={handleResetOrder}
          >
            {t('resetRecommendedOrder')}
          </Button>
        </div>

        <SectionManager
          sectionOrder={sectionOrder}
          hiddenSections={hiddenSections}
          onReorder={reorderSections}
          onToggleVisibility={toggleSectionVisibility}
        />
      </div>
    </div>
  );
}
