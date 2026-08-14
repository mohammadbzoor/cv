import { PreviewPage } from './PreviewPage';

/**
 * Scalable Live Preview Viewport.
 * Applies CSS scale transformation to fit A4 document inside container.
 */
export function CVPreview({ zoomScale = 1.0 }) {
  return (
    <div className="flex justify-center items-start py-8 px-4 min-h-full">
      <div
        className="transition-transform duration-200 ease-out origin-top"
        style={{
          transform: `scale(${zoomScale})`,
        }}
      >
        <PreviewPage />
      </div>
    </div>
  );
}
