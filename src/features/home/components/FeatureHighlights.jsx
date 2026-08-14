import { useTranslation } from 'react-i18next';
import { FEATURE_HIGHLIGHTS } from '../data/featureHighlights';
import { HomeSectionHeader } from './HomeSectionHeader';
import { MotionStagger } from '../../motion/components/MotionStagger';

export function FeatureHighlights() {
  const { t } = useTranslation('home');

  return (
    <section className="py-12 border-b border-border/40 space-y-8">
      <HomeSectionHeader
        eyebrow={t('featuresEyebrow')}
        title={t('featuresTitle')}
        description={t('featuresDesc')}
      />

      <MotionStagger
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        staggerInterval={60}
      >
        {FEATURE_HIGHLIGHTS.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="p-6 bg-surface border border-border rounded-2xl shadow-2xs space-y-3"
            >
              <div className="p-3 bg-secondary-subtle text-secondary rounded-xl w-fit">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-foreground">{t(item.titleKey)}</h3>
              <p className="text-xs text-foreground-secondary leading-relaxed">{t(item.descKey)}</p>
            </div>
          );
        })}
      </MotionStagger>
    </section>
  );
}
