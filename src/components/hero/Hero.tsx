import React from 'react';
import { ArrowDown, Download, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { CopyEmailButton } from '../common/CopyEmailButton';
import { AnimatedName } from '../common/Reveal';

export const Hero: React.FC = () => {
  // Interactive photo tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 18 });

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 lg:pt-32 lg:pb-24 overflow-hidden transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column (55%): Punchy Introduction & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col space-y-6 order-2 lg:order-1"
          >
            {/* Status Rectangle — flowing primary/secondary gradient background */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-gradient-to-r from-signal via-cyan-dark dark:via-cyan to-signal animate-gradient-glow cursor-default border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(255,77,0,1)] hover:border-signal transition-all duration-150 w-fit max-w-full text-xs font-mono uppercase font-bold flex-wrap">
              <span className="w-2 h-2 rounded-none bg-white inline-block animate-blink shrink-0" />
              <span className="text-white">Open to Work</span>
              <span className="hidden sm:inline text-white/70">|</span>
              <span className="hidden sm:inline text-white">Software Engineering &amp; Backend Roles</span>
            </div>

            {/* Name & Headline */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2.5 font-bold">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Bengaluru, India · R V College of Engineering</span>
              </div>
              <AnimatedName
                text="Akash Siddappa Goundi"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black dark:text-white leading-[1.1]"
              />
              <p className="mt-3 text-base sm:text-lg font-bold text-black dark:text-white leading-relaxed">
                I build dependable backends — <span className="text-signal">and wire LLMs in where they earn their place</span>.
              </p>
            </div>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-xl">
              Backend engineer at STON Tech architecting FastAPI &amp; Express services and real-time pipelines that don&rsquo;t flinch under bad networks — integrating LLMs into production apps, not demos.
            </p>

            {/* Quick Credentials */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-neutral-100 dark:bg-neutral-900 border border-black dark:border-white text-black dark:text-white font-medium">
                <GraduationCap className="w-3.5 h-3.5" />
                B.E. ISE @ RVCE (8.37 CGPA)
              </span>
              <span className="px-3 py-1.5 rounded-none bg-signal text-white font-bold uppercase border border-black dark:border-white">
                STON Tech SDE Intern
              </span>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#overview"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-black dark:bg-white text-white dark:text-black hover:bg-cyan hover:text-black hover:border-cyan border-2 border-black dark:border-white font-mono text-xs font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXPLORE MY WORK</span>
                <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href={`./${PERSONAL_INFO.resumeFilename}`}
                download={PERSONAL_INFO.resumeFilename}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-white dark:bg-black hover:bg-cyan hover:text-black hover:border-cyan text-black dark:text-white border-2 border-black dark:border-white font-mono text-xs font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform duration-100 hover:-translate-y-0.5 active:translate-y-0"
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
            className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2"
            style={{ perspective: 1000 }}
          >
            <motion.div
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="group relative w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[560px] aspect-square rounded-none overflow-hidden border-2 border-black dark:border-white bg-white dark:bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[10px_10px_0px_0px_#FF4D00] hover:border-signal cursor-crosshair transition-shadow duration-300"
            >
              <img
                src="./akash-portrait.jpg"
                alt="Akash Siddappa Goundi"
                className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                loading="eager"
              />
              {/* Orange corner tick */}
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-signal opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-start p-1">
                <ArrowDown className="w-4 h-4 text-white -rotate-45" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
