import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTemplateStudio } from '../hooks/useTemplateStudio';
import { TemplateStudioHeader } from './TemplateStudioHeader';
import { TemplateStudioToolbar } from './TemplateStudioToolbar';
import { TemplateRail } from './TemplateRail';
import { TemplateWorkspace } from './TemplateWorkspace';
import { TemplateCompareTray } from './TemplateCompareTray';
import { TemplateMobileNavigation } from './TemplateMobileNavigation';
import { TemplateStickyActions } from './TemplateStickyActions';
import { TemplateDetailsDialog } from '../../components/TemplateDetailsDialog';
import { ChangeImpactPreview } from './ChangeImpactPreview';
import { ROUTE_PATHS } from '../../../../app/routePaths';
import { getTemplateName } from '../../registry/templateMetadata';

export function TemplateStudioLayout() {
  const navigate = useNavigate();

  const studio = useTemplateStudio();

  const [pendingChange, setPendingChange] = useState(null); // { type, targetId, targetName }

  function handleUseTemplateAndOpenBuilder(templateId) {
    const targetId = templateId || studio.selectedStudioTemplateId;
    studio.handleSelectTemplate(targetId);
    navigate(ROUTE_PATHS.BUILDER);
  }

  function handlePromptTemplateSwitch(targetId) {
    const targetName = getTemplateName(targetId);
    setPendingChange({
      type: 'switch-template',
      targetId,
      targetName,
    });
  }

  function handleConfirmPendingChange() {
    if (pendingChange?.type === 'switch-template') {
      studio.handleSelectTemplate(pendingChange.targetId);
    }
  }

  const activeTemplateName = getTemplateName(studio.activeStudioTemplate.id);

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Single Unified Header */}
      <TemplateStudioHeader
        currentTemplateId={studio.selectedStudioTemplateId}
        totalTemplates={studio.allTemplates.length}
        displayedCount={studio.filters.filteredTemplates.length}
      />

      {/* Toolbar (Search & Filters) */}
      <TemplateStudioToolbar
        searchQuery={studio.filters.searchQuery}
        onSearchChange={studio.filters.setSearchQuery}
        selectedCategory={studio.filters.selectedCategory}
        onCategoryChange={studio.filters.setSelectedCategory}
        selectedCompatibility={studio.filters.selectedCompatibility}
        onCompatibilityChange={studio.filters.setSelectedCompatibility}
        onClearFilters={studio.filters.clearFilters}
        hasActiveFilters={studio.filters.hasActiveFilters}
        appliedFilters={studio.filters.appliedFilters}
        onRemoveFilter={studio.filters.removeFilterChip}
      />

      {/* Mobile Navigation (3 Tabs) for screens < md */}
      <TemplateMobileNavigation
        activeTab={studio.mobileTab}
        onTabChange={studio.setMobileTab}
      />

      {/* Desktop Workbench (md+ 2-Column Grid) */}
      <div className="hidden md:grid md:grid-cols-12 gap-8 items-start">
        {/* Left Rail (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <TemplateCompareTray
            comparedTemplates={studio.comparison.comparedTemplates}
            comparedTemplateIds={studio.comparison.comparedTemplateIds}
            isCompareOpen={studio.isCompareOpen}
            onOpenCompare={() => studio.setIsCompareOpen(true)}
            onCloseCompare={() => studio.setIsCompareOpen(false)}
            onClearCompare={studio.comparison.clearComparison}
            onSelectTemplate={handlePromptTemplateSwitch}
          />

          <TemplateRail
            templates={studio.filters.filteredTemplates}
            selectedTemplateId={studio.selectedStudioTemplateId}
            comparedTemplateIds={studio.comparison.comparedTemplateIds}
            canCompare={studio.comparison.canAddMore}
            onSelectTemplate={handlePromptTemplateSwitch}
            onPreviewTemplate={studio.setActivePreviewTemplate}
            onToggleCompare={studio.comparison.toggleCompare}
            onClearFilters={studio.filters.clearFilters}
          />
        </div>

        {/* Right Workspace (7 cols - sticky) */}
        <div className="md:col-span-7 space-y-6 md:sticky md:top-20">
          <TemplateWorkspace
            activeTemplate={studio.activeStudioTemplate}
            cvData={studio.cvData}
            previewCvData={studio.previewCvData}
            isSampleData={studio.isSampleData}
            onFieldCommit={studio.updateByPath}
            recommendation={studio.recommendation.recommendation}
            userPreferences={studio.recommendation.userPreferences}
            onUpdatePreference={studio.recommendation.updatePreference}
            onApplyRecommendation={handlePromptTemplateSwitch}
            previewMode={studio.previewMode}
            onUseTemplate={handleUseTemplateAndOpenBuilder}
            onUndo={studio.undo}
            onRedo={studio.redo}
            canUndo={studio.canUndo}
            canRedo={studio.canRedo}
            onSelectSection={() => {}}
          />
        </div>
      </div>

      {/* Mobile Workflow View (< md screens) */}
      <div className="block md:hidden">
        {studio.mobileTab === 'templates' && (
          <div className="space-y-4">
            <TemplateCompareTray
              comparedTemplates={studio.comparison.comparedTemplates}
              comparedTemplateIds={studio.comparison.comparedTemplateIds}
              isCompareOpen={studio.isCompareOpen}
              onOpenCompare={() => studio.setIsCompareOpen(true)}
              onCloseCompare={() => studio.setIsCompareOpen(false)}
              onClearCompare={studio.comparison.clearComparison}
              onSelectTemplate={handlePromptTemplateSwitch}
            />

            <TemplateRail
              templates={studio.filters.filteredTemplates}
              selectedTemplateId={studio.selectedStudioTemplateId}
              comparedTemplateIds={studio.comparison.comparedTemplateIds}
              canCompare={studio.comparison.canAddMore}
              onSelectTemplate={handlePromptTemplateSwitch}
              onPreviewTemplate={studio.setActivePreviewTemplate}
              onToggleCompare={studio.comparison.toggleCompare}
              onClearFilters={studio.filters.clearFilters}
            />
          </div>
        )}

        {studio.mobileTab === 'preview' && (
          <div className="space-y-4">
            <TemplateWorkspace
              activeTemplate={studio.activeStudioTemplate}
              cvData={studio.cvData}
              previewCvData={studio.previewCvData}
              isSampleData={studio.isSampleData}
              onFieldCommit={studio.updateByPath}
              recommendation={studio.recommendation.recommendation}
              userPreferences={studio.recommendation.userPreferences}
              onUpdatePreference={studio.recommendation.updatePreference}
              onApplyRecommendation={handlePromptTemplateSwitch}
              previewMode={studio.previewMode}
              onUseTemplate={handleUseTemplateAndOpenBuilder}
              onUndo={studio.undo}
              onRedo={studio.redo}
              canUndo={studio.canUndo}
              canRedo={studio.canRedo}
              onSelectSection={() => {}}
            />
          </div>
        )}

        {studio.mobileTab === 'customize' && (
          <div className="space-y-4">
            <TemplateWorkspace
              activeTemplate={studio.activeStudioTemplate}
              cvData={studio.cvData}
              previewCvData={studio.previewCvData}
              isSampleData={studio.isSampleData}
              onFieldCommit={studio.updateByPath}
              recommendation={studio.recommendation.recommendation}
              userPreferences={studio.recommendation.userPreferences}
              onUpdatePreference={studio.recommendation.updatePreference}
              onApplyRecommendation={handlePromptTemplateSwitch}
              previewMode={studio.previewMode}
              onUseTemplate={handleUseTemplateAndOpenBuilder}
              onUndo={studio.undo}
              onRedo={studio.redo}
              canUndo={studio.canUndo}
              canRedo={studio.canRedo}
              onSelectSection={() => {}}
            />
          </div>
        )}
      </div>

      {/* Mobile Bottom Sticky Actions (< md screens) */}
      <div className="block md:hidden">
        <TemplateStickyActions
          activeTemplateId={studio.activeStudioTemplate.id}
          activeTemplateName={activeTemplateName}
          onUseTemplate={handleUseTemplateAndOpenBuilder}
          onUndo={studio.undo}
          onRedo={studio.redo}
          canUndo={studio.canUndo}
          canRedo={studio.canRedo}
          isMobile={true}
        />
      </div>

      {/* Template Details Modal */}
      <TemplateDetailsDialog
        template={studio.activePreviewTemplate}
        isOpen={Boolean(studio.activePreviewTemplate)}
        onClose={() => studio.setActivePreviewTemplate(null)}
        onSelect={handlePromptTemplateSwitch}
      />

      {/* Change Impact Modal */}
      <ChangeImpactPreview
        isOpen={Boolean(pendingChange)}
        onClose={() => setPendingChange(null)}
        onConfirm={handleConfirmPendingChange}
        actionType={pendingChange?.type}
        targetName={pendingChange?.targetName}
      />
    </div>
  );
}
