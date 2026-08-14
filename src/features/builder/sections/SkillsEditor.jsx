import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectSkills } from '../../cv/store/cvSelectors';
import { createSkill } from '../../cv/models/cvFactories';
import { SUPPORTED_SKILL_LEVELS } from '../../cv/models/cvConstants';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';

export function SkillsEditor() {
  const skills = useCVStore(selectSkills) || [];
  const addSkill = useCVStore((state) => state.addSkill);
  const updateSkill = useCVStore((state) => state.updateSkill);
  const removeSkill = useCVStore((state) => state.removeSkill);

  const levelOptions = [
    { value: '', label: 'Optional Level' },
    ...SUPPORTED_SKILL_LEVELS.map((lvl) => ({
      value: lvl,
      label: lvl.charAt(0).toUpperCase() + lvl.slice(1),
    })),
  ];

  return (
    <div className="space-y-3">
      {skills.map((skill) => (
        <div key={skill.id} className="flex items-center gap-2 bg-surface-muted border border-border p-2 rounded-xl">
          <div className="flex-1 grid grid-cols-2 gap-2">
            <Input
              placeholder="Skill Name"
              value={skill.name || ''}
              onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
              lang="en"
              dir="ltr"
            />
            <Select
              options={levelOptions}
              value={skill.level || ''}
              onChange={(e) => updateSkill(skill.id, { level: e.target.value })}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeSkill(skill.id)}
            className="h-8 w-8 p-0 text-error shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
          </Button>
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
        + Add Skill
      </Button>
    </div>
  );
}
