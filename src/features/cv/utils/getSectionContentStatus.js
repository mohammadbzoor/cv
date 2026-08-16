export function getSectionContentStatus(cvData, sectionKey) {
  if (!cvData) return false;
  
  const data = cvData[sectionKey];
  
  if (Array.isArray(data)) {
    return data.length > 0;
  }
  
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).some(val => val !== '' && val !== null && val !== undefined);
  }
  
  if (typeof data === 'string') {
    return data.trim().length > 0;
  }
  
  return false;
}
