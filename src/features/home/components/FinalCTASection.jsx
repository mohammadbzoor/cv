import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlusCircle, LayoutTemplate, ArrowLeft, ArrowRight } from 'lucide-react';
import { ROUTE_PATHS } from '../../../app/routePaths';
import { Button } from '../../../components/ui/Button';
import { MotionReveal } from '../../motion/components/MotionReveal';
import { useLanguage } from '../../../hooks/useLanguage';

export function FinalCTASection() {
  const { t } = useTranslation('home');
  const { isRTL } = useLanguage();
  const ActionArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-14">
      <MotionReveal direction="up" delay={0}>
        <div className="bg-primary text-on-primary rounded-3xl p-8 md:p-12 text-center space-y-6 max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {t('finalCtaTitle')}
            </h2>
            <p className="text-xs md:text-sm text-on-primary/80 leading-relaxed">
              {t('finalCtaDesc')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to={ROUTE_PATHS.CREATE}>
              <Button
                type="button"
                variant="accent"
                size="md"
                leadingIcon={PlusCircle}
                trailingIcon={ActionArrow}
              >
                {t('ctaCreateCv')}
              </Button>
            </Link>

            <Link to={ROUTE_PATHS.TEMPLATES}>
              <Button
                type="button"
                variant="outline"
                size="md"
                leadingIcon={LayoutTemplate}
                className="bg-transparent text-on-primary border-on-primary/30 hover:bg-on-primary/10"
              >
                {t('ctaBrowseTemplates')}
              </Button>
            </Link>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
