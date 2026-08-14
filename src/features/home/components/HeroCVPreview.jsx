import { CheckCircle2, BarChart2 } from 'lucide-react';

/**
 * Miniature HTML/CSS CV paper sheet preview for Hero section.
 * Rendered strictly with lang="en" dir="ltr" and white A4 sheet background.
 */
export function HeroCVPreview() {
  return (
    <div className="relative w-full max-w-md mx-auto select-none pointer-events-none" aria-hidden="true">
      {/* Paper Sheet */}
      <div
        lang="en"
        dir="ltr"
        className="w-full aspect-[210/297] bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-4 text-start font-sans text-xs relative overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-slate-200 pb-3 space-y-1">
          <div className="text-base font-extrabold tracking-tight text-slate-900 uppercase">
            ALEX MORGAN
          </div>
          <div className="text-xs font-semibold text-slate-600">
            Senior Software Engineer
          </div>
          <div className="text-[10px] text-slate-500 font-mono flex flex-wrap gap-2 pt-0.5">
            <span>alex@example.com</span>
            <span>•</span>
            <span>+1 (555) 019-2834</span>
            <span>•</span>
            <span>San Francisco, CA</span>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-0.5">
            Professional Summary
          </div>
          <p className="text-[10px] text-slate-600 leading-relaxed">
            Versatile Senior Software Engineer with 6+ years of experience designing scalable web applications and resilient systems. Specializing in React, TypeScript, and modern Front-End architecture.
          </p>
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-0.5">
            Experience
          </div>

          <div className="space-y-0.5">
            <div className="flex justify-between items-baseline text-[10px] font-bold text-slate-900">
              <span>Lead Frontend Engineer — TechCorp</span>
              <span className="text-[9px] font-mono text-slate-400">2022 – Present</span>
            </div>
            <p className="text-[9.5px] text-slate-600 leading-normal">
              Led team of 5 engineers building modern SaaS design systems. Reduced bundle load time by 45%.
            </p>
          </div>

          <div className="space-y-0.5">
            <div className="flex justify-between items-baseline text-[10px] font-bold text-slate-900">
              <span>Software Developer — DataFlow Inc</span>
              <span className="text-[9px] font-mono text-slate-400">2019 – 2022</span>
            </div>
            <p className="text-[9.5px] text-slate-600 leading-normal">
              Engineered responsive dashboards with real-time state synchronization using Zustand and React.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-0.5">
            Skills
          </div>
          <div className="flex flex-wrap gap-1 text-[9px] text-slate-700 font-mono">
            <span className="px-1.5 py-0.5 bg-slate-100 rounded-xs">React.js</span>
            <span className="px-1.5 py-0.5 bg-slate-100 rounded-xs">JavaScript</span>
            <span className="px-1.5 py-0.5 bg-slate-100 rounded-xs">Tailwind CSS</span>
            <span className="px-1.5 py-0.5 bg-slate-100 rounded-xs">Zustand</span>
            <span className="px-1.5 py-0.5 bg-slate-100 rounded-xs">Zod</span>
            <span className="px-1.5 py-0.5 bg-slate-100 rounded-xs">REST APIs</span>
          </div>
        </div>
      </div>

      {/* Floating Accent Badge 1: ATS Readiness Score */}
      <div className="absolute -bottom-3 -start-3 bg-surface border border-border rounded-xl p-3 shadow-lg flex items-center gap-2.5 z-10 text-xs font-semibold text-foreground">
        <div className="p-1.5 bg-success-subtle text-success rounded-lg">
          <BarChart2 className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] text-foreground-secondary font-normal">ATS Readiness</div>
          <div className="text-xs font-bold text-success">94 / 100</div>
        </div>
      </div>

      {/* Floating Accent Badge 2: Saved Locally */}
      <div className="absolute -top-3 -end-3 bg-surface border border-border rounded-xl p-2.5 shadow-lg flex items-center gap-2 z-10 text-[11px] font-medium text-foreground">
        <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
        <span>Saved Locally</span>
      </div>
    </div>
  );
}
