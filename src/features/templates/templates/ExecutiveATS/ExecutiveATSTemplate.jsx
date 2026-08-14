import { EditableField } from '../../../builder/components/EditableField';
import { getOrderedVisibleSections } from '../shared/templateSharedUtils';

/**
 * Executive ATS Template.
 * Single-column layout with bold header styling, strong summary emphasis, and achievement-driven experience structure.
 */
export function ExecutiveATSTemplate({ cvData, design: overrideDesign, editable = true, onFieldCommit }) {
  if (!cvData) return null;

  const design = overrideDesign || cvData.design || {};
  const personal = cvData.personalInfo || {};
  const experiences = cvData.experiences || [];
  const education = cvData.education || [];
  const skills = cvData.skills || [];
  const projects = cvData.projects || [];
  const certificates = cvData.certificates || [];
  const languages = cvData.languages || [];

  const visibleSections = getOrderedVisibleSections(cvData);
  const primaryColor = design.primaryColor || '#0f172a';

  const showDivider = design.showSectionDividers !== false;

  let headingClass = 'text-xs font-extrabold uppercase tracking-widest';
  if (design.headingStyle === 'understated') {
    headingClass = 'text-xs font-semibold text-slate-800 tracking-normal';
  } else if (design.headingStyle === 'standard') {
    headingClass = 'text-xs font-bold uppercase tracking-wider';
  }

  return (
    <article
      lang="en"
      dir="ltr"
      className="p-8 md:p-12 space-y-5 text-slate-800 font-sans text-xs sm:text-sm leading-relaxed max-w-full bg-white select-text"
    >
      {/* Executive Header */}
      <header className={`space-y-2 text-start ${showDivider ? 'border-b-2 border-slate-900 pb-4' : 'pb-2'}`}>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 uppercase" style={{ color: primaryColor }}>
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

        <p className="text-sm sm:text-base font-bold text-slate-700 uppercase tracking-wide">
          {editable ? (
            <EditableField
              value={personal.jobTitle}
              onCommit={(val) => onFieldCommit?.('personalInfo.jobTitle', val)}
              placeholder="Executive Title / Leadership Role"
              ariaLabel="Job Title"
            />
          ) : (
            personal.jobTitle
          )}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 font-mono pt-1">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>| {personal.phone}</span>}
          {personal.location && <span>| {personal.location}</span>}
          {personal.linkedin && <span>| {personal.linkedin}</span>}
        </div>
      </header>

      {/* Ordered Sections */}
      {visibleSections.map((sec) => {
        if (sec === 'summary') {
          return (
            <section key="summary" className="space-y-1.5 p-3.5 bg-slate-50 border-s-4 rounded-xs" style={{ borderColor: primaryColor }}>
              <h2 className={headingClass} style={{ color: primaryColor }}>
                Executive Profile
              </h2>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {editable ? (
                  <EditableField
                    value={cvData.summary}
                    onCommit={(val) => onFieldCommit?.('summary', val)}
                    multiline
                    placeholder="Enter executive summary..."
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
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-1' : ''}`}
                style={{ color: primaryColor }}
              >
                Leadership & Professional History
              </h2>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline flex-wrap gap-x-2 text-xs sm:text-sm font-bold text-slate-900">
                      <span>{exp.position} — <span style={{ color: primaryColor }}>{exp.company}</span></span>
                      <span className="text-xs font-mono text-slate-500 font-normal">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate} {exp.location && `(${exp.location})`}
                      </span>
                    </div>

                    {exp.description && (
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{exp.description}</p>
                    )}

                    {Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-0.5">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="font-medium">{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (sec === 'skills') {
          return (
            <section key="skills" className="space-y-1">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-1' : ''}`}
                style={{ color: primaryColor }}
              >
                Core Competencies & Capabilities
              </h2>
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                {skills.map((sk) => (
                  <span key={sk.id} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-semibold border border-slate-200">
                    {sk.name}
                  </span>
                ))}
              </div>
            </section>
          );
        }

        if (sec === 'education') {
          return (
            <section key="education" className="space-y-2">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-1' : ''}`}
                style={{ color: primaryColor }}
              >
                Education & Credentials
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline flex-wrap gap-x-2 text-xs sm:text-sm text-slate-900">
                  <span className="font-bold">{edu.degree} — {edu.institution}</span>
                  <span className="text-xs font-mono text-slate-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'projects') {
          return (
            <section key="projects" className="space-y-2">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-1' : ''}`}
                style={{ color: primaryColor }}
              >
                Strategic Initiatives & Projects
              </h2>
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs sm:text-sm space-y-0.5">
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
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-1' : ''}`}
                style={{ color: primaryColor }}
              >
                Executive Certifications
              </h2>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-0.5">
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
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-1' : ''}`}
                style={{ color: primaryColor }}
              >
                Global Languages
              </h2>
              <p className="text-xs sm:text-sm text-slate-700">
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
