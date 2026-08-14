/**
 * Deterministic Mock Improvement Suggestions Result.
 */
export const MOCK_IMPROVEMENT_RESULT = Object.freeze({
  id: 'improve_mock_3003',
  suggestions: [
    {
      id: 'sug_1',
      type: 'replace',
      fieldPath: 'summary',
      originalValue:
        'Results-driven Senior Full Stack Engineer with over 7 years of experience crafting enterprise cloud applications, high-throughput microservices, and reactive user interfaces. Skilled in React, Node.js, and AWS architecture.',
      suggestedValue:
        'Impact-focused Senior Full Stack Engineer with 7+ years of experience delivering high-availability cloud platforms and scalable React microservices. Engineered web applications serving 120k+ daily users with 99.99% uptime.',
      reason: 'Enhances executive presence by adding quantifiable metric impact and active verbs.',
      category: 'impact',
      status: 'pending',
    },
    {
      id: 'sug_2',
      type: 'replace',
      fieldPath: 'experiences.0.description',
      originalValue:
        'Architected modern single-page dashboard serving 120k daily active users. Improved page load efficiency by 38% through bundle splitting and automated caching.',
      suggestedValue:
        'Architected high-performance React dashboard scaling to 120,000+ daily active users. Spearheaded frontend optimization initiatives that accelerated page load speed by 38% and slashed JavaScript bundle overhead by 45%.',
      reason: 'Strengthens action verbs (spearheaded, slashed) and highlights measurable performance engineering results.',
      category: 'ats',
      status: 'pending',
    },
  ],
  summary: {
    total: 2,
    highImpact: 2,
    categories: ['impact', 'ats'],
  },
  improvedAt: new Date('2026-08-14T12:00:00Z').toISOString(),
  source: 'mock',
});
