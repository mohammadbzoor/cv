import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Settings, Sliders, LayoutTemplate, LogOut, LogIn } from 'lucide-react';
import { useAuthStore } from '../../../features/auth/store/useAuthStore';
import { selectAuthUser, selectIsAuthenticated } from '../../../features/auth/store/authSelectors';
import { DropdownMenu, DropdownMenuItem, DropdownMenuDivider } from '../../ui/DropdownMenu';
import { ROUTE_PATHS } from '../../../app/routePaths';
import { Button } from '../../ui/Button';

export function AccountMenu() {
  const { t } = useTranslation(['auth', 'navigation']);
  const navigate = useNavigate();
  const user = useAuthStore(selectAuthUser);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const endDemoSession = useAuthStore((state) => state.endDemoSession);

  if (!isAuthenticated) {
    return (
      <Link to={ROUTE_PATHS.LOGIN}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          leadingIcon={LogIn}
        >
          {t('auth:loginSubmit')}
        </Button>
      </Link>
    );
  }

  const initials = (user?.displayName || 'Demo User')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const trigger = (
    <button
      type="button"
      className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-muted border border-border transition-colors cursor-pointer"
      aria-label={user?.displayName || 'Account Menu'}
    >
      <div className="w-7 h-7 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center">
        {initials}
      </div>
      <span className="hidden xl:inline text-xs font-semibold text-foreground pe-1">
        {user?.displayName}
      </span>
    </button>
  );

  return (
    <DropdownMenu trigger={trigger} align="end">
      <div className="px-3 py-2 border-b border-border/60">
        <div className="font-bold text-xs text-foreground truncate">{user?.displayName}</div>
        <div className="text-[10px] text-foreground-secondary truncate">{user?.email}</div>
        <div className="mt-1 inline-block text-[9px] font-bold bg-secondary-subtle text-secondary px-1.5 py-0.5 rounded-xs">
          Demo Session
        </div>
      </div>

      <DropdownMenuItem
        leadingIcon={Settings}
        onClick={() => navigate(ROUTE_PATHS.SETTINGS)}
      >
        {t('navigation:settings', { defaultValue: 'Settings' })}
      </DropdownMenuItem>

      <DropdownMenuItem
        leadingIcon={Sliders}
        onClick={() => navigate(ROUTE_PATHS.BUILDER)}
      >
        {t('navigation:openBuilder', { defaultValue: 'Open Builder' })}
      </DropdownMenuItem>

      <DropdownMenuItem
        leadingIcon={LayoutTemplate}
        onClick={() => navigate(ROUTE_PATHS.TEMPLATES)}
      >
        {t('navigation:links.templates')}
      </DropdownMenuItem>

      <DropdownMenuDivider />

      <DropdownMenuItem
        leadingIcon={LogOut}
        destructive
        onClick={() => {
          endDemoSession();
          navigate(ROUTE_PATHS.HOME);
        }}
      >
        {t('auth:endDemoSession')}
      </DropdownMenuItem>
    </DropdownMenu>
  );
}
