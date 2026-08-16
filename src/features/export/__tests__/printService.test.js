import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { printCV } from '../services/printService';

// Mock html2pdf.js
const { mockSave, mockSet, mockHtml2Pdf } = vi.hoisted(() => {
  const mockSave = vi.fn().mockResolvedValue(true);
  const mockFrom = vi.fn().mockReturnValue({ save: mockSave });
  const mockSet = vi.fn().mockReturnValue({ from: mockFrom });
  const mockHtml2Pdf = vi.fn().mockReturnValue({ set: mockSet });
  return { mockSave, mockSet, mockHtml2Pdf };
});

vi.mock('html2pdf.js', () => ({
  default: mockHtml2Pdf,
}));

describe('printService', () => {
  let originalDocument;
  let originalWindow;

  beforeEach(() => {
    originalDocument = globalThis.document;
    originalWindow = globalThis.window;

    const classListSet = new Set();
    const mockAppend = vi.fn();

    globalThis.document = {
      title: 'Original Title',
      body: {
        classList: {
          add: (cls) => classListSet.add(cls),
          remove: (cls) => classListSet.delete(cls),
          contains: (cls) => classListSet.has(cls),
        },
        appendChild: mockAppend,
      },
      querySelector: vi.fn(),
    };
    
    globalThis.window = {}; // Environment exists
    
    vi.clearAllMocks();
  });

  afterEach(() => {
    globalThis.document = originalDocument;
    globalThis.window = originalWindow;
  });

  it('returns PRINT_NOT_SUPPORTED when window is undefined', async () => {
    globalThis.window = undefined;
    const result = await printCV({ documentTitle: 'test-resume' });
    expect(result.success).toBe(false);
    expect(result.error.code).toBe('PRINT_NOT_SUPPORTED');
  });

  it('returns CV_DOCUMENT_NOT_FOUND when [data-cv-document] is missing', async () => {
    globalThis.document.querySelector.mockReturnValue(null);

    const result = await printCV({ documentTitle: 'test-resume' });
    expect(result.success).toBe(false);
    expect(result.error.code).toBe('CV_DOCUMENT_NOT_FOUND');
  });

  it('successfully triggers direct PDF download when document exists', async () => {
    const mockElem = {};
    const mockZoom = { style: { transform: 'scale(1.2)' } };
    globalThis.document.querySelector.mockImplementation((selector) => {
      if (selector === '[data-cv-document]') return mockElem;
      if (selector === '[data-preview-zoom-container]') return mockZoom;
      return null;
    });

    const onBefore = vi.fn();
    const onAfter = vi.fn();

    const result = await printCV({
      documentTitle: 'alex-johnson-resume',
      onBeforePrint: onBefore,
      onAfterPrint: onAfter,
    });
    
    expect(result.success).toBe(true);
    expect(mockHtml2Pdf).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith(expect.objectContaining({
      filename: 'alex-johnson-resume.pdf',
      jsPDF: expect.objectContaining({
        format: 'letter',
      }),
    }));
    expect(mockSave).toHaveBeenCalled();
    expect(onBefore).toHaveBeenCalled();
    expect(onAfter).toHaveBeenCalled();
    expect(mockZoom.style.transform).toBe('scale(1.2)');
  });
});
