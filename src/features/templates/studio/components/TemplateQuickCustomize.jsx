import { useTranslation } from 'react-i18next';
import { Palette, Sliders, Layers, ShieldCheck, RotateCcw } from 'lucide-react';
import { useCVStore } from '../../../cv/store/useCVStore';
import { selectDesignSettings } from '../../../cv/store/cvSelectors';
import {
  SUPPORTED_FONT_SIZES,
  SUPPORTED_LINE_HEIGHTS,
  SUPPORTED_MARGIN_SIZES,
  SUPPORTED_DENSITIES,
  SUPPORTED_HEADING_STYLES,
} from '../../../cv/models/cvConstants';
import { SAFE_FONT_FAMILIES } from '../../../builder/constants/builderConstants';
import { Input } from '../../../../components/ui/Input';
import { Select } from '../../../../components/ui/Select';
import { Switch } from '../../../../components/ui/Switch';
import { Accordion } from '../../../../components/ui/Accordion';
import { TemplateSectionControls } from './TemplateSectionControls';
import { SafeCustomizationGuard } from './SafeCustomizationGuard';
import { ContentPressureMeter } from './ContentPressureMeter';
import { ContentCoverageMap } from './ContentCoverageMap';
import { TemplateDecisionPanel } from './TemplateDecisionPanel';
import { sanitizePrimaryColor, validateFontFamily } from '../../../builder/utils/builderValidation';

export function TemplateQuickCustomize({ activeTemplate, cvData, onSelectSection }) {
  const { t } = useTranslation(['templates', 'builder']);

  const design = useCVStore(selectDesignSettings) || {};
  const updateDesignSettings = useCVStore((state) => state.updateDesignSettings);

  const fontOptions = SAFE_FONT_FAMILIES.map((f) => ({
    value: f.id,
    label: f.name,
  }));

  const fontSizeOptions = SUPPORTED_FONT_SIZES.map((s) => ({
    value: s,
    label: t(`templates:sizeLabels.${s}`, { defaultValue: s === 'sm' ? 'Small' : s === 'md' ? 'Medium' : 'Large' }),
  }));

  const lineHeightOptions = SUPPORTED_LINE_HEIGHTS.map((l) => ({
    value: l,
    label: t(`templates:sizeLabels.${l}`, { defaultValue: l.charAt(0).toUpperCase() + l.slice(1) }),
  }));

  const marginOptions = SUPPORTED_MARGIN_SIZES.map((m) => ({
    value: m,
    label: t(`templates:sizeLabels.${m}`, { defaultValue: m.charAt(0).toUpperCase() + m.slice(1) }),
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
    const sanitized = sanitizePrimaryColor(e.target.value, design.primaryColor || '#1e293b');
    updateDesignSettings({ primaryColor: sanitized });
  }

  function handleApplySaferDefaults() {
    updateDesignSettings({
      primaryColor: '#1e293b',
      fontFamily: 'Inter',
      fontSize: 'md',
      density: 'balanced',
      showSectionDividers: true,
      headingStyle: 'standard',
    });
  }

  const accordionItems = [
    {
      id: 'visual',
      title: t('customizationGroups.visual', { defaultValue: 'Visual Styling' }),
      icon: Palette,
      content: (
        <div className="space-y-3 pt-2">
          {/* Primary Color */}
          <div className="space-y-1.5">
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
        </div>
      ),
    },
    {
      id: 'spacing',
      title: t('customizationGroups.spacing', { defaultValue: 'Spacing & Density' }),
      icon: Sliders,
      content: (
        <div className="space-y-3 pt-2">
          <Select
            label={t('templates:contentDensity')}
            options={densityOptions}
            value={design.density || 'balanced'}
            onChange={(e) => updateDesignSettings({ density: e.target.value })}
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
        </div>
      ),
    },
    {
      id: 'structure',
      title: t('customizationGroups.structure', { defaultValue: 'Structure & Sections' }),
      icon: Layers,
      content: (
        <div className="space-y-3 pt-2">
          <Select
            label={t('templates:headingStyle')}
            options={headingStyleOptions}
            value={design.headingStyle || 'standard'}
            onChange={(e) => updateDesignSettings({ headingStyle: e.target.value })}
          />

          <div className="flex items-center justify-between p-3 bg-surface-muted rounded-xl border border-border/60">
            <span className="text-xs font-bold text-foreground">{t('templates:showSectionDividers')}</span>
            <Switch
              checked={design.showSectionDividers !== false}
              onChange={(checked) => updateDesignSettings({ showSectionDividers: checked })}
              aria-label={t('templates:showSectionDividers')}
            />
          </div>

          <TemplateSectionControls activeTemplate={activeTemplate} />
        </div>
      ),
    },
    {
      id: 'safety',
      title: t('customizationGroups.safety', { defaultValue: 'Safety & Diagnostics' }),
      icon: ShieldCheck,
      content: (
        <div className="space-y-3 pt-2">
          <SafeCustomizationGuard design={design} onApplySaferDefaults={handleApplySaferDefaults} />
          <ContentPressureMeter cvData={cvData} design={design} />
          <ContentCoverageMap cvData={cvData} onSelectSection={onSelectSection} />
          <TemplateDecisionPanel templateId={activeTemplate.id} />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-surface border border-border rounded-2xl p-4 space-y-4 shadow-2xs text-start">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <h3 className="text-sm font-bold text-foreground">
          {t('quickCustomizationTitle')}
        </h3>
      </div>

      <Accordion items={accordionItems} allowMultiple={false} defaultExpandedIds={['visual']} />
    </div>
  );
}
