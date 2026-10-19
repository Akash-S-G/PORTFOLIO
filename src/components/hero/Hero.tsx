import React from 'react';
import { ArrowDown, Download, MapPin, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { SystemCoreScene } from '../scene3d/SystemCoreScene';
import { CopyEmailButton } from '../common/CopyEmailButton';

interface HeroProps {
  activeSubsystem: string | null;
  onSelectSubsystem: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ activeSubsystem, onSelectSubsystem }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Subtle top background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-lime/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Narrative & Positioning */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            {/* Status & Location Pill */}
            <div className="inline-flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-graphite-850 border border-graphite-700/80 text-xs font-mono text-ivory-dim shadow-sm">
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                <span className="text-lime font-semibold">Available</span>
                <span className="text-graphite-600">|</span>
                <span>Software Engineering & Backend Internships</span>
              </div>
            </div>

            {/* Name & Headline */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ivory-muted mb-2">
                <MapPin className="w-3.5 h-3.5 text-lime" />
                <span>Bengaluru, India • R V College of Engineering</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ivory leading-[1.12]">
                Akash Siddappa Goundi
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-medium text-lime/90 font-mono">
                {PERSONAL_INFO.headline}
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-ivory-dim leading-relaxed max-w-xl font-sans">
              {PERSONAL_INFO.subheadline}
            </p>

            {/* Academic & Experience Context Tag */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-ivory-muted">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-graphite-850 border border-graphite-700">
                <GraduationCap className="w-3.5 h-3.5 text-cyan" />
                B.E. ISE @ RVCE (2023–2027)
              </span>
              <span className="px-2.5 py-1 rounded bg-graphite-850 border border-graphite-700">
                CGPA: 8.37
              </span>
              <span className="px-2.5 py-1 rounded bg-graphite-850 border border-graphite-700 text-lime">
                STON Tech SDE Intern
              </span>
            </div>

            {/* Action Buttons Cluster */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-lime hover:bg-lime-hover text-graphite-950 font-mono text-xs font-bold tracking-wide shadow-[0_0_24px_rgba(197,243,107,0.3)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href={`./${PERSONAL_INFO.resumeFilename}`}
                download={PERSONAL_INFO.resumeFilename}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-graphite-850 hover:bg-graphite-800 text-ivory border border-graphite-700 hover:border-lime/60 font-mono text-xs font-semibold tracking-wide transition-all duration-200"
              >
                <Download className="w-4 h-4 text-lime" />
                <span>RESUME (PDF)</span>
              </a>

              <CopyEmailButton email={PERSONAL_INFO.email} variant="primary" />
            </div>

            {/* Quick Evidence Metrics Strip */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-graphite-800/80 max-w-lg">
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-ivory">405+</div>
                <div className="text-[11px] font-mono text-ivory-muted leading-tight mt-0.5">
                  Curriculum Packs (PIHUB)
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-lime">300+</div>
                <div className="text-[11px] font-mono text-ivory-muted leading-tight mt-0.5">
                  DSA Problems Solved
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-cyan">Offline</div>
                <div className="text-[11px] font-mono text-ivory-muted leading-tight mt-0.5">
                  LLM Edge Inference
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Distributed Systems Core */}
          <div className="lg:col-span-6 w-full">
            <SystemCoreScene
              activeNode={activeSubsystem}
              onSelectNode={onSelectSubsystem}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
