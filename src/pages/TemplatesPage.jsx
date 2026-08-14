import { PageContainer } from '../components/layout/PageContainer';
import { TemplateStudioLayout } from '../features/templates/studio/components/TemplateStudioLayout';

/**
 * Resume Templates Studio Page Component.
 * Unified Template Studio Workbench for reviewing, customizing, evaluating, and selecting resume templates.
 */
export default function TemplatesPage() {
  return (
    <PageContainer className="py-4 md:py-6">
      <TemplateStudioLayout />
    </PageContainer>
  );
}
