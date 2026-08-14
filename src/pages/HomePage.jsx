import { useTranslation } from 'react-i18next';
import { PageContainer } from '../components/layout/PageContainer';
import { HomeHero } from '../features/home/components/HomeHero';
import { TrustStrip } from '../features/home/components/TrustStrip';
import { ServicesSection } from '../features/home/components/ServicesSection';
import { HowItWorksSection } from '../features/home/components/HowItWorksSection';
import { FeatureHighlights } from '../features/home/components/FeatureHighlights';
import { BuilderShowcase } from '../features/home/components/BuilderShowcase';
import { TemplatesShowcase } from '../features/home/components/TemplatesShowcase';
import { ATSExplanationSection } from '../features/home/components/ATSExplanationSection';
import { PrivacySection } from '../features/home/components/PrivacySection';
import { HomeFAQSection } from '../features/home/components/HomeFAQSection';
import { FinalCTASection } from '../features/home/components/FinalCTASection';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

/**
 * HomePage Component.
 * Assembles professional SaaS landing page sections.
 */
export default function HomePage() {
  const { t } = useTranslation(['home', 'common']);

  useDocumentMetadata({
    title: `${t('common:appTitle')} — ${t('home:heroBadge')}`,
    description: t('home:heroDescription'),
  });

  return (
    <PageContainer className="space-y-4">
      <HomeHero />
      <TrustStrip />
      <ServicesSection />
      <HowItWorksSection />
      <FeatureHighlights />
      <BuilderShowcase />
      <TemplatesShowcase />
      <ATSExplanationSection />
      <PrivacySection />
      <HomeFAQSection />
      <FinalCTASection />
    </PageContainer>
  );
}
