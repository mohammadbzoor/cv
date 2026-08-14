import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createSkill } from '../../cv/models/cvFactories';
import { SUPPORTED_SKILL_LEVELS } from '../../cv/models/cvConstants';
import { FormSection } from '../components/FormSection';
import { ArrayItemCard } from '../components/ArrayItemCard';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { EnglishContentNotice } from '../components/EnglishContentNotice';

function SkillCardItem({ index, onRemove }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const skillErrors = errors.skills?.[index] || {};
  const name = useWatch({ control, name: `skills.${index}.name` });
  const category = useWatch({ control, name: `skills.${index}.category` });

  const levelOptions = [
    { value: '', label: 'Select Level (Optional)' },
    ...SUPPORTED_SKILL_LEVELS.map((lvl) => ({
      value: lvl,
      label: lvl.charAt(0).toUpperCase() + lvl.slice(1),
    })),
  ];

  return (
    <ArrayItemCard
      title={name || 'New Skill'}
      subtitle={category}
      onRemove={onRemove}
      hasData={Boolean(name)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Skill Name"
          placeholder="e.g. React.js, TypeScript, Node.js"
          lang="en"
          dir="ltr"
          error={skillErrors.name?.message}
          {...register(`skills.${index}.name`)}
        />

        <Input
          label="Category (Optional)"
          placeholder="e.g. Frontend, DevOps, Management"
          lang="en"
          dir="ltr"
          error={skillErrors.category?.message}
          {...register(`skills.${index}.category`)}
        />

        <Select
          label="Proficiency Level"
          options={levelOptions}
          error={skillErrors.level?.message}
          {...register(`skills.${index}.level`)}
        />
      </div>
    </ArrayItemCard>
  );
}

export function SkillsStep() {
  const { t } = useTranslation('create');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  function handleAdd() {
    append(createSkill());
  }

  return (
    <FormSection
      title={t('steps.skills.label')}
      description={t('steps.skills.desc')}
    >
      <EnglishContentNotice />

      <div className="space-y-4">
        {fields.map((field, index) => (
          <SkillCardItem
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          size="md"
          leadingIcon={Plus}
          onClick={handleAdd}
          className="w-full border-dashed py-3"
        >
          + Add Skill Entry
        </Button>
      </div>
    </FormSection>
  );
}
