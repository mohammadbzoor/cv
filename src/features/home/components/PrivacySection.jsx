import { useTranslation } from 'react-i18next';
import { Lock, HardDrive, EyeOff } from 'lucide-react';
import { MotionReveal } from '../../motion/components/MotionReveal';

export function PrivacySection() {
  const { t } = useTranslation('home');

  return (
    <section className="py-12 border-b border-border/40 space-y-6">
      <MotionReveal direction="up" delay={0}>
        <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-2xs space-y-6 max-w-4xl mx-auto text-start">
          <div className="flex items-center gap-3 border-b border-border/40 pb-4">
            <div className="p-2.5 bg-secondary-subtle text-secondary rounded-xl shrink-0">
              <Lock className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground">
                {t('privacyTitle')}
              </h2>
              <p className="text-xs text-foreground-secondary">
                {t('privacySubtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3.5 bg-app-bg rounded-xl border border-border/60">
              <HardDrive className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-foreground">{t('privacyPoint1Title')}</div>
                <div className="text-xs text-foreground-secondary leading-relaxed">{t('privacyPoint1Desc')}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-app-bg rounded-xl border border-border/60">
              <EyeOff className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-foreground">{t('privacyPoint2Title')}</div>
                <div className="text-xs text-foreground-secondary leading-relaxed">{t('privacyPoint2Desc')}</div>
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
