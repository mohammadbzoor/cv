import { useTranslation } from 'react-i18next';
import { Select } from '../../../../components/ui/Select';
import { Switch } from '../../../../components/ui/Switch';
import {
  SUPPORTED_CONTACT_LAYOUTS,
  SUPPORTED_SKILLS_PRESENTATIONS,
  SUPPORTED_DATE_ALIGNMENTS,
} from '../../../cv/models/cvConstants';
import { SectionManager } from '../../../builder/components/SectionManager';
import { useCVStore } from '../../../cv/store/useCVStore';
import { selectSectionOrder, selectHiddenSections } from '../../../cv/store/cvSelectors';

export function StructureSettings({ design, onChange }) {
  const { t } = useTranslation(['builder', 'templates']);
  const sectionOrder = useCVStore(selectSectionOrder);
  const hiddenSections = useCVStore(selectHiddenSections);
  const reorderSections = useCVStore((state) => state.reorderSections);
  const toggleSectionVisibility = useCVStore((state) => state.toggleSectionVisibility);

  const contactLayoutOptions = SUPPORTED_CONTACT_LAYOUTS.map((c) => ({
    value: c,
    label: t(`templates:layout.${c}`, { defaultValue: c }),
  }));

  const skillsPresentationOptions = SUPPORTED_SKILLS_PRESENTATIONS.map((s) => ({
    value: s,
    label: t(`templates:layout.${s}`, { defaultValue: s }),
  }));

  const dateAlignmentOptions = SUPPORTED_DATE_ALIGNMENTS.map((d) => ({
    value: d,
    label: t(`templates:layout.${d}`, { defaultValue: d }),
  }));

  return (
    <div className="space-y-4">
      <Select
        label={t('builder:designSettings.contactLayout', { defaultValue: 'Contact Layout' })}
        options={contactLayoutOptions}
        value={design.contactLayout || 'inline'}
        onChange={(e) => onChange({ contactLayout: e.target.value })}
      />

      <Select
        label={t('builder:designSettings.skillsPresentation', { defaultValue: 'Skills Presentation' })}
        options={skillsPresentationOptions}
        value={design.skillsPresentation || 'list'}
        onChange={(e) => onChange({ skillsPresentation: e.target.value })}
      />

      <Select
        label={t('builder:designSettings.dateAlignment', { defaultValue: 'Date Alignment' })}
        options={dateAlignmentOptions}
        value={design.dateAlignment || 'opposite'}
        onChange={(e) => onChange({ dateAlignment: e.target.value })}
      />

      <div className="flex items-center justify-between p-3 bg-surface-muted rounded-xl border border-border/60">
        <span className="text-xs font-bold text-foreground">
          {t('templates:showBulletPoints', { defaultValue: 'Show Bullet Points' })}
        </span>
        <Switch
          checked={design.showBulletPoints !== false}
          onChange={(checked) => onChange({ showBulletPoints: checked })}
          aria-label={t('templates:showBulletPoints', { defaultValue: 'Show Bullet Points' })}
        />
      </div>

      <div className="pt-2 border-t border-border/60">
        <SectionManager
          sectionOrder={sectionOrder}
          hiddenSections={hiddenSections}
          onReorder={reorderSections}
          onToggleVisibility={toggleSectionVisibility}
        />
      </div>
    </div>
  );
}
