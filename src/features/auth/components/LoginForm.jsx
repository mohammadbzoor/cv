import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, LogIn, AlertCircle } from 'lucide-react';
import { loginSchema } from '../schemas/loginSchema';
import { useLogin } from '../hooks/useLogin';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { PasswordField } from './PasswordField';
import { AuthDemoNotice } from './AuthDemoNotice';
import { ROUTE_PATHS } from '../../../app/routePaths';

export function LoginForm() {
  const { t } = useTranslation(['auth', 'common']);
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'demo@example.com',
      password: 'password123',
      rememberDemoSession: true,
    },
  });

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      navigate(ROUTE_PATHS.SETTINGS);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">{t('auth:loginTitle')}</h1>
        <p className="text-xs text-foreground-secondary">{t('auth:loginSubtitle')}</p>
      </div>

      <AuthDemoNotice />

      {error && (
        <div className="p-3 bg-danger-subtle text-danger rounded-xl text-xs flex items-center gap-2" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{error.message}</span>
        </div>
      )}

      <Input
        label={t('auth:email')}
        type="email"
        leadingIcon={Mail}
        autoComplete="email"
        error={errors.email?.message}
        registration={register('email')}
      />

      <PasswordField
        label={t('auth:password')}
        autoComplete="current-password"
        error={errors.password?.message}
        registration={register('password')}
      />

      <div className="flex items-center justify-between text-xs">
        <Checkbox
          id="remember-demo"
          label={t('auth:rememberDemoSession')}
          {...register('rememberDemoSession')}
        />

        <Link
          to={ROUTE_PATHS.FORGOT_PASSWORD}
          className="text-primary font-medium hover:underline focus-visible:outline-hidden"
        >
          {t('auth:forgotPasswordLink')}
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        leadingIcon={LogIn}
        loading={isLoading}
        className="w-full"
      >
        {t('auth:loginSubmit')}
      </Button>

      <div className="text-center text-xs text-foreground-secondary pt-2">
        <span>{t('auth:dontHaveAccount')} </span>
        <Link to={ROUTE_PATHS.REGISTER} className="text-primary font-bold hover:underline">
          {t('auth:registerLink')}
        </Link>
      </div>
    </form>
  );
}
