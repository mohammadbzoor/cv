import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectLanguages } from '../../cv/store/cvSelectors';
import { createLanguage } from '../../cv/models/cvFactories';
import { SUPPORTED_PROFICIENCY_LEVELS } from '../../cv/models/cvConstants';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';

export function LanguagesEditor() {
  const languages = useCVStore(selectLanguages) || [];
  const addLanguage = useCVStore((state) => state.addLanguage);
  const updateLanguage = useCVStore((state) => state.updateLanguage);
  const removeLanguage = useCVStore((state) => state.removeLanguage);

  const proficiencyOptions = SUPPORTED_PROFICIENCY_LEVELS.map((lvl) => ({
    value: lvl,
    label: lvl.charAt(0).toUpperCase() + lvl.slice(1),
  }));

  return (
    <div className="space-y-3">
      {languages.map((lang) => (
        <div key={lang.id} className="flex items-center gap-2 bg-surface-muted border border-border p-2 rounded-xl">
          <div className="flex-1 grid grid-cols-2 gap-2">
            <Input
              placeholder="Language"
              value={lang.name || ''}
              onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
              lang="en"
              dir="ltr"
            />
            <Select
              options={proficiencyOptions}
              value={lang.proficiency || 'fluent'}
              onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value })}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeLanguage(lang.id)}
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
        onClick={() => addLanguage(createLanguage())}
        className="w-full border-dashed"
      >
        + Add Language
      </Button>
    </div>
  );
}
