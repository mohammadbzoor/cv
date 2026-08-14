import { Spinner } from '../../ui/Spinner';

/**
 * Loading fallback shown during React.lazy route code-splitting.
 * Provides a centered spinner with minimal layout to prevent content shift.
 */
export function RouteLoadingFallback() {
  return (
    <div
      className="flex items-center justify-center min-h-[60vh] p-8"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" label="Loading page..." />
        <p className="text-sm text-foreground-secondary font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
