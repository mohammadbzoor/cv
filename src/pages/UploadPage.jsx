import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DropZone } from '../features/upload/components/DropZone';
import { SelectedFile } from '../features/upload/components/SelectedFile';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { Card } from '../components/ui/Card';
import { useCVStore } from '../features/cv/store/useCVStore';
import { mockServiceClient } from '../features/ai-services/services/mockServiceClient';
import { MOCK_EXTRACTED_CV } from '../features/ai-services/mocks/mockExtractedCV';
import { normalizeCVData } from '../features/cv/utils/normalizeCVData';
import { validateCVData } from '../features/cv/utils/validateCVData';
import { ROUTE_PATHS } from '../app/routePaths';

export default function UploadPage() {
  const { t } = useTranslation(['upload', 'navigation']);
  const navigate = useNavigate();
  const replaceCVData = useCVStore((state) => state.replaceCVData);

  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const breadcrumbsItems = [
    { label: t('navigation:home'), path: ROUTE_PATHS.HOME },
    { label: t('upload:pageTitle'), current: true },
  ];

  function handleFileSelect(validation) {
    if (!validation.success) {
      const code = validation.errors[0]?.code || 'FILE_TYPE_NOT_ALLOWED';
      setErrorMsg(t(`upload:errors.${code}`));
      setSelectedFile(null);
      return;
    }

    setErrorMsg(null);
    setSelectedFile(validation.file);
    setExtractedData(null);
  }

  async function handleProcess() {
    if (!selectedFile) return;
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      // Simulate mock async document parsing
      const result = await mockServiceClient({
        data: MOCK_EXTRACTED_CV,
        delay: 800,
      });

      const normalized = normalizeCVData(result);
      const validCheck = validateCVData(normalized);

      if (validCheck.success) {
        setExtractedData(normalized);
      } else {
        setErrorMsg(t('upload:errors.EXTRACTION_FAILED'));
      }
    } catch (err) {
      setErrorMsg(err.message || t('upload:errors.EXTRACTION_FAILED'));
    } finally {
      setIsProcessing(false);
    }
  }

  function handleOpenInBuilder() {
    if (extractedData) {
      replaceCVData(extractedData);
      navigate(ROUTE_PATHS.BUILDER_NEW);
    }
  }

  return (
    <PageContainer className="py-6 md:py-10 space-y-8 max-w-4xl">
      <PageHeader
        title={t('upload:pageTitle')}
        description={t('upload:pageDesc')}
        breadcrumbs={<Breadcrumbs items={breadcrumbsItems} />}
      />

      {/* Demo Notice Banner */}
      <div className="p-4 bg-primary-subtle border border-primary/20 rounded-xl text-xs text-primary flex items-start gap-3 shadow-2xs">
        <Info className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">{t('upload:demoNotice')}</p>
      </div>

      {/* Upload Zone Section */}
      {!extractedData && (
        <Card className="p-6 space-y-6">
          {!selectedFile ? (
            <DropZone onFileSelect={handleFileSelect} errorMsg={errorMsg} />
          ) : (
            <div className="space-y-4">
              <SelectedFile
                file={selectedFile}
                onRemove={() => setSelectedFile(null)}
                onReplace={() => setSelectedFile(null)}
              />

              <Button
                type="button"
                variant="primary"
                size="lg"
                leadingIcon={isProcessing ? undefined : Sparkles}
                disabled={isProcessing}
                onClick={handleProcess}
                className="w-full"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner size="sm" />
                    <span>{t('upload:processing')}</span>
                  </div>
                ) : (
                  t('upload:processCV')
                )}
              </Button>
            </div>
          )}
        </Card>
      )}

      {/* Extracted Data Summary Review */}
      {extractedData && (
        <Card className="p-6 space-y-6 border-success/30 bg-success-subtle/10">
          <div className="flex items-center gap-3 text-success">
            <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold text-foreground">{t('upload:extractedReady')}</h3>
              <p className="text-xs text-foreground-secondary">
                {t('upload:extractedProfile', { name: extractedData.personalInfo?.fullName, title: extractedData.personalInfo?.jobTitle })}
              </p>
            </div>
          </div>

          <div className="p-4 bg-surface rounded-xl border border-border space-y-2 text-xs">
            <p className="font-bold text-foreground">{t('upload:structureOverview')}</p>
            <ul className="list-disc list-inside text-foreground-secondary space-y-1">
              <li>{t('upload:overviewSummary')}: {extractedData.summary ? t('upload:included') : t('upload:none')}</li>
              <li>{t('upload:overviewExperiences')}: {extractedData.experiences?.length || 0}</li>
              <li>{t('upload:overviewEducation')}: {extractedData.education?.length || 0}</li>
              <li>{t('upload:overviewSkills')}: {extractedData.skills?.length || 0}</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => {
                setExtractedData(null);
                setSelectedFile(null);
              }}
            >
              {t('upload:cancelUpload')}
            </Button>

            <Button
              type="button"
              variant="primary"
              size="md"
              trailingIcon={ArrowRight}
              onClick={handleOpenInBuilder}
            >
              {t('upload:openInBuilder')}
            </Button>
          </div>
        </Card>
      )}
    </PageContainer>
  );
}
