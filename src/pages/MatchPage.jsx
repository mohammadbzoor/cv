import { Target } from 'lucide-react';
import { FeaturePlaceholder } from '../features/shared/components/FeaturePlaceholder';

export default function MatchPage() {
  return (
    <FeaturePlaceholder
      titleKey="pages:match.title"
      descriptionKey="pages:match.description"
      icon={Target}
    />
  );
}
