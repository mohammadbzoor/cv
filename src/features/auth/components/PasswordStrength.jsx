import { useTranslation } from 'react-i18next';

/**
 * Visual indicator for password strength in Demo registration.
 */
export function PasswordStrength({ password = '' }) {
  const { t } = useTranslation('auth');

  if (!password) return null;

  let strength = 0;
  if (password.length >= 6) strength += 1;
  if (password.length >= 10) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  const strengthLabels = [
    t('strengthWeak'),
    t('strengthFair'),
    t('strengthGood'),
    t('strengthStrong'),
    t('strengthVeryStrong'),
  ];

  const label = strengthLabels[Math.min(strength, 4)];
  const percentage = Math.min((strength / 5) * 100, 100);

  return (
    <div className="space-y-1 mt-1">
      <div className="flex items-center justify-between text-[11px] text-foreground-secondary">
        <span>{t('passwordStrength')}</span>
        <span className="font-semibold">{label}</span>
      </div>
      <div className="h-1.5 w-full bg-surface-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            strength <= 2 ? 'bg-danger' : strength <= 3 ? 'bg-warning' : 'bg-success'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
