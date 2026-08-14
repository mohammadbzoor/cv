import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Send, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { forgotPasswordSchema } from '../schemas/forgotPasswordSchema';
import { mockForgotPassword } from '../services/mockAuthService';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { AuthDemoNotice } from './AuthDemoNotice';
import { ROUTE_PATHS } from '../../../app/routePaths';
import { useLanguage } from '../../../hooks/useLanguage';

export function ForgotPasswordForm() {
  const { t } = useTranslation(['auth', 'common']);
  const { isRTL } = useLanguage();
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  const [isLoading, setIsLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await mockForgotPassword(data);
      setSubmittedMessage(res.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">{t('auth:forgotPasswordTitle')}</h1>
        <p className="text-xs text-foreground-secondary">{t('auth:forgotPasswordSubtitle')}</p>
      </div>

      <AuthDemoNotice />

      {submittedMessage ? (
        <div className="p-4 bg-success-subtle/70 border border-success/30 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-success font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{t('auth:resetRequestedTitle')}</span>
          </div>
          <p className="text-xs text-foreground-secondary leading-relaxed">{submittedMessage}</p>
          <Link
            to={ROUTE_PATHS.LOGIN}
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline pt-2"
          >
            <BackIcon className="w-4 h-4" />
            <span>{t('auth:backToLogin')}</span>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label={t('auth:email')}
            type="email"
            leadingIcon={Mail}
            autoComplete="email"
            error={errors.email?.message}
            registration={register('email')}
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            leadingIcon={Send}
            loading={isLoading}
            className="w-full"
          >
            {t('auth:sendResetLink')}
          </Button>

          <div className="text-center pt-2">
            <Link
              to={ROUTE_PATHS.LOGIN}
              className="inline-flex items-center gap-2 text-xs text-foreground-secondary hover:text-foreground font-medium"
            >
              <BackIcon className="w-4 h-4" />
              <span>{t('auth:backToLogin')}</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
