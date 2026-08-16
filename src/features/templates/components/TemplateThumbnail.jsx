import { cn } from '../../../utils/cn';

/**
 * High-Fidelity Visual Thumbnail for Resume Templates.
 * Provides clear, recognizable visual previews of each template's layout and structure.
 */
export function TemplateThumbnail({ variant = 'technical-prime', className }) {
  return (
    <div
      aria-hidden="true"
      dir="ltr"
      className={cn(
        'w-full aspect-[210/297] bg-white border border-slate-200/90 rounded-lg p-3 select-none flex flex-col shadow-sm overflow-hidden text-start font-sans text-slate-800 text-[6px] leading-tight transition-all',
        className
      )}
    >
      {/* 1. TECHNICAL PRIME ATS */}
      {(variant === 'technical-prime' || variant === 'technical-prime-ats') && (
        <div className="w-full h-full flex flex-col gap-1.5 justify-between">
          {/* Header */}
          <div className="text-center border-b border-slate-300 pb-1">
            <div className="font-extrabold text-[8.5px] tracking-wide text-slate-900 uppercase">MOHAMMED AL BZOOR</div>
            <div className="text-[5.5px] font-medium text-slate-600 mt-0.5">Full Stack Developer — React.js, Node.js, AI</div>
            <div className="text-[4.5px] text-slate-500 mt-0.5 flex justify-center gap-1.5">
              <span>Amman, JO</span>•<span>mohammad@cv.com</span>•<span>github.com/dev</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="font-bold text-[6px] text-slate-900 uppercase border-b border-slate-200 pb-0.5 mb-0.5">Summary</div>
            <div className="h-1 bg-slate-200 rounded-full w-full mb-0.5"></div>
            <div className="h-1 bg-slate-200 rounded-full w-4/5"></div>
          </div>

          {/* 2-Column Skills */}
          <div>
            <div className="font-bold text-[6px] text-slate-900 uppercase border-b border-slate-200 pb-0.5 mb-0.5">Skills</div>
            <div className="grid grid-cols-2 gap-1 text-[4.5px] text-slate-700">
              <div><span className="font-bold text-slate-900">Frontend:</span> React, Next.js, TS</div>
              <div><span className="font-bold text-slate-900">Backend:</span> Node, Express, SQL</div>
              <div><span className="font-bold text-slate-900">AI & Cloud:</span> OpenAI, Docker, Git</div>
              <div><span className="font-bold text-slate-900">Database:</span> PostgreSQL, Mongo</div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="font-bold text-[6px] text-slate-900 uppercase border-b border-slate-200 pb-0.5 mb-0.5">Experience</div>
            <div className="flex justify-between items-baseline font-bold text-[5.5px] text-slate-900">
              <span>Senior Full Stack Developer</span>
              <span className="text-[4.5px] text-slate-500">2023 – Present</span>
            </div>
            <div className="text-[4.5px] text-slate-600 italic">Tech Innovations • Amman, Jordan</div>
            <div className="mt-0.5 flex flex-col gap-0.5 pl-1.5 border-l border-slate-300">
              <div className="h-1 bg-slate-200 rounded-full w-full"></div>
              <div className="h-1 bg-slate-200 rounded-full w-5/6"></div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <div className="font-bold text-[6px] text-slate-900 uppercase border-b border-slate-200 pb-0.5 mb-0.5">Projects</div>
            <div className="flex justify-between text-[5px]">
              <span className="font-bold text-slate-900">AI Platform <span className="text-slate-500 font-normal">| React, Node</span></span>
              <span className="text-slate-500">github.com/app</span>
            </div>
            <div className="h-1 bg-slate-200 rounded-full w-11/12 mt-0.5"></div>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-2 gap-2 pt-0.5 border-t border-slate-200 text-[4.5px]">
            <div><span className="font-bold text-slate-900 uppercase">Education:</span> B.Sc. Computer Science</div>
            <div><span className="font-bold text-slate-900 uppercase">Languages:</span> English, Arabic</div>
          </div>
        </div>
      )}

      {/* 2. CLASSIC ATS */}
      {(variant === 'classic' || variant === 'classic-ats') && (
        <div className="w-full h-full flex flex-col gap-2 justify-between">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-800 pb-1.5">
            <div className="font-bold text-[9px] text-slate-900 uppercase tracking-wider">MOHAMMED AL BZOOR</div>
            <div className="text-[5px] text-slate-600 mt-0.5">Amman, Jordan | +962 782279101 | mohammad@cv.com</div>
          </div>

          {/* Summary */}
          <div>
            <div className="font-bold text-[6.5px] text-slate-900 uppercase mb-0.5 tracking-wider">PROFESSIONAL SUMMARY</div>
            <div className="h-1 bg-slate-200 rounded-full w-full mb-0.5"></div>
            <div className="h-1 bg-slate-200 rounded-full w-4/5"></div>
          </div>

          {/* Experience */}
          <div>
            <div className="font-bold text-[6.5px] text-slate-900 uppercase mb-0.5 tracking-wider">WORK EXPERIENCE</div>
            <div className="flex justify-between items-baseline font-bold text-[5.5px] text-slate-900">
              <span>Full Stack Software Engineer</span>
              <span className="text-[4.5px]">2022 – Present</span>
            </div>
            <div className="text-[4.5px] text-slate-600">Enterprise Solutions Inc. — Amman</div>
            <div className="mt-1 space-y-0.5 pl-1.5">
              <div className="flex items-center gap-1"><span className="w-0.5 h-0.5 rounded-full bg-slate-800"></span><div className="h-1 bg-slate-200 rounded-full w-full"></div></div>
              <div className="flex items-center gap-1"><span className="w-0.5 h-0.5 rounded-full bg-slate-800"></span><div className="h-1 bg-slate-200 rounded-full w-5/6"></div></div>
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="font-bold text-[6.5px] text-slate-900 uppercase mb-0.5 tracking-wider">EDUCATION</div>
            <div className="flex justify-between font-bold text-[5px] text-slate-900">
              <span>B.Sc. in Computer Science</span>
              <span className="text-slate-500 font-normal">2020 – 2024</span>
            </div>
            <div className="text-[4.5px] text-slate-600">Al al-Bayt University</div>
          </div>

          {/* Skills */}
          <div>
            <div className="font-bold text-[6.5px] text-slate-900 uppercase mb-0.5 tracking-wider">CORE SKILLS</div>
            <div className="h-1 bg-slate-200 rounded-full w-full mb-0.5"></div>
            <div className="h-1 bg-slate-200 rounded-full w-3/4"></div>
          </div>
        </div>
      )}

      {/* 3. PROFESSIONAL ATS */}
      {(variant === 'professional' || variant === 'professional-ats') && (
        <div className="w-full h-full flex flex-col gap-2 justify-between">
          {/* Header with Navy accent */}
          <div className="flex justify-between items-end border-b-2 border-slate-900 pb-1">
            <div>
              <div className="font-black text-[9px] text-slate-900 uppercase">MOHAMMED AL BZOOR</div>
              <div className="text-[5.5px] font-semibold text-slate-700">Senior Software Architect</div>
            </div>
            <div className="text-right text-[4.5px] text-slate-600 space-y-0.5">
              <div>Amman, Jordan</div>
              <div>mohammad@cv.com</div>
              <div>linkedin.com/in/mbzoor</div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="font-bold text-[6px] text-slate-900 uppercase flex items-center gap-1 mb-0.5">
              <span>Executive Profile</span>
              <div className="h-px bg-slate-300 flex-1"></div>
            </div>
            <div className="h-1 bg-slate-200 rounded-full w-full mb-0.5"></div>
            <div className="h-1 bg-slate-200 rounded-full w-4/5"></div>
          </div>

          {/* Experience */}
          <div>
            <div className="font-bold text-[6px] text-slate-900 uppercase flex items-center gap-1 mb-0.5">
              <span>Professional Experience</span>
              <div className="h-px bg-slate-300 flex-1"></div>
            </div>
            <div className="flex justify-between items-baseline font-bold text-[5.5px] text-slate-900">
              <span>Lead Applications Engineer</span>
              <span className="text-[4.5px] text-slate-600 font-normal">2021 – Present</span>
            </div>
            <div className="text-[4.5px] text-slate-600 font-medium">Jordan Tech Group • Amman</div>
            <div className="mt-0.5 space-y-0.5 pl-1.5">
              <div className="flex items-center gap-1"><span className="w-0.5 h-0.5 rounded-full bg-slate-700"></span><div className="h-1 bg-slate-200 rounded-full w-full"></div></div>
              <div className="flex items-center gap-1"><span className="w-0.5 h-0.5 rounded-full bg-slate-700"></span><div className="h-1 bg-slate-200 rounded-full w-4/5"></div></div>
            </div>
          </div>

          {/* Skills & Projects */}
          <div>
            <div className="font-bold text-[6px] text-slate-900 uppercase flex items-center gap-1 mb-0.5">
              <span>Key Competencies</span>
              <div className="h-px bg-slate-300 flex-1"></div>
            </div>
            <div className="h-1 bg-slate-200 rounded-full w-full mb-0.5"></div>
            <div className="h-1 bg-slate-200 rounded-full w-5/6"></div>
          </div>
        </div>
      )}

      {/* 4. COMPACT ATS */}
      {(variant === 'compact' || variant === 'compact-ats') && (
        <div className="w-full h-full flex flex-col gap-1 justify-between text-[4.5px]">
          {/* Dense Header */}
          <div className="text-center border-b border-slate-300 pb-0.5">
            <div className="font-black text-[8px] text-slate-900 tracking-tight uppercase">MOHAMMED AL BZOOR</div>
            <div className="text-[4.5px] text-slate-600 flex justify-center gap-1">
              <span>Amman, JO</span>|<span>+962 782279101</span>|<span>mohammad@cv.com</span>|<span>github.com/mbzoor</span>
            </div>
          </div>

          {/* Compact Sections */}
          <div>
            <div className="font-bold text-[5.5px] text-slate-900 uppercase border-b border-slate-200 pb-0.5 mb-0.5">Summary</div>
            <div className="h-0.5 bg-slate-200 rounded-full w-full mb-0.5"></div>
            <div className="h-0.5 bg-slate-200 rounded-full w-5/6"></div>
          </div>

          <div>
            <div className="font-bold text-[5.5px] text-slate-900 uppercase border-b border-slate-200 pb-0.5 mb-0.5">Experience</div>
            <div className="flex justify-between font-bold text-[5px] text-slate-900">
              <span>Full Stack Developer — Self-Employed</span>
              <span className="text-slate-500 font-normal">2024 – Present</span>
            </div>
            <div className="h-0.5 bg-slate-200 rounded-full w-full mt-0.5"></div>
            <div className="h-0.5 bg-slate-200 rounded-full w-4/5 mt-0.5"></div>

            <div className="flex justify-between font-bold text-[5px] text-slate-900 mt-1">
              <span>Software Engineering Intern — RSS</span>
              <span className="text-slate-500 font-normal">2023 – 2024</span>
            </div>
            <div className="h-0.5 bg-slate-200 rounded-full w-full mt-0.5"></div>
          </div>

          <div>
            <div className="font-bold text-[5.5px] text-slate-900 uppercase border-b border-slate-200 pb-0.5 mb-0.5">Projects</div>
            <div className="flex justify-between font-bold text-[5px] text-slate-900">
              <span>AI Recruitment Platform (React, n8n)</span>
              <span className="text-slate-500 font-normal">GitHub</span>
            </div>
            <div className="h-0.5 bg-slate-200 rounded-full w-11/12 mt-0.5"></div>
          </div>

          <div>
            <div className="font-bold text-[5.5px] text-slate-900 uppercase border-b border-slate-200 pb-0.5 mb-0.5">Skills & Education</div>
            <div className="h-0.5 bg-slate-200 rounded-full w-full mb-0.5"></div>
            <div className="h-0.5 bg-slate-200 rounded-full w-3/4"></div>
          </div>
        </div>
      )}

      {/* 5. EXECUTIVE ATS */}
      {(variant === 'executive' || variant === 'executive-ats') && (
        <div className="w-full h-full flex flex-col gap-1.5 justify-between">
          {/* Executive Header */}
          <div className="border-b-2 border-slate-900 pb-1">
            <div className="font-black text-[9.5px] text-slate-900 uppercase tracking-wide">MOHAMMED AL BZOOR</div>
            <div className="text-[5.5px] font-bold text-slate-700">Chief Technology Officer / Senior Director</div>
            <div className="text-[4.5px] text-slate-500 mt-0.5">Amman, Jordan • mohammad@cv.com • linkedin.com/in/exec</div>
          </div>

          {/* Shaded Executive Summary Box */}
          <div className="bg-slate-100/90 border-l-2 border-slate-900 p-1 rounded-xs">
            <div className="font-bold text-[5.5px] text-slate-900 uppercase mb-0.5">Executive Summary</div>
            <div className="h-1 bg-slate-300 rounded-full w-full mb-0.5"></div>
            <div className="h-1 bg-slate-300 rounded-full w-5/6"></div>
          </div>

          {/* Leadership & Experience */}
          <div>
            <div className="font-bold text-[6px] text-slate-900 uppercase border-b border-slate-300 pb-0.5 mb-0.5">Executive Leadership</div>
            <div className="flex justify-between items-baseline font-bold text-[5.5px] text-slate-900">
              <span>Vice President of Engineering</span>
              <span className="text-[4.5px] text-slate-600 font-normal">2020 – Present</span>
            </div>
            <div className="text-[4.5px] text-slate-600 font-medium">Apex Global Technologies • Dubai / Amman</div>
            <div className="mt-0.5 space-y-0.5 pl-1.5">
              <div className="flex items-center gap-1"><span className="w-0.5 h-0.5 bg-slate-800"></span><div className="h-1 bg-slate-200 rounded-full w-full"></div></div>
              <div className="flex items-center gap-1"><span className="w-0.5 h-0.5 bg-slate-800"></span><div className="h-1 bg-slate-200 rounded-full w-4/5"></div></div>
            </div>
          </div>

          {/* Board & Strategic Skills */}
          <div>
            <div className="font-bold text-[6px] text-slate-900 uppercase border-b border-slate-300 pb-0.5 mb-0.5">Core Competencies & Education</div>
            <div className="h-1 bg-slate-200 rounded-full w-full mb-0.5"></div>
            <div className="h-1 bg-slate-200 rounded-full w-3/4"></div>
          </div>
        </div>
      )}

      {/* 6. DEVELOPER PORTFOLIO */}
      {(variant === 'developer' || variant === 'developer-portfolio') && (
        <div className="w-full h-full flex flex-col gap-1.5 justify-between">
          {/* Tech Header */}
          <div className="border-b-2 border-blue-600 pb-1 flex justify-between items-start">
            <div>
              <div className="font-mono font-bold text-[8.5px] text-slate-900">&lt;Mohammed Al Bzoor /&gt;</div>
              <div className="text-[5px] font-mono text-blue-600 font-semibold mt-0.5">Full Stack & AI Engineer</div>
            </div>
            <div className="text-right text-[4px] font-mono text-slate-500 space-y-0.5">
              <div>github.com/mbzoor</div>
              <div>portfolio.dev</div>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-0.5">
            <span className="px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[4px] font-mono">React.js</span>
            <span className="px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[4px] font-mono">Node.js</span>
            <span className="px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[4px] font-mono">TypeScript</span>
            <span className="px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[4px] font-mono">OpenAI</span>
            <span className="px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[4px] font-mono">Docker</span>
          </div>

          {/* Featured Projects with Repo tags */}
          <div>
            <div className="font-mono font-bold text-[5.5px] text-blue-900 border-b border-slate-200 pb-0.5 mb-0.5">FEATURED_PROJECTS</div>
            <div className="flex justify-between font-mono font-bold text-[5px] text-slate-900">
              <span>TechNetwork AI Platform</span>
              <span className="text-blue-600">[repo]</span>
            </div>
            <div className="h-1 bg-slate-200 rounded-full w-full mt-0.5"></div>
            <div className="h-1 bg-slate-200 rounded-full w-4/5 mt-0.5"></div>
          </div>

          {/* Experience */}
          <div>
            <div className="font-mono font-bold text-[5.5px] text-blue-900 border-b border-slate-200 pb-0.5 mb-0.5">WORK_EXPERIENCE</div>
            <div className="flex justify-between font-mono text-[4.5px]">
              <span className="font-bold text-slate-900">Full Stack Engineer</span>
              <span className="text-slate-500">2023 – Present</span>
            </div>
            <div className="pl-1 flex flex-col gap-0.5 mt-0.5">
              <div className="flex items-center gap-1 font-mono text-[4px] text-blue-600">&gt; <div className="h-1 bg-slate-200 rounded-full w-full"></div></div>
              <div className="flex items-center gap-1 font-mono text-[4px] text-blue-600">&gt; <div className="h-1 bg-slate-200 rounded-full w-5/6"></div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
