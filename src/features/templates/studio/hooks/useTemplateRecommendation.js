import { useState, useMemo, useCallback } from 'react';
import { buildTemplateRecommendation } from '../utils/buildTemplateRecommendation';

export function useTemplateRecommendation(cvData) {
  const [userPreferences, setUserPreferences] = useState({
    careerLevel: '',
    targetRole: 'software',
    pagePreference: 'flexible',
    contentEmphasis: 'experience',
  });

  const updatePreference = useCallback((key, value) => {
    setUserPreferences((prev) => ({ ...prev, [key]: value }));
  }, []);

  const recommendation = useMemo(() => {
    return buildTemplateRecommendation(userPreferences, cvData);
  }, [userPreferences, cvData]);

  return {
    userPreferences,
    updatePreference,
    recommendation,
  };
}
