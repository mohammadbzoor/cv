import { useTranslation } from 'react-i18next';
import { LogOut, UserCheck, ShieldAlert } from 'lucide-react';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { selectAuthUser, selectIsAuthenticated } from '../../auth/store/authSelectors';
import { Button } from '../../../components/ui/Button';
import { SettingsSection } from './SettingsSection';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../app/routePaths';

export function AccountSettings() {
  const { t } = useTranslation(['settings', 'auth']);
  const navigate = useNavigate();
  const user = useAuthStore(selectAuthUser);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const endDemoSession = useAuthStore((state) => state.endDemoSession);

  const handleEndSession = () => {
    endDemoSession();
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <SettingsSection
      id="account"
      title={t('settings:accountTitle')}
      description={t('settings:accountDesc')}
    >
      <div className="space-y-4 max-w-lg">
        {isAuthenticated ? (
          <div className="p-4 bg-surface border border-border rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success-subtle text-success rounded-lg">
                <UserCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">
                  {t('settings:demoAccountActiveTitle', { name: user?.displayName })}
                </div>
                <div className="text-xs text-foreground-secondary">{user?.email}</div>
              </div>
            </div>

            <p className="text-xs text-foreground-secondary leading-relaxed">
              {t('settings:demoAccountNotice')}
            </p>

            <Button
              type="button"
              variant="outline"
              size="sm"
              leadingIcon={LogOut}
              onClick={handleEndSession}
            >
              {t('auth:endDemoSession')}
            </Button>
          </div>
        ) : (
          <div className="p-4 bg-surface border border-border rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary-subtle text-secondary rounded-lg">
                <ShieldAlert className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="text-xs font-bold text-foreground">
                {t('settings:anonymousAccountTitle')}
              </div>
            </div>

            <p className="text-xs text-foreground-secondary leading-relaxed">
              {t('settings:anonymousAccountDesc')}
            </p>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => navigate(ROUTE_PATHS.LOGIN)}
            >
              {t('auth:loginSubmit')}
            </Button>
          </div>
        )}
      </div>
    </SettingsSection>
  );
}
