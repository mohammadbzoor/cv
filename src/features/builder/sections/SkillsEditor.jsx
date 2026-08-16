import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectSkills } from '../../cv/store/cvSelectors';
import { createSkill } from '../../cv/models/cvFactories';
import { SUPPORTED_SKILL_LEVELS } from '../../cv/models/cvConstants';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Button } from '../../../components/ui/Button';

export function SkillsEditor() {
  const skills = useCVStore(selectSkills) || [];
  const addSkill = useCVStore((state) => state.addSkill);
  const updateSkill = useCVStore((state) => state.updateSkill);
  const removeSkill = useCVStore((state) => state.removeSkill);

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.id} className="relative bg-surface-muted border border-border p-3 md:p-4 rounded-xl space-y-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeSkill(skill.id)}
            className="absolute top-2 right-2 h-8 w-8 p-0 text-error hover:bg-error-subtle/50"
            title="Remove Category"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </Button>
          
          <div className="pr-8 space-y-3">
            <div>
              <Input
                placeholder="Category Title (e.g. Frontend Development)"
                value={skill.category || ''}
                onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
              />
            </div>
            <div>
              <Textarea
                placeholder="Skills (e.g. React.js, JavaScript, HTML5)"
                value={skill.name || ''}
                onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                lang="en"
                dir="ltr"
                rows={2}
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        leadingIcon={Plus}
        onClick={() => addSkill(createSkill())}
        className="w-full border-dashed"
      >
        + Add Skill Category
      </Button>
    </div>
  );
}
