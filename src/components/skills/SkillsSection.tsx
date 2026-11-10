import React, { useState } from 'react';
import { SKILL_CATEGORIES, PROJECTS } from '../../data/portfolioData';
import { ArrowRight } from 'lucide-react';
import { RevealStagger, RevealItem } from '../common/Reveal';

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
    <section className="py-20 lg:py-28 relative bg-white dark:bg-black transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-none bg-signal inline-block" />
            <span className="text-xs font-mono font-bold text-cyan-dark dark:text-cyan uppercase tracking-widest">
              COMPETENCIES // EVIDENCE_BASED_TAXONOMY
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Technical Skills &amp; Systems Competencies
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 max-w-2xl font-medium">
            Represented through codebase evidence and project context, without arbitrary percentages or fabricated progress bars. Click any technology to see where it was applied.
          </p>
        </div>

        {/* Selected Skill Inspector Card */}
        {skillDetails && (
          <div className="mb-8 p-4 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-bold text-black dark:text-white uppercase">{skillDetails.name}</span>
                  <span className="text-[10px] font-mono text-white bg-signal px-2 py-0.5 rounded-none font-bold uppercase">
                    {skillDetails.category}
                  </span>
                </div>
                <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                  <span className="text-black dark:text-white font-bold">Verified Application:</span> {skillDetails.verifiedUse}
                </p>
              </div>

              {skillDetails.relatedProjects.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-black dark:text-white font-bold uppercase">Used in:</span>
                  {skillDetails.relatedProjects.map((pId) => {
                    const p = PROJECTS.find((proj) => proj.id === pId);
                    return (
                      <a
                        key={pId}
                        href={`#project-${pId}`}
                        onClick={() => onSelectProject?.(pId)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-none bg-signal text-white text-xs font-mono font-bold uppercase hover:bg-signal-deep border border-black dark:border-white transition-colors"
                      >
                        <span>{p ? p.title.split('—')[0].trim() : pId}</span>
                        <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <RevealItem
              key={category.category}
              variant="scale"
              className="p-6 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black dark:border-white">
                  <h3 className="font-mono text-sm font-bold text-black dark:text-white uppercase tracking-wide">
                    {category.category}
                  </h3>
                  <span className="w-2 h-2 rounded-none bg-black dark:bg-white inline-block" />
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 font-mono font-medium">
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
                        type="button"
                        className={`px-2.5 py-1 rounded-none text-xs font-mono font-bold uppercase transition-colors text-left border flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-signal text-white border-signal shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
                            : 'bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 border-black dark:border-white'
                        }`}
                        title={skill.verifiedUse}
                      >
                        <span>{skill.name}</span>
                        {hasProjects && (
                          <span
                            className={`w-1.5 h-1.5 rounded-none ${
                              isSelected ? 'bg-white dark:bg-black' : 'bg-signal'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase font-bold flex items-center justify-between">
                <span>{category.skills.length} core competencies</span>
                <span className="text-black dark:text-white">• square = in project</span>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
};
