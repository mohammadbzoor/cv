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
  const showBullets = design.showBulletPoints !== false;
  const contactLayout = design.contactLayout || 'inline';

  return (
    <article
      lang="en"
      dir="ltr"
      className="max-w-full text-slate-800 break-words select-text transition-all duration-150"
      style={{
        fontFamily: 'var(--cv-font-family, Inter, sans-serif)',
        fontSize: 'var(--cv-font-size, 0.875rem)',
        lineHeight: 'var(--cv-line-height, 1.5)',
        padding: 'var(--cv-page-margin, 1.5cm)',
      }}
    >
      {/* Executive Header */}
      <header
        className="space-y-2 text-start transition-all"
        style={{
          paddingBottom: 'var(--cv-item-spacing, 1rem)',
          marginBottom: 'var(--cv-section-spacing, 1.5rem)',
          borderBottomWidth: showDivider ? 'var(--cv-divider-width, 2px)' : '0px',
          borderBottomColor: showDivider ? '#0f172a' : 'transparent',
          borderBottomStyle: 'solid',
        }}
      >
        <h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          style={{
            color: primaryColor,
            textTransform: 'var(--cv-heading-transform, uppercase)',
          }}
        >
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

        <div
          className={`text-xs text-slate-600 font-mono pt-1 ${
            contactLayout === 'stacked'
              ? 'flex flex-col gap-0.5'
              : 'flex flex-wrap gap-x-3 gap-y-1'
          }`}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{contactLayout === 'stacked' ? '' : '| '}{personal.phone}</span>}
          {personal.location && <span>{contactLayout === 'stacked' ? '' : '| '}{personal.location}</span>}
          {personal.linkedin && <span>{contactLayout === 'stacked' ? '' : '| '}{personal.linkedin}</span>}
        </div>
      </header>

      {/* Ordered Sections */}
      {visibleSections.map((sec) => {
        if (sec === 'summary') {
          return (
            <section
              key="summary"
              className="p-3.5 bg-slate-50 border-s-4 rounded-xs transition-all"
              style={{
                borderColor: primaryColor,
                marginBottom: 'var(--cv-section-spacing, 1.5rem)',
              }}
            >
              <h2
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 800)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Executive Profile
              </h2>
              <p
                className="text-slate-800 leading-relaxed font-medium"
                style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}
              >
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
            <section
              key="experiences"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 800)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#cbd5e1' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Leadership & Professional History
              </h2>
              <div>
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    style={{ marginBottom: 'var(--cv-item-spacing, 0.75rem)' }}
                  >
                    <div className="flex justify-between items-baseline flex-wrap gap-x-2 font-bold text-slate-900">
                      <span>{exp.position} — <span style={{ color: primaryColor }}>{exp.company}</span></span>
                      <span className="text-xs font-mono text-slate-500 font-normal">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate} {exp.location && `(${exp.location})`}
                      </span>
                    </div>

                    {exp.description && (
                      <p
                        className="text-slate-700 leading-relaxed"
                        style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}
                      >
                        {exp.description}
                      </p>
                    )}

                    {Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                      <ul
                        className={`text-slate-700 space-y-0.5 ${showBullets ? 'list-disc list-inside' : ''}`}
                        style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}
                      >
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
            <section
              key="skills"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 800)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#cbd5e1' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Core Competencies & Capabilities
              </h2>
              <div className="flex flex-wrap gap-2" style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}>
                {skills.map((sk) => (
                  <span
                    key={sk.id}
                    className="px-2.5 py-1 rounded font-semibold text-xs"
                    style={{
                      backgroundColor: `${primaryColor}12`,
                      color: primaryColor,
                      border: `1px solid ${primaryColor}30`,
                    }}
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </section>
          );
        }

        if (sec === 'education') {
          return (
            <section
              key="education"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 800)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#cbd5e1' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Education & Credentials
              </h2>
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex justify-between items-baseline flex-wrap gap-x-2 text-slate-900"
                  style={{ marginBottom: 'var(--cv-item-spacing, 0.5rem)' }}
                >
                  <span className="font-bold">{edu.degree} — {edu.institution}</span>
                  <span className="text-xs font-mono text-slate-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'projects') {
          return (
            <section
              key="projects"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 800)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#cbd5e1' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Strategic Initiatives & Projects
              </h2>
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  style={{ marginBottom: 'var(--cv-item-spacing, 0.5rem)' }}
                >
                  <span className="font-bold text-slate-900">{proj.name}</span>
                  {proj.description && (
                    <p
                      className="text-slate-700"
                      style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}
                    >
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'certificates') {
          return (
            <section
              key="certificates"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 800)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#cbd5e1' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Executive Certifications
              </h2>
              <ul
                className={`text-slate-700 space-y-0.5 ${showBullets ? 'list-disc list-inside' : ''}`}
                style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}
              >
                {certificates.map((cert) => (
                  <li key={cert.id}>{cert.name} - {cert.issuer}</li>
                ))}
              </ul>
            </section>
          );
        }

        if (sec === 'languages') {
          return (
            <section
              key="languages"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 800)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#cbd5e1' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Global Languages
              </h2>
              <p
                className="text-slate-700"
                style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}
              >
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
