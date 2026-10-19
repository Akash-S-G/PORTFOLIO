import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { ArchitectureDiagram } from '../common/ArchitectureDiagram';
import { Github, ExternalLink, ShieldAlert, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { RoleFilter } from '../../types/portfolio';

interface ProjectsSectionProps {
  roleFilter: RoleFilter;
  selectedSubsystem: string | null;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ roleFilter, selectedSubsystem }) => {
  const [activeTabPIHUB, setActiveTabPIHUB] = useState<'architecture' | 'decisions' | 'tradeoffs'>('architecture');
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    'smart-cart': true,
    'sol-bridge': false,
    'fundshield': false
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
    <section id="projects" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
            <span className="text-xs font-mono font-semibold text-lime uppercase tracking-widest">
              ENGINEERING_CASE_STUDIES // VERIFIED_CODEBASES
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory tracking-tight">
            Architected Systems & Verified Implementations
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ivory-dim max-w-2xl">
            Detailed engineering breakdowns distinguishing implemented source code from future targets.
            Each study highlights real technical decisions, constraints, data flows, and measurable outcomes.
          </p>
        </div>

        {/* ============================================================ */}
        {/* FLAGSHIP PROJECT: PIHUB */}
        {/* ============================================================ */}
        <div
          id="project-pihub"
          className={`mb-16 rounded-2xl bg-graphite-900 border transition-all duration-300 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden ${
            selectedSubsystem === 'edge-ai' || selectedSubsystem === 'sync' || selectedSubsystem === 'gateway'
              ? 'border-lime ring-2 ring-lime/30'
              : 'border-graphite-700/80 hover:border-graphite-600'
          }`}
        >
          {/* Top Flagship Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-graphite-750">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-lime text-graphite-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                FLAGSHIP PROJECT
              </span>
              <span className="text-xs font-mono text-cyan bg-cyan/10 px-2.5 py-1 rounded border border-cyan/30">
                {flagship.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={flagship.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-graphite-800 hover:bg-graphite-750 text-ivory border border-graphite-700 hover:border-lime/60 text-xs font-mono transition-colors"
              >
                <Github className="w-4 h-4 text-lime" />
                <span>Source Code</span>
                <ExternalLink className="w-3 h-3 text-ivory-muted" />
              </a>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="mb-6">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
              {flagship.title}
            </h3>
            <p className="mt-2 text-base text-lime font-mono">
              {flagship.tagline}
            </p>
            <p className="mt-3 text-sm text-ivory-dim leading-relaxed max-w-4xl">
              {flagship.summary}
            </p>
          </div>

          {/* Problem & Contribution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-graphite-850/80 border border-graphite-750">
              <div className="text-xs font-mono font-bold text-ivory uppercase tracking-wide mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                The Core Problem
              </div>
              <p className="text-xs text-ivory-dim leading-relaxed">{flagship.problem}</p>
            </div>

            <div className="p-4 rounded-xl bg-graphite-850/80 border border-graphite-750">
              <div className="text-xs font-mono font-bold text-ivory uppercase tracking-wide mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                Verified Individual Contribution
              </div>
              <p className="text-xs text-ivory-dim leading-relaxed">{flagship.verifiedContribution}</p>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="mb-8">
            <div className="text-[11px] font-mono text-ivory-muted uppercase tracking-wider mb-2.5">
              Verified Technology Stack:
            </div>
            <div className="flex flex-wrap gap-2">
              {flagship.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-graphite-850 text-ivory border border-graphite-700 font-mono text-xs hover:border-lime/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mb-6 border-b border-graphite-750">
            <button
              onClick={() => setActiveTabPIHUB('architecture')}
              className={`px-4 py-2 font-mono text-xs font-semibold border-b-2 transition-all ${
                activeTabPIHUB === 'architecture'
                  ? 'border-lime text-lime bg-lime/5'
                  : 'border-transparent text-ivory-dim hover:text-ivory'
              }`}
            >
              1. System Architecture Flow
            </button>
            <button
              onClick={() => setActiveTabPIHUB('decisions')}
              className={`px-4 py-2 font-mono text-xs font-semibold border-b-2 transition-all ${
                activeTabPIHUB === 'decisions'
                  ? 'border-lime text-lime bg-lime/5'
                  : 'border-transparent text-ivory-dim hover:text-ivory'
              }`}
            >
              2. Key Engineering Decisions
            </button>
            <button
              onClick={() => setActiveTabPIHUB('tradeoffs')}
              className={`px-4 py-2 font-mono text-xs font-semibold border-b-2 transition-all ${
                activeTabPIHUB === 'tradeoffs'
                  ? 'border-lime text-lime bg-lime/5'
                  : 'border-transparent text-ivory-dim hover:text-ivory'
              }`}
            >
              3. Trade-offs & Reality Check
            </button>
          </div>

          {/* Tab 1: Architecture Flow */}
          {activeTabPIHUB === 'architecture' && (
            <div className="space-y-4">
              <ArchitectureDiagram
                nodes={flagship.architectureFlow.nodes}
                connections={flagship.architectureFlow.connections}
                title="PIHUB Edge Inference & Manifest Sync Architecture"
              />
              <p className="text-xs font-mono text-ivory-muted italic">
                Note: Heavier 7B models can be offloaded to a local server node via backend gateway coordinator while Raspberry Pi acts as the low-power classroom router and pack distributor.
              </p>
            </div>
          )}

          {/* Tab 2: Key Engineering Decisions */}
          {activeTabPIHUB === 'decisions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flagship.keyDecisions.map((decision, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-graphite-850 border border-graphite-750">
                  <div className="flex items-start gap-2.5">
                    <span className="font-mono text-xs font-bold text-lime mt-0.5">0{idx + 1}.</span>
                    <p className="text-xs text-ivory-dim leading-relaxed">{decision}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Trade-offs & Reality Check */}
          {activeTabPIHUB === 'tradeoffs' && (
            <div className="space-y-6">
              {/* Tradeoffs List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flagship.tradeoffs?.map((t, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-graphite-850 border border-graphite-750">
                    <div className="font-mono text-xs font-bold text-lime mb-1 uppercase">
                      {t.dimension}
                    </div>
                    <div className="text-xs font-semibold text-ivory mb-1">
                      Decision: {t.decision}
                    </div>
                    <p className="text-xs text-ivory-dim leading-relaxed mb-2">
                      <b className="text-ivory font-medium">Why:</b> {t.rationale}
                    </p>
                    <div className="text-[11px] font-mono text-ivory-muted bg-graphite-900 p-2 rounded border border-graphite-800">
                      Alternative Rejected: {t.alternative}
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified vs Limitations Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-graphite-800">
                <div className="p-4 rounded-xl bg-graphite-850 border border-lime/30">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-lime mb-2 uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    Verified Outcomes
                  </div>
                  <ul className="space-y-1.5 text-xs text-ivory-dim">
                    {flagship.outcomesAndLimitations.verified.map((v, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-lime mt-0.5">•</span>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-graphite-850 border border-graphite-700">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-ivory-dim mb-2 uppercase">
                    <ShieldAlert className="w-4 h-4 text-cyan" />
                    Operational Constraints & Limitations
                  </div>
                  <ul className="space-y-1.5 text-xs text-ivory-muted">
                    {flagship.outcomesAndLimitations.limitations.map((l, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan mt-0.5">•</span>
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
        {/* OTHER FEATURED PROJECTS */}
        {/* ============================================================ */}
        <div className="space-y-10">
          {otherProjects.map((project) => {
            const isExpanded = expandedProjects[project.id];
            const isHighlighted = isProjectHighlighted(project);

            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className={`rounded-2xl bg-graphite-900 border transition-all duration-300 p-6 sm:p-8 ${
                  isHighlighted ? 'opacity-100' : 'opacity-80'
                } ${
                  selectedSubsystem === project.id || (project.id === 'smart-cart' && selectedSubsystem === 'vision') || (project.id === 'sol-bridge' && selectedSubsystem === 'iot')
                    ? 'border-lime ring-2 ring-lime/30'
                    : 'border-graphite-700/80 hover:border-graphite-600'
                }`}
              >
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-[11px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-graphite-800 text-cyan border border-graphite-700">
                        {project.category}
                      </span>
                      {project.teamContext && (
                        <span className="text-[10px] font-mono text-ivory-muted">
                          [{project.teamContext}]
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-ivory">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-graphite-800 hover:bg-graphite-750 text-ivory border border-graphite-700 hover:border-lime/60 text-xs font-mono transition-colors"
                    >
                      <Github className="w-4 h-4 text-lime" />
                      <span>Repository</span>
                      <ExternalLink className="w-3 h-3 text-ivory-muted" />
                    </a>

                    <button
                      onClick={() => toggleProject(project.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-graphite-850 hover:bg-graphite-800 text-ivory-dim text-xs font-mono border border-graphite-700 transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? 'Hide Architecture' : 'View Architecture'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Tagline & Summary */}
                <p className="text-sm font-mono text-lime/90 mb-3">
                  {project.tagline}
                </p>
                <p className="text-xs sm:text-sm text-ivory-dim leading-relaxed mb-6 max-w-4xl">
                  {project.summary}
                </p>

                {/* Problem vs Verified Contribution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-3.5 rounded-xl bg-graphite-850 border border-graphite-750">
                    <div className="text-[11px] font-mono font-bold text-ivory uppercase tracking-wide mb-1">
                      Problem Context:
                    </div>
                    <p className="text-xs text-ivory-dim leading-relaxed">{project.problem}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-graphite-850 border border-graphite-750">
                    <div className="text-[11px] font-mono font-bold text-ivory uppercase tracking-wide mb-1">
                      My Verified Individual Contribution:
                    </div>
                    <p className="text-xs text-ivory-dim leading-relaxed">{project.verifiedContribution}</p>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-graphite-850 text-ivory-dim border border-graphite-700/80 font-mono text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Expandable Architecture & Details */}
                {isExpanded && (
                  <div className="pt-6 border-t border-graphite-750 space-y-6">
                    <ArchitectureDiagram
                      nodes={project.architectureFlow.nodes}
                      connections={project.architectureFlow.connections}
                      title={`${project.title.split('—')[0]} Flow & Request Lifecycle`}
                    />

                    {/* Key Decisions */}
                    <div className="p-4 rounded-xl bg-graphite-850 border border-graphite-750">
                      <div className="text-xs font-mono font-bold text-lime uppercase tracking-wider mb-3">
                        Key Engineering Decisions & Implementations:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.keyDecisions.map((decision, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2">
                            <span className="text-lime text-xs font-mono mt-0.5">•</span>
                            <span className="text-xs text-ivory-dim leading-relaxed">{decision}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outcomes & Limitations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl bg-graphite-850/60 border border-lime/30">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-lime mb-2 uppercase">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified Functionality
                        </div>
                        <ul className="space-y-1 text-xs text-ivory-dim">
                          {project.outcomesAndLimitations.verified.map((v, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-lime">•</span>
                              <span>{v}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-xl bg-graphite-850/60 border border-graphite-700">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-ivory-muted mb-2 uppercase">
                          <ShieldAlert className="w-3.5 h-3.5 text-cyan" />
                          Documented Limitations & Scope
                        </div>
                        <ul className="space-y-1 text-xs text-ivory-muted">
                          {project.outcomesAndLimitations.limitations.map((l, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-cyan">•</span>
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
