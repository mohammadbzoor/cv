import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { User, Mail, Save, CheckCircle } from 'lucide-react';
import { profileSettingsSchema } from '../schemas/profileSettingsSchema';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { selectAuthUser } from '../../auth/store/authSelectors';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { SettingsSection } from './SettingsSection';

export function ProfileSettings() {
  const { t } = useTranslation('settings');
  const user = useAuthStore(selectAuthUser);
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      displayName: user?.displayName || 'Alex Morgan',
      email: user?.email || 'alex.demo@example.com',
    },
  });

  const onSubmit = (data) => {
    updateUserProfile(data);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const initials = (user?.displayName || 'Demo User')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <SettingsSection
      id="profile"
      title={t('profileTitle')}
      description={t('profileDesc')}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg" noValidate>
        {/* Avatar Initials Display */}
        <div className="flex items-center gap-4 pb-2">
          <div className="w-14 h-14 rounded-full bg-primary text-on-primary font-bold text-lg flex items-center justify-center border-2 border-border shadow-xs shrink-0">
            {initials}
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">{user?.displayName || 'Demo User'}</div>
            <div className="text-xs text-foreground-secondary">{t('demoProfileNotice')}</div>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-success-subtle text-success rounded-xl text-xs flex items-center gap-2" role="status">
            <CheckCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t('profileSavedNotice')}</span>
          </div>
        )}

        <Input
          label={t('displayNameLabel')}
          type="text"
          leadingIcon={User}
          error={errors.displayName?.message}
          registration={register('displayName')}
        />

        <Input
          label={t('emailLabel')}
          type="email"
          leadingIcon={Mail}
          error={errors.email?.message}
          registration={register('email')}
        />

        <Button
          type="submit"
          variant="primary"
          size="sm"
          leadingIcon={Save}
          loading={isSubmitting}
        >
          {t('saveProfileButton')}
        </Button>
      </form>
    </SettingsSection>
  );
}
