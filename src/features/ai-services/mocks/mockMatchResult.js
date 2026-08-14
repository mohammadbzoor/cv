/**
 * Deterministic Mock Job Description Match Result.
 */
export const MOCK_MATCH_RESULT = Object.freeze({
  id: 'match_mock_2002',
  matchScore: 78,
  matchedSkills: ['JavaScript / TypeScript', 'React.js', 'Node.js', 'AWS & Docker'],
  missingSkills: ['GraphQL', 'Redis', 'Kubernetes', 'CI/CD Pipelines'],
  keywordSuggestions: ['GraphQL API Design', 'Redis Caching Layer', 'Kubernetes Orchestration', 'Microservices'],
  experienceAlignment: [
    {
      id: 'align_1',
      title: 'Frontend & Reactive UI Architecture',
      status: 'strong',
      explanation: '7+ years building enterprise React single-page applications aligns directly with target role requirements.',
    },
    {
      id: 'align_2',
      title: 'Distributed Microservices & Caching',
      status: 'partial',
      explanation: 'Node.js experience is strong, but missing explicit Redis caching and GraphQL server deployment details.',
    },
    {
      id: 'align_3',
      title: 'Kubernetes Container Management',
      status: 'missing',
      explanation: 'Job description emphasizes Kubernetes orchestration, which is currently unmentioned in resume experience.',
    },
  ],
  recommendations: [
    {
      id: 'rec_match_1',
      code: 'ADD_MISSING_KEYWORDS',
      title: 'Incorporate Target Keywords',
      description: 'If you possess experience with GraphQL or Redis, consider adding them to your skills list.',
      fieldPath: 'skills',
      priority: 'high',
    },
  ],
  summary:
    'Strong 78% overall match for Senior Full Stack Engineer role. Excellent core React/Node foundation with minor keyword gaps in Redis and GraphQL.',
  matchedAt: new Date('2026-08-14T12:00:00Z').toISOString(),
  source: 'mock',
});
