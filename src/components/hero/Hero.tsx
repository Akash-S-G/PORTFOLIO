import React from 'react';
import { ArrowDown, Download, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { CopyEmailButton } from '../common/CopyEmailButton';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-white dark:bg-black transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column (55%): Punchy Introduction & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col space-y-6 order-2 lg:order-1"
          >
            {/* Status Rectangle */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] w-fit text-xs font-mono text-black dark:text-white uppercase font-bold">
              <span className="w-2 h-2 rounded-none bg-emerald-600 dark:bg-lime inline-block" />
              <span>Open to Hire</span>
              <span className="text-neutral-400">|</span>
              <span>Software Engineering &amp; Backend Roles</span>
            </div>

            {/* Name & Headline */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2.5 font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Bengaluru, India · R V College of Engineering</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black dark:text-white leading-[1.1]">
                Akash Siddappa Goundi
              </h1>
              <p className="mt-3 text-base sm:text-lg font-bold text-black dark:text-white leading-relaxed">
                I build practical backend systems that bring AI closer to the edge.
              </p>
            </div>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-xl">
              From offline AI inference (llama.cpp) to real-time APIs and connected devices, I engineer practical systems that work beyond the happy path.
            </p>

            {/* Quick Credentials */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-neutral-100 dark:bg-neutral-900 border border-black dark:border-white text-black dark:text-white font-medium">
                <GraduationCap className="w-3.5 h-3.5" />
                B.E. ISE @ RVCE (8.37 CGPA)
              </span>
              <span className="px-3 py-1.5 rounded-none bg-black dark:bg-white text-white dark:text-black font-bold uppercase border border-black dark:border-white">
                STON Tech SDE Intern
              </span>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#overview"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black border-2 border-black dark:border-white font-mono text-xs font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform duration-100 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXPLORE MY WORK</span>
                <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href={`./${PERSONAL_INFO.resumeFilename}`}
                download={PERSONAL_INFO.resumeFilename}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-white hover:bg-neutral-100 dark:bg-black dark:hover:bg-neutral-900 text-black dark:text-white border-2 border-black dark:border-white font-mono text-xs font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform duration-100 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>RESUME (PDF)</span>
              </a>

              <CopyEmailButton email={PERSONAL_INFO.email} variant="primary" />
            </div>
          </motion.div>

          {/* Right Column (45%): PURE RECTANGULAR PHOTO (NO Circles, NO 3D) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2"
          >
            <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-square rounded-none overflow-hidden border-2 border-black dark:border-white bg-white dark:bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <img
                src="/akash-portrait.jpg"
                alt="Akash Siddappa Goundi"
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-8 flex flex-col items-center justify-center text-center text-neutral-600 dark:text-neutral-400 text-[11px] font-mono gap-1 select-none pointer-events-none uppercase font-bold"
      >
        <span>SCROLL FOR FULL PROFILE &amp; CASE STUDIES</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce stroke-[2.5]" />
      </motion.div>
    </section>
  );
};
