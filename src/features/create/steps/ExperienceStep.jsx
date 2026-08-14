import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createExperience } from '../../cv/models/cvFactories';
import { FormSection } from '../components/FormSection';
import { ArrayItemCard } from '../components/ArrayItemCard';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Button } from '../../../components/ui/Button';
import { EnglishContentNotice } from '../components/EnglishContentNotice';

function ExperienceCardItem({ index, onRemove }) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const expErrors = errors.experiences?.[index] || {};
  const isCurrent = useWatch({ control, name: `experiences.${index}.isCurrent` });
  const company = useWatch({ control, name: `experiences.${index}.company` });
  const position = useWatch({ control, name: `experiences.${index}.position` });

  return (
    <ArrayItemCard
      title={position || 'New Position'}
      subtitle={company}
      onRemove={onRemove}
      hasData={Boolean(company || position)}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Job Position / Role"
            placeholder="e.g. Senior Frontend Engineer"
            lang="en"
            dir="ltr"
            error={expErrors.position?.message}
            {...register(`experiences.${index}.position`)}
          />

          <Input
            label="Company / Organization Name"
            placeholder="e.g. Acme Tech Solutions"
            lang="en"
            dir="ltr"
            error={expErrors.company?.message}
            {...register(`experiences.${index}.company`)}
          />

          <Input
            label="Location"
            placeholder="e.g. London, UK (or Remote)"
            lang="en"
            dir="ltr"
            error={expErrors.location?.message}
            {...register(`experiences.${index}.location`)}
          />

          <div className="space-y-2">
            <Checkbox
              label="I currently work here"
              checked={Boolean(isCurrent)}
              onChange={(e) => {
                const checked = e.target.checked;
                setValue(`experiences.${index}.isCurrent`, checked);
                if (checked) {
                  setValue(`experiences.${index}.endDate`, '');
                }
              }}
            />
          </div>

          <Input
            label="Start Date"
            type="month"
            lang="en"
            dir="ltr"
            error={expErrors.startDate?.message}
            {...register(`experiences.${index}.startDate`)}
          />

          <Input
            label="End Date"
            type="month"
            disabled={Boolean(isCurrent)}
            lang="en"
            dir="ltr"
            error={expErrors.endDate?.message}
            {...register(`experiences.${index}.endDate`)}
          />
        </div>

        <Textarea
          label="Role Summary / Key Responsibilities"
          placeholder="e.g. Led cross-functional team of 6 engineers building cloud dashboard..."
          rows={3}
          lang="en"
          dir="ltr"
          error={expErrors.description?.message}
          {...register(`experiences.${index}.description`)}
        />
      </div>
    </ArrayItemCard>
  );
}

export function ExperienceStep() {
  const { t } = useTranslation('create');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
  });

  function handleAdd() {
    append(createExperience());
  }

  return (
    <FormSection
      title={t('steps.experience.label')}
      description={t('steps.experience.desc')}
    >
      <EnglishContentNotice />

      <div className="space-y-4">
        {fields.map((field, index) => (
          <ExperienceCardItem
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
          + Add Work Experience Entry
        </Button>
      </div>
    </FormSection>
  );
}
