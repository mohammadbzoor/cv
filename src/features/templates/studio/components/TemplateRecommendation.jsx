import { useTranslation } from 'react-i18next';
import { Sparkles, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Select } from '../../../../components/ui/Select';
import { Button } from '../../../../components/ui/Button';
import { getTemplateName } from '../../registry/templateMetadata';
import { useLanguage } from '../../../../hooks/useLanguage';

export function TemplateRecommendation({
  userPreferences,
  onUpdatePreference,
  recommendation,
  onApplyRecommendation,
  activeTemplateId,
}) {
  const { t } = useTranslation('templates');
  const { isRTL } = useLanguage();
  const ActionArrow = isRTL ? ArrowLeft : ArrowRight;

  const careerOptions = [
    { value: '', label: t('recommendation.autoDetect', { defaultValue: 'Auto-detect from CV' }) },
    { value: 'student', label: t('recommendation.student', { defaultValue: 'Student / Graduate' }) },
    { value: 'junior', label: t('recommendation.junior', { defaultValue: 'Junior (1-2 years)' }) },
    { value: 'mid', label: t('recommendation.mid', { defaultValue: 'Mid-Level (3-5 years)' }) },
    { value: 'senior', label: t('recommendation.senior', { defaultValue: 'Senior (6+ years)' }) },
    { value: 'executive', label: t('recommendation.executive', { defaultValue: 'Executive / Leadership' }) },
  ];

  const roleOptions = [
    { value: 'software', label: t('recommendation.softwareRole', { defaultValue: 'Software / IT' }) },
    { value: 'engineering', label: t('recommendation.engineeringRole', { defaultValue: 'Engineering & Tech' }) },
    { value: 'business', label: t('recommendation.businessRole', { defaultValue: 'Business & Finance' }) },
    { value: 'consulting', label: t('recommendation.consultingRole', { defaultValue: 'Consulting & Strategy' }) },
    { value: 'management', label: t('recommendation.managementRole', { defaultValue: 'Management & Operations' }) },
    { value: 'general', label: t('recommendation.generalRole', { defaultValue: 'General / Professional' }) },
  ];

  const recommendedName = getTemplateName(recommendation.recommendedTemplateId);
  const isAlreadyActive = activeTemplateId === recommendation.recommendedTemplateId;

  return (
    <div className="p-5 bg-surface border border-border rounded-2xl space-y-4 shadow-2xs text-start">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary-subtle text-primary rounded-xl">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              {t('recommendation.title', { defaultValue: 'Smart Template Fit' })}
            </h3>
            <p className="text-xs text-foreground-secondary">
              {t('recommendation.subtitle', { defaultValue: 'Deterministic recommendation based on your career level & CV structure.' })}
            </p>
          </div>
        </div>

        <div className="px-3 py-1 bg-success-subtle text-success border border-success/20 rounded-full font-bold text-xs shrink-0">
          {recommendation.score}% Match
        </div>
      </div>

      {/* User Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          label={t('recommendation.careerLevel', { defaultValue: 'Career Level' })}
          options={careerOptions}
          value={userPreferences.careerLevel}
          onChange={(e) => onUpdatePreference('careerLevel', e.target.value)}
        />

        <Select
          label={t('recommendation.targetRole', { defaultValue: 'Target Role Family' })}
          options={roleOptions}
          value={userPreferences.targetRole}
          onChange={(e) => onUpdatePreference('targetRole', e.target.value)}
        />
      </div>

      {/* Result Box */}
      <div className="p-4 bg-surface-muted border border-border rounded-xl space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-foreground-secondary uppercase tracking-wider block">
              {t('recommendation.topFit', { defaultValue: 'Recommended Template' })}
            </span>
            <span className="text-sm font-extrabold text-foreground">{recommendedName}</span>
          </div>

          {!isAlreadyActive ? (
            <Button
              type="button"
              variant="primary"
              size="xs"
              trailingIcon={ActionArrow}
              onClick={() => onApplyRecommendation(recommendation.recommendedTemplateId)}
            >
              {t('recommendation.apply', { defaultValue: 'Apply Recommendation' })}
            </Button>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-success">
              <CheckCircle className="w-4 h-4" />
              <span>{t('recommendation.currentlyActive', { defaultValue: 'Currently Active' })}</span>
            </span>
          )}
        </div>

        {/* Reasons */}
        <div className="space-y-1 text-xs text-foreground-secondary pt-1">
          <span className="font-semibold text-foreground block">{t('recommendation.whyRecommended', { defaultValue: 'Why this template:' })}</span>
          <ul className="list-disc list-inside space-y-0.5">
            {recommendation.reasons.map((reasonKey) => (
              <li key={reasonKey}>
                {t(`recommendation.reasons.${reasonKey}`, {
                  defaultValue: 'Matches your career experience entries and skill layout.',
                })}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
