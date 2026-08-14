import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';

export function HeroContent() {
  const { t } = useTranslation('home');

  return (
    <div className="space-y-4 text-start">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-subtle text-secondary rounded-full text-xs font-semibold">
        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{t('heroBadge')}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-[1.15]">
        {t('heroTitle')}
      </h1>

      <p className="text-sm md:text-base text-foreground-secondary leading-relaxed max-w-xl">
        {t('heroDescription')}
      </p>
    </div>
  );
}
