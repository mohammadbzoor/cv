import { useFormContext } from 'react-hook-form';
import { CheckCircle2, AlertCircle, LayoutTemplate } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { validateCVForExport } from '../../cv/utils/validateCVData';
import { mapFormToStore } from '../utils/mapFormToStore';
import { FormSection } from '../components/FormSection';
import { ReviewSection } from '../components/ReviewSection';
import { Button } from '../../../components/ui/Button';

export function ReviewStep({ onJumpToStep, isFinished }) {
  const { t } = useTranslation('create');
  const { getValues } = useFormContext();

  const formValues = getValues();
  const cvStoreData = mapFormToStore(formValues);
  const readiness = validateCVForExport(cvStoreData);

  const personal = formValues.personalInfo || {};
  const experiences = formValues.experiences || [];
  const education = formValues.education || [];
  const skills = formValues.skills || [];
  const projects = formValues.projects || [];
  const certificates = formValues.certificates || [];
  const languages = formValues.languages || [];

  return (
    <FormSection
      title={t('steps.review.label')}
      description={t('steps.review.desc')}
    >
      <div className="space-y-6">
        {/* Export Readiness Banner */}
        {readiness.success ? (
          <div className="p-4 bg-success-subtle border border-success/20 rounded-xl text-success text-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <strong className="font-bold block">Document Ready for Export & Template Rendering!</strong>
              <p className="text-foreground-secondary">
                All structural and export completeness requirements are met. You can now finalize your resume data.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-warning-subtle border border-warning/20 rounded-xl text-warning text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <strong className="font-bold block">{t('validation.exportReadinessFailed')}</strong>
              <ul className="list-disc list-inside space-y-0.5 pt-1 text-foreground-secondary">
                {readiness.errors.map((err, idx) => (
                  <li key={idx}>{err.message}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Completion Banner if finished */}
        {isFinished && (
          <div className="p-6 bg-surface border border-primary/30 rounded-2xl text-center space-y-4 shadow-2xs">
            <div className="mx-auto w-12 h-12 bg-primary-subtle text-primary rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">{t('finishSuccessTitle')}</h3>
              <p className="text-xs text-foreground-secondary max-w-md mx-auto">
                {t('finishSuccessDesc')}
              </p>
            </div>
            <div className="pt-2">
              <Button disabled leadingIcon={LayoutTemplate}>
                {t('openBuilder')}
              </Button>
            </div>
          </div>
        )}

        {/* Section Summaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Info */}
          <ReviewSection
            title="Personal Information"
            onEdit={() => onJumpToStep(1)}
            isEmpty={!personal.fullName}
          >
            <p className="font-bold text-sm text-foreground">{personal.fullName || 'Not provided'}</p>
            <p className="text-foreground-secondary">{personal.jobTitle}</p>
            <p className="text-foreground-secondary font-mono">{personal.email} {personal.phone && `• ${personal.phone}`}</p>
            <p className="text-foreground-secondary">{personal.location}</p>
          </ReviewSection>

          {/* Summary */}
          <ReviewSection
            title="Professional Summary"
            onEdit={() => onJumpToStep(2)}
            isEmpty={!formValues.summary}
          >
            <p className="line-clamp-4 leading-relaxed text-foreground-secondary">
              {formValues.summary}
            </p>
          </ReviewSection>

          {/* Experience */}
          <ReviewSection
            title={`Work Experience (${experiences.length})`}
            onEdit={() => onJumpToStep(3)}
            isEmpty={experiences.length === 0}
          >
            {experiences.map((exp, i) => (
              <div key={i} className="border-b border-border/40 pb-2 last:border-0 last:pb-0">
                <p className="font-bold text-foreground">{exp.position} @ {exp.company}</p>
                <p className="text-[11px] text-foreground-secondary font-mono">
                  {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate} {exp.location && `• ${exp.location}`}
                </p>
              </div>
            ))}
          </ReviewSection>

          {/* Education */}
          <ReviewSection
            title={`Education (${education.length})`}
            onEdit={() => onJumpToStep(4)}
            isEmpty={education.length === 0}
          >
            {education.map((edu, i) => (
              <div key={i} className="border-b border-border/40 pb-2 last:border-0 last:pb-0">
                <p className="font-bold text-foreground">{edu.degree} - {edu.institution}</p>
                <p className="text-[11px] text-foreground-secondary font-mono">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </ReviewSection>

          {/* Skills */}
          <ReviewSection
            title={`Skills (${skills.length})`}
            onEdit={() => onJumpToStep(5)}
            isEmpty={skills.length === 0}
          >
            <div className="flex flex-wrap gap-1.5">
              {skills.map((sk, i) => (
                <span key={i} className="px-2 py-0.5 bg-surface-muted rounded text-[11px] font-medium border border-border/60">
                  {sk.name} {sk.level && `(${sk.level})`}
                </span>
              ))}
            </div>
          </ReviewSection>

          {/* Projects */}
          <ReviewSection
            title={`Projects (${projects.length})`}
            onEdit={() => onJumpToStep(6)}
            isEmpty={projects.length === 0}
          >
            {projects.map((proj, i) => (
              <div key={i} className="border-b border-border/40 pb-2 last:border-0 last:pb-0">
                <p className="font-bold text-foreground">{proj.name}</p>
                <p className="text-[11px] text-foreground-secondary line-clamp-2">{proj.description}</p>
              </div>
            ))}
          </ReviewSection>

          {/* Certificates */}
          <ReviewSection
            title={`Certificates (${certificates.length})`}
            onEdit={() => onJumpToStep(7)}
            isEmpty={certificates.length === 0}
          >
            {certificates.map((cert, i) => (
              <div key={i}>
                <p className="font-bold text-foreground">{cert.name} - {cert.issuer}</p>
              </div>
            ))}
          </ReviewSection>

          {/* Languages */}
          <ReviewSection
            title={`Spoken Languages (${languages.length})`}
            onEdit={() => onJumpToStep(7)}
            isEmpty={languages.length === 0}
          >
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang, i) => (
                <span key={i} className="px-2 py-0.5 bg-surface-muted rounded text-[11px] font-medium border border-border/60">
                  {lang.name} ({lang.proficiency})
                </span>
              ))}
            </div>
          </ReviewSection>
        </div>
      </div>
    </FormSection>
  );
}
