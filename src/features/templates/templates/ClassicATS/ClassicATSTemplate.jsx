import { EditableField } from '../../../builder/components/EditableField';
import { getOrderedVisibleSections } from '../shared/templateSharedUtils';

/**
 * Classic ATS Template.
 * Ultra-clean single-column vertical layout designed for maximum ATS parsing clarity.
 */
export function ClassicATSTemplate({ cvData, design: overrideDesign, editable = true, onFieldCommit }) {
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
        '--classic-primary': primaryColor,
      }}
    >
      {/* Header */}
      <header
        className="text-center transition-all"
        style={{
          paddingBottom: 'var(--cv-item-spacing, 0.875rem)',
          marginBottom: 'var(--cv-section-spacing, 1.5rem)',
          borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
          borderBottomColor: showDivider ? 'var(--cv-divider-color, #cbd5e1)' : 'transparent',
          borderBottomStyle: 'solid',
        }}
      >
        <h1
          className="text-2xl md:text-3xl font-extrabold tracking-tight"
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

        <p className="text-sm font-semibold text-slate-700 mt-1">
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

        <div
          className={`text-xs text-slate-600 font-mono pt-1.5 ${
            contactLayout === 'stacked'
              ? 'flex flex-col items-center gap-0.5'
              : 'flex flex-wrap justify-center gap-x-2.5 gap-y-1'
          }`}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{contactLayout === 'stacked' ? '' : '• '}{personal.phone}</span>}
          {personal.location && <span>{contactLayout === 'stacked' ? '' : '• '}{personal.location}</span>}
          {personal.linkedin && <span>{contactLayout === 'stacked' ? '' : '• '}{personal.linkedin}</span>}
          {personal.website && <span>{contactLayout === 'stacked' ? '' : '• '}{personal.website}</span>}
        </div>
      </header>

      {/* Ordered Sections */}
      {visibleSections.map((sec) => {
        if (sec === 'summary') {
          return (
            <section
              key="summary"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="tracking-wider pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? 'var(--cv-divider-color, #e2e8f0)' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Professional Summary
              </h2>
              <p
                className="text-slate-700"
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

        if (sec === 'experiences') {
          return (
            <section
              key="experiences"
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="tracking-wider pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? 'var(--cv-divider-color, #e2e8f0)' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Work Experience
              </h2>
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  style={{ marginBottom: 'var(--cv-item-spacing, 0.75rem)' }}
                >
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{exp.position} — {exp.company}</span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p
                      className="text-slate-700"
                      style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}
                    >
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
              style={{ marginBottom: 'var(--cv-section-spacing, 1.5rem)' }}
            >
              <h2
                className="tracking-wider pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? 'var(--cv-divider-color, #e2e8f0)' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Education
              </h2>
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex justify-between items-baseline text-slate-900"
                  style={{ marginBottom: 'var(--cv-item-spacing, 0.5rem)' }}
                >
                  <span className="font-bold">{edu.degree} — {edu.institution}</span>
                  <span className="text-[11px] font-mono text-slate-500">{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
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
                className="tracking-wider pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? 'var(--cv-divider-color, #e2e8f0)' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Skills
              </h2>
              <p
                className="text-slate-700"
                style={{ marginTop: 'var(--cv-paragraph-spacing, 0.25rem)' }}
              >
                {skills.map((sk) => sk.name).filter(Boolean).join(' • ')}
              </p>
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
                className="tracking-wider pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? 'var(--cv-divider-color, #e2e8f0)' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Projects
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
                className="tracking-wider pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? 'var(--cv-divider-color, #e2e8f0)' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Certificates
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
                className="tracking-wider pb-1 transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.125em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? 'var(--cv-divider-color, #e2e8f0)' : 'transparent',
                  borderBottomStyle: 'solid',
                  marginBottom: 'var(--cv-item-spacing, 0.5rem)',
                }}
              >
                Languages
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
