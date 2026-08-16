import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTemplateStudio } from '../hooks/useTemplateStudio';
import { TemplateStudioHeader } from './TemplateStudioHeader';
import { TemplateStudioToolbar } from './TemplateStudioToolbar';
import { TemplateCard } from './TemplateCard';
import { TemplateCompareTray } from './TemplateCompareTray';
import { TemplateDetailsDialog } from '../../components/TemplateDetailsDialog';
import { ChangeImpactPreview } from './ChangeImpactPreview';
import { ROUTE_PATHS } from '../../../../app/routePaths';
import { getTemplateName } from '../../registry/templateMetadata';

export function TemplateStudioLayout() {
  const { t } = useTranslation('templates');
  const navigate = useNavigate();
  const studio = useTemplateStudio();

  const [pendingChange, setPendingChange] = useState(null); // { type, targetId, targetName }

  function handleSelectAndOpenBuilder(templateId) {
    const targetId = templateId || studio.selectedStudioTemplateId;
    studio.handleSelectTemplate(targetId);
    navigate(ROUTE_PATHS.BUILDER_NEW);
  }

  function handlePromptTemplateSwitch(targetId) {
    const targetName = getTemplateName(targetId);
    if (targetId === studio.selectedStudioTemplateId) return; // No change needed
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

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Single Unified Header */}
      <TemplateStudioHeader
        currentTemplateId={studio.selectedStudioTemplateId}
        totalTemplates={studio.allTemplates.length}
        displayedCount={studio.filters.filteredTemplates.length}
        onOpenBuilder={() => navigate(ROUTE_PATHS.BUILDER_NEW)}
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
        resultsCount={studio.filters.filteredTemplates.length}
      />

      {/* Template Grid */}
      {studio.filters.filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {studio.filters.filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={template.id === studio.selectedStudioTemplateId}
              isCompared={studio.comparison.comparedTemplateIds.includes(template.id)}
              onSelect={handlePromptTemplateSwitch}
              onPreview={studio.setActivePreviewTemplate}
              onToggleCompare={studio.comparison.toggleCompare}
              canCompare={studio.comparison.canAddMore}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-surface border border-border rounded-2xl text-center shadow-2xs">
          <div className="w-16 h-16 bg-surface-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl opacity-50">🔍</span>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">{t('noResults')}</h3>
          <p className="text-sm text-foreground-secondary mb-6 max-w-sm mx-auto">
            {t('noResultsDescription', { defaultValue: 'Try adjusting your filters or search query.' })}
          </p>
          <button
            onClick={studio.filters.clearFilters}
            className="text-primary hover:text-primary-hover font-semibold text-sm underline"
          >
            {t('clearFilters')}
          </button>
        </div>
      )}

      {/* Floating Compare Tray */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-xl shadow-xl">
        <TemplateCompareTray
          comparedTemplates={studio.comparison.comparedTemplates}
          comparedTemplateIds={studio.comparison.comparedTemplateIds}
          isCompareOpen={studio.isCompareOpen}
          onOpenCompare={() => studio.setIsCompareOpen(true)}
          onCloseCompare={() => studio.setIsCompareOpen(false)}
          onClearCompare={studio.comparison.clearComparison}
          onSelectTemplate={handlePromptTemplateSwitch}
        />
      </div>

      {/* Template Details Modal */}
      <TemplateDetailsDialog
        template={studio.activePreviewTemplate}
        isOpen={Boolean(studio.activePreviewTemplate)}
        onClose={() => studio.setActivePreviewTemplate(null)}
        onSelect={handlePromptTemplateSwitch}
        onSelectAndOpenBuilder={handleSelectAndOpenBuilder}
      />

      {/* Change Impact Modal (only for switching to a different template) */}
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
