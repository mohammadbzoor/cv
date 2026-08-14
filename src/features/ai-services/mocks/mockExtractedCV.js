/**
 * Deterministic extracted CV data structure generated from uploaded PDF/DOCX files.
 */
export const MOCK_EXTRACTED_CV = Object.freeze({
  title: 'Extracted Resume Draft',
  personalInfo: {
    fullName: 'Morgan Stanley',
    jobTitle: 'Senior Full Stack Engineer',
    email: 'morgan.stanley@example.com',
    phone: '+1 (555) 987-6543',
    location: 'Austin, TX, USA',
    website: 'https://morganstanley.dev',
    linkedin: 'https://linkedin.com/in/morganstanley-dev',
    github: 'https://github.com/morganstanley-dev',
  },
  summary:
    'Results-driven Senior Full Stack Engineer with over 7 years of experience crafting enterprise cloud applications, high-throughput microservices, and reactive user interfaces. Skilled in React, Node.js, and AWS architecture.',
  experiences: [
    {
      id: 'exp_mock_1',
      company: 'Apex Cloud Solutions',
      position: 'Lead Frontend Engineer',
      location: 'Austin, TX',
      startDate: '2021-03',
      endDate: '',
      isCurrent: true,
      description:
        'Architected modern single-page dashboard serving 120k daily active users. Improved page load efficiency by 38% through bundle splitting and automated caching.',
      achievements: ['Reduced bundle size by 45%', 'Mentored team of 5 junior developers'],
    },
    {
      id: 'exp_mock_2',
      company: 'Vanguard Systems',
      position: 'Software Engineer',
      location: 'Dallas, TX',
      startDate: '2018-06',
      endDate: '2021-02',
      isCurrent: false,
      description:
        'Engineered scalable REST APIs using Node.js and PostgreSQL. Designed automated CI/CD deployment pipelines on AWS ECS.',
      achievements: ['Maintained 99.99% system uptime'],
    },
  ],
  education: [
    {
      id: 'edu_mock_1',
      institution: 'University of Texas at Austin',
      degree: 'Bachelor of Science (B.S.)',
      field: 'Computer Science',
      location: 'Austin, TX',
      startDate: '2014-08',
      endDate: '2018-05',
      description: 'Graduated with Honors. Focus on Systems Architecture.',
    },
  ],
  skills: [
    { id: 'sk_mock_1', name: 'JavaScript / TypeScript', category: 'Frontend', level: 'expert' },
    { id: 'sk_mock_2', name: 'React.js', category: 'Frontend', level: 'expert' },
    { id: 'sk_mock_3', name: 'Node.js', category: 'Backend', level: 'advanced' },
    { id: 'sk_mock_4', name: 'PostgreSQL', category: 'Database', level: 'intermediate' },
    { id: 'sk_mock_5', name: 'AWS & Docker', category: 'DevOps', level: 'intermediate' },
  ],
  projects: [
    {
      id: 'proj_mock_1',
      name: 'Cloud Metrics Monitor',
      description: 'Real-time telemetry monitoring service built with React and WebSockets.',
      technologies: ['React', 'TypeScript', 'WebSockets', 'Tailwind'],
      url: 'https://metrics-demo.example.com',
      repositoryUrl: 'https://github.com/morganstanley-dev/cloud-metrics',
      startDate: '2022-01',
      endDate: '2022-06',
    },
  ],
  certificates: [
    {
      id: 'cert_mock_1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2022-04',
      expiryDate: '2025-04',
      credentialId: 'AWS-98765',
      credentialUrl: 'https://aws.amazon.com/verify',
    },
  ],
  languages: [
    { id: 'lang_mock_1', name: 'English', proficiency: 'native' },
    { id: 'lang_mock_2', name: 'Spanish', proficiency: 'intermediate' },
  ],
});
