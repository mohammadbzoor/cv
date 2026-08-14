import React from 'react';
import { MotionReveal } from './MotionReveal';
import { MOTION_TOKENS } from '../constants/motionTokens';

/**
 * Wraps children and applies staggered delay to each child element.
 */
export function MotionStagger({
  children,
  staggerInterval = MOTION_TOKENS.staggerNormalMs,
  direction = 'up',
  className = '',
  as: Component = 'div',
  ...props
}) {
  const childrenArray = React.Children.toArray(children);

  return (
    <Component className={className} {...props}>
      {childrenArray.map((child, index) => (
        <MotionReveal
          key={child.key || index}
          delay={index * staggerInterval}
          direction={direction}
        >
          {child}
        </MotionReveal>
      ))}
    </Component>
  );
}
