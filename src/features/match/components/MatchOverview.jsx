import { useState } from 'react';
import { CheckCircle2, Plus, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectSkills } from '../../cv/store/cvSelectors';

export function MatchOverview({ result }) {
  const { t } = useTranslation('match');
  const addSkill = useCVStore((state) => state.addSkill);
  const currentSkills = useCVStore(selectSkills) || [];

  const [pendingSkill, setPendingSkill] = useState(null);
  const [addedSkills, setAddedSkills] = useState(new Set());

  if (!result) return null;

  const { matchScore, matchedSkills, missingSkills, experienceAlignment, summary } = result;

  function handleConfirmAdd() {
    if (pendingSkill) {
      addSkill({ name: pendingSkill, level: 'intermediate' });
      setAddedSkills((prev) => new Set(prev).add(pendingSkill));
      setPendingSkill(null);
    }
  }

  function isSkillInStore(name) {
    if (addedSkills.has(name)) return true;
    return currentSkills.some((s) => s.name?.toLowerCase() === name.toLowerCase());
  }

  return (
    <div className="space-y-6">
      {/* Confirm Dialog for Skill Honesty */}
      <ConfirmDialog
        isOpen={Boolean(pendingSkill)}
        onClose={() => setPendingSkill(null)}
        onConfirm={handleConfirmAdd}
        title={t('confirmHonestyTitle')}
        message={`${t('confirmHonestyDesc')} (${pendingSkill})`}
        confirmLabel={t('confirmAdd')}
        cancelLabel={t('cancel')}
        variant="primary"
      />

      {/* Match Score & Summary */}
      <Card className="p-6 text-center space-y-3 bg-surface border-primary/20">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">{t('matchScore')}</h3>
        <div className="text-4xl font-black text-primary font-mono">{matchScore}%</div>
        <p className="text-xs text-foreground-secondary leading-relaxed max-w-md mx-auto">{summary}</p>
      </Card>

      {/* Skills Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <Card className="p-5 space-y-3 border-success/30 bg-success-subtle/10">
          <h4 className="text-xs font-bold text-success uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            {t('matchedSkills')} ({matchedSkills.length})
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.map((sk, i) => (
              <span key={i} className="px-2.5 py-1 bg-surface border border-success/30 rounded text-xs font-semibold text-foreground">
                {sk}
              </span>
            ))}
          </div>
        </Card>

        {/* Missing Skills */}
        <Card className="p-5 space-y-3 border-warning/30 bg-warning-subtle/10">
          <h4 className="text-xs font-bold text-warning uppercase tracking-wider">
            {t('missingSkills')} ({missingSkills.length})
          </h4>
          <div className="space-y-2">
            {missingSkills.map((sk, i) => {
              const alreadyAdded = isSkillInStore(sk);
              return (
                <div key={i} className="flex items-center justify-between gap-2 p-2 bg-surface rounded border border-border text-xs">
                  <span className="font-semibold text-foreground">{sk}</span>
                  <Button
                    type="button"
                    variant={alreadyAdded ? 'ghost' : 'outline'}
                    size="sm"
                    leadingIcon={alreadyAdded ? Check : Plus}
                    disabled={alreadyAdded}
                    onClick={() => setPendingSkill(sk)}
                  >
                    {alreadyAdded ? t('added') : t('addToCV')}
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Experience Alignment */}
      <Card className="p-6 space-y-3">
        <h4 className="text-sm font-bold text-foreground">{t('experienceAlignment')}</h4>
        <div className="space-y-3">
          {experienceAlignment.map((item) => (
            <div key={item.id} className="p-3 bg-surface-muted border border-border rounded-xl space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-foreground">
                <span>{item.title}</span>
                <span className={`uppercase font-mono text-[10px] px-2 py-0.5 rounded ${
                  item.status === 'strong' ? 'bg-success-subtle text-success' : item.status === 'partial' ? 'bg-warning-subtle text-warning' : 'bg-error-subtle text-error'
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-foreground-secondary">{item.explanation}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
