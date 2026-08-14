import { ShieldCheck, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { COMPATIBILITY_LEVELS } from '../constants/templateConstants';
import { Badge } from '../../../components/ui/Badge';

/**
 * Renders localized compatibility badge for templates.
 */
export function TemplateCompatibilityBadge({ level, size = 'sm' }) {
  const { t } = useTranslation('templates');

  if (level === COMPATIBILITY_LEVELS.ATS_OPTIMIZED) {
    return (
      <Badge variant="success" size={size} leadingIcon={ShieldCheck}>
        {t('compatibilityBadges.ats-optimized')}
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" size={size} leadingIcon={Sparkles}>
      {t('compatibilityBadges.visually-enhanced')}
    </Badge>
  );
}
