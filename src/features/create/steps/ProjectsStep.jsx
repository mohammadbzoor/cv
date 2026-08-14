import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createProject } from '../../cv/models/cvFactories';
import { FormSection } from '../components/FormSection';
import { ArrayItemCard } from '../components/ArrayItemCard';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Button } from '../../../components/ui/Button';
import { EnglishContentNotice } from '../components/EnglishContentNotice';

function ProjectCardItem({ index, onRemove }) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const projErrors = errors.projects?.[index] || {};
  const name = useWatch({ control, name: `projects.${index}.name` });
  const technologiesArray = useWatch({ control, name: `projects.${index}.technologies` }) || [];
  const technologiesText = Array.isArray(technologiesArray) ? technologiesArray.join(', ') : technologiesArray;

  return (
    <ArrayItemCard
      title={name || 'New Project'}
      subtitle={technologiesText}
      onRemove={onRemove}
      hasData={Boolean(name)}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Project Name"
            placeholder="e.g. E-Commerce Analytics Dashboard"
            lang="en"
            dir="ltr"
            error={projErrors.name?.message}
            {...register(`projects.${index}.name`)}
          />

          <Input
            label="Technologies Used (Comma Separated)"
            placeholder="e.g. React, Node.js, PostgreSQL, Tailwind"
            value={technologiesText}
            onChange={(e) => {
              const raw = e.target.value;
              const arr = raw.split(',').map((t) => t.trim());
              setValue(`projects.${index}.technologies`, arr);
            }}
            lang="en"
            dir="ltr"
          />

          <Input
            label="Live Project URL"
            type="url"
            placeholder="https://myproject.com"
            lang="en"
            dir="ltr"
            error={projErrors.url?.message}
            {...register(`projects.${index}.url`)}
          />

          <Input
            label="Repository URL"
            type="url"
            placeholder="https://github.com/myuser/myproject"
            lang="en"
            dir="ltr"
            error={projErrors.repositoryUrl?.message}
            {...register(`projects.${index}.repositoryUrl`)}
          />

          <Input
            label="Start Date"
            type="month"
            lang="en"
            dir="ltr"
            error={projErrors.startDate?.message}
            {...register(`projects.${index}.startDate`)}
          />

          <Input
            label="Completion Date"
            type="month"
            lang="en"
            dir="ltr"
            error={projErrors.endDate?.message}
            {...register(`projects.${index}.endDate`)}
          />
        </div>

        <Textarea
          label="Project Description & Achievements"
          placeholder="e.g. Developed high-throughput REST APIs and responsive UI..."
          rows={3}
          lang="en"
          dir="ltr"
          error={projErrors.description?.message}
          {...register(`projects.${index}.description`)}
        />
      </div>
    </ArrayItemCard>
  );
}

export function ProjectsStep() {
  const { t } = useTranslation('create');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  function handleAdd() {
    append(createProject());
  }

  return (
    <FormSection
      title={t('steps.projects.label')}
      description={t('steps.projects.desc')}
    >
      <EnglishContentNotice />

      <div className="space-y-4">
        {fields.map((field, index) => (
          <ProjectCardItem
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
          + Add Project Entry
        </Button>
      </div>
    </FormSection>
  );
}
