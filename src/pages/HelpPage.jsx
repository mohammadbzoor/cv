import { HelpCircle } from 'lucide-react';
import { FeaturePlaceholder } from '../features/shared/components/FeaturePlaceholder';

export default function HelpPage() {
  return (
    <FeaturePlaceholder
      titleKey="pages:help.title"
      descriptionKey="pages:help.description"
      icon={HelpCircle}
    />
  );
}
