import { useTranslation } from 'react-i18next';
import { HOME_FAQ_ITEMS } from '../data/homeFaq';
import { HomeSectionHeader } from './HomeSectionHeader';
import { Accordion, AccordionItem } from '../../../components/ui/Accordion';
import { MotionReveal } from '../../motion/components/MotionReveal';

export function HomeFAQSection() {
  const { t } = useTranslation('home');

  return (
    <section className="py-12 border-b border-border/40 space-y-8">
      <HomeSectionHeader
        eyebrow={t('faqEyebrow')}
        title={t('faqTitle')}
        description={t('faqDesc')}
      />

      <MotionReveal direction="up" delay={100}>
        <div className="max-w-3xl mx-auto text-start">
          <Accordion type="single" collapsible className="space-y-3">
            {HOME_FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                title={t(item.questionKey)}
                className="bg-surface border border-border rounded-xl px-4 py-1"
              >
                <p className="text-xs text-foreground-secondary leading-relaxed py-2">
                  {t(item.answerKey)}
                </p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </MotionReveal>
    </section>
  );
}
