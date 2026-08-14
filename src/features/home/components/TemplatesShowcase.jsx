import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TEMPLATES_METADATA } from '../../templates/registry/templateMetadata';
import { TemplateShowcaseCard } from './TemplateShowcaseCard';
import { HomeSectionHeader } from './HomeSectionHeader';
import { MotionStagger } from '../../motion/components/MotionStagger';
import { ROUTE_PATHS } from '../../../app/routePaths';
import { Button } from '../../../components/ui/Button';
import { useLanguage } from '../../../hooks/useLanguage';

export function TemplatesShowcase() {
  const { t } = useTranslation('home');
  const { isRTL } = useLanguage();
  const ActionArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-12 border-b border-border/40 space-y-8">
      <HomeSectionHeader
        eyebrow={t('templatesEyebrow')}
        title={t('templatesTitle')}
        description={t('templatesDesc')}
      />

      <MotionStagger
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        staggerInterval={80}
      >
        {TEMPLATES_METADATA.map((tpl) => (
          <TemplateShowcaseCard key={tpl.id} template={tpl} />
        ))}
      </MotionStagger>

      <div className="text-center pt-2">
        <Link to={ROUTE_PATHS.TEMPLATES}>
          <Button
            type="button"
            variant="outline"
            size="md"
            trailingIcon={ActionArrow}
          >
            {t('ctaExploreAllTemplates')}
          </Button>
        </Link>
      </div>
    </section>
  );
}
