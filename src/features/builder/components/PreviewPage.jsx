import { useCVStore } from '../../cv/store/useCVStore';
import { selectCVData } from '../../cv/store/cvSelectors';
import { BuilderDraftTemplate } from './BuilderDraftTemplate';
import { EmptyDocumentNotice } from './EmptyDocumentNotice';

/**
 * A4 Printable Document Container.
 * Always rendered with white background and LTR English attributes regardless of application theme or interface language.
 */
export function PreviewPage() {
  const cvData = useCVStore(selectCVData);

  const hasContent = Boolean(
    cvData?.personalInfo?.fullName ||
      cvData?.summary ||
      (cvData?.experiences && cvData.experiences.length > 0) ||
      (cvData?.education && cvData.education.length > 0)
  );

  return (
    <div
      id="cv-preview-document"
      data-cv-document
      lang="en"
      dir="ltr"
      className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-xl rounded-sm overflow-hidden select-text relative transition-shadow"
    >
      {hasContent ? <BuilderDraftTemplate /> : <EmptyDocumentNotice />}
    </div>
  );
}
