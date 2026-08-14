import { useTranslation } from 'react-i18next';
import { HomeSectionHeader } from './HomeSectionHeader';
import { MotionReveal } from '../../motion/components/MotionReveal';
import { Sliders, Layout, Eye, CheckCircle2 } from 'lucide-react';

/**
 * Miniature HTML/CSS Studio Builder Showcase.
 * Demonstrates the 3-panel studio builder interface visually without embedding the real builder.
 */
export function BuilderShowcase() {
  const { t } = useTranslation('home');

  return (
    <section className="py-12 border-b border-border/40 space-y-8">
      <HomeSectionHeader
        eyebrow={t('builderShowcaseEyebrow')}
        title={t('builderShowcaseTitle')}
        description={t('builderShowcaseDesc')}
      />

      <MotionReveal direction="up" delay={100}>
        <div
          aria-hidden="true"
          className="bg-surface border border-border rounded-2xl p-4 md:p-6 shadow-xl max-w-5xl mx-auto space-y-4 select-none pointer-events-none"
        >
          {/* Header Bar */}
          <div className="h-10 bg-surface-muted rounded-xl px-4 flex items-center justify-between text-xs text-foreground-secondary border border-border/60">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <Sliders className="w-4 h-4 text-primary" />
              <span>Studio Builder Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] bg-success-subtle text-success font-semibold px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Saved locally
              </span>
            </div>
          </div>

          {/* 3-Column Studio Layout Preview */}
          <div className="grid grid-cols-12 gap-4 h-64 md:h-80 overflow-hidden text-start">
            {/* Left: Content Panel */}
            <div className="col-span-3 bg-surface-elevated border border-border/60 rounded-xl p-3 space-y-2 hidden md:block">
              <div className="text-[11px] font-bold text-foreground flex items-center gap-1.5 border-b border-border/40 pb-1.5">
                <Layout className="w-3.5 h-3.5 text-primary" />
                <span>Content</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-3 bg-surface-muted rounded-xs w-3/4" />
                <div className="h-3 bg-surface-muted rounded-xs w-full" />
                <div className="h-3 bg-surface-muted rounded-xs w-5/6" />
                <div className="h-12 bg-primary-subtle/30 rounded-lg p-2 space-y-1 border border-primary/10 mt-2">
                  <div className="h-2 bg-primary/20 rounded-xs w-2/3" />
                  <div className="h-2 bg-primary/20 rounded-xs w-full" />
                </div>
              </div>
            </div>

            {/* Middle: A4 Live Preview */}
            <div className="col-span-12 md:col-span-6 bg-app-bg border border-border/60 rounded-xl p-3 flex justify-center items-center overflow-hidden">
              <div
                lang="en"
                dir="ltr"
                className="w-44 h-60 bg-white text-slate-900 rounded-sm shadow-md border border-slate-200 p-3 space-y-1.5 text-[8px] font-sans"
              >
                <div className="font-extrabold text-[9px] uppercase border-b border-slate-200 pb-1 text-slate-900">
                  Alex Morgan
                </div>
                <div className="h-1.5 bg-slate-200 rounded-xs w-full" />
                <div className="h-1.5 bg-slate-200 rounded-xs w-4/5" />
                <div className="text-[7px] font-bold uppercase text-slate-700 pt-1">Experience</div>
                <div className="h-1 bg-slate-100 rounded-xs w-full" />
                <div className="h-1 bg-slate-100 rounded-xs w-full" />
                <div className="h-1 bg-slate-100 rounded-xs w-3/4" />
              </div>
            </div>

            {/* Right: Design Panel */}
            <div className="col-span-3 bg-surface-elevated border border-border/60 rounded-xl p-3 space-y-2 hidden md:block">
              <div className="text-[11px] font-bold text-foreground flex items-center gap-1.5 border-b border-border/40 pb-1.5">
                <Eye className="w-3.5 h-3.5 text-secondary" />
                <span>Design</span>
              </div>
              <div className="space-y-2">
                <div className="flex gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-slate-800 border border-border" />
                  <div className="w-4 h-4 rounded-full bg-emerald-700 border border-border" />
                  <div className="w-4 h-4 rounded-full bg-amber-700 border border-border" />
                </div>
                <div className="h-3 bg-surface-muted rounded-xs w-full" />
                <div className="h-3 bg-surface-muted rounded-xs w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
