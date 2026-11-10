import React, { useState } from 'react';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { ProjectData } from '../../types/portfolio';
import { ArchitectureDiagram } from '../common/ArchitectureDiagram';
import { MermaidFlow } from '../common/MermaidFlow';

type TabId = 'architecture' | 'decisions' | 'tradeoffs';

interface ProjectDetailTabsProps {
  project: ProjectData;
}

/** Tabbed deep-dive (Architecture + Mermaid / Decisions / Tradeoffs) for expandable project cards. */
export const ProjectDetailTabs: React.FC<ProjectDetailTabsProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState<TabId>('architecture');

  const tabButton = (tab: TabId, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      type="button"
      className={`px-4 py-2 font-mono text-xs font-bold uppercase transition-colors rounded-none border-2 ${
        activeTab === tab
          ? 'bg-signal text-white border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
          : 'bg-white dark:bg-black text-black dark:text-white border-neutral-300 dark:border-neutral-700 hover:bg-cyan hover:text-black hover:border-cyan'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Tab Bar */}
      <div className="flex flex-wrap gap-3">
        {tabButton('architecture', '1. System Architecture Flow')}
        {tabButton('decisions', '2. Key Engineering Decisions')}
        {tabButton('tradeoffs', '3. Tradeoffs & Honest Limits')}
      </div>

      {/* Tab 1: Architecture Diagram + Mermaid Graph */}
      {activeTab === 'architecture' && (
        <div className="space-y-4">
          <ArchitectureDiagram
            nodes={project.architectureFlow.nodes}
            connections={project.architectureFlow.connections}
            title={`${project.title.split('—')[0]} Flow & Request Lifecycle`}
          />
          {project.architectureFlow.mermaid && (
            <MermaidFlow chart={project.architectureFlow.mermaid} tabs={project.architectureFlow.mermaidTabs} id={project.id} />
          )}
        </div>
      )}

      {/* Tab 2: Key Engineering Decisions */}
      {activeTab === 'decisions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.keyDecisions.map((decision, dIdx) => (
            <div
              key={dIdx}
              className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-none bg-signal mt-1 shrink-0 inline-block" />
                <div>
                  <div className="text-xs font-mono font-bold text-black dark:text-white uppercase mb-1">
                    Decision 0{dIdx + 1}
                  </div>
                  <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                    {decision}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Tradeoffs + Outcomes & Limitations */}
      {activeTab === 'tradeoffs' && (
        <div className="space-y-6">
          {project.tradeoffs && project.tradeoffs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.tradeoffs.map((t, idx) => (
                <div key={idx} className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
                  <div className="font-mono text-xs font-bold text-black dark:text-white mb-1 uppercase">
                    {t.dimension}
                  </div>
                  <div className="text-xs font-bold text-black dark:text-white mb-1">
                    Decision: {t.decision}
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-2 font-medium">
                    <b className="text-signal font-bold">Why:</b> {t.rationale}
                  </p>
                  <div className="text-[11px] font-mono text-black dark:text-white bg-neutral-200 dark:bg-neutral-800 p-2 rounded-none border border-black dark:border-white">
                    Alternative Rejected: {t.alternative}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-black dark:border-white">
            <div className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-black dark:text-white mb-2 uppercase">
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                Outcomes
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                {project.outcomesAndLimitations.verified.map((v, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-black dark:text-white font-bold">•</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-black dark:text-white mb-2 uppercase">
                <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
                Documented Limitations &amp; Scope
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                {project.outcomesAndLimitations.limitations.map((l, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-black dark:text-white font-bold">•</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
