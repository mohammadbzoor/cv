/**
 * Direct PDF Download Service for CV Platform.
 * Temporarily resets preview viewport transform and invokes html2pdf for direct download.
 *
 * @param {{ documentTitle: string, onBeforePrint?: () => void, onAfterPrint?: () => void }} options
 * @returns {Promise<{ success: boolean, error?: { code: string, message: string } }>}
 */
export async function printCV({ documentTitle, onBeforePrint, onAfterPrint } = {}) {
  // 1. Validate environment
  if (typeof window === 'undefined') {
    return {
      success: false,
      error: {
        code: 'PRINT_NOT_SUPPORTED',
        message: 'Browser environment is not available.',
      },
    };
  }

  const cvDocument = document.querySelector('[data-cv-document]');
  if (!cvDocument) {
    return {
      success: false,
      error: {
        code: 'CV_DOCUMENT_NOT_FOUND',
        message: 'CV document element was not found on the page.',
      },
    };
  }

  const zoomContainer = document.querySelector('[data-preview-zoom-container]');
  const previousTransform = zoomContainer ? zoomContainer.style.transform : '';

  try {
    onBeforePrint?.();

    // 2. Temporarily reset zoom scale so html2canvas renders at exact 1:1 dimensions
    if (zoomContainer) {
      zoomContainer.style.transform = 'none';
    }

    // Allow DOM to settle
    await new Promise((resolve) => setTimeout(resolve, 60));

    // 3. Dynamic import of html2pdf
    const html2pdfModule = await import('html2pdf.js');
    const html2pdf = typeof html2pdfModule.default === 'function' 
      ? html2pdfModule.default 
      : (typeof html2pdfModule === 'function' ? html2pdfModule : html2pdfModule.default);

    const safeTitle = documentTitle || 'resume';
    const opt = {
      margin: 0,
      filename: `${safeTitle}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollY: 0,
        scrollX: 0,
        onclone: (clonedDoc) => {
          // 1. Remove dark mode on the cloned document for clean white PDF
          if (clonedDoc.documentElement) {
            clonedDoc.documentElement.classList.remove('dark');
            clonedDoc.documentElement.style.backgroundColor = '#ffffff';
            clonedDoc.documentElement.style.color = '#111827';
          }
          if (clonedDoc.body) {
            clonedDoc.body.style.backgroundColor = '#ffffff';
            clonedDoc.body.style.color = '#111827';
          }

          // 2. Convert modern CSS oklch colors to standard RGB for html2canvas compatibility
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const sanitizeColor = (val) => {
            if (!val || typeof val !== 'string' || !val.includes('oklch')) return val;
            try {
              ctx.fillStyle = '#000000';
              ctx.fillStyle = val;
              return ctx.fillStyle;
            } catch {
              return '#1e293b';
            }
          };

          const colorProps = [
            'color',
            'backgroundColor',
            'borderColor',
            'borderTopColor',
            'borderBottomColor',
            'borderLeftColor',
            'borderRightColor',
            'outlineColor',
            'fill',
            'stroke',
          ];

          const elements = clonedDoc.querySelectorAll('*');
          elements.forEach((el) => {
            if (!el || !el.style) return;
            try {
              const computed = window.getComputedStyle(el);
              colorProps.forEach((prop) => {
                const computedVal = computed[prop];
                if (computedVal && computedVal.includes('oklch')) {
                  el.style[prop] = sanitizeColor(computedVal);
                }
              });
            } catch {
              // Ignore non-rendered nodes
            }
          });
        },
      },
      jsPDF: {
        unit: 'in',
        format: 'letter', // Standard US Letter format (8.5 x 11 inches)
        orientation: 'portrait',
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
      },
    };

    // 4. Generate and save directly to disk
    await html2pdf().set(opt).from(cvDocument).save();

    return { success: true };
  } catch (err) {
    console.error('PDF Generation Error:', err);
    return {
      success: false,
      error: {
        code: 'PRINT_FAILED',
        message: err?.message || 'Failed to generate and download PDF file.',
      },
    };
  } finally {
    // 5. Restore previous zoom scale
    if (zoomContainer) {
      zoomContainer.style.transform = previousTransform;
    }
    try {
      onAfterPrint?.();
    } catch {
      // Non-critical
    }
  }
}
