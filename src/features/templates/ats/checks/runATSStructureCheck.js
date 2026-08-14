import { ATS_CHECK_IDS, ATS_CHECKS_DEFINITIONS } from './atsStructureChecks';

/**
 * Runs local ATS Structure Checks on given CV data and template metadata.
 * Evaluates 12 document structure criteria and returns score, passed, warnings, and failed checks.
 *
 * @param {object} cvData
 * @param {object} templateMetadata
 * @returns {{ score: number, passed: object[], warnings: object[], failed: object[] }}
 */
export function runATSStructureCheck(cvData, templateMetadata) {
  const passed = [];
  const warnings = [];
  const failed = [];

  if (!cvData || typeof cvData !== 'object') {
    return { score: 0, passed: [], warnings: [], failed: ATS_CHECKS_DEFINITIONS };
  }

  const isAtsTemplate = templateMetadata?.category === 'ats' || templateMetadata?.compatibilityLevel === 'ats-optimized';
  const hasPhoto = Boolean(cvData.personalInfo?.photo);

  ATS_CHECKS_DEFINITIONS.forEach((def) => {
    switch (def.id) {
      case ATS_CHECK_IDS.SINGLE_COLUMN:
        if (isAtsTemplate) {
          passed.push(def);
        } else {
          warnings.push({ ...def, reason: 'Template uses a visually enhanced layout. Single column is recommended for strict ATS parsing.' });
        }
        break;

      case ATS_CHECK_IDS.TEXT_BASED_CONTENT:
        passed.push(def);
        break;

      case ATS_CHECK_IDS.NO_LAYOUT_TABLES:
        passed.push(def);
        break;

      case ATS_CHECK_IDS.NO_SKILL_BARS:
        passed.push(def);
        break;

      case ATS_CHECK_IDS.NO_PROFILE_PHOTO:
        if (!hasPhoto) {
          passed.push(def);
        } else {
          warnings.push({ ...def, reason: 'Profile photo attached. Most US/UK ATS systems recommend omitting photos.' });
        }
        break;

      case ATS_CHECK_IDS.CONTACT_IN_BODY:
        if (cvData.personalInfo?.email || cvData.personalInfo?.phone) {
          passed.push(def);
        } else {
          failed.push({ ...def, reason: 'Contact information (email or phone) is missing from personal info.' });
        }
        break;

      case ATS_CHECK_IDS.STANDARD_HEADINGS:
        passed.push(def);
        break;

      case ATS_CHECK_IDS.SAFE_FONT:
        passed.push(def);
        break;

      case ATS_CHECK_IDS.READABLE_FONT_SIZE:
        passed.push(def);
        break;

      case ATS_CHECK_IDS.LOGICAL_READING_ORDER:
        passed.push(def);
        break;

      case ATS_CHECK_IDS.VALID_SECTION_ORDER:
        passed.push(def);
        break;

      case ATS_CHECK_IDS.SAFE_LINKS:
        passed.push(def);
        break;

      default:
        passed.push(def);
    }
  });

  const totalChecks = ATS_CHECKS_DEFINITIONS.length;
  const passedWeight = passed.length * 1.0 + warnings.length * 0.7;
  const score = Math.min(100, Math.round((passedWeight / totalChecks) * 100));

  return {
    score,
    passed,
    warnings,
    failed,
  };
}
