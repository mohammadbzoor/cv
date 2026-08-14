import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectEducation } from '../../cv/store/cvSelectors';
import { createEducation } from '../../cv/models/cvFactories';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export function EducationEditor() {
  const education = useCVStore(selectEducation) || [];
  const addEducation = useCVStore((state) => state.addEducation);
  const updateEducation = useCVStore((state) => state.updateEducation);
  const removeEducation = useCVStore((state) => state.removeEducation);
  const reorderEducation = useCVStore((state) => state.reorderEducation);

  function handleAdd() {
    addEducation(createEducation());
  }

  function handleMove(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= education.length) return;
    const updated = [...education];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    reorderEducation(updated.map((item) => item.id));
  }

  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <div key={edu.id} className="bg-surface-muted border border-border p-3.5 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-xs font-bold text-foreground truncate">
              {edu.degree || 'New Degree'} {edu.institution && `@ ${edu.institution}`}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={index === 0}
                onClick={() => handleMove(index, -1)}
                className="h-6 w-6 p-0"
              >
                <ArrowUp className="w-3 h-3" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={index === education.length - 1}
                onClick={() => handleMove(index, 1)}
                className="h-6 w-6 p-0"
              >
                <ArrowDown className="w-3 h-3" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="h-6 w-6 p-0 text-error hover:bg-error-subtle"
              >
                <Trash2 className="w-3 h-3" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Input
              label="Institution"
              value={edu.institution || ''}
              onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
              lang="en"
              dir="ltr"
            />
            <Input
              label="Degree"
              value={edu.degree || ''}
              onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
              lang="en"
              dir="ltr"
            />
            <Input
              label="Field of Study"
              value={edu.field || ''}
              onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
              lang="en"
              dir="ltr"
            />
            <Input
              label="Start Date"
              type="month"
              value={edu.startDate || ''}
              onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
              lang="en"
              dir="ltr"
            />
            <Input
              label="End Date"
              type="month"
              value={edu.endDate || ''}
              onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
              lang="en"
              dir="ltr"
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        leadingIcon={Plus}
        onClick={handleAdd}
        className="w-full border-dashed"
      >
        + Add Education Entry
      </Button>
    </div>
  );
}
