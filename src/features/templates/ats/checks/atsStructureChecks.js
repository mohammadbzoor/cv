export const ATS_CHECK_IDS = Object.freeze({
  STANDARD_HEADINGS: 'STANDARD_HEADINGS',
  SINGLE_COLUMN: 'SINGLE_COLUMN',
  TEXT_BASED_CONTENT: 'TEXT_BASED_CONTENT',
  NO_LAYOUT_TABLES: 'NO_LAYOUT_TABLES',
  NO_SKILL_BARS: 'NO_SKILL_BARS',
  NO_PROFILE_PHOTO: 'NO_PROFILE_PHOTO',
  CONTACT_IN_BODY: 'CONTACT_IN_BODY',
  SAFE_FONT: 'SAFE_FONT',
  READABLE_FONT_SIZE: 'READABLE_FONT_SIZE',
  LOGICAL_READING_ORDER: 'LOGICAL_READING_ORDER',
  VALID_SECTION_ORDER: 'VALID_SECTION_ORDER',
  SAFE_LINKS: 'SAFE_LINKS',
});

export const ATS_CHECKS_DEFINITIONS = Object.freeze([
  {
    id: ATS_CHECK_IDS.SINGLE_COLUMN,
    titleKey: 'templates:atsChecks.singleColumn.title',
    descKey: 'templates:atsChecks.singleColumn.desc',
    severity: 'high',
  },
  {
    id: ATS_CHECK_IDS.TEXT_BASED_CONTENT,
    titleKey: 'templates:atsChecks.textBased.title',
    descKey: 'templates:atsChecks.textBased.desc',
    severity: 'high',
  },
  {
    id: ATS_CHECK_IDS.NO_LAYOUT_TABLES,
    titleKey: 'templates:atsChecks.noTables.title',
    descKey: 'templates:atsChecks.noTables.desc',
    severity: 'high',
  },
  {
    id: ATS_CHECK_IDS.NO_SKILL_BARS,
    titleKey: 'templates:atsChecks.noSkillBars.title',
    descKey: 'templates:atsChecks.noSkillBars.desc',
    severity: 'medium',
  },
  {
    id: ATS_CHECK_IDS.NO_PROFILE_PHOTO,
    titleKey: 'templates:atsChecks.noPhoto.title',
    descKey: 'templates:atsChecks.noPhoto.desc',
    severity: 'medium',
  },
  {
    id: ATS_CHECK_IDS.CONTACT_IN_BODY,
    titleKey: 'templates:atsChecks.contactInBody.title',
    descKey: 'templates:atsChecks.contactInBody.desc',
    severity: 'high',
  },
  {
    id: ATS_CHECK_IDS.STANDARD_HEADINGS,
    titleKey: 'templates:atsChecks.standardHeadings.title',
    descKey: 'templates:atsChecks.standardHeadings.desc',
    severity: 'medium',
  },
  {
    id: ATS_CHECK_IDS.SAFE_FONT,
    titleKey: 'templates:atsChecks.safeFont.title',
    descKey: 'templates:atsChecks.safeFont.desc',
    severity: 'low',
  },
  {
    id: ATS_CHECK_IDS.READABLE_FONT_SIZE,
    titleKey: 'templates:atsChecks.fontSize.title',
    descKey: 'templates:atsChecks.fontSize.desc',
    severity: 'low',
  },
  {
    id: ATS_CHECK_IDS.LOGICAL_READING_ORDER,
    titleKey: 'templates:atsChecks.readingOrder.title',
    descKey: 'templates:atsChecks.readingOrder.desc',
    severity: 'high',
  },
  {
    id: ATS_CHECK_IDS.VALID_SECTION_ORDER,
    titleKey: 'templates:atsChecks.validOrder.title',
    descKey: 'templates:atsChecks.validOrder.desc',
    severity: 'medium',
  },
  {
    id: ATS_CHECK_IDS.SAFE_LINKS,
    titleKey: 'templates:atsChecks.safeLinks.title',
    descKey: 'templates:atsChecks.safeLinks.desc',
    severity: 'low',
  },
]);
