import { EditableField } from '../../../builder/components/EditableField';
import { getOrderedVisibleSections } from '../shared/templateSharedUtils';

/**
 * Technical Prime ATS Template — Flagship Template.
 * Single-column, ATS-optimized layout supporting clean grouped skills and all core engineering sections.
 */
export function TechnicalPrimeATSTemplate({ cvData, design: overrideDesign, editable = true, onFieldCommit }) {
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

  // Density spacing mapping
  const densityClass =
    design.density === 'compact'
      ? 'space-y-3'
      : design.density === 'comfortable'
        ? 'space-y-6'
        : 'space-y-4.5';

  const itemSpacingClass =
    design.density === 'compact'
      ? 'space-y-1.5'
      : design.density === 'comfortable'
        ? 'space-y-3.5'
        : 'space-y-2.5';

  // Heading style mapping
  const showDivider = design.showSectionDividers !== false;

  let headingClass = 'text-xs font-bold uppercase tracking-wider';
  if (design.headingStyle === 'understated') {
    headingClass = 'text-xs font-semibold text-slate-800 tracking-normal';
  } else if (design.headingStyle === 'prominent') {
    headingClass = 'text-sm font-extrabold uppercase tracking-widest';
  }

  // Group skills by category if present
  const skillsByCategory = skills.reduce((acc, sk) => {
    const cat = (sk.category && sk.category.trim()) || 'General Skills';
    if (!acc[cat]) acc[cat] = [];
    if (sk.name) acc[cat].push(sk.name);
    return acc;
  }, {});

  const hasGroupedSkills = Object.keys(skillsByCategory).length > 0;

  return (
    <article
      lang="en"
      dir="ltr"
      className={`p-8 md:p-12 ${densityClass} text-slate-800 font-sans text-xs sm:text-sm leading-relaxed max-w-full bg-white select-text`}
      style={{ color: '#1e293b' }}
    >
      {/* Contact Header */}
      <header className={`space-y-1 text-start ${showDivider ? 'border-b border-slate-300 pb-4' : 'pb-2'}`}>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
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

        <p className="text-xs sm:text-sm font-semibold text-slate-700">
          {editable ? (
            <EditableField
              value={personal.jobTitle}
              onCommit={(val) => onFieldCommit?.('personalInfo.jobTitle', val)}
              placeholder="Job Title / Engineering Role"
              ariaLabel="Job Title"
            />
          ) : (
            personal.jobTitle
          )}
        </p>

        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-slate-600 font-mono pt-1">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.linkedin && <span>• {personal.linkedin}</span>}
          {personal.github && <span>• {personal.github}</span>}
          {personal.website && <span>• {personal.website}</span>}
        </div>
      </header>

      {/* Ordered Sections */}
      {visibleSections.map((sec) => {
        if (sec === 'summary') {
          return (
            <section key="summary" className="space-y-1">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-1' : ''}`}
                style={{ color: primaryColor }}
              >
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {editable ? (
                  <EditableField
                    value={cvData.summary}
                    onCommit={(val) => onFieldCommit?.('summary', val)}
                    multiline
                    placeholder="Enter professional summary..."
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
            <section key="skills" className="space-y-1.5">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-1' : ''}`}
                style={{ color: primaryColor }}
              >
                Technical & Core Skills
              </h2>
              {hasGroupedSkills ? (
                <div className="space-y-1 text-xs sm:text-sm text-slate-700">
                  {Object.entries(skillsByCategory).map(([category, items]) => (
                    <div key={category} className="leading-relaxed">
                      <span className="font-bold text-slate-900">{category}: </span>
                      <span>{items.join(', ')}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {skills.map((sk) => sk.name).filter(Boolean).join(' • ')}
                </p>
              )}
            </section>
          );
        }

        if (sec === 'experiences') {
          return (
            <section key="experiences" className="space-y-2">
              <h2
                className={`${headingClass} ${showDivider ? 'border-b border-slate-200 pb-1' : ''}`}
                style={{ color: primaryColor }}
              >
                Work Experience
              </h2>
              <div className={itemSpacingClass}>
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline flex-wrap gap-x-2 text-xs sm:text-sm font-bold text-slate-900">
                      <span>{exp.position} — <span style={{ color: primaryColor }}>{exp.company}</span></span>
                      <span className="text-xs font-mono text-slate-500 font-normal">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate} {exp.location && `| ${exp.location}`}
                      </span>
                    </div>

                    {exp.description && (
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{exp.description}</p>
                    )}

                    {Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-0.5 ps-1">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
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
                Key Engineering Projects
              </h2>
              <div className={itemSpacingClass}>
                {projects.map((proj) => (
                  <div key={proj.id} className="text-xs sm:text-sm space-y-0.5">
                    <div className="flex justify-between items-baseline flex-wrap gap-x-2 font-bold text-slate-900">
                      <span>{proj.name}</span>
                      {(proj.url || proj.repositoryUrl) && (
                        <span className="text-xs font-mono text-slate-500 font-normal">
                          {proj.url || proj.repositoryUrl}
                        </span>
                      )}
                    </div>
                    {proj.description && <p className="text-slate-700 leading-relaxed">{proj.description}</p>}
                    {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                      <div className="text-xs font-mono text-slate-600">
                        Technologies: {proj.technologies.join(', ')}
                      </div>
                    )}
                  </div>
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
                Education
              </h2>
              <div className={itemSpacingClass}>
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline flex-wrap gap-x-2 text-xs sm:text-sm text-slate-900">
                    <div>
                      <span className="font-bold">{edu.degree}</span>
                      {edu.field && <span> in {edu.field}</span>}
                      <span> — {edu.institution}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">{edu.startDate} – {edu.endDate}</span>
                  </div>
                ))}
              </div>
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
                Certifications & Credentials
              </h2>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-0.5">
                {certificates.map((cert) => (
                  <li key={cert.id}>
                    <span className="font-semibold text-slate-900">{cert.name}</span>
                    {cert.issuer && <span> — {cert.issuer}</span>}
                    {cert.issueDate && <span className="font-mono text-slate-500 text-xs"> ({cert.issueDate})</span>}
                  </li>
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
                Languages
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
