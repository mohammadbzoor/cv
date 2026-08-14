import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectProjects } from '../../cv/store/cvSelectors';
import { createProject } from '../../cv/models/cvFactories';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Button } from '../../../components/ui/Button';

export function ProjectsEditor() {
  const projects = useCVStore(selectProjects) || [];
  const addProject = useCVStore((state) => state.addProject);
  const updateProject = useCVStore((state) => state.updateProject);
  const removeProject = useCVStore((state) => state.removeProject);

  return (
    <div className="space-y-4">
      {projects.map((proj) => {
        const technologiesText = Array.isArray(proj.technologies)
          ? proj.technologies.join(', ')
          : proj.technologies || '';

        return (
          <div key={proj.id} className="bg-surface-muted border border-border p-3.5 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="text-xs font-bold text-foreground truncate">
                {proj.name || 'New Project'}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeProject(proj.id)}
                className="h-6 w-6 p-0 text-error hover:bg-error-subtle shrink-0"
              >
                <Trash2 className="w-3 h-3" aria-hidden="true" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Input
                label="Project Title"
                value={proj.name || ''}
                onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                lang="en"
                dir="ltr"
              />

              <Input
                label="Technologies (Comma separated)"
                value={technologiesText}
                onChange={(e) => {
                  const arr = e.target.value.split(',').map((t) => t.trim());
                  updateProject(proj.id, { technologies: arr });
                }}
                lang="en"
                dir="ltr"
              />

              <Input
                label="Project URL"
                type="url"
                value={proj.url || ''}
                onChange={(e) => updateProject(proj.id, { url: e.target.value })}
                lang="en"
                dir="ltr"
              />

              <Input
                label="Repository URL"
                type="url"
                value={proj.repositoryUrl || ''}
                onChange={(e) => updateProject(proj.id, { repositoryUrl: e.target.value })}
                lang="en"
                dir="ltr"
              />
            </div>

            <Textarea
              label="Description"
              rows={2}
              value={proj.description || ''}
              onChange={(e) => updateProject(proj.id, { description: e.target.value })}
              lang="en"
              dir="ltr"
            />
          </div>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="sm"
        leadingIcon={Plus}
        onClick={() => addProject(createProject())}
        className="w-full border-dashed"
      >
        + Add Project
      </Button>
    </div>
  );
}
