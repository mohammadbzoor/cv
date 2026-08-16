export function getEffectiveDesignValues(design) {
  if (!design) return {};

  const density = design.density || 'balanced';

  // Base values depending on density
  let densityBaseline = {
    sectionSpacing: 'normal',
    itemSpacing: 'normal',
    paragraphSpacing: 'normal',
    lineHeight: 'normal',
    margins: 'normal',
  };

  if (density === 'comfortable') {
    densityBaseline = {
      sectionSpacing: 'relaxed',
      itemSpacing: 'relaxed',
      paragraphSpacing: 'relaxed',
      lineHeight: 'relaxed',
      margins: 'spacious',
    };
  } else if (density === 'compact') {
    densityBaseline = {
      sectionSpacing: 'tight',
      itemSpacing: 'tight',
      paragraphSpacing: 'tight',
      lineHeight: 'tight',
      margins: 'compact',
    };
  } else if (density === 'ultra-compact') {
    densityBaseline = {
      sectionSpacing: 'tight',
      itemSpacing: 'tight',
      paragraphSpacing: 'tight',
      lineHeight: 'tight',
      margins: 'compact',
    };
  }

  // Merge explicitly set values over the density baseline.
  // We treat 'normal' as the inherit/auto value. If user sets 'tight' or 'relaxed', it overrides density.
  const overrides = {};
  if (design.sectionSpacing && design.sectionSpacing !== 'normal') overrides.sectionSpacing = design.sectionSpacing;
  if (design.itemSpacing && design.itemSpacing !== 'normal') overrides.itemSpacing = design.itemSpacing;
  if (design.paragraphSpacing && design.paragraphSpacing !== 'normal') overrides.paragraphSpacing = design.paragraphSpacing;
  if (design.lineHeight && design.lineHeight !== 'normal') overrides.lineHeight = design.lineHeight;
  if (design.margins && design.margins !== 'normal') overrides.margins = design.margins;

  const effective = {
    ...design, // carry over primaryColor, fontFamily, fontSize, headingStyle, etc.
    density,
    ...densityBaseline,
    ...overrides,
  };

  return effective;
}
