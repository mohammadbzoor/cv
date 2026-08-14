import { TemplateCard } from './TemplateCard';
import { TemplateStudioEmptyState } from './TemplateStudioEmptyState';

export function TemplateRail({
  templates = [],
  selectedTemplateId,
  comparedTemplateIds = [],
  canCompare,
  onSelectTemplate,
  onPreviewTemplate,
  onToggleCompare,
  onClearFilters,
}) {
  if (templates.length === 0) {
    return <TemplateStudioEmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={template.id === selectedTemplateId}
            isCompared={comparedTemplateIds.includes(template.id)}
            canCompare={canCompare || comparedTemplateIds.includes(template.id)}
            onSelect={onSelectTemplate}
            onPreview={onPreviewTemplate}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>
    </div>
  );
}
