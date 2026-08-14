import { describe, it, expect } from 'vitest';
import { validateFile } from '../features/upload/utils/validateFile';

describe('File Validation Utility', () => {
  it('accepts valid PDF files under 5MB', () => {
    const validPdf = new File(['sample pdf content'], 'resume.pdf', { type: 'application/pdf' });
    const res = validateFile(validPdf);
    expect(res.success).toBe(true);
    expect(res.file).toBe(validPdf);
  });

  it('accepts valid DOCX files under 5MB', () => {
    const validDocx = new File(['sample docx content'], 'resume.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const res = validateFile(validDocx);
    expect(res.success).toBe(true);
  });

  it('rejects empty files with zero bytes', () => {
    const emptyFile = new File([], 'empty.pdf', { type: 'application/pdf' });
    const res = validateFile(emptyFile);
    expect(res.success).toBe(false);
    expect(res.errors[0].code).toBe('FILE_EMPTY');
  });

  it('rejects files larger than 5 MB', () => {
    const largeBuffer = new Uint8Array(6 * 1024 * 1024);
    const largeFile = new File([largeBuffer], 'large.pdf', { type: 'application/pdf' });
    const res = validateFile(largeFile);
    expect(res.success).toBe(false);
    expect(res.errors[0].code).toBe('FILE_TOO_LARGE');
  });

  it('rejects unsupported extensions like .exe or .png', () => {
    const exeFile = new File(['binary'], 'virus.exe', { type: 'application/x-msdownload' });
    const res = validateFile(exeFile);
    expect(res.success).toBe(false);
    expect(res.errors[0].code).toBe('FILE_EXTENSION_NOT_ALLOWED');
  });
});
