import {
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  RotateCcw,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Award,
  Languages,
  LayoutList,
  User,
  GripVertical,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getSectionLabel } from '../utils/getSectionLabel';
import { Button } from '../../../components/ui/Button';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectCVData } from '../../cv/store/cvSelectors';
import { getSectionContentStatus } from '../../cv/utils/getSectionContentStatus';

const SECTION_ICONS = {
  personalInfo: User,
  summary: FileText,
  experiences: Briefcase,
  education: GraduationCap,
  skills: Sparkles,
  projects: FolderGit2,
  certificates: Award,
  languages: Languages,
};

/**
 * Section Visibility & Ordering control panel.
 */
export function SectionManager({ sectionOrder = [], hiddenSections = [], onReorder, onToggleVisibility, onResetOrder }) {
  const { t } = useTranslation(['builder', 'templates', 'common']);
  const cvData = useCVStore(selectCVData);
  const hiddenSet = new Set(hiddenSections);

  function handleMove(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sectionOrder.length) return;

    const updated = [...sectionOrder];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    if (typeof onReorder === 'function') {
      onReorder(updated);
    }
  }

  return (
    <div className="space-y-3 bg-surface border border-border p-4 rounded-xl shadow-2xs text-start">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <LayoutList className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          {t('builder:sectionsManager')}
        </h3>

        {typeof onResetOrder === 'function' && (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            leadingIcon={RotateCcw}
            onClick={onResetOrder}
            title={t('templates:resetRecommendedOrder')}
          >
            {t('templates:resetOrder', { defaultValue: 'Reset' })}
          </Button>
        )}
      </div>

      <ul className="space-y-2">
        {sectionOrder.map((sectionKey, index) => {
          const isHidden = hiddenSet.has(sectionKey);
          const isFirst = index === 0;
          const isLast = index === sectionOrder.length - 1;
          const SectionIcon = SECTION_ICONS[sectionKey] || LayoutList;

          const hasContent = getSectionContentStatus(cvData, sectionKey);

          return (
            <li
              key={sectionKey}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                isHidden
                  ? 'bg-surface-muted/60 border-border/50 text-foreground-muted opacity-65'
                  : 'bg-app-bg border-border text-foreground hover:border-primary/40 shadow-2xs'
              }`}
            >
              {/* Section Icon & Title */}
              <div className="flex items-center gap-2.5 min-w-0 me-2">
                <div
                  className={`p-1.5 rounded-lg shrink-0 ${
                    isHidden
                      ? 'bg-surface-muted text-foreground-muted'
                      : 'bg-primary-subtle text-primary border border-primary/20'
                  }`}
                  aria-hidden="true"
                >
                  <SectionIcon className="w-4 h-4" />
                </div>

                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-bold truncate text-foreground">
                    {getSectionLabel(sectionKey)}
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        hasContent ? 'bg-success' : 'bg-warning'
                      }`}
                    />
                    <span className={`text-[10px] font-medium ${hasContent ? 'text-success' : 'text-warning'}`}>
                      {hasContent ? t('common:filled', { defaultValue: 'Filled' }) : t('common:empty', { defaultValue: 'Empty' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Controls: Move Up, Move Down, Toggle Visibility */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  disabled={isFirst}
                  onClick={() => handleMove(index, -1)}
                  aria-label={t('builder:moveUp')}
                  title={t('builder:moveUp')}
                  className="h-7 w-7 rounded-lg border border-border bg-surface hover:bg-surface-hover hover:border-primary/40 text-foreground flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                >
                  <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  disabled={isLast}
                  onClick={() => handleMove(index, 1)}
                  aria-label={t('builder:moveDown')}
                  title={t('builder:moveDown')}
                  className="h-7 w-7 rounded-lg border border-border bg-surface hover:bg-surface-hover hover:border-primary/40 text-foreground flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                >
                  <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onToggleVisibility(sectionKey)}
                  aria-label={isHidden ? t('builder:showSection') : t('builder:hideSection')}
                  title={isHidden ? t('builder:showSection') : t('builder:hideSection')}
                  className={`h-7 w-7 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shadow-2xs ${
                    isHidden
                      ? 'bg-surface-muted border-border text-foreground-muted hover:text-foreground'
                      : 'bg-primary-subtle border-primary/30 text-primary hover:bg-primary-subtle/80'
                  }`}
                >
                  {isHidden ? (
                    <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
