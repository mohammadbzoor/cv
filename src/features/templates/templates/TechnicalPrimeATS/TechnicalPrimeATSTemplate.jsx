import { EditableField } from '../../../builder/components/EditableField';
import { getOrderedVisibleSections } from '../shared/templateSharedUtils';
import { calculateSmartDensity } from '../../design/utils/densityCalculator';

/**
 * Technical Prime ATS Template — Flagship Template.
 * Single-column, ATS-optimized layout with smart auto-density scaling.
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
  
  // Smart Density Calculation
  // If the user hasn't explicitly set a density in the new UI, or if they set it to 'auto', it calculates dynamically.
  const densityTokens = calculateSmartDensity(cvData, design.density);

  // Group skills by category if present
  const skillsByCategory = skills.reduce((acc, sk) => {
    const cat = (sk.category && sk.category.trim()) || 'General Skills';
    if (!acc[cat]) acc[cat] = [];
    if (sk.name) acc[cat].push(sk.name);
    return acc;
  }, {});
  
  const hasGroupedSkills = Object.keys(skillsByCategory).length > 0;

  const showDivider = design.showSectionDividers !== false;
  const showBullets = design.showBulletPoints !== false;
  const contactLayout = design.contactLayout || 'inline';
  const primaryColor = design.primaryColor || '#111827';

  // Render Helpers
  const renderEditable = (value, path, placeholder, multiline = false) => {
    if (!editable) return value || placeholder;
    return (
      <EditableField
        value={value}
        onCommit={(val) => onFieldCommit?.(path, val)}
        placeholder={placeholder}
        multiline={multiline}
      />
    );
  };

  return (
    <article
      lang="en"
      dir="ltr"
      className="bg-white text-[#111] font-sans break-words select-text transition-all duration-150"
      style={{
        ...densityTokens,
        padding: 'var(--cv-page-margin, 1.5cm)',
        fontFamily: 'var(--cv-font-family, Arial, Helvetica, sans-serif)',
        fontSize: 'var(--cv-font-size, var(--base-font))',
        lineHeight: 'var(--cv-line-height, var(--line-height))',
      }}
    >
      {/* Contact Header */}
      <header
        className="text-center pb-[8px] transition-all"
        style={{ marginBottom: 'var(--cv-section-spacing, var(--section-gap))' }}
      >
        <h1
          className="m-0 text-[26px] leading-[1.1] font-bold uppercase tracking-[0.3px]"
          style={{ color: primaryColor }}
        >
          {renderEditable(personal.fullName, 'personalInfo.fullName', 'FULL NAME')}
        </h1>
        
        <div className="mt-[6px] text-[12px] font-normal text-slate-700">
          {renderEditable(personal.jobTitle, 'personalInfo.jobTitle', 'Job Title / Role')}
        </div>

        <div className="mt-[6px] text-[10px] text-[#111] leading-[1.6]">
          <div
            className={`justify-center gap-0 ${
              contactLayout === 'stacked' ? 'flex flex-col items-center gap-0.5' : 'flex flex-wrap'
            }`}
          >
            <span className="contact-cluster">
              {[personal.location, personal.phone, personal.email].filter(Boolean).map((info, i, arr) => (
                <span key={info}>
                  {info}
                  {contactLayout !== 'stacked' && i < arr.length - 1 && <span className="mx-1 text-[#111]">|</span>}
                </span>
              ))}
            </span>

            {/* Links */}
            {(personal.linkedin || personal.github || personal.website) && (
              <span className={`contact-cluster ${contactLayout === 'stacked' ? 'mt-0.5' : 'ml-[16px]'}`}>
                {[
                  { label: 'LinkedIn', url: personal.linkedin },
                  { label: 'GitHub', url: personal.github },
                  { label: 'Portfolio', url: personal.website }
                ].filter(link => link.url).map((link, i, arr) => (
                  <span key={link.label}>
                    {link.label}: <a href={link.url.startsWith('http') ? link.url : `https://${link.url}`} target="_blank" rel="noreferrer" className="no-underline hover:underline font-medium" style={{ color: primaryColor }}>{link.url.replace(/^https?:\/\//i, '').replace(/\/$/g, '')}</a>
                    {contactLayout !== 'stacked' && i < arr.length - 1 && <span className="mx-1 text-[#111]">|</span>}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Ordered Sections */}
      {visibleSections.map((sec) => {
        if (sec === 'summary') {
          return (
            <section
              key="summary"
              style={{
                marginTop: 'var(--cv-section-spacing, var(--section-gap))',
                marginBottom: 'var(--cv-item-spacing, 0.5rem)',
              }}
            >
              <h2
                className="m-0 mb-[6px] pb-[3px] text-[13.5px] leading-[1.2] tracking-[0.2px] transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.1em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#d0d0d0' : 'transparent',
                  borderBottomStyle: 'solid',
                }}
              >
                Professional Summary
              </h2>
              <p
                className="m-0 mb-[5px] text-slate-800"
                style={{ marginTop: 'var(--cv-paragraph-spacing, 0.2rem)' }}
              >
                {renderEditable(cvData.summary, 'summary', 'Enter professional summary...', true)}
              </p>
            </section>
          );
        }

        if (sec === 'skills') {
          return (
            <section
              key="skills"
              style={{
                marginTop: 'var(--cv-section-spacing, var(--section-gap))',
                marginBottom: 'var(--cv-item-spacing, 0.5rem)',
              }}
            >
              <h2
                className="m-0 mb-[6px] pb-[3px] text-[13.5px] leading-[1.2] tracking-[0.2px] transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.1em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#d0d0d0' : 'transparent',
                  borderBottomStyle: 'solid',
                }}
              >
                Skills
              </h2>
              {hasGroupedSkills ? (
                <div
                  className="grid grid-cols-2 gap-x-[16px] gap-y-[3px]"
                  style={{ marginTop: 'var(--cv-paragraph-spacing, 0.2rem)' }}
                >
                  {Object.entries(skillsByCategory).map(([category, items]) => (
                    <div key={category} className="break-inside-avoid">
                      <div className="font-bold inline">{category}: </div>
                      <div className="inline">{items.join(', ')}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  className="m-0 mb-[5px]"
                  style={{ marginTop: 'var(--cv-paragraph-spacing, 0.2rem)' }}
                >
                  {skills.map((sk) => sk.name).filter(Boolean).join(', ')}
                </p>
              )}
            </section>
          );
        }

        if (sec === 'experiences') {
          return (
            <section
              key="experiences"
              style={{
                marginTop: 'var(--cv-section-spacing, var(--section-gap))',
                marginBottom: 'var(--cv-item-spacing, 0.5rem)',
              }}
            >
              <h2
                className="m-0 mb-[6px] pb-[3px] text-[13.5px] leading-[1.2] tracking-[0.2px] transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.1em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#d0d0d0' : 'transparent',
                  borderBottomStyle: 'solid',
                }}
              >
                Experience
              </h2>
              <div>
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="break-inside-avoid"
                    style={{ marginBottom: 'var(--cv-item-spacing, var(--item-gap))' }}
                  >
                    <div className="flex justify-between items-baseline gap-[12px]">
                      <div className="flex-1 font-bold">
                        <strong>{exp.position || 'Position'}</strong>
                        {exp.company && <span> | <span style={{ color: primaryColor }}>{exp.company}</span></span>}
                        {exp.location && ` | ${exp.location}`}
                      </div>
                      <div className="whitespace-nowrap text-right text-[#111] text-[9.6px] font-bold">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    
                    {exp.description && (
                      <div
                        className="mt-[2px] text-slate-700"
                        style={{ marginTop: 'var(--cv-paragraph-spacing, 0.2rem)' }}
                      >
                        {exp.description}
                      </div>
                    )}

                    {Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                      <ul
                        className={`m-0 mt-[3px] pl-[15px] ${showBullets ? 'list-disc' : 'list-none pl-0'}`}
                        style={{ marginTop: 'var(--cv-paragraph-spacing, 0.2rem)' }}
                      >
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="m-0 mb-[2px] p-0">{ach}</li>
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
            <section
              key="projects"
              style={{
                marginTop: 'var(--cv-section-spacing, var(--section-gap))',
                marginBottom: 'var(--cv-item-spacing, 0.5rem)',
              }}
            >
              <h2
                className="m-0 mb-[6px] pb-[3px] text-[13.5px] leading-[1.2] tracking-[0.2px] transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.1em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#d0d0d0' : 'transparent',
                  borderBottomStyle: 'solid',
                }}
              >
                Projects
              </h2>
              <div>
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="break-inside-avoid"
                    style={{ marginBottom: 'var(--cv-item-spacing, var(--item-gap))' }}
                  >
                    <div className="flex justify-between items-baseline gap-[12px]">
                      <div className="flex-1 font-bold">
                        <strong>{proj.name || 'Project Name'}</strong>
                        {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                          <span className="font-normal text-[10px] text-[#555]"> | {proj.technologies.join(', ')}</span>
                        )}
                      </div>
                      
                      {(proj.url || proj.repositoryUrl) && (
                        <div className="whitespace-nowrap text-right text-[9.6px] font-bold">
                          <a
                            href={proj.url || proj.repositoryUrl}
                            className="no-underline hover:underline"
                            style={{ color: primaryColor }}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {(proj.url || proj.repositoryUrl).replace(/^https?:\/\//i, '').replace(/\/$/g, '')}
                          </a>
                        </div>
                      )}
                    </div>
                    {proj.description && (
                      <div
                        className="mt-[2px] text-slate-700"
                        style={{ marginTop: 'var(--cv-paragraph-spacing, 0.2rem)' }}
                      >
                        {proj.description}
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
            <section
              key="education"
              style={{
                marginTop: 'var(--cv-section-spacing, var(--section-gap))',
                marginBottom: 'var(--cv-item-spacing, 0.5rem)',
              }}
            >
              <h2
                className="m-0 mb-[6px] pb-[3px] text-[13.5px] leading-[1.2] tracking-[0.2px] transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.1em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#d0d0d0' : 'transparent',
                  borderBottomStyle: 'solid',
                }}
              >
                Education
              </h2>
              <div>
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="break-inside-avoid"
                    style={{ marginBottom: 'var(--cv-item-spacing, var(--item-gap))' }}
                  >
                    <div className="flex justify-between items-baseline gap-[12px]">
                      <div className="flex-1 font-bold">
                        <strong>{edu.degree || 'Degree'}</strong>
                        {edu.institution && ` | ${edu.institution}`}
                        {edu.location && ` | ${edu.location}`}
                      </div>
                      <div className="whitespace-nowrap text-right text-[#111] text-[9.6px] font-bold">
                        {edu.startDate} – {edu.endDate || 'Present'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        return null;
      })}

      {/* Footer Grid: Certifications & Languages */}
      {(certificates.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-2 gap-[18px]">
          {certificates.length > 0 && visibleSections.includes('certificates') && (
            <section style={{ marginTop: 'var(--cv-section-spacing, var(--section-gap))' }}>
              <h2
                className="m-0 mb-[6px] pb-[3px] text-[13.5px] leading-[1.2] tracking-[0.2px] transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.1em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#d0d0d0' : 'transparent',
                  borderBottomStyle: 'solid',
                }}
              >
                Certifications
              </h2>
              <ul
                className={`m-0 ml-[15px] pl-0 ${showBullets ? 'list-disc' : 'list-none ml-0'}`}
                style={{ marginTop: 'var(--cv-paragraph-spacing, 0.2rem)' }}
              >
                {certificates.map((cert) => {
                  const meta = [cert.issuer, cert.issueDate].filter(Boolean).join(' | ');
                  return (
                    <li key={cert.id} className="m-0 mb-[2px] p-0">
                      <strong>{cert.name}</strong>{meta ? ` — ${meta}` : ''}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {languages.length > 0 && visibleSections.includes('languages') && (
            <section style={{ marginTop: 'var(--cv-section-spacing, var(--section-gap))' }}>
              <h2
                className="m-0 mb-[6px] pb-[3px] text-[13.5px] leading-[1.2] tracking-[0.2px] transition-all"
                style={{
                  color: primaryColor,
                  fontWeight: 'var(--cv-heading-weight, 700)',
                  fontSize: 'var(--cv-heading-size, 1.1em)',
                  textTransform: 'var(--cv-heading-transform, uppercase)',
                  borderBottomWidth: showDivider ? 'var(--cv-divider-width, 1px)' : '0px',
                  borderBottomColor: showDivider ? '#d0d0d0' : 'transparent',
                  borderBottomStyle: 'solid',
                }}
              >
                Languages
              </h2>
              <p
                className="m-0 mb-[5px]"
                style={{ marginTop: 'var(--cv-paragraph-spacing, 0.2rem)' }}
              >
                {languages.map((lang) => `${lang.name}${lang.proficiency ? ` (${lang.proficiency})` : ''}`).join(' | ')}
              </p>
            </section>
          )}
        </div>
      )}
    </article>
  );
}
