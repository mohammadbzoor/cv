import { useTranslation } from 'react-i18next';
import { Info, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { selectAuthUser, selectIsAuthenticated } from '../store/authSelectors';
import { Button } from '../../../components/ui/Button';

/**
 * Banner informing the user when a Demo Session is active.
 */
export function DemoSessionBanner() {
  const { t } = useTranslation('auth');
  const user = useAuthStore(selectAuthUser);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const endDemoSession = useAuthStore((state) => state.endDemoSession);

  if (!isAuthenticated || !user?.isDemo) return null;

  return (
    <div className="bg-secondary-subtle border-b border-secondary/20 px-4 py-2 text-xs text-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
        <span>
          {t('demoSessionActive', { name: user.displayName })}
        </span>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="xs"
        leadingIcon={LogOut}
        onClick={endDemoSession}
      >
        {t('endDemoSession')}
      </Button>
    </div>
  );
}
