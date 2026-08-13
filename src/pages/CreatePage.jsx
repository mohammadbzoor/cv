import { PlusCircle } from 'lucide-react';
import { FeaturePlaceholder } from '../features/shared/components/FeaturePlaceholder';

export default function CreatePage() {
  return (
    <FeaturePlaceholder
      titleKey="pages:create.title"
      descriptionKey="pages:create.description"
      icon={PlusCircle}
    />
  );
}
