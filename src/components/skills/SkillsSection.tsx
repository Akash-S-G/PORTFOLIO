import React, { useState } from 'react';
import { SKILL_CATEGORIES, PROJECTS } from '../../data/portfolioData';
import { ArrowRight } from 'lucide-react';

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject }) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Find info about selected skill
  const skillDetails = React.useMemo(() => {
    if (!selectedSkill) return null;
    for (const cat of SKILL_CATEGORIES) {
      const match = cat.skills.find((s) => s.name === selectedSkill);
      if (match) return { ...match, category: cat.category };
    }
    return null;
  }, [selectedSkill]);

  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
            <span className="text-xs font-mono font-semibold text-cyan uppercase tracking-widest">
              COMPETENCIES // EVIDENCE_BASED_TAXONOMY
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory tracking-tight">
            Technical Skills & Systems Competencies
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ivory-dim max-w-2xl">
            Represented through verified codebase evidence and project context, without arbitrary percentages or fabricated progress bars. Click any technology to see where it was applied.
          </p>
        </div>

        {/* Selected Skill Inspector Modal/Card */}
        {skillDetails && (
          <div className="mb-8 p-4 rounded-xl bg-graphite-850 border border-lime shadow-xl animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-bold text-lime">{skillDetails.name}</span>
                  <span className="text-[10px] font-mono text-ivory-muted px-2 py-0.5 rounded bg-graphite-900 border border-graphite-750">
                    {skillDetails.category}
                  </span>
                </div>
                <p className="text-xs text-ivory-dim leading-relaxed">
                  <span className="text-ivory font-medium">Verified Application:</span> {skillDetails.verifiedUse}
                </p>
              </div>

              {skillDetails.relatedProjects.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono text-ivory-muted">Used in:</span>
                  {skillDetails.relatedProjects.map((pId) => {
                    const p = PROJECTS.find((proj) => proj.id === pId);
                    return (
                      <a
                        key={pId}
                        href={`#project-${pId}`}
                        onClick={() => onSelectProject?.(pId)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-graphite-900 border border-lime/40 text-lime text-xs font-mono hover:bg-lime hover:text-graphite-950 transition-colors"
                      >
                        <span>{p ? p.title.split('—')[0].trim() : pId}</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.category}
              className="p-6 rounded-2xl bg-graphite-900 border border-graphite-700/80 hover:border-graphite-600 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-graphite-750">
                  <h3 className="font-mono text-sm font-bold text-ivory uppercase tracking-wide">
                    {category.category}
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-lime/60" />
                </div>
                <p className="text-[11px] text-ivory-muted mb-4 font-sans">
                  {category.description}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const isSelected = selectedSkill === skill.name;
                    const hasProjects = skill.relatedProjects.length > 0;

                    return (
                      <button
                        key={skill.name}
                        onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all text-left border flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-lime text-graphite-950 border-lime font-bold shadow-md'
                            : 'bg-graphite-850 hover:bg-graphite-800 text-ivory-dim hover:text-ivory border-graphite-750 hover:border-graphite-600'
                        }`}
                        title={skill.verifiedUse}
                      >
                        <span>{skill.name}</span>
                        {hasProjects && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-graphite-950' : 'bg-lime/70'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-graphite-800/80 text-[10px] font-mono text-ivory-muted flex items-center justify-between">
                <span>{category.skills.length} core competencies</span>
                <span className="text-lime/75">• dot = applied in project</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
