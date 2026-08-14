import { cn } from '../../../utils/cn';

/**
 * Pure CSS Miniature Thumbnail representation of templates.
 */
export function TemplateThumbnail({ variant = 'classic', className }) {
  return (
    <div
      aria-hidden="true"
      lang="en"
      dir="ltr"
      className={cn(
        'w-full aspect-[210/297] bg-white border border-slate-200 rounded p-3 select-none flex flex-col justify-between text-slate-800 shadow-2xs overflow-hidden',
        className
      )}
    >
      {variant === 'classic' && (
        <div className="space-y-2">
          <div className="border-b border-slate-300 pb-1 text-center space-y-0.5">
            <div className="h-2.5 w-1/2 bg-slate-800 rounded mx-auto" />
            <div className="h-1.5 w-1/3 bg-slate-400 rounded mx-auto" />
          </div>
          <div className="space-y-1 pt-1">
            <div className="h-1.5 w-1/4 bg-slate-700 rounded" />
            <div className="h-1 w-full bg-slate-200 rounded" />
            <div className="h-1 w-4/5 bg-slate-200 rounded" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/4 bg-slate-700 rounded" />
            <div className="h-1 w-full bg-slate-200 rounded" />
            <div className="h-1 w-3/4 bg-slate-200 rounded" />
          </div>
        </div>
      )}

      {variant === 'professional' && (
        <div className="space-y-2">
          <div className="border-b-2 border-slate-800 pb-1.5 space-y-1">
            <div className="h-3 w-3/5 bg-slate-900 rounded" />
            <div className="h-1.5 w-2/5 bg-slate-500 rounded" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/3 bg-slate-800 rounded" />
            <div className="h-1 w-full bg-slate-200 rounded" />
            <div className="h-1 w-full bg-slate-200 rounded" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/3 bg-slate-800 rounded" />
            <div className="h-1 w-5/6 bg-slate-200 rounded" />
          </div>
        </div>
      )}

      {variant === 'developer' && (
        <div className="space-y-2 font-mono">
          <div className="border-b border-blue-500 pb-1 space-y-1">
            <div className="h-3 w-1/2 bg-blue-600 rounded" />
            <div className="h-1.5 w-1/3 bg-slate-600 rounded" />
          </div>
          <div className="flex gap-1 pt-1">
            <div className="h-2 w-8 bg-blue-100 border border-blue-300 rounded" />
            <div className="h-2 w-8 bg-blue-100 border border-blue-300 rounded" />
            <div className="h-2 w-8 bg-blue-100 border border-blue-300 rounded" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-1/3 bg-blue-800 rounded" />
            <div className="h-1 w-full bg-slate-200 rounded" />
            <div className="h-1 w-3/4 bg-slate-200 rounded" />
          </div>
        </div>
      )}
    </div>
  );
}
