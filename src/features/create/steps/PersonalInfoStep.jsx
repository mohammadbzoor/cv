import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormSection } from '../components/FormSection';
import { Input } from '../../../components/ui/Input';
import { EnglishContentNotice } from '../components/EnglishContentNotice';

export function PersonalInfoStep() {
  const { t } = useTranslation('create');
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const pErrors = errors.personalInfo || {};

  return (
    <FormSection
      title={t('steps.personal.label')}
      description={t('steps.personal.desc')}
    >
      <EnglishContentNotice />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          placeholder="e.g. Alexander Wright"
          autoComplete="name"
          lang="en"
          dir="ltr"
          error={pErrors.fullName?.message}
          {...register('personalInfo.fullName')}
        />

        <Input
          label="Job Title / Professional Role"
          placeholder="e.g. Senior Software Engineer"
          autoComplete="organization-title"
          lang="en"
          dir="ltr"
          error={pErrors.jobTitle?.message}
          {...register('personalInfo.jobTitle')}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="alexander@example.com"
          autoComplete="email"
          lang="en"
          dir="ltr"
          error={pErrors.email?.message}
          {...register('personalInfo.email')}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 234-5678"
          autoComplete="tel"
          lang="en"
          dir="ltr"
          error={pErrors.phone?.message}
          {...register('personalInfo.phone')}
        />

        <Input
          label="Location (City, Country)"
          placeholder="San Francisco, CA, USA"
          lang="en"
          dir="ltr"
          error={pErrors.location?.message}
          {...register('personalInfo.location')}
        />

        <Input
          label="Personal Website / Portfolio URL"
          type="url"
          placeholder="https://alexwright.dev"
          autoComplete="url"
          lang="en"
          dir="ltr"
          error={pErrors.website?.message}
          {...register('personalInfo.website')}
        />

        <Input
          label="LinkedIn URL"
          type="url"
          placeholder="https://linkedin.com/in/alexwright"
          autoComplete="url"
          lang="en"
          dir="ltr"
          error={pErrors.linkedin?.message}
          {...register('personalInfo.linkedin')}
        />

        <Input
          label="GitHub Profile URL"
          type="url"
          placeholder="https://github.com/alexwright"
          autoComplete="url"
          lang="en"
          dir="ltr"
          error={pErrors.github?.message}
          {...register('personalInfo.github')}
        />
      </div>
    </FormSection>
  );
}
