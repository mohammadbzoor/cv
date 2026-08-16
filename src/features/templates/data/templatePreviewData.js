export const templatePreviewData = Object.freeze({
  personalInfo: {
    fullName: "Full Name",
    jobTitle: "Software Engineer",
    email: "name@example.com",
    phone: "+000 000 0000",
    location: "City, Country",
    website: "www.example.com",
    linkedin: "linkedin.com/in/username",
    github: "github.com/username",
  },
  summary: "A concise professional summary highlighting experience, impact, and core competencies. Proven track record of delivering high-quality solutions and driving business value.",
  experiences: [
    {
      id: "exp-1",
      companyName: "Company Name",
      role: "Senior Software Engineer",
      startDate: "2020-01",
      endDate: "Present",
      isCurrent: true,
      achievements: [
        "Led the development of a scalable cloud architecture resulting in 40% performance improvement.",
        "Mentored junior developers and established best practices for code reviews.",
      ],
      location: "City, Country",
    },
    {
      id: "exp-2",
      companyName: "Previous Company",
      role: "Software Engineer",
      startDate: "2017-06",
      endDate: "2019-12",
      isCurrent: false,
      achievements: [
        "Developed and maintained RESTful APIs serving thousands of active users.",
        "Integrated third-party payment gateways ensuring secure transactions.",
      ],
      location: "City, Country",
    }
  ],
  education: [
    {
      id: "edu-1",
      institutionName: "University Name",
      degree: "Bachelor of Science in Computer Science",
      startDate: "2013-09",
      endDate: "2017-05",
      isCurrent: false,
      achievements: [
        "Graduated with Honors.",
        "President of the Computer Science Club.",
      ],
      location: "City, Country",
    }
  ],
  skills: [
    { id: "skill-1", name: "JavaScript / TypeScript", level: "Expert" },
    { id: "skill-2", name: "React & Next.js", level: "Expert" },
    { id: "skill-3", name: "Node.js & Express", level: "Advanced" },
    { id: "skill-4", name: "System Architecture", level: "Advanced" },
    { id: "skill-5", name: "SQL & NoSQL Databases", level: "Intermediate" },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Project Name",
      description: "An open-source library for state management.",
      url: "github.com/example/project",
      technologies: ["TypeScript", "React"],
    }
  ]
});
