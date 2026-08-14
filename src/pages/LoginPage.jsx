import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../features/auth/components/AuthLayout';
import { LoginForm } from '../features/auth/components/LoginForm';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export default function LoginPage() {
  const { t } = useTranslation('auth');

  useDocumentMetadata({
    title: `${t('loginTitle')} — CV Platform`,
    description: t('loginSubtitle'),
  });

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
