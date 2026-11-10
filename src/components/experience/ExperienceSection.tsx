import React from 'react';
import { EXPERIENCE } from '../../data/portfolioData';
import { Calendar, MapPin, ShieldCheck, FileSpreadsheet, KeyRound } from 'lucide-react';
import { Reveal } from '../common/Reveal';

export const ExperienceSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-black relative transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-none bg-signal inline-block" />
            <span className="text-xs font-mono font-bold text-cyan-dark dark:text-cyan uppercase tracking-widest">
              INDUSTRY_EXPERIENCE // SOFTWARE_ENGINEERING_INTERNSHIP
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Work Experience &amp; Systems Engineered
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 max-w-2xl font-medium">
            Real-world backend workflows, authentication mechanisms, high-throughput verification pipelines, and operational reliability.
          </p>
        </div>

        {/* Experience Timeline / Cards */}
        <div className="space-y-8">
          {EXPERIENCE.map((exp, idx) => (
            <Reveal
              key={idx}
              variant="up"
              delay={idx * 0.1}
              className="rounded-none bg-white dark:bg-black border-2 border-black dark:border-white p-6 sm:p-8 lg:p-10 transition-colors duration-150 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden"
            >
              {/* Role Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b-2 border-black dark:border-white">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg font-bold text-black dark:text-white font-mono uppercase">
                      {exp.company}
                    </span>
                    <span className="text-xs font-mono text-black dark:text-white px-2.5 py-0.5 rounded-none bg-neutral-100 dark:bg-neutral-900 border border-black dark:border-white font-bold uppercase">
                      Internship
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-black dark:text-white">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-neutral-100 dark:bg-neutral-900 border border-black dark:border-white font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-neutral-100 dark:bg-neutral-900 border border-black dark:border-white font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Systems Engineered Callout Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-black dark:text-white uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                    Gate Check-in Pipeline
                  </div>
                  <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                    Camera-based real-time QR scanning and instant admission validation with walk-in candidate registration and MongoDB audit persistence.
                  </p>
                </div>

                <div className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-black dark:text-white uppercase tracking-wide">
                    <KeyRound className="w-4 h-4 stroke-[2.5]" />
                    Security &amp; RBAC Architecture
                  </div>
                  <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                    Student onboarding via CSV whitelisting, join-code account claiming, Google OAuth, role-based access control, and TOTP 2FA.
                  </p>
                </div>

                <div className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-black dark:text-white uppercase tracking-wide">
                    <FileSpreadsheet className="w-4 h-4 stroke-[2.5]" />
                    Automated Reporting Engine
                  </div>
                  <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                    Programmatic generation of multi-drive formatted Excel attendance records with officer verification attribution and edge-case alerts.
                  </p>
                </div>
              </div>

              {/* Impact Bullets */}
              <div className="mb-8">
                <div className="text-xs font-mono uppercase tracking-wider text-black dark:text-white mb-3 font-bold">
                  Detailed Engineering Responsibilities:
                </div>
                <div className="space-y-2.5">
                  {exp.description.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-none bg-black dark:bg-white mt-1.5 shrink-0 inline-block" />
                      <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Applied */}
              <div>
                <div className="text-xs font-mono text-black dark:text-white uppercase tracking-wider mb-2 font-bold">
                  Technologies &amp; Frameworks Applied:
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-none bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white border border-black dark:border-white font-mono text-xs font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
