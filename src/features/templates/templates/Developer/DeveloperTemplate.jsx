import { EditableField } from '../../../builder/components/EditableField';
import { getOrderedVisibleSections } from '../shared/templateSharedUtils';

/**
 * Developer Template.
 * Specialized technical template highlighting technology stacks, GitHub links, and software projects.
 */
export function DeveloperTemplate({ cvData, editable = true, onFieldCommit }) {
  if (!cvData) return null;

  const personal = cvData.personalInfo || {};
  const experiences = cvData.experiences || [];
  const education = cvData.education || [];
  const skills = cvData.skills || [];
  const projects = cvData.projects || [];
  const certificates = cvData.certificates || [];
  const languages = cvData.languages || [];

  const visibleSections = getOrderedVisibleSections(cvData);
  const primaryColor = cvData.design?.primaryColor || '#2563eb';

  return (
    <article
      lang="en"
      dir="ltr"
      className="p-8 md:p-12 space-y-6 text-slate-800 font-mono text-xs leading-relaxed max-w-full"
      style={{ '--dev-primary': primaryColor }}
    >
      {/* Header */}
      <header className="border-b-2 pb-4 space-y-1 font-sans" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-black tracking-tight" style={{ color: primaryColor }}>
          {editable ? (
            <EditableField
              value={personal.fullName}
              onCommit={(val) => onFieldCommit?.('personalInfo.fullName', val)}
              placeholder="Full Name"
              ariaLabel="Full Name"
            />
          ) : (
            personal.fullName || 'Full Name'
          )}
        </h1>

        <p className="text-sm font-bold text-slate-700">
          {editable ? (
            <EditableField
              value={personal.jobTitle}
              onCommit={(val) => onFieldCommit?.('personalInfo.jobTitle', val)}
              placeholder="Software Engineer / Developer Role"
              ariaLabel="Job Title"
            />
          ) : (
            personal.jobTitle
          )}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 font-mono pt-1">
          {personal.email && <span>{personal.email}</span>}
          {personal.github && <span className="font-bold text-slate-700">github: {personal.github}</span>}
          {personal.website && <span>portfolio: {personal.website}</span>}
          {personal.location && <span>• {personal.location}</span>}
        </div>
      </header>

      {/* Ordered Sections */}
      {visibleSections.map((sec) => {
        if (sec === 'summary') {
          return (
            <section key="summary" className="space-y-1 font-sans">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-0.5" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                About / Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {editable ? (
                  <EditableField
                    value={cvData.summary}
                    onCommit={(val) => onFieldCommit?.('summary', val)}
                    multiline
                    placeholder="Enter summary..."
                    ariaLabel="Summary"
                  />
                ) : (
                  cvData.summary
                )}
              </p>
            </section>
          );
        }

        if (sec === 'skills') {
          return (
            <section key="skills" className="space-y-1.5 font-sans">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-0.5" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Technical Stack & Skills
              </h2>
              <div className="flex flex-wrap gap-1 text-xs">
                {skills.map((sk) => (
                  <span key={sk.id} className="px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-200 rounded font-mono font-semibold">
                    {sk.name}
                  </span>
                ))}
              </div>
            </section>
          );
        }

        if (sec === 'projects') {
          return (
            <section key="projects" className="space-y-3 font-sans">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-0.5" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Featured Technical Projects
              </h2>
              {projects.map((proj) => {
                const techList = Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies;
                return (
                  <div key={proj.id} className="space-y-1 text-xs">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{proj.name}</span>
                      {proj.repositoryUrl && <span className="font-mono text-[11px] text-blue-600">{proj.repositoryUrl}</span>}
                    </div>
                    {proj.description && <p className="text-slate-700">{proj.description}</p>}
                    {techList && <p className="font-mono text-[11px] text-slate-500">Tech: {techList}</p>}
                  </div>
                );
              })}
            </section>
          );
        }

        if (sec === 'experiences') {
          return (
            <section key="experiences" className="space-y-3 font-sans">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-0.5" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Engineering Experience
              </h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1 text-xs">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{exp.position} @ <span style={{ color: primaryColor }}>{exp.company}</span></span>
                    <span className="font-mono text-[11px] text-slate-500">
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-slate-700 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'education') {
          return (
            <section key="education" className="space-y-1 font-sans">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-0.5" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs text-slate-900">
                  <span className="font-bold">{edu.degree} — {edu.institution}</span>
                  <span className="font-mono text-[11px] text-slate-500">{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'certificates') {
          return (
            <section key="certificates" className="space-y-1 font-sans">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-0.5" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Certifications
              </h2>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
                {certificates.map((cert) => (
                  <li key={cert.id}>{cert.name} - {cert.issuer}</li>
                ))}
              </ul>
            </section>
          );
        }

        if (sec === 'languages') {
          return (
            <section key="languages" className="space-y-1 font-sans">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-0.5" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Languages
              </h2>
              <p className="text-xs text-slate-700">
                {languages.map((lang) => `${lang.name} (${lang.proficiency})`).join(', ')}
              </p>
            </section>
          );
        }

        return null;
      })}
    </article>
  );
}
