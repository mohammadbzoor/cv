import { useRef, useState } from 'react';
import { UploadCloud, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { validateFile } from '../utils/validateFile';
import { cn } from '../../../utils/cn';

/**
 * Accessible Drag & Dropzone component for single PDF/DOCX file selection.
 */
export function DropZone({ onFileSelect, disabled = false, errorMsg, className }) {
  const { t } = useTranslation('upload');
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);

  function handleFiles(files) {
    if (!files || files.length === 0) return;
    const selected = files[0];
    const validation = validateFile(selected);
    onFileSelect(validation);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (!disabled && e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function handleClick() {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-disabled={disabled}
        aria-label={t('dropzoneLabel')}
        className={cn(
          'p-8 md:p-12 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 bg-surface',
          isDragOver ? 'border-primary bg-primary-subtle/30 ring-2 ring-primary/20' : 'border-border hover:border-primary/60 hover:bg-surface-muted',
          errorMsg ? 'border-error bg-error-subtle/20' : '',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => handleFiles(e.target.files)}
          tabIndex={-1}
          className="hidden"
        />

        <div className="w-12 h-12 rounded-full bg-primary-subtle text-primary flex items-center justify-center">
          <UploadCloud className="w-6 h-6" aria-hidden="true" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-bold text-foreground">{t('dropzoneLabel')}</p>
          <p className="text-xs text-foreground-secondary">{t('dropzoneHint')}</p>
        </div>
      </div>

      {errorMsg && (
        <p role="alert" className="text-xs text-error font-medium">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
