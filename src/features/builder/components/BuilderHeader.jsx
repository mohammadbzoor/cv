import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save, Undo2, Redo2, Download, FileCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../hooks/useLanguage';
import { ROUTE_PATHS } from '../../../app/routePaths';
import { Button } from '../../../components/ui/Button';
import { ThemeToggle } from '../../../components/ui/ThemeToggle';
import { LanguageSwitcher } from '../../../components/ui/LanguageSwitcher';
import { SaveStatus } from './SaveStatus';

export function BuilderHeader({
  title = 'My Resume Document',
  onSave,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isDirty,
  status,
}) {
  const { t } = useTranslation(['builder', 'common']);
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <header className="h-16 bg-surface border-b border-border px-4 md:px-6 flex items-center justify-between shrink-0 shadow-2xs gap-4 z-20">
      {/* Left: Back button & Title */}
      <div className="flex items-center gap-3 min-w-0">
        <Button
          type="button"
          variant="outline"
          size="sm"
          leadingIcon={BackIcon}
          onClick={() => navigate(ROUTE_PATHS.CREATE)}
          title={t('builder:backToCreate')}
        >
          <span className="hidden sm:inline">{t('builder:backToCreate')}</span>
        </Button>

        <div className="h-5 w-px bg-border/80 hidden sm:block" />

        <div className="flex items-center gap-2 min-w-0">
          <FileCheck className="w-5 h-5 text-primary shrink-0 hidden sm:block" aria-hidden="true" />
          <h1 className="text-sm md:text-base font-bold text-foreground truncate max-w-[160px] md:max-w-[260px]">
            {title}
          </h1>
        </div>
      </div>

      {/* Middle: Save Status */}
      <div className="hidden lg:flex items-center gap-2">
        <SaveStatus isDirty={isDirty} status={status} />
      </div>

      {/* Right: Actions, Controls & Theme/Lang */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          title={t('builder:undo')}
          aria-label={t('builder:undo')}
        >
          <Undo2 className="w-4 h-4" aria-hidden="true" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          title={t('builder:redo')}
          aria-label={t('builder:redo')}
        >
          <Redo2 className="w-4 h-4" aria-hidden="true" />
        </Button>

        <Button
          type="button"
          variant="primary"
          size="sm"
          leadingIcon={Save}
          onClick={onSave}
          title={t('builder:save')}
        >
          <span className="hidden md:inline">{t('common:save')}</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled
          leadingIcon={Download}
          title={t('builder:exportPdf')}
          className="hidden xl:inline-flex opacity-60"
        >
          {t('builder:exportPdf')}
        </Button>

        <div className="h-5 w-px bg-border/80 mx-1" />

        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
