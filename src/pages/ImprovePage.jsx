import { TrendingUp } from 'lucide-react';
import { FeaturePlaceholder } from '../features/shared/components/FeaturePlaceholder';

export default function ImprovePage() {
  return (
    <FeaturePlaceholder
      titleKey="pages:improve.title"
      descriptionKey="pages:improve.description"
      icon={TrendingUp}
    />
  );
}
