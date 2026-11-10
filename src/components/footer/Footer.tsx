import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Github, Linkedin, Mail, Download, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-white dark:bg-black text-black dark:text-white transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b-2 border-black dark:border-white">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-none bg-black dark:bg-white border-2 border-black dark:border-white flex items-center justify-center font-mono font-bold text-xs text-white dark:text-black shadow-xs">
              ASG
            </div>
            <div>
              <div className="font-display font-bold text-sm text-black dark:text-white">
                Akash Siddappa Goundi
              </div>
              <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 font-semibold uppercase">
                Backend Systems • Distributed Services • LLM Integration
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-mono font-bold uppercase">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-black dark:text-white hover:text-cyan-dark dark:hover:text-cyan transition-colors"
            >
              <Github className="w-4 h-4 text-cyan-dark dark:text-cyan" />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-black dark:text-white hover:text-cyan-dark dark:hover:text-cyan transition-colors"
            >
              <Linkedin className="w-4 h-4 text-cyan-dark dark:text-cyan" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-1.5 text-black dark:text-white hover:text-cyan-dark dark:hover:text-cyan transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>

            <a
              href={`./${PERSONAL_INFO.resumeFilename}`}
              download={PERSONAL_INFO.resumeFilename}
              className="flex items-center gap-1.5 text-black dark:text-white underline underline-offset-4"
            >
              <Download className="w-4 h-4" />
              <span>Resume PDF</span>
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-signal hover:bg-cyan hover:text-black hover:border-cyan text-white border-2 border-black dark:border-white text-xs font-mono font-bold uppercase transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-600 dark:text-neutral-400 font-semibold uppercase">
          <div>
            <span>© {new Date().getFullYear()} Akash Siddappa Goundi. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
