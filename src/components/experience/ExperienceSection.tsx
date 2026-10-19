import React from 'react';
import { EXPERIENCE } from '../../data/portfolioData';
import { Calendar, MapPin, ShieldCheck, FileSpreadsheet, KeyRound } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-graphite-950/60 border-y border-graphite-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
            <span className="text-xs font-mono font-semibold text-lime uppercase tracking-widest">
              INDUSTRY_EXPERIENCE // SOFTWARE_ENGINEERING_INTERNSHIP
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory tracking-tight">
            Work Experience & Systems Engineered
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ivory-dim max-w-2xl">
            Real-world backend workflows, authentication mechanisms, high-throughput verification pipelines, and operational reliability.
          </p>
        </div>

        {/* Experience Timeline / Cards */}
        <div className="space-y-8">
          {EXPERIENCE.map((exp, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-graphite-900 border border-graphite-700/80 hover:border-graphite-600 p-6 sm:p-8 lg:p-10 transition-all duration-300 shadow-xl relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime via-cyan to-transparent" />

              {/* Role Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-graphite-750">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg font-bold text-lime font-mono">
                      {exp.company}
                    </span>
                    <span className="text-xs font-mono text-ivory-muted px-2 py-0.5 rounded bg-graphite-850 border border-graphite-750">
                      Internship
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-ivory">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-ivory-dim">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-graphite-850 border border-graphite-700">
                    <Calendar className="w-3.5 h-3.5 text-lime" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-graphite-850 border border-graphite-700">
                    <MapPin className="w-3.5 h-3.5 text-cyan" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Systems Engineered Callout Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-graphite-850/80 border border-graphite-750">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-cyan uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4" />
                    Gate Check-in Pipeline
                  </div>
                  <p className="text-xs text-ivory-dim leading-relaxed">
                    Camera-based real-time QR scanning and instant admission validation with walk-in candidate registration and MongoDB audit persistence.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-graphite-850/80 border border-graphite-750">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-lime uppercase tracking-wide">
                    <KeyRound className="w-4 h-4" />
                    Security & RBAC Architecture
                  </div>
                  <p className="text-xs text-ivory-dim leading-relaxed">
                    Student onboarding via CSV whitelisting, join-code account claiming, Google OAuth, role-based access control, and TOTP 2FA.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-graphite-850/80 border border-graphite-750">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-ivory uppercase tracking-wide">
                    <FileSpreadsheet className="w-4 h-4 text-lime" />
                    Automated Reporting Engine
                  </div>
                  <p className="text-xs text-ivory-dim leading-relaxed">
                    Programmatic generation of multi-drive formatted Excel attendance records with officer verification attribution and edge-case alerts.
                  </p>
                </div>
              </div>

              {/* Verified Impact Bullets */}
              <div className="mb-8">
                <div className="text-xs font-mono uppercase tracking-wider text-ivory-muted mb-3 font-semibold">
                  Detailed Engineering Responsibilities:
                </div>
                <div className="space-y-2.5">
                  {exp.description.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime mt-2 shrink-0" />
                      <p className="text-xs sm:text-sm text-ivory-dim leading-relaxed">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Applied */}
              <div>
                <div className="text-[11px] font-mono text-ivory-muted uppercase tracking-wider mb-2">
                  Technologies & Frameworks Applied:
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-graphite-850 text-ivory border border-graphite-700 font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
