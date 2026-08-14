import { useTranslation } from 'react-i18next';
import { HOME_SERVICES } from '../data/homeServices';
import { ServiceCard } from './ServiceCard';
import { HomeSectionHeader } from './HomeSectionHeader';
import { MotionStagger } from '../../motion/components/MotionStagger';

export function ServicesSection() {
  const { t } = useTranslation('home');

  return (
    <section className="py-12 border-b border-border/40 space-y-8">
      <HomeSectionHeader
        eyebrow={t('servicesEyebrow')}
        title={t('servicesTitle')}
        description={t('servicesDesc')}
      />

      <MotionStagger
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        staggerInterval={60}
      >
        {HOME_SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </MotionStagger>
    </section>
  );
}
