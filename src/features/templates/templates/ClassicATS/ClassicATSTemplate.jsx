import { EditableField } from '../../../builder/components/EditableField';
import { getOrderedVisibleSections } from '../shared/templateSharedUtils';

/**
 * Classic ATS Template.
 * Ultra-clean single-column vertical layout designed for maximum ATS parsing clarity.
 */
export function ClassicATSTemplate({ cvData, editable = true, onFieldCommit }) {
  if (!cvData) return null;

  const personal = cvData.personalInfo || {};
  const experiences = cvData.experiences || [];
  const education = cvData.education || [];
  const skills = cvData.skills || [];
  const projects = cvData.projects || [];
  const certificates = cvData.certificates || [];
  const languages = cvData.languages || [];

  const visibleSections = getOrderedVisibleSections(cvData);
  const primaryColor = cvData.design?.primaryColor || '#1e293b';

  return (
    <article
      lang="en"
      dir="ltr"
      className="p-8 md:p-12 space-y-6 text-slate-800 font-sans text-sm leading-normal max-w-full"
      style={{ '--classic-primary': primaryColor }}
    >
      {/* Header */}
      <header className="border-b border-slate-300 pb-4 text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
          {editable ? (
            <EditableField
              value={personal.fullName}
              onCommit={(val) => onFieldCommit?.('personalInfo.fullName', val)}
              placeholder="FULL NAME"
              ariaLabel="Full Name"
            />
          ) : (
            personal.fullName || 'FULL NAME'
          )}
        </h1>

        <p className="text-sm font-semibold text-slate-700">
          {editable ? (
            <EditableField
              value={personal.jobTitle}
              onCommit={(val) => onFieldCommit?.('personalInfo.jobTitle', val)}
              placeholder="Job Title / Professional Role"
              ariaLabel="Job Title"
            />
          ) : (
            personal.jobTitle
          )}
        </p>

        <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 text-xs text-slate-600 font-mono pt-1">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.linkedin && <span>• {personal.linkedin}</span>}
        </div>
      </header>

      {/* Ordered Sections */}
      {visibleSections.map((sec) => {
        if (sec === 'summary') {
          return (
            <section key="summary" className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5" style={{ color: primaryColor }}>
                Professional Summary
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

        if (sec === 'experiences') {
          return (
            <section key="experiences" className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5" style={{ color: primaryColor }}>
                Work Experience
              </h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                    <span>{exp.position} — {exp.company}</span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-slate-700 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'education') {
          return (
            <section key="education" className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5" style={{ color: primaryColor }}>
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs text-slate-900">
                  <span className="font-bold">{edu.degree} — {edu.institution}</span>
                  <span className="text-[11px] font-mono text-slate-500">{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'skills') {
          return (
            <section key="skills" className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5" style={{ color: primaryColor }}>
                Skills
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {skills.map((sk) => sk.name).filter(Boolean).join(' • ')}
              </p>
            </section>
          );
        }

        if (sec === 'projects') {
          return (
            <section key="projects" className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5" style={{ color: primaryColor }}>
                Projects
              </h2>
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs space-y-0.5">
                  <span className="font-bold text-slate-900">{proj.name}</span>
                  {proj.description && <p className="text-slate-700">{proj.description}</p>}
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'certificates') {
          return (
            <section key="certificates" className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5" style={{ color: primaryColor }}>
                Certificates
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
            <section key="languages" className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5" style={{ color: primaryColor }}>
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
