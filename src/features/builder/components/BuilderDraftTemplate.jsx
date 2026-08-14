import { useCVStore } from '../../cv/store/useCVStore';
import { selectCVData } from '../../cv/store/cvSelectors';
import { EditableField } from './EditableField';

/**
 * Internal Draft Template Component for Builder Studio.
 * Rendered strictly inside English LTR document container.
 */
export function BuilderDraftTemplate() {
  const cvData = useCVStore(selectCVData);
  const updatePersonalInfo = useCVStore((state) => state.updatePersonalInfo);
  const updateField = useCVStore((state) => state.updateField);
  const updateExperience = useCVStore((state) => state.updateExperience);
  const updateEducation = useCVStore((state) => state.updateEducation);
  const updateProject = useCVStore((state) => state.updateProject);

  if (!cvData) return null;

  const personal = cvData.personalInfo || {};
  const experiences = cvData.experiences || [];
  const education = cvData.education || [];
  const skills = cvData.skills || [];
  const projects = cvData.projects || [];
  const certificates = cvData.certificates || [];
  const languages = cvData.languages || [];

  const sectionOrder = cvData.sectionOrder || [];
  const hiddenSet = new Set(cvData.hiddenSections || []);

  const primaryColor = cvData.design?.primaryColor || '#344553';

  return (
    <article
      lang="en"
      dir="ltr"
      className="p-8 md:p-12 space-y-6 text-slate-800 leading-relaxed font-sans text-sm"
      style={{ '--cv-primary': primaryColor }}
    >
      {/* Document Header (Personal Info) */}
      <header className="border-b-2 pb-4 space-y-1" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: primaryColor }}>
          <EditableField
            value={personal.fullName}
            onCommit={(val) => updatePersonalInfo({ fullName: val })}
            placeholder="Full Name"
            ariaLabel="Full Name"
          />
        </h1>

        <p className="text-base font-semibold text-slate-600">
          <EditableField
            value={personal.jobTitle}
            onCommit={(val) => updatePersonalInfo({ jobTitle: val })}
            placeholder="Professional Title"
            ariaLabel="Job Title"
          />
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 pt-1 font-mono">
          {personal.email && (
            <span>
              <EditableField
                value={personal.email}
                onCommit={(val) => updatePersonalInfo({ email: val })}
                placeholder="Email"
                ariaLabel="Email"
              />
            </span>
          )}

          {personal.phone && (
            <span>
              •{' '}
              <EditableField
                value={personal.phone}
                onCommit={(val) => updatePersonalInfo({ phone: val })}
                placeholder="Phone"
                ariaLabel="Phone"
              />
            </span>
          )}

          {personal.location && (
            <span>
              •{' '}
              <EditableField
                value={personal.location}
                onCommit={(val) => updatePersonalInfo({ location: val })}
                placeholder="Location"
                ariaLabel="Location"
              />
            </span>
          )}

          {personal.website && (
            <span>
              •{' '}
              <EditableField
                value={personal.website}
                onCommit={(val) => updatePersonalInfo({ website: val })}
                placeholder="Website"
                ariaLabel="Website"
              />
            </span>
          )}
        </div>
      </header>

      {/* Render Dynamic Sections by Section Order */}
      {sectionOrder.map((sectionKey) => {
        if (hiddenSet.has(sectionKey)) return null;

        if (sectionKey === 'summary') {
          if (!cvData.summary) return null;
          return (
            <section key="summary" className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Professional Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                <EditableField
                  value={cvData.summary}
                  onCommit={(val) => updateField('summary', val)}
                  multiline
                  placeholder="Enter summary..."
                  ariaLabel="Summary"
                />
              </p>
            </section>
          );
        }

        if (sectionKey === 'experiences') {
          if (experiences.length === 0) return null;
          return (
            <section key="experiences" className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Work Experience
              </h2>

              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline text-xs font-bold">
                    <span className="text-slate-900">
                      <EditableField
                        value={exp.position}
                        onCommit={(val) => updateExperience(exp.id, { position: val })}
                        placeholder="Position"
                        ariaLabel="Position"
                      />{' '}
                      @{' '}
                      <EditableField
                        value={exp.company}
                        onCommit={(val) => updateExperience(exp.id, { company: val })}
                        placeholder="Company"
                        ariaLabel="Company"
                      />
                    </span>

                    <span className="text-[11px] text-slate-500 font-mono">
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <EditableField
                        value={exp.description}
                        onCommit={(val) => updateExperience(exp.id, { description: val })}
                        multiline
                        placeholder="Description..."
                        ariaLabel="Experience Description"
                      />
                    </p>
                  )}
                </div>
              ))}
            </section>
          );
        }

        if (sectionKey === 'education') {
          if (education.length === 0) return null;
          return (
            <section key="education" className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Education
              </h2>

              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5 text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>
                      <EditableField
                        value={edu.degree}
                        onCommit={(val) => updateEducation(edu.id, { degree: val })}
                        placeholder="Degree"
                        ariaLabel="Degree"
                      />{' '}
                      -{' '}
                      <EditableField
                        value={edu.institution}
                        onCommit={(val) => updateEducation(edu.id, { institution: val })}
                        placeholder="Institution"
                        ariaLabel="Institution"
                      />
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  {edu.field && <p className="text-slate-600">{edu.field}</p>}
                </div>
              ))}
            </section>
          );
        }

        if (sectionKey === 'skills') {
          if (skills.length === 0) return null;
          return (
            <section key="skills" className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {skills.map((sk) => (
                  <span key={sk.id} className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-medium text-slate-700">
                    {sk.name} {sk.level && `(${sk.level})`}
                  </span>
                ))}
              </div>
            </section>
          );
        }

        if (sectionKey === 'projects') {
          if (projects.length === 0) return null;
          return (
            <section key="projects" className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Projects
              </h2>
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5 text-xs">
                  <span className="font-bold text-slate-900">
                    <EditableField
                      value={proj.name}
                      onCommit={(val) => updateProject(proj.id, { name: val })}
                      placeholder="Project Title"
                      ariaLabel="Project Title"
                    />
                  </span>
                  {proj.description && <p className="text-slate-600 leading-relaxed">{proj.description}</p>}
                </div>
              ))}
            </section>
          );
        }

        if (sectionKey === 'certificates') {
          if (certificates.length === 0) return null;
          return (
            <section key="certificates" className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Certificates
              </h2>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
                {certificates.map((cert) => (
                  <li key={cert.id}>
                    <strong>{cert.name}</strong> - {cert.issuer} ({cert.issueDate})
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        if (sectionKey === 'languages') {
          if (languages.length === 0) return null;
          return (
            <section key="languages" className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                Languages
              </h2>
              <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                {languages.map((lang) => (
                  <span key={lang.id} className="font-medium">
                    {lang.name} ({lang.proficiency})
                  </span>
                ))}
              </div>
            </section>
          );
        }

        return null;
      })}
    </article>
  );
}
