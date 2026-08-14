/**
 * Calculates pressure metrics deterministically based on text volume and design settings.
 *
 * @param {object} cvData
 * @param {object} design
 * @returns {object}
 */
export function calculateContentPressure(cvData = {}, design = {}) {
  const experiences = cvData?.experiences || [];
  const projects = cvData?.projects || [];
  const skills = cvData?.skills || [];
  const summary = cvData?.summary || '';

  let wordCount = summary.split(/\s+/).filter(Boolean).length;
  experiences.forEach((exp) => {
    wordCount += (exp.description || '').split(/\s+/).filter(Boolean).length;
    if (Array.isArray(exp.achievements)) {
      exp.achievements.forEach((ach) => {
        wordCount += ach.split(/\s+/).filter(Boolean).length;
      });
    }
  });

  let score = wordCount * 0.2 + experiences.length * 10 + projects.length * 8 + skills.length * 2;

  if (design.density === 'compact') score *= 0.8;
  if (design.fontSize === 'sm') score *= 0.85;
  if (design.margins === 'tight') score *= 0.85;

  if (score < 60) {
    return {
      level: 'comfortable',
      color: 'text-success bg-success-subtle border-success/20',
      barPercent: 30,
      suggestions: ['comfortableDesc'],
    };
  }

  if (score < 110) {
    return {
      level: 'approaching-limit',
      color: 'text-info bg-info-subtle border-info/20',
      barPercent: 65,
      suggestions: ['approachingLimitDesc'],
    };
  }

  if (score < 160) {
    return {
      level: 'dense',
      color: 'text-warning bg-warning-subtle border-warning/20',
      barPercent: 85,
      suggestions: ['denseDesc', 'suggestCompactTpl'],
    };
  }

  return {
    level: 'overflow-risk',
    color: 'text-danger bg-danger-subtle border-danger/20',
    barPercent: 98,
    suggestions: ['overflowRiskDesc', 'suggestCompactTpl', 'suggestReduceText'],
  };
}
