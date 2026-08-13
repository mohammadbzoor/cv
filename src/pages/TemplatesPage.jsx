import { LayoutTemplate } from 'lucide-react';
import { FeaturePlaceholder } from '../features/shared/components/FeaturePlaceholder';

export default function TemplatesPage() {
  return (
    <FeaturePlaceholder
      titleKey="pages:templates.title"
      descriptionKey="pages:templates.description"
      icon={LayoutTemplate}
    />
  );
}
