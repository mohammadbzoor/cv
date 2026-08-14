/**
 * Deterministic Mock Analysis Result.
 */
export const MOCK_ANALYSIS_RESULT = Object.freeze({
  id: 'analysis_mock_1001',
  overallScore: 84,
  categories: {
    structure: 90,
    readability: 88,
    impact: 76,
    atsCompatibility: 92,
    completeness: 82,
  },
  strengths: [
    {
      id: 'str_1',
      code: 'CLEAR_STRUCTURE',
      message: 'Excellent single-column layout structure with well-defined section hierarchy.',
    },
    {
      id: 'str_2',
      code: 'ATS_READABLE_FONTS',
      message: 'Standard typography and clear headers enable seamless ATS text parsing.',
    },
    {
      id: 'str_3',
      code: 'COMPLETE_CONTACT',
      message: 'Complete contact information with professional email, location, and LinkedIn URL.',
    },
  ],
  weaknesses: [
    {
      id: 'weak_1',
      code: 'FEW_QUANTIFIABLE_METRICS',
      message: 'Work experience bullet points could benefit from additional numerical achievements.',
      fieldPath: 'experiences.0.description',
    },
    {
      id: 'weak_2',
      code: 'SHORT_SUMMARY',
      message: 'Professional summary statement could expand on core specialization metrics.',
      fieldPath: 'summary',
    },
  ],
  recommendations: [
    {
      id: 'rec_1',
      code: 'ADD_QUANTIFIED_IMPACT',
      title: 'Quantify Work Achievements',
      description: 'Include percentage improvements or dollar metrics to demonstrate concrete business impact.',
      fieldPath: 'experiences.0.description',
      priority: 'high',
    },
    {
      id: 'rec_2',
      code: 'EXPAND_SUMMARY_SPECIALIZATION',
      title: 'Highlight Core Technical Stack in Summary',
      description: 'Mention top 3 frameworks directly within the summary paragraph for instant recruiter scanning.',
      fieldPath: 'summary',
      priority: 'medium',
    },
  ],
  analyzedAt: new Date('2026-08-14T12:00:00Z').toISOString(),
  source: 'mock',
});
