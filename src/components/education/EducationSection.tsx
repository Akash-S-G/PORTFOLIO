import React from 'react';
import { EDUCATION, ACHIEVEMENTS } from '../../data/portfolioData';
import { GraduationCap, Trophy, Code2 } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-graphite-950/60 border-t border-graphite-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Education */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
              <span className="text-xs font-mono font-semibold text-lime uppercase tracking-widest">
                ACADEMIC_BACKGROUND
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory tracking-tight mb-8">
              Education & Academic Rigor
            </h2>

            <div className="space-y-6">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-graphite-900 border border-graphite-700/80 hover:border-graphite-600 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-lime/10 border border-lime/30 flex items-center justify-center text-lime shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold text-ivory">{edu.institution}</h3>
                    </div>
                    <span className="text-xs font-mono text-ivory-muted px-2.5 py-1 rounded bg-graphite-850 border border-graphite-750 self-start sm:self-auto">
                      {edu.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-ivory-dim">{edu.degree}</span>
                    <span className="text-xs font-mono font-bold text-lime px-2 py-0.5 rounded bg-lime/10 border border-lime/20">
                      {edu.score}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-ivory-dim">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-cyan">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Achievements & Problem Solving */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
              <span className="text-xs font-mono font-semibold text-cyan uppercase tracking-widest">
                VERIFIED_ACHIEVEMENTS
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory tracking-tight mb-8">
              Problem Solving & Honors
            </h2>

            <div className="space-y-6">
              {ACHIEVEMENTS.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-graphite-900 border border-graphite-700/80 hover:border-graphite-600 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {idx === 0 ? (
                        <Code2 className="w-4 h-4 text-lime" />
                      ) : (
                        <Trophy className="w-4 h-4 text-cyan" />
                      )}
                      <span className="text-xs font-mono text-lime font-bold uppercase tracking-wider">
                        {ach.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-ivory mb-2">
                      {ach.title}
                    </h3>

                    <p className="text-xs text-ivory-dim leading-relaxed mb-4">
                      {ach.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-graphite-800 text-[11px] font-mono text-ivory-muted flex items-center justify-between">
                    <span>{ach.proofNote}</span>
                  </div>
                </div>
              ))}

              {/* Engineering Mindset Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-graphite-900 to-graphite-850 border border-graphite-750">
                <div className="font-mono text-xs font-bold text-ivory uppercase tracking-wide mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lime" />
                  Technical Core Philosophy
                </div>
                <p className="text-xs text-ivory-dim leading-relaxed">
                  "Build practical backend systems that operate dependably under real-world hardware limits, intermittent networks, and non-ideal conditions."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
