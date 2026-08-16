import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { ExportReadiness } from './ExportReadiness';
import { ExportOptions } from './ExportOptions';
import { PrintInstructions } from './PrintInstructions';
import { ExportStatus } from './ExportStatus';
import { useExportReadiness } from '../hooks/useExportReadiness';
import { usePrintCV } from '../hooks/usePrintCV';
import { getPrintDocumentName } from '../utils/getPrintDocumentName';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectPersonalInfo, selectTemplateId } from '../../cv/store/cvSelectors';
import { getTemplateName } from '../../templates/registry/templateMetadata';

/**
 * Export PDF Dialog.
 * Direct PDF Download Dialog.
 */
export function ExportDialog({ isOpen, onClose }) {
  const { t } = useTranslation(['export', 'common']);
  const personalInfo = useCVStore(selectPersonalInfo);
  const templateId = useCVStore(selectTemplateId);
  const { isReady, errors } = useExportReadiness();
  const { executePrint, isPrinting, lastError, clearError } = usePrintCV();

  const documentName = getPrintDocumentName({
    fullName: personalInfo?.fullName,
    title: personalInfo?.jobTitle,
  });

  const templateName = getTemplateName(templateId);

  const handleDownload = useCallback(async () => {
    clearError();
    const result = await executePrint();
    
    if (result.success) {
      onClose?.();
    }
  }, [executePrint, clearError, onClose]);

  const footer = (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onClose}
      >
        {t('common:cancel')}
      </Button>
      <Button
        type="button"
        variant="primary"
        size="sm"
        leadingIcon={Download}
        onClick={handleDownload}
        disabled={!isReady || isPrinting}
        loading={isPrinting}
      >
        {isPrinting ? (t('export:downloading') || t('common:loading')) : t('export:downloadPdf')}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('export:title')}
      description={t('export:description')}
      size="lg"
      closeLabel={t('common:close')}
      footer={footer}
    >
      <div className="space-y-5">
        {/* Export Options */}
        <ExportOptions
          documentName={documentName}
          templateName={templateName}
        />

        {/* Export Readiness */}
        <ExportReadiness isReady={isReady} errors={errors} />

        {/* Print Status / Error */}
        <ExportStatus isPrinting={isPrinting} error={lastError} />

        {/* Print Instructions */}
        {isReady && <PrintInstructions />}
      </div>
    </Modal>
  );
}
