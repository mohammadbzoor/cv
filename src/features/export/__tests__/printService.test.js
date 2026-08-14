import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { printCV } from '../services/printService';

describe('printService', () => {
  let originalWindowPrint;
  let originalDocument;

  beforeEach(() => {
    originalWindowPrint = globalThis.window ? globalThis.window.print : undefined;
    originalDocument = globalThis.document;

    const classListSet = new Set();
    globalThis.document = {
      title: 'Original Title',
      body: {
        classList: {
          add: (cls) => classListSet.add(cls),
          remove: (cls) => classListSet.delete(cls),
          contains: (cls) => classListSet.has(cls),
        },
      },
      querySelector: vi.fn(),
    };
  });

  afterEach(() => {
    if (globalThis.window) {
      globalThis.window.print = originalWindowPrint;
    }
    globalThis.document = originalDocument;
  });

  it('returns PRINT_NOT_SUPPORTED when window.print is undefined', () => {
    globalThis.window = {};
    const result = printCV({ documentTitle: 'test-resume' });
    expect(result.success).toBe(false);
    expect(result.error.code).toBe('PRINT_NOT_SUPPORTED');
  });

  it('returns CV_DOCUMENT_NOT_FOUND when [data-cv-document] is missing', () => {
    globalThis.window = {
      print: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    globalThis.document.querySelector.mockReturnValue(null);

    const result = printCV({ documentTitle: 'test-resume' });
    expect(result.success).toBe(false);
    expect(result.error.code).toBe('CV_DOCUMENT_NOT_FOUND');
  });

  it('successfully invokes window.print and updates document.title temporarily when document exists', () => {
    const mockElem = {};
    globalThis.document.querySelector.mockImplementation((selector) => {
      if (selector === '[data-cv-document]') return mockElem;
      return null;
    });

    const addEventListenerMock = vi.fn();
    const removeEventListenerMock = vi.fn();
    const printMock = vi.fn(() => {
      expect(globalThis.document.title).toBe('alex-johnson-resume');
    });

    globalThis.window = {
      print: printMock,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
    };

    const result = printCV({ documentTitle: 'alex-johnson-resume' });
    expect(result.success).toBe(true);
    expect(printMock).toHaveBeenCalledTimes(1);

    // Simulate afterprint handler execution
    const afterprintHandler = addEventListenerMock.mock.calls.find((call) => call[0] === 'afterprint')?.[1];
    if (afterprintHandler) {
      afterprintHandler();
      expect(globalThis.document.title).toBe('Original Title');
    }
  });
});
