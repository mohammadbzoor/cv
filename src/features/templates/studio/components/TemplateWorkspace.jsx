import { TemplateRecommendation } from './TemplateRecommendation';
import { TemplateLivePreview } from './TemplateLivePreview';
import { TemplateQuickCustomize } from './TemplateQuickCustomize';
import { TemplateStickyActions } from './TemplateStickyActions';
import { getTemplateName } from '../../registry/templateMetadata';

export function TemplateWorkspace({
  activeTemplate,
  cvData,
  previewCvData,
  isSampleData,
  onFieldCommit,
  recommendation,
  userPreferences,
  onUpdatePreference,
  onApplyRecommendation,
  previewMode,
  onUseTemplate,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onSelectSection,
}) {
  const activeTemplateName = getTemplateName(activeTemplate.id);

  return (
    <div className="space-y-6 text-start">
      {/* Smart Template Fit Panel */}
      <TemplateRecommendation
        userPreferences={userPreferences}
        onUpdatePreference={onUpdatePreference}
        recommendation={recommendation}
        onApplyRecommendation={onApplyRecommendation}
        activeTemplateId={activeTemplate.id}
      />

      {/* Large Live Preview */}
      <TemplateLivePreview
        activeTemplate={activeTemplate}
        cvData={previewCvData}
        isSampleData={isSampleData}
        onFieldCommit={onFieldCommit}
        previewMode={previewMode}
      />

      {/* Quick Customization */}
      <TemplateQuickCustomize
        activeTemplate={activeTemplate}
        cvData={cvData}
        onSelectSection={onSelectSection}
      />

      {/* Contextual Desktop Action Bar */}
      <TemplateStickyActions
        activeTemplateId={activeTemplate.id}
        activeTemplateName={activeTemplateName}
        onUseTemplate={onUseTemplate}
        onUndo={onUndo}
        onRedo={onRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        isMobile={false}
      />
    </div>
  );
}
