import { getEffectiveDesignValues } from './getEffectiveDesignValues';

function getLightness(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  // Simple luminance formula
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

export function calculateReadabilityWarnings(cvData) {
  const issues = [];
  const recommendations = [];

  if (!cvData || !cvData.design) {
    return { level: 'safe', issues, recommendations };
  }

  const effective = getEffectiveDesignValues(cvData.design);
  const { 
    fontSize, 
    lineHeight, 
    primaryColor, 
    showSectionDividers, 
    headingStyle,
    skillsPresentation
  } = effective;

  // SMALL_FONT_COMPACT_DENSITY
  if (fontSize === 'sm' && effective.sectionSpacing === 'tight') {
    issues.push('SMALL_FONT_COMPACT_DENSITY');
    recommendations.push('Increase font size to medium or use normal section spacing.');
  }

  // TIGHT_LINE_HEIGHT_LONG_SUMMARY
  if (lineHeight === 'tight' && cvData.summary && cvData.summary.length > 300) {
    issues.push('TIGHT_LINE_HEIGHT_LONG_SUMMARY');
    recommendations.push('Use normal or relaxed line height for long paragraphs to improve readability.');
  }

  // LOW_CONTRAST_PRIMARY_COLOR
  if (primaryColor) {
    const lightness = getLightness(primaryColor);
    if (lightness > 0.8) {
      issues.push('LOW_CONTRAST_PRIMARY_COLOR');
      recommendations.push('Select a darker primary color to ensure good contrast on white paper.');
    }
  }

  // HIDDEN_DIVIDERS_UNDERSTATED_HEADINGS
  if (showSectionDividers === false && headingStyle === 'understated') {
    issues.push('HIDDEN_DIVIDERS_UNDERSTATED_HEADINGS');
    recommendations.push('Show section dividers or use a stronger heading style to separate sections clearly.');
  }

  // INLINE_SKILLS_OVERFLOW_RISK
  if (skillsPresentation === 'inline' && cvData.skills && cvData.skills.length > 15) {
    issues.push('INLINE_SKILLS_OVERFLOW_RISK');
    recommendations.push('Consider using a list or grouped presentation for a large number of skills.');
  }

  // TOO_MANY_ACHIEVEMENTS
  let maxAchievements = 0;
  if (cvData.experiences) {
    cvData.experiences.forEach(exp => {
      if (exp.achievements && exp.achievements.length > maxAchievements) {
        maxAchievements = exp.achievements.length;
      }
    });
  }
  if (maxAchievements > 6) {
    issues.push('TOO_MANY_ACHIEVEMENTS');
    recommendations.push('Limit achievements to 4-5 bullet points per experience for better impact.');
  }

  // Determine Level
  let level = 'safe';
  if (issues.length > 0) level = 'review';
  if (issues.length > 2 || issues.includes('LOW_CONTRAST_PRIMARY_COLOR')) level = 'warning';

  return { level, issues, recommendations };
}

export function getSaferDesignSettings(currentDesign) {
  const safe = { ...currentDesign };
  
  if (safe.fontSize === 'sm') safe.fontSize = 'md';
  if (safe.lineHeight === 'tight') safe.lineHeight = 'normal';
  if (safe.showSectionDividers === false && safe.headingStyle === 'understated') {
    safe.headingStyle = 'standard';
  }
  if (safe.primaryColor) {
    const lightness = getLightness(safe.primaryColor);
    if (lightness > 0.8) safe.primaryColor = '#1e293b'; // Fallback to safe dark slate
  }
  
  return safe;
}
