/**
 * Returns qualitative decision matrix criteria for a given template ID.
 * Uses descriptive qualitative labels instead of misleading percentage claims.
 *
 * @param {string} templateId
 * @returns {object}
 */
export function getTemplateDecisionReasons(templateId) {
  const matrix = {
    'technical-prime-ats': {
      parsingSimplicity: 'high',
      onePageSuitability: 'medium',
      projectEmphasis: 'high',
      executiveEmphasis: 'medium',
      visualDensity: 'medium',
      customizationRange: 'high',
      bestCareerLevel: ['mid', 'senior'],
      bestRoleFamilies: ['software', 'engineering'],
      readingOrderComplexity: 'simple',
      printStability: 'high',
    },
    'classic-ats': {
      parsingSimplicity: 'high',
      onePageSuitability: 'high',
      projectEmphasis: 'medium',
      executiveEmphasis: 'low',
      visualDensity: 'low',
      customizationRange: 'medium',
      bestCareerLevel: ['student', 'junior', 'mid'],
      bestRoleFamilies: ['general', 'business'],
      readingOrderComplexity: 'simple',
      printStability: 'high',
    },
    'professional-ats': {
      parsingSimplicity: 'high',
      onePageSuitability: 'medium',
      projectEmphasis: 'medium',
      executiveEmphasis: 'high',
      visualDensity: 'medium',
      customizationRange: 'high',
      bestCareerLevel: ['mid', 'senior', 'executive'],
      bestRoleFamilies: ['management', 'consulting', 'business'],
      readingOrderComplexity: 'simple',
      printStability: 'high',
    },
    'compact-ats': {
      parsingSimplicity: 'high',
      onePageSuitability: 'high',
      projectEmphasis: 'medium',
      executiveEmphasis: 'low',
      visualDensity: 'high',
      customizationRange: 'medium',
      bestCareerLevel: ['junior', 'mid'],
      bestRoleFamilies: ['software', 'general'],
      readingOrderComplexity: 'simple',
      printStability: 'high',
    },
    'executive-ats': {
      parsingSimplicity: 'high',
      onePageSuitability: 'medium',
      projectEmphasis: 'medium',
      executiveEmphasis: 'high',
      visualDensity: 'medium',
      customizationRange: 'high',
      bestCareerLevel: ['senior', 'executive'],
      bestRoleFamilies: ['management', 'consulting'],
      readingOrderComplexity: 'simple',
      printStability: 'high',
    },
    'developer': {
      parsingSimplicity: 'medium',
      onePageSuitability: 'medium',
      projectEmphasis: 'high',
      executiveEmphasis: 'low',
      visualDensity: 'medium',
      customizationRange: 'high',
      bestCareerLevel: ['junior', 'mid', 'senior'],
      bestRoleFamilies: ['software', 'engineering'],
      readingOrderComplexity: 'moderate',
      printStability: 'high',
    },
  };

  return matrix[templateId] || matrix['technical-prime-ats'];
}
