import { cn } from '../../../utils/cn';

/**
 * Pure CSS Miniature Thumbnail representation of templates.
 */
export function TemplateThumbnail({ variant = 'technical-prime', className }) {
  return (
    <div
      aria-hidden="true"
      lang="en"
      dir="ltr"
      className={cn(
        'w-full aspect-[210/297] bg-white border border-slate-200 rounded-md p-3 select-none flex flex-col justify-between text-slate-800 shadow-2xs overflow-hidden relative',
        className
      )}
    >
      {variant === 'technical-prime' && (
        <div className="space-y-2 w-full">
          <div className="border-b border-slate-300 pb-1 text-start space-y-0.5">
            <div className="h-3 w-3/5 bg-slate-900 rounded-xs" />
            <div className="h-1.5 w-2/5 bg-slate-600 rounded-xs" />
            <div className="h-1 w-4/5 bg-slate-300 rounded-xs mt-0.5" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/3 bg-slate-800 rounded-xs" />
            <div className="h-1 w-full bg-slate-200 rounded-xs" />
            <div className="h-1 w-5/6 bg-slate-200 rounded-xs" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/3 bg-slate-800 rounded-xs" />
            <div className="flex gap-1">
              <div className="h-2 w-10 bg-slate-100 border border-slate-200 rounded-xs" />
              <div className="h-2 w-10 bg-slate-100 border border-slate-200 rounded-xs" />
              <div className="h-2 w-8 bg-slate-100 border border-slate-200 rounded-xs" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/3 bg-slate-800 rounded-xs" />
            <div className="h-1 w-full bg-slate-200 rounded-xs" />
          </div>
        </div>
      )}

      {variant === 'classic' && (
        <div className="space-y-2 w-full">
          <div className="border-b border-slate-300 pb-1 text-center space-y-0.5">
            <div className="h-2.5 w-1/2 bg-slate-800 rounded-xs mx-auto" />
            <div className="h-1.5 w-1/3 bg-slate-400 rounded-xs mx-auto" />
          </div>
          <div className="space-y-1 pt-1">
            <div className="h-1.5 w-1/4 bg-slate-700 rounded-xs" />
            <div className="h-1 w-full bg-slate-200 rounded-xs" />
            <div className="h-1 w-4/5 bg-slate-200 rounded-xs" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/4 bg-slate-700 rounded-xs" />
            <div className="h-1 w-full bg-slate-200 rounded-xs" />
            <div className="h-1 w-3/4 bg-slate-200 rounded-xs" />
          </div>
        </div>
      )}

      {variant === 'professional' && (
        <div className="space-y-2 w-full">
          <div className="border-b-2 border-slate-800 pb-1.5 space-y-1 text-start">
            <div className="h-3 w-3/5 bg-slate-900 rounded-xs" />
            <div className="h-1.5 w-2/5 bg-slate-500 rounded-xs" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/3 bg-slate-800 rounded-xs" />
            <div className="h-1 w-full bg-slate-200 rounded-xs" />
            <div className="h-1 w-full bg-slate-200 rounded-xs" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/3 bg-slate-800 rounded-xs" />
            <div className="h-1 w-5/6 bg-slate-200 rounded-xs" />
          </div>
        </div>
      )}

      {variant === 'compact' && (
        <div className="space-y-1.5 w-full text-start">
          <div className="border-b border-slate-300 pb-0.5 space-y-0.5 text-center">
            <div className="h-2 w-2/5 bg-slate-900 rounded-xs mx-auto" />
            <div className="h-1 w-1/4 bg-slate-500 rounded-xs mx-auto" />
          </div>
          <div className="space-y-0.5">
            <div className="h-1 w-1/5 bg-slate-800 rounded-xs" />
            <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
            <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
          </div>
          <div className="space-y-0.5">
            <div className="h-1 w-1/5 bg-slate-800 rounded-xs" />
            <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
            <div className="h-0.5 w-4/5 bg-slate-200 rounded-xs" />
          </div>
          <div className="space-y-0.5">
            <div className="h-1 w-1/5 bg-slate-800 rounded-xs" />
            <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
          </div>
        </div>
      )}

      {variant === 'executive' && (
        <div className="space-y-2 w-full text-start">
          <div className="border-b-2 border-slate-900 pb-1 space-y-0.5">
            <div className="h-3 w-2/3 bg-slate-900 rounded-xs" />
            <div className="h-1.5 w-2/5 bg-slate-600 rounded-xs" />
          </div>
          <div className="p-1 bg-slate-100 border-s-2 border-slate-800 space-y-0.5">
            <div className="h-1 w-1/4 bg-slate-800 rounded-xs" />
            <div className="h-1 w-full bg-slate-300 rounded-xs" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/3 bg-slate-800 rounded-xs" />
            <div className="h-1 w-full bg-slate-200 rounded-xs" />
            <div className="h-1 w-4/5 bg-slate-200 rounded-xs" />
          </div>
        </div>
      )}

      {variant === 'developer' && (
        <div className="space-y-2 w-full font-mono text-start">
          <div className="border-b border-blue-500 pb-1 space-y-1">
            <div className="h-3 w-1/2 bg-blue-600 rounded-xs" />
            <div className="h-1.5 w-1/3 bg-slate-600 rounded-xs" />
          </div>
          <div className="flex gap-1 pt-0.5">
            <div className="h-2 w-7 bg-blue-50 border border-blue-200 rounded-xs" />
            <div className="h-2 w-7 bg-blue-50 border border-blue-200 rounded-xs" />
            <div className="h-2 w-7 bg-blue-50 border border-blue-200 rounded-xs" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/3 bg-blue-800 rounded-xs" />
            <div className="h-1 w-full bg-slate-200 rounded-xs" />
            <div className="h-1 w-3/4 bg-slate-200 rounded-xs" />
          </div>
        </div>
      )}
    </div>
  );
}
