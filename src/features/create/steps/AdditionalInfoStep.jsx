import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createCertificate, createLanguage } from '../../cv/models/cvFactories';
import { SUPPORTED_PROFICIENCY_LEVELS } from '../../cv/models/cvConstants';
import { FormSection } from '../components/FormSection';
import { ArrayItemCard } from '../components/ArrayItemCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { EnglishContentNotice } from '../components/EnglishContentNotice';

function CertificateCardItem({ index, onRemove }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const certErrors = errors.certificates?.[index] || {};
  const name = useWatch({ control, name: `certificates.${index}.name` });
  const issuer = useWatch({ control, name: `certificates.${index}.issuer` });

  return (
    <ArrayItemCard
      title={name || 'New Certificate'}
      subtitle={issuer}
      onRemove={onRemove}
      hasData={Boolean(name)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Certification Name"
          placeholder="e.g. AWS Certified Solutions Architect"
          lang="en"
          dir="ltr"
          error={certErrors.name?.message}
          {...register(`certificates.${index}.name`)}
        />

        <Input
          label="Issuing Organization"
          placeholder="e.g. Amazon Web Services"
          lang="en"
          dir="ltr"
          error={certErrors.issuer?.message}
          {...register(`certificates.${index}.issuer`)}
        />

        <Input
          label="Issue Date"
          type="month"
          lang="en"
          dir="ltr"
          error={certErrors.issueDate?.message}
          {...register(`certificates.${index}.issueDate`)}
        />

        <Input
          label="Expiration Date"
          type="month"
          lang="en"
          dir="ltr"
          error={certErrors.expiryDate?.message}
          {...register(`certificates.${index}.expiryDate`)}
        />

        <Input
          label="Credential ID"
          placeholder="e.g. AWS-839201"
          lang="en"
          dir="ltr"
          error={certErrors.credentialId?.message}
          {...register(`certificates.${index}.credentialId`)}
        />

        <Input
          label="Credential Verification URL"
          type="url"
          placeholder="https://credly.com/org/aws/cert/..."
          lang="en"
          dir="ltr"
          error={certErrors.credentialUrl?.message}
          {...register(`certificates.${index}.credentialUrl`)}
        />
      </div>
    </ArrayItemCard>
  );
}

function LanguageCardItem({ index, onRemove }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const langErrors = errors.languages?.[index] || {};
  const name = useWatch({ control, name: `languages.${index}.name` });

  const proficiencyOptions = SUPPORTED_PROFICIENCY_LEVELS.map((lvl) => ({
    value: lvl,
    label: lvl.charAt(0).toUpperCase() + lvl.slice(1),
  }));

  return (
    <ArrayItemCard
      title={name || 'New Spoken Language'}
      onRemove={onRemove}
      hasData={Boolean(name)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Language Name"
          placeholder="e.g. English, German, French, Spanish"
          lang="en"
          dir="ltr"
          error={langErrors.name?.message}
          {...register(`languages.${index}.name`)}
        />

        <Select
          label="Proficiency Level"
          options={proficiencyOptions}
          error={langErrors.proficiency?.message}
          {...register(`languages.${index}.proficiency`)}
        />
      </div>
    </ArrayItemCard>
  );
}

export function AdditionalInfoStep() {
  const { t } = useTranslation('create');
  const { control } = useFormContext();

  const certificatesArray = useFieldArray({ control, name: 'certificates' });
  const languagesArray = useFieldArray({ control, name: 'languages' });

  return (
    <FormSection
      title={t('steps.additional.label')}
      description={t('steps.additional.desc')}
    >
      <EnglishContentNotice />

      <Tabs defaultValue="certificates">
        <TabsList aria-label="Additional Information Categories">
          <TabsTrigger value="certificates">Certificates ({certificatesArray.fields.length})</TabsTrigger>
          <TabsTrigger value="languages">Spoken Languages ({languagesArray.fields.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="pt-4 space-y-4">
          {certificatesArray.fields.map((field, index) => (
            <CertificateCardItem
              key={field.id}
              index={index}
              onRemove={() => certificatesArray.remove(index)}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            size="md"
            leadingIcon={Plus}
            onClick={() => certificatesArray.append(createCertificate())}
            className="w-full border-dashed py-3"
          >
            + Add Certification Entry
          </Button>
        </TabsContent>

        <TabsContent value="languages" className="pt-4 space-y-4">
          {languagesArray.fields.map((field, index) => (
            <LanguageCardItem
              key={field.id}
              index={index}
              onRemove={() => languagesArray.remove(index)}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            size="md"
            leadingIcon={Plus}
            onClick={() => languagesArray.append(createLanguage())}
            className="w-full border-dashed py-3"
          >
            + Add Spoken Language Entry
          </Button>
        </TabsContent>
      </Tabs>
    </FormSection>
  );
}
