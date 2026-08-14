import { useCVStore } from '../../../cv/store/useCVStore';
import { selectSectionOrder, selectHiddenSections } from '../../../cv/store/cvSelectors';
import { SectionManager } from '../../../builder/components/SectionManager';

export function TemplateSectionControls({ activeTemplate }) {
  const sectionOrder = useCVStore(selectSectionOrder);
  const hiddenSections = useCVStore(selectHiddenSections);
  const reorderSections = useCVStore((state) => state.reorderSections);
  const toggleSectionVisibility = useCVStore((state) => state.toggleSectionVisibility);

  function handleResetOrder() {
    if (activeTemplate?.supportedSections) {
      reorderSections([...activeTemplate.supportedSections]);
    }
  }

  return (
    <SectionManager
      sectionOrder={sectionOrder}
      hiddenSections={hiddenSections}
      onReorder={reorderSections}
      onToggleVisibility={toggleSectionVisibility}
      onResetOrder={handleResetOrder}
    />
  );
}
