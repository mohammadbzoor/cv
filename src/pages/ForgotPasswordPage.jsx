import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../features/auth/components/AuthLayout';
import { ForgotPasswordForm } from '../features/auth/components/ForgotPasswordForm';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export default function ForgotPasswordPage() {
  const { t } = useTranslation('auth');

  useDocumentMetadata({
    title: `${t('forgotPasswordTitle')} — CV Platform`,
    description: t('forgotPasswordSubtitle'),
  });

  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
