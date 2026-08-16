import { getEffectiveDesignValues } from './getEffectiveDesignValues';

const FONT_SIZE_MAP = {
  sm: '0.8125rem',
  md: '0.875rem',
  lg: '1.0rem',
};

const LINE_HEIGHT_MAP = {
  tight: '1.28',
  normal: '1.45',
  relaxed: '1.65',
};

const MARGIN_MAP = {
  compact: '1.0cm',
  normal: '1.5cm',
  spacious: '2.0cm',
};

const SECTION_SPACING_MAP = {
  tight: '0.5rem',
  normal: '1.0rem',
  relaxed: '1.5rem',
};

const ITEM_SPACING_MAP = {
  tight: '0.25rem',
  normal: '0.5rem',
  relaxed: '0.875rem',
};

const PARAGRAPH_SPACING_MAP = {
  tight: '0.125rem',
  normal: '0.25rem',
  relaxed: '0.5rem',
};

const HEADING_STYLE_MAP = {
  understated: { weight: '500', size: '1.125em', uppercase: 'none' },
  standard: { weight: '600', size: '1.25em', uppercase: 'none' },
  prominent: { weight: '700', size: '1.5em', uppercase: 'uppercase' },
};

const FONT_MAP = {
  Inter: 'Inter, system-ui, sans-serif',
  Arial: 'Arial, Helvetica, sans-serif',
  Georgia: 'Georgia, "Times New Roman", serif',
  'System Sans': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

export function getTemplateDesignVariables(designSettings, templateDefinition = null) {
  const effective = getEffectiveDesignValues(designSettings, templateDefinition);

  const primaryColor = effective.primaryColor || '#1e293b';
  const fontFamily = FONT_MAP[effective.fontFamily] || effective.fontFamily || 'Inter, system-ui, sans-serif';
  
  const fontSize = FONT_SIZE_MAP[effective.fontSize] || FONT_SIZE_MAP.md;
  const lineHeight = LINE_HEIGHT_MAP[effective.lineHeight] || LINE_HEIGHT_MAP.normal;
  const pageMargin = MARGIN_MAP[effective.margins] || MARGIN_MAP.normal;
  
  const sectionSpacing = SECTION_SPACING_MAP[effective.sectionSpacing] || SECTION_SPACING_MAP.normal;
  const itemSpacing = ITEM_SPACING_MAP[effective.itemSpacing] || ITEM_SPACING_MAP.normal;
  const paragraphSpacing = PARAGRAPH_SPACING_MAP[effective.paragraphSpacing] || PARAGRAPH_SPACING_MAP.normal;

  const headingStyle = HEADING_STYLE_MAP[effective.headingStyle] || HEADING_STYLE_MAP.standard;

  const dividerWidth = effective.showSectionDividers !== false ? '1px' : '0px';
  const dividerColor = effective.showSectionDividers !== false ? 'var(--cv-border-color, #e2e8f0)' : 'transparent';

  if (effective.density === 'ultra-compact') {
    return {
      '--cv-primary-color': primaryColor,
      '--cv-font-family': fontFamily,
      '--cv-font-size': '0.75rem',
      '--cv-line-height': '1.22',
      '--cv-page-margin': '0.8cm',
      '--cv-section-spacing': '0.375rem',
      '--cv-item-spacing': '0.15rem',
      '--cv-paragraph-spacing': '0.075rem',
      '--cv-heading-weight': headingStyle.weight,
      '--cv-heading-size': '1.1em',
      '--cv-heading-transform': headingStyle.uppercase,
      '--cv-divider-width': dividerWidth,
      '--cv-divider-color': dividerColor,
    };
  }

  return {
    '--cv-primary-color': primaryColor,
    '--cv-font-family': fontFamily,
    '--cv-font-size': fontSize,
    '--cv-line-height': lineHeight,
    '--cv-page-margin': pageMargin,
    '--cv-section-spacing': sectionSpacing,
    '--cv-item-spacing': itemSpacing,
    '--cv-paragraph-spacing': paragraphSpacing,
    '--cv-heading-weight': headingStyle.weight,
    '--cv-heading-size': headingStyle.size,
    '--cv-heading-transform': headingStyle.uppercase,
    '--cv-divider-width': dividerWidth,
    '--cv-divider-color': dividerColor,
  };
}
