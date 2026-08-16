import { cn } from '../../../utils/cn';

/**
 * Expressive High-Fidelity Visual Thumbnail for Resume Templates.
 * Renders distinct, beautiful, and realistic miniature layouts that clearly convey
 * the unique personality, structure, and styling of each template.
 */
export function TemplateThumbnail({ variant = 'technical-prime', className }) {
  return (
    <div
      aria-hidden="true"
      dir="ltr"
      className={cn(
        'w-full aspect-[210/297] bg-white border border-slate-200/90 rounded-xl p-3 select-none flex flex-col shadow-sm overflow-hidden text-start font-sans text-slate-800 leading-tight transition-all relative',
        className
      )}
    >
      {/* 1. TECHNICAL PRIME ATS */}
      {(variant === 'technical-prime' || variant === 'technical-prime-ats') && (
        <div className="w-full h-full flex flex-col justify-between text-[7px] leading-tight">
          {/* Header */}
          <div className="text-center border-b border-slate-300 pb-1.5">
            <div className="font-black text-[10px] tracking-wide text-slate-900 uppercase">MOHAMMED AL BZOOR</div>
            <div className="text-[6.5px] font-semibold text-slate-700 mt-0.5">Full Stack Developer — React, Node, AI Automation</div>
            <div className="flex justify-center gap-1.5 mt-1 text-[5.5px] text-slate-500 font-medium">
              <span className="bg-slate-100 px-1 py-0.2 rounded border border-slate-200">Amman, Jordan</span>
              <span className="bg-slate-100 px-1 py-0.2 rounded border border-slate-200">mohammad@cv.com</span>
              <span className="bg-slate-100 px-1 py-0.2 rounded border border-slate-200">github.com/mbzoor</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <div className="font-bold text-[7px] text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-0.5 mb-1 flex items-center justify-between">
              <span>Professional Summary</span>
              <span className="text-[5px] text-emerald-600 font-semibold bg-emerald-50 px-1 rounded">ATS 100%</span>
            </div>
            <div className="space-y-0.5">
              <div className="h-1 bg-slate-200 rounded-full w-full"></div>
              <div className="h-1 bg-slate-200 rounded-full w-11/12"></div>
            </div>
          </div>

          {/* 2-Column Technical Skills Matrix */}
          <div>
            <div className="font-bold text-[7px] text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-0.5 mb-1">Technical Skills</div>
            <div className="grid grid-cols-2 gap-1.5 text-[5.5px]">
              <div className="bg-slate-50 p-1 rounded border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-0.5">Frontend & UI</span>
                <span className="text-slate-600">React, Next.js, Tailwind, TS</span>
              </div>
              <div className="bg-slate-50 p-1 rounded border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-0.5">Backend & API</span>
                <span className="text-slate-600">Node.js, Express, ASP.NET, SQL</span>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div>
            <div className="font-bold text-[7px] text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-0.5 mb-1">Work Experience</div>
            <div className="pl-1.5 border-l-2 border-slate-800 space-y-1">
              <div>
                <div className="flex justify-between items-baseline font-bold text-[6.5px] text-slate-900">
                  <span>Senior Full Stack Developer</span>
                  <span className="text-[5px] text-slate-500 font-normal">2023 – Present</span>
                </div>
                <div className="text-[5.5px] text-slate-600 font-medium">Enterprise Tech Solutions • Amman</div>
                <div className="space-y-0.5 mt-0.5">
                  <div className="h-1 bg-slate-200 rounded-full w-full"></div>
                  <div className="h-1 bg-slate-200 rounded-full w-4/5"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-[5.5px]">
            <div><span className="font-bold text-slate-900">Education:</span> B.Sc. Computer Science</div>
            <div><span className="font-bold text-slate-900">Languages:</span> English, Arabic</div>
          </div>
        </div>
      )}

      {/* 2. CLASSIC ATS */}
      {(variant === 'classic' || variant === 'classic-ats') && (
        <div className="w-full h-full flex flex-col justify-between text-[7px] leading-tight">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-2">
            <div className="font-black text-[11px] text-slate-900 uppercase tracking-widest">MOHAMMED AL BZOOR</div>
            <div className="text-[6px] text-slate-700 mt-0.5 tracking-wide">Amman, Jordan • +962 782279101 • mohammad@cv.com</div>
          </div>

          {/* Summary */}
          <div>
            <div className="font-bold text-[7.5px] text-slate-900 uppercase tracking-wider mb-1">PROFESSIONAL SUMMARY</div>
            <div className="space-y-0.5">
              <div className="h-1 bg-slate-200 rounded-full w-full"></div>
              <div className="h-1 bg-slate-200 rounded-full w-full"></div>
              <div className="h-1 bg-slate-200 rounded-full w-4/5"></div>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <div className="font-bold text-[7.5px] text-slate-900 uppercase tracking-wider mb-1">WORK EXPERIENCE</div>
            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between items-baseline font-bold text-[6.5px] text-slate-900">
                  <span>Software Engineer</span>
                  <span className="text-[5.5px]">2022 – Present</span>
                </div>
                <div className="text-[5.5px] text-slate-700 italic">Enterprise Solutions Inc. — Amman, Jordan</div>
                <div className="mt-1 space-y-0.5 pl-2">
                  <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-slate-900"></span><div className="h-1 bg-slate-200 rounded-full w-full"></div></div>
                  <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-slate-900"></span><div className="h-1 bg-slate-200 rounded-full w-5/6"></div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="font-bold text-[7.5px] text-slate-900 uppercase tracking-wider mb-1">EDUCATION</div>
            <div className="flex justify-between font-bold text-[6px] text-slate-900">
              <span>B.Sc. in Computer Science</span>
              <span className="text-slate-600 font-normal">2020 – 2024</span>
            </div>
            <div className="text-[5.5px] text-slate-600">Al al-Bayt University • Jordan</div>
          </div>

          {/* Skills */}
          <div>
            <div className="font-bold text-[7.5px] text-slate-900 uppercase tracking-wider mb-1">CORE SKILLS</div>
            <div className="h-1 bg-slate-200 rounded-full w-full"></div>
          </div>
        </div>
      )}

      {/* 3. PROFESSIONAL ATS */}
      {(variant === 'professional' || variant === 'professional-ats') && (
        <div className="w-full h-full flex flex-col justify-between text-[7px] leading-tight">
          {/* Top Navy Bar */}
          <div className="h-1.5 bg-slate-900 -mx-3 -mt-3 mb-2 rounded-t-xl"></div>

          {/* Header */}
          <div className="flex justify-between items-end border-b-2 border-slate-900 pb-1.5">
            <div>
              <div className="font-black text-[10px] text-slate-900 uppercase tracking-tight">MOHAMMED AL BZOOR</div>
              <div className="text-[6.5px] font-bold text-slate-700">Senior Software Architect & Consultant</div>
            </div>
            <div className="text-right text-[5px] text-slate-600 space-y-0.5 font-medium">
              <div>Amman, Jordan</div>
              <div>mohammad@cv.com</div>
              <div>linkedin.com/in/mbzoor</div>
            </div>
          </div>

          {/* Executive Profile */}
          <div>
            <div className="font-bold text-[7px] text-slate-900 uppercase flex items-center gap-1.5 mb-1">
              <span>Executive Profile</span>
              <div className="h-px bg-slate-300 flex-1"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1 bg-slate-200 rounded-full w-full"></div>
              <div className="h-1 bg-slate-200 rounded-full w-11/12"></div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <div className="font-bold text-[7px] text-slate-900 uppercase flex items-center gap-1.5 mb-1">
              <span>Professional Experience</span>
              <div className="h-px bg-slate-300 flex-1"></div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline font-bold text-[6.5px] text-slate-900">
                <span>Lead Applications Engineer</span>
                <span className="text-[5.5px] text-slate-600 font-normal">2021 – Present</span>
              </div>
              <div className="text-[5.5px] text-slate-700 font-medium">Jordan Tech Group • Amman</div>
              <div className="space-y-0.5 pl-2">
                <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-slate-700"></span><div className="h-1 bg-slate-200 rounded-full w-full"></div></div>
                <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-slate-700"></span><div className="h-1 bg-slate-200 rounded-full w-4/5"></div></div>
              </div>
            </div>
          </div>

          {/* Key Competencies */}
          <div>
            <div className="font-bold text-[7px] text-slate-900 uppercase flex items-center gap-1.5 mb-1">
              <span>Key Competencies</span>
              <div className="h-px bg-slate-300 flex-1"></div>
            </div>
            <div className="grid grid-cols-3 gap-1 text-[5px]">
              <span className="bg-slate-100 p-0.5 text-center rounded border border-slate-200 font-medium">System Architecture</span>
              <span className="bg-slate-100 p-0.5 text-center rounded border border-slate-200 font-medium">Cloud Infrastructure</span>
              <span className="bg-slate-100 p-0.5 text-center rounded border border-slate-200 font-medium">Team Leadership</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. COMPACT ATS */}
      {(variant === 'compact' || variant === 'compact-ats') && (
        <div className="w-full h-full flex flex-col justify-between text-[6px] leading-tight">
          {/* Header */}
          <div className="text-center border-b border-slate-300 pb-1">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[5px] font-bold text-teal-700 bg-teal-50 px-1 py-0.2 rounded border border-teal-200">1-PAGE COMPACT</span>
              <span className="text-[5px] text-slate-500">Amman, Jordan • +962 782279101</span>
            </div>
            <div className="font-black text-[9.5px] text-slate-900 uppercase tracking-tight">MOHAMMED AL BZOOR</div>
            <div className="text-[5.5px] text-slate-600">mohammad@cv.com • github.com/mbzoor • linkedin.com/in/mbzoor</div>
          </div>

          {/* Dense Sections */}
          <div>
            <div className="font-bold text-[6.5px] text-slate-900 uppercase border-b border-slate-200 pb-0.2 mb-0.5">Professional Summary</div>
            <div className="h-0.5 bg-slate-200 rounded-full w-full mb-0.5"></div>
            <div className="h-0.5 bg-slate-200 rounded-full w-5/6"></div>
          </div>

          <div>
            <div className="font-bold text-[6.5px] text-slate-900 uppercase border-b border-slate-200 pb-0.2 mb-0.5">Experience & Roles</div>
            <div className="space-y-1">
              <div>
                <div className="flex justify-between font-bold text-[5.5px] text-slate-900">
                  <span>Full Stack Developer — Freelance</span>
                  <span className="text-slate-500 font-normal">2024 – Present</span>
                </div>
                <div className="h-0.5 bg-slate-200 rounded-full w-full mt-0.5"></div>
              </div>
              <div>
                <div className="flex justify-between font-bold text-[5.5px] text-slate-900">
                  <span>Software Engineer Intern — RSS</span>
                  <span className="text-slate-500 font-normal">2023 – 2024</span>
                </div>
                <div className="h-0.5 bg-slate-200 rounded-full w-4/5 mt-0.5"></div>
              </div>
            </div>
          </div>

          <div>
            <div className="font-bold text-[6.5px] text-slate-900 uppercase border-b border-slate-200 pb-0.2 mb-0.5">Projects & Key Work</div>
            <div className="flex justify-between font-bold text-[5.5px] text-slate-900">
              <span>AI Recruitment Engine (React, n8n)</span>
              <span className="text-slate-500 font-normal">github.com</span>
            </div>
            <div className="h-0.5 bg-slate-200 rounded-full w-11/12 mt-0.5"></div>
          </div>

          <div>
            <div className="font-bold text-[6.5px] text-slate-900 uppercase border-b border-slate-200 pb-0.2 mb-0.5">Skills & Credentials</div>
            <div className="grid grid-cols-2 gap-1 text-[5px]">
              <div><span className="font-bold text-slate-900">Dev:</span> React, Node, TypeScript</div>
              <div><span className="font-bold text-slate-900">Degree:</span> B.Sc. Computer Science</div>
            </div>
          </div>
        </div>
      )}

      {/* 5. EXECUTIVE ATS */}
      {(variant === 'executive' || variant === 'executive-ats') && (
        <div className="w-full h-full flex flex-col justify-between text-[7px] leading-tight">
          {/* Executive Header */}
          <div className="border-b-2 border-slate-900 pb-1.5">
            <div className="font-black text-[10.5px] text-slate-900 uppercase tracking-wide">MOHAMMED AL BZOOR</div>
            <div className="text-[6.5px] font-bold text-amber-700">Chief Technology Officer / Senior Director</div>
            <div className="text-[5px] text-slate-500 mt-0.5">Amman, Jordan • mohammad@cv.com • linkedin.com/in/exec</div>
          </div>

          {/* Shaded Executive Summary Box */}
          <div className="bg-amber-50/80 border-l-2 border-amber-600 p-1.5 rounded-r">
            <div className="font-bold text-[6.5px] text-amber-900 uppercase mb-0.5">Executive Summary</div>
            <div className="space-y-0.5">
              <div className="h-1 bg-amber-200/80 rounded-full w-full"></div>
              <div className="h-1 bg-amber-200/80 rounded-full w-5/6"></div>
            </div>
          </div>

          {/* Executive Leadership */}
          <div>
            <div className="font-bold text-[7px] text-slate-900 uppercase border-b border-slate-300 pb-0.5 mb-1">Executive Leadership</div>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline font-bold text-[6.5px] text-slate-900">
                <span>Vice President of Engineering</span>
                <span className="text-[5px] text-slate-600 font-normal">2020 – Present</span>
              </div>
              <div className="text-[5.5px] text-slate-700 font-medium">Apex Global Technologies • Dubai / Amman</div>
              <div className="space-y-0.5 pl-2">
                <div className="flex items-center gap-1"><span className="w-1 h-1 bg-amber-700 rounded-xs"></span><div className="h-1 bg-slate-200 rounded-full w-full"></div></div>
                <div className="flex items-center gap-1"><span className="w-1 h-1 bg-amber-700 rounded-xs"></span><div className="h-1 bg-slate-200 rounded-full w-4/5"></div></div>
              </div>
            </div>
          </div>

          {/* Strategic Metrics & Skills */}
          <div>
            <div className="font-bold text-[7px] text-slate-900 uppercase border-b border-slate-300 pb-0.5 mb-1">Strategic Competencies</div>
            <div className="grid grid-cols-2 gap-1 text-[5px]">
              <span className="bg-slate-100 p-0.5 rounded text-center font-semibold">P&L & Budget Management</span>
              <span className="bg-slate-100 p-0.5 rounded text-center font-semibold">Global Team Scaling (50+)</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. DEVELOPER PORTFOLIO */}
      {(variant === 'developer' || variant === 'developer-portfolio') && (
        <div className="w-full h-full flex flex-col justify-between text-[7px] leading-tight">
          {/* Tech Header */}
          <div className="border-b-2 border-blue-600 pb-1.5 flex justify-between items-start">
            <div>
              <div className="font-mono font-bold text-[9.5px] text-blue-900">&lt;Mohammed Al Bzoor /&gt;</div>
              <div className="text-[6px] font-mono text-blue-600 font-semibold mt-0.5">Full Stack & AI Systems Engineer</div>
            </div>
            <div className="text-right text-[4.5px] font-mono text-slate-500 space-y-0.5">
              <div>github.com/mbzoor</div>
              <div>bzoor.web.app</div>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <div className="font-mono font-bold text-[6px] text-slate-700 mb-0.5">CORE_TECH_STACK</div>
            <div className="flex flex-wrap gap-1">
              <span className="px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[5px] font-mono font-bold">React.js</span>
              <span className="px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[5px] font-mono font-bold">Node.js</span>
              <span className="px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[5px] font-mono font-bold">TypeScript</span>
              <span className="px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[5px] font-mono font-bold">OpenAI</span>
              <span className="px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[5px] font-mono font-bold">Docker</span>
            </div>
          </div>

          {/* Featured Projects with Repo tags */}
          <div>
            <div className="font-mono font-bold text-[6.5px] text-blue-900 border-b border-slate-200 pb-0.5 mb-1 flex justify-between items-center">
              <span>FEATURED_PROJECTS</span>
              <span className="text-[5px] text-blue-600 font-normal">[source_code]</span>
            </div>
            <div className="bg-slate-50 p-1 rounded border border-slate-200">
              <div className="flex justify-between font-mono font-bold text-[5.5px] text-slate-900">
                <span>TechNetwork AI Platform</span>
                <span className="text-blue-600">[repo]</span>
              </div>
              <div className="h-0.5 bg-slate-300 rounded-full w-full mt-0.5"></div>
              <div className="h-0.5 bg-slate-300 rounded-full w-4/5 mt-0.5"></div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="font-mono font-bold text-[6.5px] text-blue-900 border-b border-slate-200 pb-0.5 mb-1">WORK_EXPERIENCE</div>
            <div className="flex justify-between font-mono text-[5.5px]">
              <span className="font-bold text-slate-900">Full Stack Engineer</span>
              <span className="text-slate-500">2023 – Present</span>
            </div>
            <div className="pl-1 flex flex-col gap-0.5 mt-0.5">
              <div className="flex items-center gap-1 font-mono text-[5px] text-blue-600">&gt; <div className="h-1 bg-slate-200 rounded-full w-full"></div></div>
              <div className="flex items-center gap-1 font-mono text-[5px] text-blue-600">&gt; <div className="h-1 bg-slate-200 rounded-full w-5/6"></div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
