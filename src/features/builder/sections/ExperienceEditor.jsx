import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectExperiences } from '../../cv/store/cvSelectors';
import { createExperience } from '../../cv/models/cvFactories';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Button } from '../../../components/ui/Button';

export function ExperienceEditor() {
  const experiences = useCVStore(selectExperiences) || [];
  const addExperience = useCVStore((state) => state.addExperience);
  const updateExperience = useCVStore((state) => state.updateExperience);
  const removeExperience = useCVStore((state) => state.removeExperience);
  const reorderExperiences = useCVStore((state) => state.reorderExperiences);

  function handleAdd() {
    addExperience(createExperience());
  }

  function handleMove(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;
    const updated = [...experiences];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    reorderExperiences(updated.map((item) => item.id));
  }

  return (
    <div className="space-y-4">
      {experiences.map((exp, index) => (
        <div key={exp.id} className="bg-surface-muted border border-border p-3.5 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-xs font-bold text-foreground truncate">
              {exp.position || 'New Position'} {exp.company && `@ ${exp.company}`}
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
                disabled={index === experiences.length - 1}
                onClick={() => handleMove(index, 1)}
                className="h-6 w-6 p-0"
              >
                <ArrowDown className="w-3 h-3" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
                className="h-6 w-6 p-0 text-error hover:bg-error-subtle"
              >
                <Trash2 className="w-3 h-3" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Input
              label="Position"
              value={exp.position || ''}
              onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
              lang="en"
              dir="ltr"
            />
            <Input
              label="Company"
              value={exp.company || ''}
              onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
              lang="en"
              dir="ltr"
            />
            <Input
              label="Location"
              value={exp.location || ''}
              onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
              lang="en"
              dir="ltr"
            />
            <Input
              label="Start Date"
              type="month"
              value={exp.startDate || ''}
              onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
              lang="en"
              dir="ltr"
            />
            <Input
              label="End Date"
              type="month"
              disabled={exp.isCurrent}
              value={exp.endDate || ''}
              onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
              lang="en"
              dir="ltr"
            />
            <div className="pt-6">
              <Checkbox
                label="Current Role"
                checked={Boolean(exp.isCurrent)}
                onChange={(e) =>
                  updateExperience(exp.id, {
                    isCurrent: e.target.checked,
                    endDate: e.target.checked ? '' : exp.endDate,
                  })
                }
              />
            </div>
          </div>

          <Textarea
            label="Description"
            rows={2}
            value={exp.description || ''}
            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
            lang="en"
            dir="ltr"
          />
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
        + Add Work Experience
      </Button>
    </div>
  );
}
