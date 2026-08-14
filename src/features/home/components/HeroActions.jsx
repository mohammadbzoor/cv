import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlusCircle, LayoutTemplate, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { ROUTE_PATHS } from '../../../app/routePaths';
import { Button } from '../../../components/ui/Button';
import { useLanguage } from '../../../hooks/useLanguage';

export function HeroActions() {
  const { t } = useTranslation('home');
  const { isRTL } = useLanguage();
  const ActionArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-4 pt-2">
      <div className="flex flex-wrap gap-3 items-center justify-start">
        <Link to={ROUTE_PATHS.CREATE}>
          <Button
            type="button"
            variant="primary"
            size="md"
            leadingIcon={PlusCircle}
            trailingIcon={ActionArrow}
          >
            {t('ctaCreateCv')}
          </Button>
        </Link>

        <Link to={ROUTE_PATHS.TEMPLATES}>
          <Button
            type="button"
            variant="outline"
            size="md"
            leadingIcon={LayoutTemplate}
          >
            {t('ctaBrowseTemplates')}
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2 text-xs text-foreground-secondary">
        <Info className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden="true" />
        <span>{t('heroDemoPrivacyNote')}</span>
      </div>
    </div>
  );
}
