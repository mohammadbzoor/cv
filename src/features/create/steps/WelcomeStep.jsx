import { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../hooks/useLanguage';
import { Button } from '../../../components/ui/Button';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { EnglishContentNotice } from '../components/EnglishContentNotice';
import { FormSection } from '../components/FormSection';

export function WelcomeStep({ onStart, onResetDraft, hasExistingData }) {
  const { t } = useTranslation('create');
  const { isRTL } = useLanguage();
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const ActionArrow = isRTL ? ArrowLeft : ArrowRight;

  function handleConfirmReset() {
    setIsResetConfirmOpen(false);
    onResetDraft();
  }

  return (
    <FormSection
      title={t('steps.welcome.label')}
      description={t('steps.welcome.desc')}
    >
      <div className="space-y-6">
        <EnglishContentNotice />

        <div className="bg-surface-muted rounded-xl p-5 border border-border/60 space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            {t('pageTitle')}
          </h3>
          <p className="text-xs text-foreground-secondary leading-relaxed">
            {t('pageDesc')}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {hasExistingData ? (
            <>
              <Button
                type="button"
                variant="primary"
                size="lg"
                trailingIcon={ActionArrow}
                onClick={onStart}
              >
                {t('continueDraft')}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                leadingIcon={RefreshCw}
                onClick={() => setIsResetConfirmOpen(true)}
              >
                {t('startOver')}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="lg"
              trailingIcon={ActionArrow}
              onClick={onStart}
            >
              {t('steps.welcome.label')} — Start
            </Button>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleConfirmReset}
        title={t('confirmResetTitle')}
        description={t('confirmResetDesc')}
        destructive
      />
    </FormSection>
  );
}
