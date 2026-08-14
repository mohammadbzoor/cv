import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../features/auth/components/AuthLayout';
import { RegisterForm } from '../features/auth/components/RegisterForm';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export default function RegisterPage() {
  const { t } = useTranslation('auth');

  useDocumentMetadata({
    title: `${t('registerTitle')} — CV Platform`,
    description: t('registerSubtitle'),
  });

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
