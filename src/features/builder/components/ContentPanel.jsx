import { useCVStore } from '../../cv/store/useCVStore';
import { selectSectionOrder, selectHiddenSections } from '../../cv/store/cvSelectors';
import { SectionManager } from './SectionManager';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs';

import { PersonalInfoEditor } from '../sections/PersonalInfoEditor';
import { SummaryEditor } from '../sections/SummaryEditor';
import { ExperienceEditor } from '../sections/ExperienceEditor';
import { EducationEditor } from '../sections/EducationEditor';
import { SkillsEditor } from '../sections/SkillsEditor';
import { ProjectsEditor } from '../sections/ProjectsEditor';
import { CertificatesEditor } from '../sections/CertificatesEditor';
import { LanguagesEditor } from '../sections/LanguagesEditor';

export function ContentPanel() {
  const sectionOrder = useCVStore(selectSectionOrder);
  const hiddenSections = useCVStore(selectHiddenSections);
  const reorderSections = useCVStore((state) => state.reorderSections);
  const toggleSectionVisibility = useCVStore((state) => state.toggleSectionVisibility);

  return (
    <div className="p-4 space-y-6 overflow-y-auto max-h-full">
      {/* Section Ordering & Visibility Controls */}
      <SectionManager
        sectionOrder={sectionOrder}
        hiddenSections={hiddenSections}
        onReorder={reorderSections}
        onToggleVisibility={toggleSectionVisibility}
      />

      {/* Section Editors Tabs */}
      <Tabs defaultValue="personal">
        <TabsList className="w-full flex flex-wrap gap-1 overflow-x-auto p-1 bg-surface-muted border border-border rounded-xl">
          <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
          <TabsTrigger value="summary" className="text-xs">Summary</TabsTrigger>
          <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
          <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
          <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
          <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
          <TabsTrigger value="additional" className="text-xs">More</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="pt-4">
          <PersonalInfoEditor />
        </TabsContent>

        <TabsContent value="summary" className="pt-4">
          <SummaryEditor />
        </TabsContent>

        <TabsContent value="experience" className="pt-4">
          <ExperienceEditor />
        </TabsContent>

        <TabsContent value="education" className="pt-4">
          <EducationEditor />
        </TabsContent>

        <TabsContent value="skills" className="pt-4">
          <SkillsEditor />
        </TabsContent>

        <TabsContent value="projects" className="pt-4">
          <ProjectsEditor />
        </TabsContent>

        <TabsContent value="additional" className="pt-4 space-y-6">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground border-b border-border/60 pb-1">Certificates</h4>
            <CertificatesEditor />
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground border-b border-border/60 pb-1">Spoken Languages</h4>
            <LanguagesEditor />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
