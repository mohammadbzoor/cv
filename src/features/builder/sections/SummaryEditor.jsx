import { useCVStore } from '../../cv/store/useCVStore';
import { selectCVData } from '../../cv/store/cvSelectors';
import { Textarea } from '../../../components/ui/Textarea';

export function SummaryEditor() {
  const cvData = useCVStore(selectCVData);
  const updateField = useCVStore((state) => state.updateField);

  return (
    <div className="space-y-3">
      <Textarea
        label="Professional Summary"
        value={cvData?.summary || ''}
        onChange={(e) => updateField('summary', e.target.value)}
        rows={5}
        maxLength={1000}
        showCount
        lang="en"
        dir="ltr"
      />
    </div>
  );
}
