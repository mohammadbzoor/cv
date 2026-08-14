import { useTranslation } from 'react-i18next';
import { PROCESS_STEPS } from '../data/processSteps';
import { ProcessStep } from './ProcessStep';
import { HomeSectionHeader } from './HomeSectionHeader';
import { MotionStagger } from '../../motion/components/MotionStagger';

export function HowItWorksSection() {
  const { t } = useTranslation('home');

  return (
    <section className="py-12 border-b border-border/40 space-y-8">
      <HomeSectionHeader
        eyebrow={t('processEyebrow')}
        title={t('processTitle')}
        description={t('processDesc')}
      />

      <MotionStagger
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        staggerInterval={80}
      >
        {PROCESS_STEPS.map((step) => (
          <ProcessStep key={step.stepNumber} step={step} />
        ))}
      </MotionStagger>
    </section>
  );
}
