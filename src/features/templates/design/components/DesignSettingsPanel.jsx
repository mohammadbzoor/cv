import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutTemplate, Palette, Maximize, Columns, ShieldAlert, Sparkles, RotateCcw } from 'lucide-react';
import { useCVStore } from '../../../cv/store/useCVStore';
import { selectDesignSettings, selectTemplateId, selectCVData } from '../../../cv/store/cvSelectors';
import { getAvailableTemplates, getTemplateById } from '../../registry/templateRegistry';
import { DESIGN_PRESETS, getPresetSettings } from '../utils/applyDesignPreset';

import { Button } from '../../../../components/ui/Button';
import { Select } from '../../../../components/ui/Select';
import { StyleSettings } from './StyleSettings';
import { SpacingSettings } from './SpacingSettings';
import { StructureSettings } from './StructureSettings';
import { SafetySettings } from './SafetySettings';
import { DesignDifferencePreview } from './DesignDifferencePreview';

export function DesignSettingsPanel({ onBrowseTemplates }) {
  const { t } = useTranslation(['builder', 'templates', 'common']);
  
  const design = useCVStore(selectDesignSettings) || {};
  const templateId = useCVStore(selectTemplateId);
  const cvData = useCVStore(selectCVData);
  const updateDesignSettings = useCVStore((state) => state.updateDesignSettings);
  const applyDesignSettingsPatch = useCVStore((state) => state.applyDesignSettingsPatch);
  const setTemplate = useCVStore((state) => state.setTemplate);

  const [activeTab, setActiveTab] = useState('style'); // style, spacing, structure, safety, presets
  const [pendingDesign, setPendingDesign] = useState(null); // Used for difference preview
  const [previewTitle, setPreviewTitle] = useState('');

  const availableTemplates = getAvailableTemplates();
  const templateOptions = availableTemplates.map((item) => ({
    value: item.id,
    label: t(item.nameKey, { defaultValue: item.id }),
  }));

  const presetOptions = [
    { value: '', label: t('templates:selectPreset', { defaultValue: 'Select a preset...' }) },
    ...Object.entries(DESIGN_PRESETS).map(([key, preset]) => ({
      value: key,
      label: preset.name, // would use translation in real app
    }))
  ];

  const handleApplyPreset = (presetId) => {
    if (!presetId) return;
    const settings = getPresetSettings(presetId);
    if (settings) {
      setPreviewTitle(t('templates:applyPreset', { name: DESIGN_PRESETS[presetId].name }));
      setPendingDesign(settings);
    }
  };

  const handleApplySaferDefaults = (saferDesign) => {
    setPreviewTitle(t('templates:safety.applySaferDefaults'));
    setPendingDesign(saferDesign);
  };

  const handleResetTemplateStyle = () => {
    const templateDef = getTemplateById(templateId);
    if (templateDef && templateDef.defaultDesign) {
      setPreviewTitle(t('templates:resetTemplateStyle'));
      setPendingDesign(templateDef.defaultDesign);
    }
  };

  const handleConfirmApply = () => {
    if (pendingDesign) {
      applyDesignSettingsPatch(pendingDesign);
      setPendingDesign(null);
    }
  };

  const handleCancelApply = () => {
    setPendingDesign(null);
  };

  const tabs = [
    { id: 'presets', icon: Sparkles, label: t('templates:presets', { defaultValue: 'Presets' }) },
    { id: 'style', icon: Palette, label: t('builder:designSettings.style', { defaultValue: 'Style' }) },
    { id: 'spacing', icon: Maximize, label: t('builder:designSettings.spacing', { defaultValue: 'Spacing' }) },
    { id: 'structure', icon: Columns, label: t('builder:designSettings.structure', { defaultValue: 'Structure' }) },
    { id: 'safety', icon: ShieldAlert, label: t('templates:safety.title', { defaultValue: 'Safety' }) },
  ];

  if (pendingDesign) {
    return (
      <div className="p-4 space-y-4">
        <DesignDifferencePreview
          oldDesign={design}
          newDesign={{ ...design, ...pendingDesign }}
          title={previewTitle}
          onApply={handleConfirmApply}
          onCancel={handleCancelApply}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden text-start">
      <div className="p-4 border-b border-border/60 shrink-0 space-y-3">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
          {t('builder:design')}
        </h3>
        
        {/* Active Template Select */}
        <div className="space-y-2">
          <Select
            options={templateOptions}
            value={templateId || 'technical-prime-ats'}
            onChange={(e) => setTemplate(e.target.value)}
          />
          {onBrowseTemplates && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              leadingIcon={LayoutTemplate}
              onClick={onBrowseTemplates}
              className="w-full text-xs"
            >
              {t('templates:browseTemplates')}
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-border/60 shrink-0 scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                isActive 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-foreground-secondary hover:text-foreground hover:bg-surface-hover'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'presets' && (
          <div className="space-y-4">
            <Select
              label={t('templates:choosePreset', { defaultValue: 'Choose a Theme Preset' })}
              options={presetOptions}
              value=""
              onChange={(e) => handleApplyPreset(e.target.value)}
            />
            <p className="text-xs text-foreground-secondary">
              {t('templates:presetHelp', { defaultValue: 'Presets apply safe combinations of spacing, fonts, and structures at once. They do not overwrite your content.' })}
            </p>
          </div>
        )}

        {activeTab === 'style' && (
          <StyleSettings design={design} onChange={updateDesignSettings} />
        )}
        
        {activeTab === 'spacing' && (
          <SpacingSettings design={design} onChange={updateDesignSettings} />
        )}

        {activeTab === 'structure' && (
          <StructureSettings design={design} onChange={updateDesignSettings} />
        )}

        {activeTab === 'safety' && (
          <SafetySettings cvData={cvData} onApplySafeDefaults={handleApplySaferDefaults} />
        )}
      </div>

      <div className="p-3 border-t border-border/60 shrink-0">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          leadingIcon={RotateCcw}
          onClick={handleResetTemplateStyle}
          className="w-full text-xs"
        >
          {t('templates:resetTemplateStyle', { defaultValue: 'Reset to Template Defaults' })}
        </Button>
      </div>
    </div>
  );
}
