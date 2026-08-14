import { MotionReveal } from './MotionReveal';

/**
 * Section wrapper applying smooth entrance motion when scrolled into view.
 */
export function MotionSection({ children, className = '', ...props }) {
  return (
    <section className={className} {...props}>
      <MotionReveal direction="up" delay={0}>
        {children}
      </MotionReveal>
    </section>
  );
}
