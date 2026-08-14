import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Mail, UserPlus, AlertCircle } from 'lucide-react';
import { registerSchema } from '../schemas/registerSchema';
import { useRegister } from '../hooks/useRegister';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { PasswordField } from './PasswordField';
import { PasswordStrength } from './PasswordStrength';
import { AuthDemoNotice } from './AuthDemoNotice';
import { ROUTE_PATHS } from '../../../app/routePaths';

export function RegisterForm() {
  const { t } = useTranslation(['auth', 'common']);
  const navigate = useNavigate();
  const { register: performRegister, isLoading, error } = useRegister();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const passwordValue = useWatch({ control, name: 'password' });

  const onSubmit = async (data) => {
    const result = await performRegister(data);
    if (result.success) {
      navigate(ROUTE_PATHS.SETTINGS);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">{t('auth:registerTitle')}</h1>
        <p className="text-xs text-foreground-secondary">{t('auth:registerSubtitle')}</p>
      </div>

      <AuthDemoNotice />

      {error && (
        <div className="p-3 bg-danger-subtle text-danger rounded-xl text-xs flex items-center gap-2" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{error.message}</span>
        </div>
      )}

      <Input
        label={t('auth:displayName')}
        type="text"
        leadingIcon={User}
        autoComplete="name"
        error={errors.displayName?.message}
        registration={register('displayName')}
      />

      <Input
        label={t('auth:email')}
        type="email"
        leadingIcon={Mail}
        autoComplete="email"
        error={errors.email?.message}
        registration={register('email')}
      />

      <div>
        <PasswordField
          label={t('auth:password')}
          autoComplete="new-password"
          error={errors.password?.message}
          registration={register('password')}
        />
        <PasswordStrength password={passwordValue} />
      </div>

      <PasswordField
        label={t('auth:confirmPassword')}
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        registration={register('confirmPassword')}
      />

      <Checkbox
        id="accept-terms"
        label={t('auth:acceptTermsLabel')}
        error={errors.acceptTerms?.message}
        {...register('acceptTerms')}
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        leadingIcon={UserPlus}
        loading={isLoading}
        className="w-full"
      >
        {t('auth:registerSubmit')}
      </Button>

      <div className="text-center text-xs text-foreground-secondary pt-1">
        <span>{t('auth:alreadyHaveAccount')} </span>
        <Link to={ROUTE_PATHS.LOGIN} className="text-primary font-bold hover:underline">
          {t('auth:loginLink')}
        </Link>
      </div>
    </form>
  );
}
