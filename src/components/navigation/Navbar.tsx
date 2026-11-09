import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { RoleFilter } from '../../types/portfolio';
import { ThemeToggle } from '../common/ThemeToggle';

interface NavbarProps {
  activeRole: RoleFilter;
  onSelectRole: (role: RoleFilter) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeRole, onSelectRole }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Overview', href: '#overview' },
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

      const sections = ['contact', 'about', 'skills', 'experience', 'architecture', 'projects', 'overview', 'hero'];
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
        scrolled
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md border-b-2 border-black dark:border-white py-3 shadow-md'
          : 'bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-black/20 dark:border-white/20 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-none bg-black dark:bg-white border-2 border-black dark:border-white flex items-center justify-center font-mono font-bold text-sm text-white dark:text-black transition-colors duration-150">
              ASG
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm text-black dark:text-white tracking-tight">
                Akash Siddappa Goundi
              </span>
              <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400 tracking-widest flex items-center gap-1.5 uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-none bg-emerald-600 dark:bg-lime inline-block" />
                AVAILABLE_FOR_ROLES
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-none border-2 border-black dark:border-white">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-none text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-150 ${
                    isActive
                      ? 'bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white'
                      : 'text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Perspective Filter */}
            <div className="hidden lg:flex items-center gap-0.5 bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-none border border-black dark:border-white text-[10px] font-mono">
              <button
                onClick={() => onSelectRole('all')}
                className={`px-2 py-1 rounded-none font-bold uppercase transition-colors ${
                  activeRole === 'all'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => onSelectRole('backend')}
                className={`px-2 py-1 rounded-none font-bold uppercase transition-colors ${
                  activeRole === 'backend'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Backend
              </button>
              <button
                onClick={() => onSelectRole('ai-edge')}
                className={`px-2 py-1 rounded-none font-bold uppercase transition-colors ${
                  activeRole === 'ai-edge'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Edge AI
              </button>
            </div>

            {/* Dark / Light Mode Switcher */}
            <ThemeToggle />

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`./${PERSONAL_INFO.resumeFilename}`}
              download={PERSONAL_INFO.resumeFilename}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-white transition-colors"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white"
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
        <div className="sm:hidden bg-white dark:bg-black border-b-2 border-black dark:border-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-none font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-black dark:border-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t-2 border-black dark:border-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <a
              href={`./${PERSONAL_INFO.resumeFilename}`}
              download={PERSONAL_INFO.resumeFilename}
              className="flex items-center gap-1.5 px-4 py-2 rounded-none bg-black dark:bg-white text-white dark:text-black font-mono text-xs font-bold uppercase border-2 border-black dark:border-white"
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
