import { FileCheck } from 'lucide-react';
import { FeaturePlaceholder } from '../features/shared/components/FeaturePlaceholder';

export default function AnalyzePage() {
  return (
    <FeaturePlaceholder
      titleKey="pages:analyze.title"
      descriptionKey="pages:analyze.description"
      icon={FileCheck}
    />
  );
}
