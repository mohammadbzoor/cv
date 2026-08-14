import { getTemplateById } from '../registry/templateRegistry';

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

  return (
    <div className={`w-full max-w-full overflow-hidden ${className}`}>
      <TemplateComponent
        cvData={cvData}
        design={design || cvData?.design}
        editable={editable}
        onFieldCommit={onFieldCommit}
      />
    </div>
  );
}
