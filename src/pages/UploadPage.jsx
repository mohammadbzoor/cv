import { Upload } from 'lucide-react';
import { FeaturePlaceholder } from '../features/shared/components/FeaturePlaceholder';

export default function UploadPage() {
  return (
    <FeaturePlaceholder
      titleKey="pages:upload.title"
      descriptionKey="pages:upload.description"
      icon={Upload}
    />
  );
}
