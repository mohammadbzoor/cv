import { useState } from 'react';
import { ContentPanel } from './ContentPanel';
import { DesignSettingsPanel } from '../../templates/design/components/DesignSettingsPanel';

/**
 * Combined Sidebar for Desktop / Tablet viewports.
 */
export function BuilderSidebar() {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <aside className="w-80 lg:w-96 bg-surface border-e border-border flex flex-col h-full shrink-0 shadow-2xs">
      <div className="flex border-b border-border/80 bg-surface-muted p-1">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'content'
              ? 'bg-surface text-primary shadow-2xs'
              : 'text-foreground-secondary hover:text-foreground'
          }`}
        >
          Content
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('design')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'design'
              ? 'bg-surface text-primary shadow-2xs'
              : 'text-foreground-secondary hover:text-foreground'
          }`}
        >
          Design
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'content' ? <ContentPanel /> : <DesignSettingsPanel />}
      </div>
    </aside>
  );
}
