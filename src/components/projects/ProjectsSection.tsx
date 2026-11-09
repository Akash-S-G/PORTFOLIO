import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { ArchitectureDiagram } from '../common/ArchitectureDiagram';
import { Github, ExternalLink, ShieldAlert, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { RoleFilter } from '../../types/portfolio';

interface ProjectsSectionProps {
  roleFilter: RoleFilter;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ roleFilter }) => {
  const [activeTabPIHUB, setActiveTabPIHUB] = useState<'architecture' | 'decisions' | 'tradeoffs'>('architecture');
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    'smart-cart': true,
    'sol-bridge': false
  });

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const flagship = PROJECTS.find((p) => p.id === 'pihub') || PROJECTS[0];
  const otherProjects = PROJECTS.filter((p) => p.id !== 'pihub');

  // Filter logic based on role
  const isProjectHighlighted = (p: typeof PROJECTS[0]) => {
    if (roleFilter === 'all') return true;
    if (roleFilter === 'backend') return p.technologies.some(t => ['FastAPI', 'Express.js', 'PostgreSQL 16', 'TimescaleDB', 'Redis 7', 'WebSockets'].includes(t));
    if (roleFilter === 'ai-edge') return p.technologies.some(t => ['llama.cpp', 'GGUF Models', 'YOLO11n', 'YOLOv8', 'OpenCV', 'Qdrant'].includes(t));
    if (roleFilter === 'distributed') return p.technologies.some(t => ['Raspberry Pi', 'Docker', 'MQTT', 'UDP Sockets', 'TimescaleDB'].includes(t));
    return true;
  };

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-white dark:bg-black transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-none bg-emerald-600 dark:bg-lime inline-block" />
            <span className="text-xs font-mono font-bold text-black dark:text-white uppercase tracking-widest">
              ENGINEERING_CASE_STUDIES // VERIFIED_CODEBASES
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Architected Systems &amp; Verified Implementations
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 max-w-2xl font-medium">
            Detailed engineering breakdowns distinguishing implemented source code from future targets.
            Each study highlights real technical decisions, constraints, data flows, and measurable outcomes.
          </p>
        </div>

        {/* ============================================================ */}
        {/* FLAGSHIP PROJECT: PIHUB */}
        {/* ============================================================ */}
        <div
          id="project-pihub"
          className="mb-16 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white transition-all duration-150 p-6 sm:p-8 lg:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden"
        >
          {/* Top Flagship Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b-2 border-black dark:border-white">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-none bg-black dark:bg-white text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-black dark:border-white">
                <Sparkles className="w-3.5 h-3.5" />
                FLAGSHIP PROJECT
              </span>
              <span className="text-xs font-mono text-black dark:text-white bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-none border border-black dark:border-white font-bold uppercase">
                {flagship.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={flagship.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-white dark:bg-black hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black dark:text-white border-2 border-black dark:border-white text-xs font-mono font-bold uppercase transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="mb-6">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-black dark:text-white">
              {flagship.title}
            </h3>
            <p className="mt-2 text-base text-neutral-800 dark:text-neutral-200 font-mono font-bold uppercase">
              {flagship.tagline}
            </p>
            <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-4xl font-medium">
              {flagship.summary}
            </p>
          </div>

          {/* Problem & Contribution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
              <div className="text-xs font-mono font-bold text-black dark:text-white uppercase tracking-wide mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-none bg-black dark:bg-white inline-block" />
                The Core Problem
              </div>
              <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">{flagship.problem}</p>
            </div>

            <div className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
              <div className="text-xs font-mono font-bold text-black dark:text-white uppercase tracking-wide mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-none bg-emerald-600 dark:bg-lime inline-block" />
                Verified Individual Contribution
              </div>
              <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">{flagship.verifiedContribution}</p>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="mb-8">
            <div className="text-xs font-mono text-black dark:text-white uppercase tracking-wider mb-2.5 font-bold">
              Verified Technology Stack:
            </div>
            <div className="flex flex-wrap gap-2">
              {flagship.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-none bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white border border-black dark:border-white font-mono text-xs font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-2 mb-6 border-b-2 border-black dark:border-white pb-3">
            <button
              onClick={() => setActiveTabPIHUB('architecture')}
              type="button"
              className={`px-4 py-2 font-mono text-xs font-bold uppercase transition-colors rounded-none border-2 ${
                activeTabPIHUB === 'architecture'
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
                  : 'bg-white dark:bg-black text-black dark:text-white border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
              }`}
            >
              1. System Architecture Flow
            </button>
            <button
              onClick={() => setActiveTabPIHUB('decisions')}
              type="button"
              className={`px-4 py-2 font-mono text-xs font-bold uppercase transition-colors rounded-none border-2 ${
                activeTabPIHUB === 'decisions'
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
                  : 'bg-white dark:bg-black text-black dark:text-white border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
              }`}
            >
              2. Key Engineering Decisions
            </button>
            <button
              onClick={() => setActiveTabPIHUB('tradeoffs')}
              type="button"
              className={`px-4 py-2 font-mono text-xs font-bold uppercase transition-colors rounded-none border-2 ${
                activeTabPIHUB === 'tradeoffs'
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
                  : 'bg-white dark:bg-black text-black dark:text-white border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
              }`}
            >
              3. Tradeoffs &amp; Honest Limits
            </button>
          </div>

          {/* Tab 1: Architecture Diagram */}
          {activeTabPIHUB === 'architecture' && (
            <div className="space-y-4">
              <ArchitectureDiagram
                nodes={flagship.architectureFlow.nodes}
                connections={flagship.architectureFlow.connections}
                title="PIHUB Edge Inference & Content Distribution Lifecycle"
              />
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono font-medium">
                System topology: Client student tablets connect over offline AP hotspot to FastAPI hub with local GGUF models.
              </p>
            </div>
          )}

          {/* Tab 2: Key Engineering Decisions */}
          {activeTabPIHUB === 'decisions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flagship.keyDecisions.map((decision, dIdx) => (
                <div
                  key={dIdx}
                  className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-none bg-black dark:bg-white mt-1 shrink-0 inline-block" />
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

          {/* Tab 3: Tradeoffs & Limitations */}
          {activeTabPIHUB === 'tradeoffs' && (
            <div className="space-y-6">
              {/* Tradeoffs List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flagship.tradeoffs?.map((t, idx) => (
                  <div key={idx} className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
                    <div className="font-mono text-xs font-bold text-black dark:text-white mb-1 uppercase">
                      {t.dimension}
                    </div>
                    <div className="text-xs font-bold text-black dark:text-white mb-1">
                      Decision: {t.decision}
                    </div>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-2 font-medium">
                      <b className="text-black dark:text-white font-bold">Why:</b> {t.rationale}
                    </p>
                    <div className="text-[11px] font-mono text-black dark:text-white bg-neutral-200 dark:bg-neutral-800 p-2 rounded-none border border-black dark:border-white">
                      Alternative Rejected: {t.alternative}
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified vs Limitations Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-black dark:border-white">
                <div className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-black dark:text-white mb-2 uppercase">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    Verified Outcomes
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                    {flagship.outcomesAndLimitations.verified.map((v, i) => (
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
                    Operational Constraints &amp; Limitations
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                    {flagship.outcomesAndLimitations.limitations.map((l, i) => (
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

        {/* ============================================================ */}
        {/* OTHER CASE STUDIES: SMART CART & SOL-BRIDGE */}
        {/* ============================================================ */}
        <div className="space-y-12">
          {otherProjects.map((project) => {
            const isHighlighted = isProjectHighlighted(project);
            const isExpanded = !!expandedProjects[project.id];

            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className={`rounded-none bg-white dark:bg-black border-2 border-black dark:border-white p-6 sm:p-8 transition-colors duration-150 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] ${
                  isHighlighted ? 'opacity-100' : 'opacity-60'
                }`}
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b-2 border-black dark:border-white">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-xs font-mono font-bold text-black dark:text-white bg-neutral-100 dark:bg-neutral-900 px-2.5 py-0.5 rounded-none border border-black dark:border-white uppercase">
                        {project.category}
                      </span>
                      {project.teamContext && (
                        <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 font-semibold uppercase">
                          [{project.teamContext}]
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-black dark:text-white">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-white dark:bg-black hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black dark:text-white border-2 border-black dark:border-white text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => toggleProject(project.id)}
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-mono font-bold uppercase border-2 border-black dark:border-white transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? 'Hide Architecture' : 'View Architecture'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5 stroke-[3]" /> : <ChevronDown className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                  </div>
                </div>

                {/* Tagline & Summary */}
                <p className="text-sm font-mono text-black dark:text-white font-bold mb-3 uppercase">
                  {project.tagline}
                </p>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 max-w-4xl font-medium">
                  {project.summary}
                </p>

                {/* Problem vs Verified Contribution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-3.5 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
                    <div className="text-xs font-mono font-bold text-black dark:text-white uppercase tracking-wide mb-1">
                      Problem Context:
                    </div>
                    <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">{project.problem}</p>
                  </div>

                  <div className="p-3.5 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
                    <div className="text-xs font-mono font-bold text-black dark:text-white uppercase tracking-wide mb-1">
                      My Verified Individual Contribution:
                    </div>
                    <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">{project.verifiedContribution}</p>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-none bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white border border-black dark:border-white font-mono text-xs font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Expandable Architecture & Details */}
                {isExpanded && (
                  <div className="pt-6 border-t-2 border-black dark:border-white space-y-6">
                    <ArchitectureDiagram
                      nodes={project.architectureFlow.nodes}
                      connections={project.architectureFlow.connections}
                      title={`${project.title.split('—')[0]} Flow & Request Lifecycle`}
                    />

                    {/* Key Decisions */}
                    <div className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
                      <div className="text-xs font-mono font-bold text-black dark:text-white uppercase tracking-wider mb-3">
                        Key Engineering Decisions &amp; Implementations:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.keyDecisions.map((decision, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2">
                            <span className="text-black dark:text-white text-xs font-mono mt-0.5 font-bold">•</span>
                            <span className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">{decision}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outcomes & Limitations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-black dark:text-white mb-2 uppercase">
                          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                          Verified Functionality
                        </div>
                        <ul className="space-y-1 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                          {project.outcomesAndLimitations.verified.map((v, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-black dark:text-white font-bold">•</span>
                              <span>{v}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-black dark:text-white mb-2 uppercase">
                          <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
                          Documented Limitations &amp; Scope
                        </div>
                        <ul className="space-y-1 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                          {project.outcomesAndLimitations.limitations.map((l, i) => (
                            <li key={i} className="flex items-start gap-1.5">
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
          })}
        </div>
      </div>
    </section>
  );
};
