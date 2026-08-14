import { useTranslation } from 'react-i18next';
import { FileCheck, ShieldCheck, Sparkles, Layers } from 'lucide-react';

/**
 * Brand & Value proposition panel for Auth Layout.
 */
export function AuthBrandPanel() {
  const { t } = useTranslation(['auth', 'common']);

  return (
    <div className="hidden lg:flex flex-col justify-between p-10 bg-primary text-on-primary rounded-2xl relative overflow-hidden">
      {/* Decorative Document Lines Visual */}
      <div className="absolute -end-16 -bottom-16 w-80 h-80 opacity-10 border-4 border-on-primary/30 rounded-3xl pointer-events-none transform rotate-12" />

      <div className="space-y-4 z-10">
        <div className="flex items-center gap-2">
          <FileCheck className="w-8 h-8 text-secondary-subtle" aria-hidden="true" />
          <span className="font-extrabold text-xl tracking-tight">{t('common:appTitle')}</span>
        </div>
        <p className="text-on-primary/80 text-sm max-w-sm leading-relaxed">
          {t('auth:brandTagline')}
        </p>
      </div>

      {/* Value points */}
      <div className="space-y-4 z-10 my-8">
        <div className="flex items-center gap-3 text-xs text-on-primary/90">
          <div className="p-2 bg-on-primary/10 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-secondary-subtle" aria-hidden="true" />
          </div>
          <span>{t('auth:brandPoint1')}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-on-primary/90">
          <div className="p-2 bg-on-primary/10 rounded-lg">
            <Layers className="w-4 h-4 text-secondary-subtle" aria-hidden="true" />
          </div>
          <span>{t('auth:brandPoint2')}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-on-primary/90">
          <div className="p-2 bg-on-primary/10 rounded-lg">
            <Sparkles className="w-4 h-4 text-secondary-subtle" aria-hidden="true" />
          </div>
          <span>{t('auth:brandPoint3')}</span>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="z-10 text-[11px] text-on-primary/60 border-t border-on-primary/10 pt-4">
        © 2026 CV Platform. All rights reserved.
      </div>
    </div>
  );
}
