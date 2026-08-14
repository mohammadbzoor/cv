import { createEmptyCV } from '../../cv/models/cvFactories';

/**
 * Safe generic preview sample data.
 * Used exclusively for template gallery previews when user's CV is empty.
 * Never saved to store or persistent storage.
 */
export const SAMPLE_CV_DATA = Object.freeze({
  ...createEmptyCV(),
  id: 'sample-cv-preview',
  title: 'Sample Engineering Resume',
  personalInfo: {
    fullName: 'ALEX MORGAN',
    jobTitle: 'Senior Software Engineer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    website: 'https://alexmorgan.example.com',
    linkedin: 'https://linkedin.com/in/alexmorgan-demo',
    github: 'https://github.com/alexmorgan-demo',
    photo: null,
  },
  summary:
    'Versatile Senior Software Engineer with 6+ years of experience designing scalable web applications and resilient front-end design systems. Proven track record of improving site performance, leading engineering teams, and building accessibility-first SaaS solutions.',
  experiences: [
    {
      id: 'exp-sample-1',
      company: 'TechCorp Solutions',
      position: 'Senior Frontend Engineer',
      location: 'San Francisco, CA',
      startDate: '2022',
      endDate: 'Present',
      isCurrent: true,
      description:
        'Architected modern design system components using React, Tailwind CSS, and Zustand. Reduced core bundle load time by 42% across flagship products.',
      achievements: [
        'Led a team of 6 engineers migrating legacy web UI to React 19 architecture.',
        'Implemented end-to-end automated testing pipelines achieving 95%+ test coverage.',
      ],
    },
    {
      id: 'exp-sample-2',
      company: 'DataFlow Systems',
      position: 'Full Stack Developer',
      location: 'Austin, TX',
      startDate: '2019',
      endDate: '2022',
      isCurrent: false,
      description:
        'Engineered high-throughput analytics dashboards processing 10M+ daily events with Node.js, Express, and PostgreSQL.',
      achievements: [
        'Optimized database queries reducing average API latency from 450ms to 85ms.',
        'Spearheaded ATS-friendly export modules supporting native A4 PDF generation.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-sample-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2015',
      endDate: '2019',
      description: 'Graduated with Honors. Focus on Software Architecture and Algorithms.',
    },
  ],
  skills: [
    { id: 'sk-1', name: 'React.js', category: 'Frontend & UI', level: 'expert' },
    { id: 'sk-2', name: 'JavaScript (ES2023)', category: 'Frontend & UI', level: 'expert' },
    { id: 'sk-3', name: 'TypeScript', category: 'Frontend & UI', level: 'advanced' },
    { id: 'sk-4', name: 'Zustand & Redux', category: 'State & Data', level: 'expert' },
    { id: 'sk-5', name: 'Node.js & Express', category: 'Backend & APIs', level: 'advanced' },
    { id: 'sk-6', name: 'PostgreSQL', category: 'Backend & APIs', level: 'intermediate' },
    { id: 'sk-7', name: 'Vitest & Jest', category: 'Testing & Tools', level: 'advanced' },
    { id: 'sk-8', name: 'Tailwind CSS', category: 'Frontend & UI', level: 'expert' },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Design System Engine',
      description: 'An open-source design system component library built for high-performance React web apps.',
      technologies: ['React', 'Tailwind CSS', 'Vitest'],
      url: 'https://design-system.example.com',
      repositoryUrl: 'https://github.com/alexmorgan-demo/design-system',
      startDate: '2023',
      endDate: '2024',
    },
    {
      id: 'proj-2',
      name: 'ATS Document Exporter',
      description: 'Browser-native print & PDF generator adhering to single-column ATS document standards.',
      technologies: ['JavaScript', 'CSS Print', 'HTML5'],
      url: 'https://ats-export.example.com',
      repositoryUrl: 'https://github.com/alexmorgan-demo/ats-export',
      startDate: '2023',
      endDate: '2023',
    },
  ],
  certificates: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023',
      expiryDate: '2026',
      credentialId: 'AWS-987654321',
      credentialUrl: '',
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'native' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'intermediate' },
  ],
});

/**
 * Returns user CV data if non-empty, otherwise returns safe generic sample CV data for previews.
 *
 * @param {object} cvData
 * @returns {{ data: object, isSample: boolean }}
 */
export function getPreviewCvData(cvData) {
  const hasUserContent = Boolean(
    cvData?.personalInfo?.fullName?.trim() ||
    cvData?.summary?.trim() ||
    (Array.isArray(cvData?.experiences) && cvData.experiences.length > 0) ||
    (Array.isArray(cvData?.skills) && cvData.skills.length > 0)
  );

  if (hasUserContent) {
    return { data: cvData, isSample: false };
  }

  return {
    data: {
      ...SAMPLE_CV_DATA,
      design: {
        ...SAMPLE_CV_DATA.design,
        ...cvData?.design,
      },
    },
    isSample: true,
  };
}
