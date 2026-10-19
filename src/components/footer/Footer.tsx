import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Github, Linkedin, Mail, Download, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-graphite-950 border-t border-graphite-800 text-ivory-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-graphite-850">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-graphite-850 border border-graphite-700 flex items-center justify-center font-mono font-bold text-xs text-lime">
              ASG
            </div>
            <div>
              <div className="font-display font-semibold text-sm text-ivory">
                Akash Siddappa Goundi
              </div>
              <div className="text-[11px] font-mono text-ivory-muted">
                Software Engineering • Backend Systems • Edge AI
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-ivory-dim hover:text-lime transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-ivory-dim hover:text-cyan transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-1.5 text-ivory-dim hover:text-ivory transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>

            <a
              href={`./${PERSONAL_INFO.resumeFilename}`}
              download={PERSONAL_INFO.resumeFilename}
              className="flex items-center gap-1.5 text-lime hover:underline transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Resume PDF</span>
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-graphite-900 border border-graphite-750 hover:border-lime/60 text-xs font-mono text-ivory-dim hover:text-lime transition-all"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Credits & Integrity Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-ivory-muted">
          <div>
            <span>© {new Date().getFullYear()} Akash Siddappa Goundi. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime inline-block" />
            <span>Audited against verified GitHub repositories & latest resume. Zero fabricated claims.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
