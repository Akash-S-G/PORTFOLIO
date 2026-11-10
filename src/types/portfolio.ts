export type RoleFilter = 'all' | 'backend' | 'ai-edge' | 'distributed';

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  role: string;
  details: string;
  /** Ordered per-step workflow executed inside this node (rendered as a numbered list) */
  workflow?: string[];
  /** Mermaid diagram rendered inside the inspector when this step is selected */
  stepDiagram?: string;
  category: 'client' | 'gateway' | 'ai-inference' | 'storage' | 'edge-sync';
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  protocol: string;
  label: string;
}

export interface ProjectTradeoff {
  dimension: string;
  decision: string;
  rationale: string;
  alternative: string;
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  roleTag: 'flagship' | 'featured' | 'prototype';
  tagline: string;
  summary: string;
  problem: string;
  verifiedContribution: string;
  teamContext?: string;
  technologies: string[];
  keyDecisions: string[];
  outcomesAndLimitations: {
    verified: string[];
    limitations: string[];
  };
  architectureFlow: {
    nodes: ArchitectureNode[];
    connections: ArchitectureConnection[];
    description: string;
    /** Mermaid flowchart definition (rendered alongside the interactive step diagram) */
    mermaid?: string;
    /** Additional toggleable diagrams (sequence charts etc.) rendered with label tabs */
    mermaidTabs?: { label: string; chart: string }[];
  };
  tradeoffs?: ProjectTradeoff[];
  githubUrl: string;
  liveDemoUrl?: string; // Only if public verified demo exists
}

export interface ExperienceData {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  systemsEngineered: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    verifiedUse: string;
    relatedProjects: string[]; // project IDs
  }[];
}

export interface EducationData {
  institution: string;
  degree: string;
  period: string;
  score: string;
  highlights: string[];
}

export interface AchievementData {
  title: string;
  category: string;
  description: string;
  link?: string;
}

