import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutTemplate, Sliders, Scale, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectCVData, selectTemplateId } from '../../cv/store/cvSelectors';
import { getAvailableTemplates, getTemplateById } from '../registry/templateRegistry';
import { TEMPLATE_CATEGORIES } from '../constants/templateConstants';
import { getPreviewCvData } from '../data/sampleCvData';
import { TemplateStudioHeader } from './TemplateStudioHeader';
import { TemplateStudioControls } from './TemplateStudioControls';
import { TemplateCard } from './TemplateCard';
import { TemplateLivePreview } from './TemplateLivePreview';
import { TemplateQuickCustomization } from './TemplateQuickCustomization';
import { TemplateComparisonDialog } from './TemplateComparisonDialog';
import { TemplateDetailsDialog } from './TemplateDetailsDialog';
import { TemplateEmptyState } from './TemplateEmptyState';
import { ROUTE_PATHS } from '../../../app/routePaths';
import { Button } from '../../../components/ui/Button';
import { useLanguage } from '../../../hooks/useLanguage';

export function TemplateGallery() {
  const { t } = useTranslation('templates');
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const ActionArrow = isRTL ? ArrowLeft : ArrowRight;

  const cvData = useCVStore(selectCVData);
  const currentStoreTemplateId = useCVStore(selectTemplateId);
  const setTemplate = useCVStore((state) => state.setTemplate);
  const updateByPath = useCVStore((state) => state.updateByPath);

  // Local state for Studio (never persists filters or search in Zustand)
  const [selectedStudioTemplateId, setSelectedStudioTemplateId] = useState(
    () => currentStoreTemplateId || 'technical-prime-ats'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(TEMPLATE_CATEGORIES.ALL);
  const [selectedCompatibility, setSelectedCompatibility] = useState('all');
  const [comparedTemplateIds, setComparedTemplateIds] = useState([]);
  const [activePreviewTemplate, setActivePreviewTemplate] = useState(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const allTemplates = getAvailableTemplates();

  // Resolved active template definition
  const activeStudioTemplate = useMemo(() => {
    return getTemplateById(selectedStudioTemplateId);
  }, [selectedStudioTemplateId]);

  // Preview CV Data (User CV data or safe sample CV data)
  const { data: previewCvData, isSample: isSampleData } = useMemo(() => {
    return getPreviewCvData(cvData);
  }, [cvData]);

  // Filter templates locally based on search, category, compatibility
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((item) => {
      const name = t(item.nameKey, { defaultValue: item.id }).toLowerCase();
      const desc = t(item.descriptionKey, { defaultValue: '' }).toLowerCase();
      const roles = (item.recommendedFor || []).join(' ').toLowerCase();
      const q = searchQuery.trim().toLowerCase();

      const matchesSearch =
        !q || name.includes(q) || desc.includes(q) || roles.includes(q) || item.category.includes(q);

      const matchesCategory =
        selectedCategory === TEMPLATE_CATEGORIES.ALL || item.category === selectedCategory;

      const matchesCompatibility =
        selectedCompatibility === 'all' || item.compatibilityLevel === selectedCompatibility;

      return matchesSearch && matchesCategory && matchesCompatibility;
    });
  }, [allTemplates, searchQuery, selectedCategory, selectedCompatibility, t]);

  const hasActiveFilters = Boolean(
    searchQuery || selectedCategory !== TEMPLATE_CATEGORIES.ALL || selectedCompatibility !== 'all'
  );

  function handleClearFilters() {
    setSearchQuery('');
    setSelectedCategory(TEMPLATE_CATEGORIES.ALL);
    setSelectedCompatibility('all');
  }

  function handleSelectStudioTemplate(templateId) {
    setSelectedStudioTemplateId(templateId);
    setTemplate(templateId);
  }

  function handleUseTemplateAndOpenBuilder(templateId) {
    const targetId = templateId || selectedStudioTemplateId;
    setTemplate(targetId);
    navigate(ROUTE_PATHS.BUILDER);
  }

  function handleToggleCompare(templateId) {
    setComparedTemplateIds((prev) => {
      if (prev.includes(templateId)) {
        return prev.filter((id) => id !== templateId);
      }
      if (prev.length >= 2) {
        return [prev[1], templateId];
      }
      return [...prev, templateId];
    });
  }

  const comparedTemplates = useMemo(() => {
    return comparedTemplateIds.map((id) => getTemplateById(id)).filter(Boolean);
  }, [comparedTemplateIds]);

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <TemplateStudioHeader
        currentTemplateId={selectedStudioTemplateId}
        totalTemplates={allTemplates.length}
        displayedCount={filteredTemplates.length}
      />

      {/* Controls Bar */}
      <TemplateStudioControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedCompatibility={selectedCompatibility}
        onCompatibilityChange={setSelectedCompatibility}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Main Studio 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery & Customization (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Comparison Bar Notice */}
          {comparedTemplateIds.length > 0 && (
            <div className="p-3 bg-secondary-subtle/70 border border-secondary/20 rounded-xl flex items-center justify-between gap-3 text-xs">
              <span>{t('compareSelectedCount', { count: comparedTemplateIds.length })}</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="xs"
                  leadingIcon={Scale}
                  onClick={() => setIsCompareOpen(true)}
                  disabled={comparedTemplateIds.length < 2}
                >
                  {t('openComparison')}
                </Button>
                <button
                  type="button"
                  onClick={() => setComparedTemplateIds([])}
                  className="text-foreground-secondary hover:text-foreground underline text-[11px]"
                >
                  {t('clearComparison')}
                </button>
              </div>
            </div>
          )}

          {/* Templates Grid */}
          {filteredTemplates.length === 0 ? (
            <TemplateEmptyState onClearFilters={handleClearFilters} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={template.id === selectedStudioTemplateId}
                  isCompared={comparedTemplateIds.includes(template.id)}
                  canCompare={comparedTemplateIds.length < 2 || comparedTemplateIds.includes(template.id)}
                  onSelect={handleSelectStudioTemplate}
                  onPreview={setActivePreviewTemplate}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
          )}

          {/* Quick Customization Accordion */}
          <TemplateQuickCustomization activeTemplate={activeStudioTemplate} />
        </div>

        {/* Right Column: Sticky Live Preview & Action Bar (7 cols) */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-20">
          <TemplateLivePreview
            activeTemplate={activeStudioTemplate}
            cvData={previewCvData}
            isSampleData={isSampleData}
            onFieldCommit={(path, val) => updateByPath(path, val)}
          />

          {/* Bottom Sticky Action Bar */}
          <div className="p-4 bg-surface border border-border rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="text-start space-y-0.5">
              <div className="text-xs font-bold text-foreground">
                {t('selectedTemplateLabel')}: <span className="text-primary">{activeStudioTemplate.id}</span>
              </div>
              <div className="text-[11px] text-foreground-secondary">
                {t('preservesDataNotice')}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="primary"
                size="md"
                leadingIcon={Sliders}
                trailingIcon={ActionArrow}
                onClick={() => handleUseTemplateAndOpenBuilder(selectedStudioTemplateId)}
              >
                {t('useTemplateAndOpenBuilder')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      <TemplateComparisonDialog
        templates={comparedTemplates}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onSelect={handleSelectStudioTemplate}
      />

      {/* Template Details Modal */}
      <TemplateDetailsDialog
        template={activePreviewTemplate}
        isOpen={Boolean(activePreviewTemplate)}
        onClose={() => setActivePreviewTemplate(null)}
        onSelect={handleSelectStudioTemplate}
      />
    </div>
  );
}
