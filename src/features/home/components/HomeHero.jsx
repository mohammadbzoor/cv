import { HeroContent } from './HeroContent';
import { HeroActions } from './HeroActions';
import { HeroCVPreview } from './HeroCVPreview';
import { MotionReveal } from '../../motion/components/MotionReveal';

export function HomeHero() {
  return (
    <section className="py-8 md:py-14 border-b border-border/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Text & Actions */}
        <div className="lg:col-span-7 space-y-6">
          <MotionReveal direction="up" delay={0}>
            <HeroContent />
          </MotionReveal>

          <MotionReveal direction="up" delay={100}>
            <HeroActions />
          </MotionReveal>
        </div>

        {/* Right Column: Miniature Visual Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <MotionReveal direction="up" delay={200}>
            <HeroCVPreview />
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
