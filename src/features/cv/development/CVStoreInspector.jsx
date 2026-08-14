import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCVStore } from '../store/useCVStore';
import { validateCVForExport } from '../utils/validateCVData';
import { serializeCVData, parseCVDataJSON, downloadCVDataJSON } from '../utils/cvJsonTransfer';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Select } from '../../../components/ui/Select';
import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';

export function CVStoreInspector() {
  const { t } = useTranslation(['cv', 'common']);
  const store = useCVStore();

  const [importJsonText, setImportJsonText] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const cv = store.cvData;

  function handleAddExp() {
    store.addExperience({
      company: 'Tech Solutions Inc.',
      position: 'Senior Frontend Developer',
      location: 'Remote',
      startDate: '2022-01',
      endDate: 'Present',
      isCurrent: true,
      description: 'Led development of React SPA platforms.',
    });
  }

  function handleAddEdu() {
    store.addEducation({
      institution: 'State University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2020-06',
    });
  }

  function handleAddSkill() {
    store.addSkill({
      name: 'React.js & Tailwind CSS',
      category: 'Frontend',
      level: 'expert',
    });
  }

  function handleAddProject() {
    store.addProject({
      name: 'CV Builder Platform',
      description: 'ATS compliant resume builder built with React 19.',
      technologies: ['React', 'Zustand', 'Tailwind CSS'],
    });
  }

  function handleTestImport() {
    const res = parseCVDataJSON(importJsonText);
    if (res.success && res.data) {
      store.replaceCVData(res.data);
      setValidationResult({ success: true, message: 'JSON imported and validated successfully!' });
    } else {
      setValidationResult({ success: false, errors: res.errors });
    }
  }

  function handleValidateExport() {
    const res = validateCVForExport(store.cvData);
    setValidationResult(res);
  }

  return (
    <div className="space-y-6">
      {/* Basic Info Controls */}
      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
          1. Basic Document Fields (English LTR)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label={t('cv:documentTitle')}
            value={cv?.title || ''}
            onChange={(e) => store.setDocumentTitle(e.target.value)}
            lang="en"
            dir="ltr"
          />

          <Input
            label={t('cv:fullName')}
            value={cv?.personalInfo?.fullName || ''}
            onChange={(e) => store.updatePersonalInfo({ fullName: e.target.value })}
            lang="en"
            dir="ltr"
          />

          <Input
            label={t('cv:jobTitle')}
            value={cv?.personalInfo?.jobTitle || ''}
            onChange={(e) => store.updatePersonalInfo({ jobTitle: e.target.value })}
            lang="en"
            dir="ltr"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <Select
            label={t('cv:template')}
            value={cv?.design?.templateId || 'classic-ats'}
            onChange={(e) => store.setTemplate(e.target.value)}
            options={[
              { value: 'classic-ats', label: 'Classic ATS Template' },
              { value: 'modern-minimal', label: 'Modern Minimal Template' },
              { value: 'executive-slate', label: 'Executive Slate Template' },
            ]}
          />

          <div className="space-y-1">
            <span className="text-xs font-semibold text-foreground">{t('cv:hiddenSections')}</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {['summary', 'skills', 'projects', 'certificates'].map((sec) => {
                const isHidden = cv?.hiddenSections?.includes(sec);
                return (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => store.toggleSectionVisibility(sec)}
                    className="cursor-pointer"
                  >
                    <Badge variant={isHidden ? 'secondary' : 'primary'} size="sm">
                      {sec} {isHidden ? '(Hidden)' : '(Visible)'}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Item Action Triggers */}
      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
          2. Dynamic Section Factories & Actions
        </h3>

        <div className="flex flex-wrap gap-3">
          <Button size="sm" onClick={handleAddExp}>
            + {t('cv:add')} {t('cv:experience')}
          </Button>
          <Button size="sm" onClick={handleAddEdu}>
            + {t('cv:add')} {t('cv:education')}
          </Button>
          <Button size="sm" onClick={handleAddSkill}>
            + {t('cv:add')} {t('cv:skills')}
          </Button>
          <Button size="sm" onClick={handleAddProject}>
            + {t('cv:add')} {t('cv:projects')}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
          <Button size="sm" variant="outline" onClick={() => store.undo()} disabled={store.history.length === 0}>
            {t('cv:undo')}
          </Button>
          <Button size="sm" variant="outline" onClick={() => store.redo()} disabled={store.future.length === 0}>
            {t('cv:redo')}
          </Button>
          <Button size="sm" variant="secondary" onClick={() => store.markSaving()}>
            {t('cv:saving')}
          </Button>
          <Button size="sm" variant="secondary" onClick={() => store.markSaved()}>
            {t('cv:saved')}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => store.resetCV()}>
            {t('cv:reset')}
          </Button>
        </div>
      </Card>

      {/* JSON & Export Inspection */}
      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
          3. JSON Serialization & Validation Inspector
        </h3>

        <div className="flex flex-wrap gap-3">
          <Button size="sm" onClick={() => downloadCVDataJSON(store.cvData)}>
            {t('cv:exportJson')}
          </Button>          <Button size="sm" variant="outline" onClick={handleValidateExport}>
            {t('cv:validate')}
          </Button>
        </div>

        {validationResult && (
          <div
            className={`p-3 rounded-lg border text-xs space-y-1 ${
              validationResult.success ? 'bg-success-subtle border-success text-success' : 'bg-error-subtle border-error text-error'
            }`}
          >
            <span className="font-bold">
              {validationResult.success ? 'Validation Passed!' : 'Validation Issues Detected:'}
            </span>
            {validationResult.errors?.map((err, idx) => (
              <div key={idx} className="font-mono">
                • [{err.path}]: {err.code} — {err.message}
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2 pt-2">
          <Textarea
            label={t('cv:importJson')}
            placeholder="Paste raw CV JSON here to test parsing and structural validation..."
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            rows={4}
            lang="en"
            dir="ltr"
          />
          <Button size="sm" onClick={handleTestImport} disabled={!importJsonText.trim()}>
            {t('cv:importJson')}
          </Button>
        </div>

        {/* Live JSON Snapshot Preview */}
        <div className="space-y-2 pt-4 border-t border-border/60">
          <span className="text-xs font-bold text-foreground-secondary">Live CV Store JSON Preview:</span>
          <pre className="p-4 bg-app-bg rounded-xl border border-border text-[11px] font-mono text-foreground overflow-x-auto max-h-72 leading-normal">
            {serializeCVData(store.cvData)}
          </pre>
        </div>
      </Card>
    </div>
  );
}
