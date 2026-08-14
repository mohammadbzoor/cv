import { EditableField } from '../../../builder/components/EditableField';
import { getOrderedVisibleSections } from '../shared/templateSharedUtils';

/**
 * Compact ATS Template.
 * Single-column layout with tight spacing and concise typography intended for single-page CVs.
 */
export function CompactATSTemplate({ cvData, design: overrideDesign, editable = true, onFieldCommit }) {
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
  const primaryColor = design.primaryColor || '#1e293b';

  const showDivider = design.showSectionDividers !== false;

  let headingClass = 'text-[11px] font-bold uppercase tracking-wider';
  if (design.headingStyle === 'understated') {
    headingClass = 'text-[11px] font-semibold text-slate-800';
  } else if (design.headingStyle === 'prominent') {
    headingClass = 'text-xs font-extrabold uppercase tracking-widest';
  }

  return (
    <article
      lang="en"
      dir="ltr"
      className="p-6 md:p-8 space-y-2.5 text-slate-800 font-sans text-xs leading-snug max-w-full bg-white select-text"
    >
      {/* Header */}
      <header className={`space-y-0.5 text-center ${showDivider ? 'border-b border-slate-300 pb-2' : 'pb-1'}`}>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">
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

        <p className="text-xs font-semibold text-slate-700">
          {editable ? (
            <EditableField
              value={personal.jobTitle}
              onCommit={(val) => onFieldCommit?.('personalInfo.jobTitle', val)}
              placeholder="Job Title"
              ariaLabel="Job Title"
            />
          ) : (
            personal.jobTitle
          )}
        </p>

        <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 text-[10px] text-slate-600 font-mono pt-0.5">
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
            <section key="summary" className="space-y-0.5">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-0.5' : ''}`}
                style={{ color: primaryColor }}
              >
                Summary
              </h2>
              <p className="text-[11px] text-slate-700 leading-normal">
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
            <section key="experiences" className="space-y-1.5">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-0.5' : ''}`}
                style={{ color: primaryColor }}
              >
                Work Experience
              </h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-0.5 text-[11px]">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{exp.position} — {exp.company}</span>
                    <span className="text-[10px] font-mono text-slate-500 font-normal">
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[11px] text-slate-700 leading-normal">{exp.description}</p>
                  )}
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'education') {
          return (
            <section key="education" className="space-y-1">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-0.5' : ''}`}
                style={{ color: primaryColor }}
              >
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-[11px] text-slate-900">
                  <span className="font-bold">{edu.degree} — {edu.institution}</span>
                  <span className="text-[10px] font-mono text-slate-500">{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'skills') {
          return (
            <section key="skills" className="space-y-0.5">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-0.5' : ''}`}
                style={{ color: primaryColor }}
              >
                Skills
              </h2>
              <p className="text-[11px] text-slate-700 leading-normal">
                {skills.map((sk) => sk.name).filter(Boolean).join(' • ')}
              </p>
            </section>
          );
        }

        if (sec === 'projects') {
          return (
            <section key="projects" className="space-y-1">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-0.5' : ''}`}
                style={{ color: primaryColor }}
              >
                Projects
              </h2>
              {projects.map((proj) => (
                <div key={proj.id} className="text-[11px] space-y-0.5">
                  <span className="font-bold text-slate-900">{proj.name}</span>
                  {proj.description && <p className="text-slate-700">{proj.description}</p>}
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'certificates') {
          return (
            <section key="certificates" className="space-y-0.5">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-0.5' : ''}`}
                style={{ color: primaryColor }}
              >
                Certifications
              </h2>
              <p className="text-[11px] text-slate-700">
                {certificates.map((cert) => `${cert.name} (${cert.issuer})`).join(' • ')}
              </p>
            </section>
          );
        }

        if (sec === 'languages') {
          return (
            <section key="languages" className="space-y-0.5">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-0.5' : ''}`}
                style={{ color: primaryColor }}
              >
                Languages
              </h2>
              <p className="text-[11px] text-slate-700">
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
