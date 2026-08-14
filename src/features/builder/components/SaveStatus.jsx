import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../../../components/ui/Badge';

/**
 * Visual Save Status indicator for Builder Studio.
 */
export function SaveStatus({ isDirty, status }) {
  const { t } = useTranslation('builder');

  if (status === 'saving') {
    return (
      <Badge variant="warning" size="sm" leadingIcon={Clock}>
        {t('saving')}
      </Badge>
    );
  }

  if (status === 'error') {
    return (
      <Badge variant="error" size="sm" leadingIcon={AlertCircle}>
        {t('saveFailed')}
      </Badge>
    );
  }

  if (isDirty) {
    return (
      <Badge variant="warning" size="sm" leadingIcon={Clock}>
        {t('unsavedChanges')}
      </Badge>
    );
  }

  return (
    <Badge variant="success" size="sm" leadingIcon={CheckCircle}>
      {t('savedLocally')}
    </Badge>
  );
}
