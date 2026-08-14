import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createEducation } from '../../cv/models/cvFactories';
import { FormSection } from '../components/FormSection';
import { ArrayItemCard } from '../components/ArrayItemCard';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Button } from '../../../components/ui/Button';
import { EnglishContentNotice } from '../components/EnglishContentNotice';

function EducationCardItem({ index, onRemove }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const eduErrors = errors.education?.[index] || {};
  const institution = useWatch({ control, name: `education.${index}.institution` });
  const degree = useWatch({ control, name: `education.${index}.degree` });

  return (
    <ArrayItemCard
      title={degree || 'New Degree / Certificate'}
      subtitle={institution}
      onRemove={onRemove}
      hasData={Boolean(institution || degree)}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Institution / University Name"
            placeholder="e.g. Stanford University"
            lang="en"
            dir="ltr"
            error={eduErrors.institution?.message}
            {...register(`education.${index}.institution`)}
          />

          <Input
            label="Degree / Diploma Title"
            placeholder="e.g. Bachelor of Science (B.S.)"
            lang="en"
            dir="ltr"
            error={eduErrors.degree?.message}
            {...register(`education.${index}.degree`)}
          />

          <Input
            label="Field of Study / Major"
            placeholder="e.g. Computer Science"
            lang="en"
            dir="ltr"
            error={eduErrors.field?.message}
            {...register(`education.${index}.field`)}
          />

          <Input
            label="Location"
            placeholder="e.g. Stanford, CA, USA"
            lang="en"
            dir="ltr"
            error={eduErrors.location?.message}
            {...register(`education.${index}.location`)}
          />

          <Input
            label="Start Date"
            type="month"
            lang="en"
            dir="ltr"
            error={eduErrors.startDate?.message}
            {...register(`education.${index}.startDate`)}
          />

          <Input
            label="End Date / Graduation Date"
            type="month"
            lang="en"
            dir="ltr"
            error={eduErrors.endDate?.message}
            {...register(`education.${index}.endDate`)}
          />
        </div>

        <Textarea
          label="Honors / Notable Coursework (Optional)"
          placeholder="e.g. Graduated Magna Cum Laude. Minor in Data Science."
          rows={2}
          lang="en"
          dir="ltr"
          error={eduErrors.description?.message}
          {...register(`education.${index}.description`)}
        />
      </div>
    </ArrayItemCard>
  );
}

export function EducationStep() {
  const { t } = useTranslation('create');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  function handleAdd() {
    append(createEducation());
  }

  return (
    <FormSection
      title={t('steps.education.label')}
      description={t('steps.education.desc')}
    >
      <EnglishContentNotice />

      <div className="space-y-4">
        {fields.map((field, index) => (
          <EducationCardItem
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
          + Add Education Entry
        </Button>
      </div>
    </FormSection>
  );
}
