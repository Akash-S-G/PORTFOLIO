import React from 'react';
import { EDUCATION, ACHIEVEMENTS } from '../../data/portfolioData';
import { GraduationCap, Trophy } from 'lucide-react';
import { RevealStagger, RevealItem } from '../common/Reveal';
import { TextReveal } from '../common/Reveal';

export const EducationSection: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-50 dark:bg-black relative transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Education */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-none bg-signal inline-block" />
              <span className="text-xs font-mono font-bold text-cyan-dark dark:text-cyan uppercase tracking-widest">
                EDUCATION
              </span>
            </div>
            <TextReveal
              as="h2"
              text="Education & Academics"
              className="font-display text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight mb-8"
            />

            <RevealStagger className="space-y-6">
              {EDUCATION.map((edu, idx) => (
                <RevealItem
                  key={idx}
                  variant="left"
                  className="p-6 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-none bg-signal text-white border border-black dark:border-white flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold text-black dark:text-white">{edu.institution}</h3>
                    </div>
                    <span className="text-xs font-mono text-black dark:text-white px-2.5 py-1 rounded-none bg-neutral-100 dark:bg-neutral-900 border border-black dark:border-white font-bold uppercase self-start sm:self-auto">
                      {edu.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-bold text-black dark:text-white">{edu.degree}</span>
                    <span className="text-xs font-mono font-bold text-white bg-signal px-2 py-0.5 rounded-none uppercase">
                      {edu.score}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-black dark:text-white font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>

          {/* Right: Achievements & Problem Solving */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-none bg-signal inline-block" />
              <span className="text-xs font-mono font-bold text-cyan-dark dark:text-cyan uppercase tracking-widest">
                KEY_ACHIEVEMENTS
              </span>
            </div>
            <TextReveal
              as="h2"
              text="Problem Solving & Honors"
              className="font-display text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight mb-8"
            />

            <RevealStagger className="space-y-6">
              {ACHIEVEMENTS.map((ach) => (
                <RevealItem
                  key={ach.title}
                  variant="right"
                  className="p-6 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-4 h-4" />
                      <span className="text-xs font-mono text-black dark:text-white font-bold uppercase tracking-wider">
                        {ach.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-black dark:text-white mb-2">
                      {ach.title}
                    </h3>

                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4 font-medium">
                      {ach.description}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
};
