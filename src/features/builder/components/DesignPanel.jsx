import { useNavigate } from 'react-router-dom';
import { LayoutTemplate } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectDesignSettings, selectTemplateId } from '../../cv/store/cvSelectors';
import {
  SUPPORTED_FONT_SIZES,
  SUPPORTED_LINE_HEIGHTS,
  SUPPORTED_MARGIN_SIZES,
  SUPPORTED_DENSITIES,
  SUPPORTED_HEADING_STYLES,
} from '../../cv/models/cvConstants';
import { SAFE_FONT_FAMILIES } from '../constants/builderConstants';
import { getAvailableTemplates } from '../../templates/registry/templateRegistry';
import { sanitizePrimaryColor, validateFontFamily } from '../utils/builderValidation';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Switch } from '../../../components/ui/Switch';
import { Button } from '../../../components/ui/Button';
import { ROUTE_PATHS } from '../../../app/routePaths';

export function DesignPanel() {
  const { t } = useTranslation(['builder', 'templates']);
  const navigate = useNavigate();

  const design = useCVStore(selectDesignSettings) || {};
  const templateId = useCVStore(selectTemplateId);
  const updateDesignSettings = useCVStore((state) => state.updateDesignSettings);
  const setTemplate = useCVStore((state) => state.setTemplate);

  const availableTemplates = getAvailableTemplates();
  const templateOptions = availableTemplates.map((item) => ({
    value: item.id,
    label: t(item.nameKey, { defaultValue: item.id }),
  }));

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
    label: t(`templates:density.${d}`, { defaultValue: d }),
  }));

  const headingStyleOptions = SUPPORTED_HEADING_STYLES.map((h) => ({
    value: h,
    label: t(`templates:headingStyles.${h}`, { defaultValue: h }),
  }));

  function handleColorChange(e) {
    const raw = e.target.value;
    const sanitized = sanitizePrimaryColor(raw, design.primaryColor || '#1e293b');
    updateDesignSettings({ primaryColor: sanitized });
  }

  function handleFontChange(e) {
    const font = validateFontFamily(e.target.value);
    updateDesignSettings({ fontFamily: font });
  }

  return (
    <div className="p-4 space-y-5 overflow-y-auto max-h-full text-start">
      <h3 className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border/60 pb-2">
        {t('builder:design')}
      </h3>

      {/* Active Template Select */}
      <div className="space-y-2">
        <Select
          label={t('builder:designSettings.template')}
          options={templateOptions}
          value={templateId || 'technical-prime-ats'}
          onChange={(e) => setTemplate(e.target.value)}
        />

        <Button
          type="button"
          variant="outline"
          size="sm"
          leadingIcon={LayoutTemplate}
          onClick={() => navigate(ROUTE_PATHS.TEMPLATES)}
          className="w-full text-xs"
        >
          {t('templates:browseTemplates')}
        </Button>
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

      {/* Font Family */}
      <Select
        label={t('builder:designSettings.fontFamily')}
        options={fontOptions}
        value={design.fontFamily || 'Inter'}
        onChange={handleFontChange}
      />

      {/* Font Size */}
      <Select
        label={t('builder:designSettings.fontSize')}
        options={fontSizeOptions}
        value={design.fontSize || 'md'}
        onChange={(e) => updateDesignSettings({ fontSize: e.target.value })}
      />

      {/* Line Height */}
      <Select
        label={t('builder:designSettings.lineHeight')}
        options={lineHeightOptions}
        value={design.lineHeight || 'normal'}
        onChange={(e) => updateDesignSettings({ lineHeight: e.target.value })}
      />

      {/* Margins */}
      <Select
        label={t('builder:designSettings.margins')}
        options={marginOptions}
        value={design.margins || 'normal'}
        onChange={(e) => updateDesignSettings({ margins: e.target.value })}
      />

      {/* Content Density */}
      <Select
        label={t('templates:contentDensity')}
        options={densityOptions}
        value={design.density || 'balanced'}
        onChange={(e) => updateDesignSettings({ density: e.target.value })}
      />

      {/* Heading Style */}
      <Select
        label={t('templates:headingStyle')}
        options={headingStyleOptions}
        value={design.headingStyle || 'standard'}
        onChange={(e) => updateDesignSettings({ headingStyle: e.target.value })}
      />

      {/* Dividers Toggle */}
      <div className="flex items-center justify-between p-3 bg-surface-muted rounded-xl border border-border/60">
        <span className="text-xs font-bold text-foreground">{t('templates:showSectionDividers')}</span>
        <Switch
          checked={design.showSectionDividers !== false}
          onChange={(checked) => updateDesignSettings({ showSectionDividers: checked })}
          aria-label={t('templates:showSectionDividers')}
        />
      </div>
    </div>
  );
}
