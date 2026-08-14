import { useTranslation } from 'react-i18next';
import { useCVStore } from '../../cv/store/useCVStore';
import {
  selectCVData,
  selectStatus,
  selectIsDirty,
  selectCanUndo,
  selectCanRedo,
} from '../../cv/store/cvSelectors';

import { BuilderHeader } from './BuilderHeader';
import { ContentPanel } from './ContentPanel';
import { DesignPanel } from './DesignPanel';
import { PreviewPanel } from './PreviewPanel';
import { BuilderUnsavedGuard } from './BuilderUnsavedGuard';
import { useBuilderLayout } from '../hooks/useBuilderLayout';
import { useBuilderKeyboardShortcuts } from '../hooks/useBuilderKeyboardShortcuts';

export function BuilderLayout() {
  const { t } = useTranslation('builder');
  const cvData = useCVStore(selectCVData);
  const status = useCVStore(selectStatus);
  const isDirty = useCVStore(selectIsDirty);
  const canUndo = useCVStore(selectCanUndo);
  const canRedo = useCVStore(selectCanRedo);

  const replaceCVData = useCVStore((state) => state.replaceCVData);
  const markSaved = useCVStore((state) => state.markSaved);
  const undo = useCVStore((state) => state.undo);
  const redo = useCVStore((state) => state.redo);

  const { activeTab, setActiveTab } = useBuilderLayout('preview');

  function handleSave() {
    if (cvData) {
      replaceCVData(cvData);
      markSaved();
    }
  }

  useBuilderKeyboardShortcuts({
    onSave: handleSave,
    onUndo: undo,
    onRedo: redo,
    canUndo,
    canRedo,
  });

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-app-bg text-foreground select-none">
      <BuilderUnsavedGuard isDirty={isDirty} />

      {/* Top Studio Header */}
      <BuilderHeader
        title={cvData?.title || 'My Resume'}
        onSave={handleSave}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        isDirty={isDirty}
        status={status}
      />

      {/* Main Studio Body Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop 3-Column Layout (lg+) */}
        <div className="hidden lg:flex w-full h-full">
          <aside className="w-80 xl:w-96 bg-surface border-e border-border h-full flex flex-col shrink-0">
            <ContentPanel />
          </aside>

          <main className="flex-1 h-full overflow-hidden">
            <PreviewPanel />
          </main>

          <aside className="w-72 xl:w-80 bg-surface border-s border-border h-full flex flex-col shrink-0">
            <DesignPanel />
          </aside>
        </div>

        {/* Mobile / Tablet Viewport Layout (<lg) */}
        <div className="flex flex-col w-full h-full lg:hidden">
          <div className="flex-1 overflow-hidden">
            {activeTab === 'content' && (
              <div className="h-full bg-surface">
                <ContentPanel />
              </div>
            )}

            {activeTab === 'preview' && (
              <div className="h-full">
                <PreviewPanel />
              </div>
            )}

            {activeTab === 'design' && (
              <div className="h-full bg-surface">
                <DesignPanel />
              </div>
            )}
          </div>

          {/* Bottom Mobile Viewport Tab Bar */}
          <nav className="h-14 bg-surface border-t border-border flex items-center justify-around shrink-0 px-2">
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-2 text-xs font-bold text-center rounded-lg ${
                activeTab === 'content' ? 'bg-primary-subtle text-primary' : 'text-foreground-secondary'
              }`}
            >
              {t('content')}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-2 text-xs font-bold text-center rounded-lg ${
                activeTab === 'preview' ? 'bg-primary-subtle text-primary' : 'text-foreground-secondary'
              }`}
            >
              {t('preview')}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('design')}
              className={`flex-1 py-2 text-xs font-bold text-center rounded-lg ${
                activeTab === 'design' ? 'bg-primary-subtle text-primary' : 'text-foreground-secondary'
              }`}
            >
              {t('design')}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
