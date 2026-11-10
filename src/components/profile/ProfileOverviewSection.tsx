import React from 'react';
import { Download, MapPin, GraduationCap, Github, Linkedin, ArrowRight, Code2, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { CopyEmailButton } from '../common/CopyEmailButton';
import { RevealStagger, RevealItem } from '../common/Reveal';
import { TextReveal } from '../common/Reveal';

export const ProfileOverviewSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 relative bg-white dark:bg-black transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-none bg-signal inline-block" />
            <span className="text-xs font-mono font-bold text-cyan-dark dark:text-cyan uppercase tracking-widest">
              PROFILE
            </span>
          </div>
          <TextReveal
            as="h2"
            text="Software Engineering & Distributed Systems"
            className="font-display text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight"
          />
          <p className="mt-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 max-w-2xl font-medium">
            Connecting backend architectures, machine learning services, and real-world edge hardware with production-grade implementations.
          </p>
        </div>

        {/* Narrative & Metrics 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Authentic Engineering Positioning */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase mb-3 font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Bengaluru, Karnataka, India · R V College of Engineering</span>
              </div>
              
              <h3 className="font-display text-2xl font-bold text-black dark:text-white mb-3">
                Engineering Practical Systems Beyond the Happy Path
              </h3>

              <div className="space-y-3.5 text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                <p>
                  I am a software engineering student at <strong className="text-signal font-bold">R V College of Engineering (RVCE)</strong> focused on architecting resilient backend systems where distributed computing intersects with applied artificial intelligence and connected hardware.
                </p>
                <p>
                  My engineering experience spans developing <strong className="text-signal font-bold">FastAPI and Express microservices</strong>, integrating local LLM inference via <strong className="text-signal font-bold">llama.cpp</strong>, designing resumable chunk sync protocols, and building sub-second computer vision checkout pipelines.
                </p>
              </div>

              {/* Verified Credentials Rectangles */}
              <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-neutral-100 dark:bg-neutral-900 border border-black dark:border-white text-black dark:text-white font-semibold">
                  <GraduationCap className="w-3.5 h-3.5" />
                  B.E. ISE @ RVCE (2023–2027)
                </span>
                <span className="px-3 py-1.5 rounded-none bg-neutral-100 dark:bg-neutral-900 border border-black dark:border-white text-black dark:text-white font-semibold">
                  CGPA: 8.37 / 10.0
                </span>
                <span className="px-3 py-1.5 rounded-none bg-signal text-white font-bold uppercase border border-black dark:border-white">
                  STON Tech SDE Intern
                </span>
              </div>
            </div>

            {/* Direct CTAs & Profiles */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`./${PERSONAL_INFO.resumeFilename}`}
                download={PERSONAL_INFO.resumeFilename}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-signal hover:bg-signal-deep text-white font-mono text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform duration-100 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>

              <CopyEmailButton email={PERSONAL_INFO.email} variant="primary" />

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-none bg-white dark:bg-black hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black dark:text-white border-2 border-black dark:border-white font-mono text-xs font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform duration-100 hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4 text-cyan-dark dark:text-cyan" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-none bg-white dark:bg-black hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black dark:text-white border-2 border-black dark:border-white font-mono text-xs font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform duration-100 hover:-translate-y-0.5"
              >
                <Linkedin className="w-4 h-4 text-cyan-dark dark:text-cyan" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Verified Engineering Metrics & Pillars */}
          <RevealStagger className="lg:col-span-5 space-y-4">

            {/* Metric 1: Competitive Problem Solving */}
            <RevealItem variant="right" className="p-5 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-3xl font-extrabold text-black dark:text-white">450+</span>
                <span className="p-2 rounded-none bg-signal text-white border border-black dark:border-white">
                  <Code2 className="w-5 h-5" />
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-black dark:text-white mb-1 uppercase">
                DSA Problems Solved
              </h4>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                Rigorous algorithmic problem solving across LeetCode &amp; Codeforces focusing on data structures, graphs, dynamic programming, and complexity optimization.
              </p>
            </RevealItem>

            {/* Metric 2: Offline Edge AI Inference */}
            <RevealItem variant="right" className="p-5 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-2xl font-extrabold text-black dark:text-white">Offline</span>
                <span className="p-2 rounded-none bg-signal text-white border border-black dark:border-white">
                  <Cpu className="w-5 h-5" />
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-black dark:text-white mb-1 uppercase">
                Local LLM Inference Engine
              </h4>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                Local-first LLM inference with llama.cpp and token-by-token streaming, integrated behind backend APIs for offline-capable services.
              </p>
            </RevealItem>

            {/* Direct Link to Flagship Case Studies */}
            <RevealItem variant="scale">
              <a
                href="#projects"
                className="flex items-center justify-between p-4 rounded-none bg-black dark:bg-white hover:bg-signal-deep text-white dark:text-black border-2 border-black dark:border-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] group"
              >
                <span>Explore Codebase Case Studies</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </RevealItem>
          </RevealStagger>
        </div>
      </div>
    </section>
  );
};
