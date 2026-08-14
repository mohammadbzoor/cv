import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormSection } from '../components/FormSection';
import { Textarea } from '../../../components/ui/Textarea';
import { EnglishContentNotice } from '../components/EnglishContentNotice';

export function SummaryStep() {
  const { t } = useTranslation('create');
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormSection
      title={t('steps.summary.label')}
      description={t('steps.summary.desc')}
    >
      <EnglishContentNotice />

      <div className="space-y-4">
        <Textarea
          label="Professional Summary Statement"
          placeholder="e.g. Results-driven Senior Software Engineer with 6+ years of experience designing scalable web applications..."
          rows={6}
          maxLength={1000}
          showCount
          lang="en"
          dir="ltr"
          error={errors.summary?.message}
          {...register('summary')}
        />

        <div className="bg-surface-muted rounded-xl p-4 border border-border/60 text-xs text-foreground-secondary space-y-1.5">
          <strong className="font-bold text-foreground block">Pro-Tips for an Effective Summary:</strong>
          <ul className="list-disc list-inside space-y-1">
            <li>Keep it concise (3 to 5 sentences or 50–100 words).</li>
            <li>Highlight your key specialization, total years of experience, and top technical skills.</li>
            <li>Quantify your impact with metrics (e.g. "increased application performance by 40%").</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
