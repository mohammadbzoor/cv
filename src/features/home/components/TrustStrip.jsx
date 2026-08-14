import { useTranslation } from 'react-i18next';
import { FileText, ShieldCheck, HardDrive, Globe, Printer } from 'lucide-react';
import { MotionReveal } from '../../motion/components/MotionReveal';

export function TrustStrip() {
  const { t } = useTranslation('home');

  const pillars = [
    { icon: FileText, labelKey: 'home:trustPillar1' },
    { icon: ShieldCheck, labelKey: 'home:trustPillar2' },
    { icon: HardDrive, labelKey: 'home:trustPillar3' },
    { icon: Globe, labelKey: 'home:trustPillar4' },
    { icon: Printer, labelKey: 'home:trustPillar5' },
  ];

  return (
    <div className="py-6 border-b border-border/40">
      <MotionReveal direction="up" delay={0}>
        <div className="text-center space-y-4">
          <div className="text-[11px] font-bold text-foreground-secondary uppercase tracking-widest">
            {t('trustStripTitle')}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border/60 rounded-xl text-xs font-medium text-foreground shadow-2xs"
                >
                  <Icon className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                  <span>{t(item.labelKey)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </MotionReveal>
    </div>
  );
}
