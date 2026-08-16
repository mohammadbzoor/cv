import { EditableField } from '../../../builder/components/EditableField';
import { getOrderedVisibleSections } from '../shared/templateSharedUtils';

/**
 * Developer Template.
 * Specialized technical template highlighting technology stacks, GitHub links, and software projects.
 */
export function DeveloperTemplate({ cvData, design: overrideDesign, editable = true, onFieldCommit }) {
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
  const primaryColor = design.primaryColor || '#2563eb';
  const showDivider = design.showSectionDividers !== false;
  const showBullets = design.showBulletPoints !== false;
  const contactLayout = design.contactLayout || 'inline';

  return (
    <article
      lang="en"
      dir="ltr"
      className="max-w-full text-slate-800 break-words select-text transition-all duration-150"
      style={{
        fontFamily: 'var(--cv-font-family, monospace)',
        fontSize: 'var(--cv-font-size, 0.8125rem)',
        lineHeight: 'var(--cv-line-height, 1.5)',
        padding: 'var(--cv-page-margin, 1.5cm)',
        '--dev-primary': primaryColor,
      }}
    >
      {/* Header */}
      <header
        className="font-sans transition-all"
        style={{
          paddingBottom: 'var(--cv-item-spacing, 0.875rem)',
          marginBottom: 'var(--cv-section-spacing, 1.5rem)',
          borderBottomWidth: showDivider ? 'var(--cv-divider-width, 2px)' : '0px',
          borderBottomColor: showDivider ? primaryColor : 'transparent',
          borderBottomStyle: 'solid',
        }}
      >
        <h1
          className="text-3xl font-black tracking-tight"
          style={{
            color: primaryColor,
            textTransform: 'var(--cv-heading-transform, none)',
          }}
        >
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

        <p className="text-sm font-bold text-slate-700 mt-1">
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

        <div
          className={`text-xs text-slate-500 font-mono pt-1.5 ${
            contactLayout === 'stacked'
              ? 'flex flex-col gap-0.5'
              : 'flex flex-wrap gap-x-3 gap-y-1'
          }`}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.github && <span className="font-bold text-slate-700">{contactLayout === 'stacked' ? '' : '• '}github: {personal.github}</span>}
          {personal.website && <span>{contactLayout === 'stacked' ? '' : '• '}portfolio: {personal.website}</span>}
          {personal.location && <span>{contactLayout === 'stacked' ? '' : '• '}{personal.location}</span>}
        </div>
      </header>

      {/* Ordered Sections */}
      {visibleSections.map((sec) => {
        if (sec === 'summary') {
          return (
            <section
              key="summary"
              className="font-sans"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="tracking-wider pb-0.5 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? `${primaryColor}40` : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                About / Summary
              </h2>
              <p
                className="text-slate-700 leading-relaxed"
                style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}
              >
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
            <section
              key="skills"
              className="font-sans"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="tracking-wider pb-0.5 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? `${primaryColor}40` : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Technical Stack & Skills
              </h2>
              <div className="flex flex-wrap gap-1 text-xs" style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}>
                {skills.map((sk) => (
                  <span
                    key={sk.id}
                    className="px-2 py-0.5 rounded font-mono font-semibold"
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

        if (sec === 'projects') {
          return (
            <section
              key="projects"
              className="font-sans"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="tracking-wider pb-0.5 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? `${primaryColor}40` : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Featured Technical Projects
              </h2>
              {projects.map((proj) => {
                const techList = Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies;
                return (
                  <div
                    key={proj.id}
                    className="text-xs"
                    style={{ marginBottom: 'var(--cv-item-spacing, 0.75rem)' }}
                  >
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{proj.name}</span>
                      {proj.repositoryUrl && (
                        <span className="font-mono text-[11px]" style={{ color: primaryColor }}>
                          {proj.repositoryUrl}
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-slate-700" style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}>
                        {proj.description}
                      </p>
                    )}
                    {techList && <p className="font-mono text-[11px] text-slate-500 mt-0.5">Tech: {techList}</p>}
                  </div>
                );
              })}
            </section>
          );
        }

        if (sec === 'experiences') {
          return (
            <section
              key="experiences"
              className="font-sans"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="tracking-wider pb-0.5 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? `${primaryColor}40` : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Engineering Experience
              </h2>
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="text-xs"
                  style={{ marginBottom: 'var(--cv-item-spacing, 0.75rem)' }}
                >
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{exp.position} @ <span style={{ color: primaryColor }}>{exp.company}</span></span>
                    <span className="font-mono text-[11px] text-slate-500">
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-slate-700 leading-relaxed" style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'education') {
          return (
            <section
              key="education"
              className="font-sans"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="tracking-wider pb-0.5 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? `${primaryColor}40` : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Education
              </h2>
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex justify-between items-baseline text-xs text-slate-900"
                  style={{ marginBottom: 'var(--cv-item-spacing, 0.5rem)' }}
                >
                  <span className="font-bold">{edu.degree} — {edu.institution}</span>
                  <span className="font-mono text-[11px] text-slate-500">{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
            </section>
          );
        }

        if (sec === 'certificates') {
          return (
            <section
              key="certificates"
              className="font-sans"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="tracking-wider pb-0.5 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? `${primaryColor}40` : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Certifications
              </h2>
              <ul
                className={`text-xs text-slate-700 space-y-0.5 ${showBullets ? 'list-disc list-inside' : ''}`}
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
              className="font-sans"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="tracking-wider pb-0.5 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? `${primaryColor}40` : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Languages
              </h2>
              <p className="text-xs text-slate-700" style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}>
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
