import { useState, useId } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../components/ui/Input';

/**
 * Accessible Password input field with show/hide toggle.
 */
export function PasswordField({
  label,
  error,
  helperText,
  autoComplete = 'current-password',
  registration,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation('auth');
  const toggleId = useId();

  const toggleIcon = showPassword ? (
    <EyeOff className="w-4 h-4 text-foreground-secondary" aria-hidden="true" />
  ) : (
    <Eye className="w-4 h-4 text-foreground-secondary" aria-hidden="true" />
  );

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        label={label || t('password')}
        leadingIcon={Lock}
        error={error}
        helperText={helperText}
        autoComplete={autoComplete}
        trailingIcon={
          <button
            id={toggleId}
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? t('hidePassword') : t('showPassword')}
            className="p-1 rounded-md hover:bg-surface-muted transition-colors cursor-pointer text-foreground-secondary"
          >
            {toggleIcon}
          </button>
        }
        {...registration}
        {...props}
      />
    </div>
  );
}
