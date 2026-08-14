import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

export function ServiceCard({ service }) {
  const { t } = useTranslation('home');
  const { isRTL } = useLanguage();
  const Icon = service.icon;
  const ActionArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <Link
      to={service.route}
      className="group block p-6 bg-surface border border-border rounded-2xl shadow-2xs hover:shadow-md hover:border-border-strong transition-all duration-200"
    >
      <div className="space-y-4">
        <div className="p-3 bg-primary-subtle text-primary rounded-xl w-fit group-hover:bg-primary group-hover:text-on-primary transition-colors">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
            <span>{t(service.titleKey)}</span>
            <ActionArrow className="w-4 h-4 text-foreground-secondary group-hover:text-primary group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
          </h3>
          <p className="text-xs text-foreground-secondary leading-relaxed">
            {t(service.descKey)}
          </p>
        </div>
      </div>
    </Link>
  );
}
