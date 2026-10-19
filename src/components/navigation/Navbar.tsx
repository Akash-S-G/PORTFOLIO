import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { RoleFilter } from '../../types/portfolio';

interface NavbarProps {
  activeRole: RoleFilter;
  onSelectRole: (role: RoleFilter) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeRole, onSelectRole }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['contact', 'about', 'skills', 'experience', 'architecture', 'projects', 'hero'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-graphite-950/85 backdrop-blur-md border-b border-graphite-750/80 py-3 shadow-2xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          >
            <div className="w-9 h-9 rounded-xl bg-graphite-850 border border-graphite-700 group-hover:border-lime flex items-center justify-center font-mono font-bold text-sm text-lime transition-all duration-200 shadow-md">
              ASG
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm text-ivory tracking-tight group-hover:text-lime transition-colors">
                Akash Siddappa Goundi
              </span>
              <span className="font-mono text-[10px] text-ivory-muted tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-lime inline-block animate-pulse" />
                SYSTEM_ONLINE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-graphite-900/60 p-1 rounded-xl border border-graphite-750/70 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? 'bg-graphite-800 text-lime font-semibold shadow-sm'
                      : 'text-ivory-dim hover:text-ivory hover:bg-graphite-850/60'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Resume CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Perspective Filter */}
            <div className="hidden lg:flex items-center gap-1 bg-graphite-900/80 p-0.5 rounded-lg border border-graphite-750 text-[10px] font-mono">
              <button
                onClick={() => onSelectRole('all')}
                className={`px-2 py-1 rounded transition-colors ${
                  activeRole === 'all' ? 'bg-graphite-750 text-lime font-semibold' : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                All
              </button>
              <button
                onClick={() => onSelectRole('backend')}
                className={`px-2 py-1 rounded transition-colors ${
                  activeRole === 'backend' ? 'bg-graphite-750 text-cyan font-semibold' : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                Backend
              </button>
              <button
                onClick={() => onSelectRole('ai-edge')}
                className={`px-2 py-1 rounded transition-colors ${
                  activeRole === 'ai-edge' ? 'bg-graphite-750 text-lime font-semibold' : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                Edge AI
              </button>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg bg-graphite-850 border border-graphite-700/80 hover:border-lime/60 text-ivory-dim hover:text-lime transition-all"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg bg-graphite-850 border border-graphite-700/80 hover:border-cyan text-ivory-dim hover:text-cyan transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`./${PERSONAL_INFO.resumeFilename}`}
              download={PERSONAL_INFO.resumeFilename}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-lime text-graphite-950 font-mono text-xs font-semibold hover:bg-lime-hover shadow-[0_0_16px_rgba(197,243,107,0.25)] transition-all"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={`./${PERSONAL_INFO.resumeFilename}`}
              download={PERSONAL_INFO.resumeFilename}
              className="p-2 rounded-lg bg-lime text-graphite-950 text-xs font-bold"
              aria-label="Download Resume"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-graphite-850 border border-graphite-700 text-ivory hover:text-lime"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-graphite-950 border-b border-graphite-750 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg font-mono text-sm text-ivory hover:text-lime hover:bg-graphite-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-graphite-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-graphite-900 border border-graphite-750 text-ivory hover:text-lime"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-graphite-900 border border-graphite-750 text-ivory hover:text-cyan"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <a
              href={`./${PERSONAL_INFO.resumeFilename}`}
              download={PERSONAL_INFO.resumeFilename}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-lime text-graphite-950 font-mono text-xs font-bold"
            >
              <Download className="w-4 h-4" />
              <span>Resume PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
