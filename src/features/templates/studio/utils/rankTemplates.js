import { TEMPLATES_METADATA } from '../../registry/templateMetadata';

/**
 * Deterministic scoring engine for template recommendation.
 * Scores all available templates against user preferences and CV data metrics.
 *
 * @param {object} inputs
 * @param {string} inputs.careerLevel - 'student' | 'junior' | 'mid' | 'senior' | 'executive'
 * @param {string} inputs.targetRole - 'software' | 'engineering' | 'business' | 'consulting' | 'management' | 'general'
 * @param {string} inputs.pagePreference - 'one-page' | 'flexible'
 * @param {string} inputs.contentEmphasis - 'experience' | 'projects' | 'skills' | 'achievements' | 'education'
 * @param {object} cvData
 * @returns {Array<{ templateId: string, score: number, reasons: string[] }>}
 */
export function rankTemplates(inputs = {}, cvData = {}) {
  const experiences = cvData?.experiences || [];
  const projects = cvData?.projects || [];
  const skills = cvData?.skills || [];

  const expCount = experiences.length;
  const projCount = projects.length;
  const skillCount = skills.length;

  const careerLevel = inputs.careerLevel || (expCount >= 5 ? 'senior' : expCount >= 2 ? 'mid' : 'junior');
  const targetRole = inputs.targetRole || 'software';
  const pagePref = inputs.pagePreference || (expCount <= 2 ? 'one-page' : 'flexible');
  const emphasis = inputs.contentEmphasis || (projCount > expCount ? 'projects' : 'experience');

  const rawScored = TEMPLATES_METADATA.map((tpl) => {
    let score = 50; // baseline
    const reasons = [];

    // 1. Role alignment
    if (targetRole === 'software' || targetRole === 'engineering') {
      if (tpl.id === 'technical-prime-ats') {
        score += 20;
        reasons.push('technicalPrimeMatch');
      } else if (tpl.id === 'developer') {
        score += 15;
        reasons.push('developerMatch');
      }
    } else if (targetRole === 'management' || targetRole === 'business' || targetRole === 'consulting') {
      if (tpl.id === 'executive-ats') {
        score += 25;
        reasons.push('executiveMatch');
      } else if (tpl.id === 'professional-ats') {
        score += 15;
        reasons.push('professionalMatch');
      }
    }

    // 2. Career level alignment
    if (careerLevel === 'executive') {
      if (tpl.id === 'executive-ats') {
        score += 20;
        reasons.push('executiveMatch');
      } else if (tpl.id === 'professional-ats') {
        score += 10;
        reasons.push('seniorCareerMatch');
      }
    } else if (careerLevel === 'senior') {
      if (tpl.id === 'professional-ats') {
        score += 15;
        reasons.push('seniorCareerMatch');
      } else if (tpl.id === 'executive-ats') {
        score += 12;
        reasons.push('seniorCareerMatch');
      }
    } else if (careerLevel === 'student' || careerLevel === 'junior') {
      if (tpl.id === 'classic-ats' || tpl.id === 'compact-ats') {
        score += 15;
        reasons.push('juniorCareerMatch');
      }
    }

    // 3. Page preference & density
    if (pagePref === 'one-page' || expCount <= 2) {
      if (tpl.id === 'compact-ats') {
        score += 15;
        reasons.push('onePageMatch');
      }
    }

    // 4. Content emphasis
    if (emphasis === 'skills' || skillCount >= 6) {
      if (tpl.id === 'technical-prime-ats') {
        score += 10;
        reasons.push('groupedSkillsMatch');
      }
    } else if (emphasis === 'projects' || projCount >= 2) {
      if (tpl.id === 'developer' || tpl.id === 'technical-prime-ats') {
        score += 10;
        reasons.push('projectFocusMatch');
      }
    }

    // General ATS score boost for ATS-optimized templates
    if (tpl.category === 'ats') {
      score += 5;
    }

    return {
      templateId: tpl.id,
      score,
      reasons: reasons.length > 0 ? reasons : ['generalAtsMatch'],
    };
  });

  // Sort by raw score first, then normalize top score to range 50-98
  rawScored.sort((a, b) => b.score - a.score);

  return rawScored.map((item) => ({
    ...item,
    score: Math.min(98, Math.max(50, item.score)),
  }));
}
