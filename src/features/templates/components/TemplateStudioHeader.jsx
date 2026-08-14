import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sliders, LayoutTemplate } from 'lucide-react';
import { ROUTE_PATHS } from '../../../app/routePaths';
import { Button } from '../../../components/ui/Button';
import { getTemplateName } from '../registry/templateMetadata';

export function TemplateStudioHeader({ currentTemplateId, totalTemplates, displayedCount }) {
  const { t } = useTranslation(['templates', 'navigation']);

  const currentTemplateName = getTemplateName(currentTemplateId);

  return (
    <div className="space-y-4 text-start border-b border-border/60 pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-subtle text-primary text-[11px] font-bold rounded-md uppercase tracking-wider">
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>{t('templates:eyebrow')}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            {t('templates:pageTitle')}
          </h1>

          <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed max-w-2xl">
            {t('templates:pageDesc')}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link to={ROUTE_PATHS.BUILDER}>
            <Button
              type="button"
              variant="primary"
              size="md"
              leadingIcon={Sliders}
            >
              {t('navigation:openBuilder')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Badges bar */}
      <div className="flex items-center gap-3 flex-wrap text-xs">
        <span className="px-2.5 py-1 bg-surface border border-border rounded-lg text-foreground font-medium">
          {t('templates:showingCount', { count: displayedCount, total: totalTemplates })}
        </span>

        <span className="px-2.5 py-1 bg-primary-subtle text-primary border border-primary/20 rounded-lg font-semibold">
          {t('templates:activeTemplate')}: <strong className="font-bold">{currentTemplateName}</strong>
        </span>

        <span className="px-2.5 py-1 bg-secondary-subtle text-secondary border border-secondary/20 rounded-lg font-medium">
          {t('templates:englishCvNotice')}
        </span>
      </div>
    </div>
  );
}
