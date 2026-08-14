import { useTranslation } from 'react-i18next';
import { FileCheck, AlertTriangle } from 'lucide-react';
import { MotionReveal } from '../../motion/components/MotionReveal';

export function ATSExplanationSection() {
  const { t } = useTranslation('home');

  return (
    <section className="py-12 border-b border-border/40 space-y-6">
      <MotionReveal direction="up" delay={0}>
        <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-2xs space-y-4 max-w-4xl mx-auto text-start">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary-subtle text-primary rounded-xl shrink-0">
              <FileCheck className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground">
                {t('atsTitle')}
              </h2>
              <p className="text-xs text-foreground-secondary">
                {t('atsSubtitle')}
              </p>
            </div>
          </div>

          <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed">
            {t('atsExplanationText')}
          </p>

          <div className="p-3 bg-warning-subtle/50 border border-warning/20 rounded-xl text-xs text-warning flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span className="leading-relaxed font-medium">{t('atsDisclaimer')}</span>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
