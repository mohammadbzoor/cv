export function getDesignDifferences(oldDesign, newDesign) {
  const differences = [];
  
  if (!oldDesign || !newDesign) return differences;

  const keysToCompare = [
    { key: 'fontFamily', labelKey: 'designSettings.fontFamily' },
    { key: 'fontSize', labelKey: 'designSettings.fontSize' },
    { key: 'density', labelKey: 'templates:contentDensity' },
    { key: 'margins', labelKey: 'designSettings.margins' },
    { key: 'headingStyle', labelKey: 'templates:headingStyle' },
    { key: 'showSectionDividers', labelKey: 'templates:showSectionDividers' },
    { key: 'itemSpacing', labelKey: 'designSettings.itemSpacing' },
    { key: 'paragraphSpacing', labelKey: 'designSettings.paragraphSpacing' },
    { key: 'contactLayout', labelKey: 'designSettings.contactLayout' },
    { key: 'skillsPresentation', labelKey: 'designSettings.skillsPresentation' },
    { key: 'dateAlignment', labelKey: 'designSettings.dateAlignment' },
  ];

  keysToCompare.forEach(({ key, labelKey }) => {
    const oldValue = oldDesign[key];
    const newValue = newDesign[key];
    
    if (oldValue !== newValue) {
      differences.push({
        key,
        labelKey,
        oldValue: String(oldValue),
        newValue: String(newValue),
      });
    }
  });

  return differences;
}
