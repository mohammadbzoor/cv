import { getTemplateById } from '../registry/templateRegistry';
import { getTemplateDesignVariables } from '../design/utils/getTemplateDesignVariables';

/**
 * Universal Template Renderer Component.
 * Resolves template component via Registry and renders with standardized props.
 */
export function TemplateRenderer({
  templateId,
  cvData,
  design,
  editable = true,
  onFieldCommit,
  className = '',
}) {
  const definition = getTemplateById(templateId);
  const TemplateComponent = definition.component;
  const effectiveDesign = design || cvData?.design;
  const designVariables = getTemplateDesignVariables(effectiveDesign, definition);

  return (
    <div 
      className={`w-full max-w-full overflow-hidden ${className}`}
      style={designVariables}
    >
      <TemplateComponent
        cvData={cvData}
        design={effectiveDesign}
        editable={editable}
        onFieldCommit={onFieldCommit}
      />
    </div>
  );
}
