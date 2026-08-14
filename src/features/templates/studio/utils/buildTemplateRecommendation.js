import { rankTemplates } from './rankTemplates';

/**
 * Builds the top template recommendation payload.
 *
 * @param {object} inputs
 * @param {object} cvData
 * @returns {{ recommendedTemplateId: string, score: number, reasons: string[], alternatives: string[] }}
 */
export function buildTemplateRecommendation(inputs = {}, cvData = {}) {
  const ranked = rankTemplates(inputs, cvData);
  const top = ranked[0] || { templateId: 'technical-prime-ats', score: 90, reasons: ['generalAtsMatch'] };
  const alternatives = ranked.slice(1, 4).map((item) => item.templateId);

  return {
    recommendedTemplateId: top.templateId,
    score: top.score,
    reasons: top.reasons,
    alternatives,
  };
}
