import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectTemplateId } from '../../cv/store/cvSelectors';
import { getAvailableTemplates } from '../registry/templateRegistry';
import { filterTemplates } from '../utils/filterTemplates';
import { TEMPLATE_CATEGORIES } from '../constants/templateConstants';
import { TemplateFilters } from './TemplateFilters';
import { TemplateCard } from './TemplateCard';
import { TemplateDetailsDialog } from './TemplateDetailsDialog';
import { TemplateEmptyState } from './TemplateEmptyState';
import { ROUTE_PATHS } from '../../../app/routePaths';

export function TemplateGallery() {
  const { t } = useTranslation('templates');
  const navigate = useNavigate();

  const currentTemplateId = useCVStore(selectTemplateId);
  const setTemplate = useCVStore((state) => state.setTemplate);

  const [selectedCategory, setSelectedCategory] = useState(TEMPLATE_CATEGORIES.ALL);
  const [activePreviewTemplate, setActivePreviewTemplate] = useState(null);

  const allTemplates = getAvailableTemplates();
  const displayedTemplates = filterTemplates(allTemplates, selectedCategory);

  function handleSelectTemplate(templateId) {
    setTemplate(templateId);
    navigate(ROUTE_PATHS.BUILDER);
  }

  return (
    <div className="space-y-6">
      {/* ATS Disclaimer Banner */}
      <div className="p-4 bg-primary-subtle border border-primary/20 rounded-xl text-xs text-primary flex items-start gap-3 shadow-2xs">
        <Info className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-0.5">
          <strong className="font-bold block">ATS Parsing Notice</strong>
          <p className="text-foreground-secondary">{t('atsDisclaimer')}</p>
        </div>
      </div>

      {/* Category Filters Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <TemplateFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <span className="text-xs text-foreground-secondary font-semibold">
          Showing {displayedTemplates.length} of {allTemplates.length} templates
        </span>
      </div>

      {/* Templates Grid */}
      {displayedTemplates.length === 0 ? (
        <TemplateEmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={template.id === currentTemplateId}
              onSelect={handleSelectTemplate}
              onPreview={setActivePreviewTemplate}
            />
          ))}
        </div>
      )}

      {/* Template Details Modal */}
      <TemplateDetailsDialog
        template={activePreviewTemplate}
        isOpen={Boolean(activePreviewTemplate)}
        onClose={() => setActivePreviewTemplate(null)}
        onSelect={handleSelectTemplate}
      />
    </div>
  );
}
