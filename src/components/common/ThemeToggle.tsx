import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative px-3.5 py-1.5 rounded-none transition-colors duration-150 border-2 flex items-center gap-2 focus:outline-none font-mono text-xs font-bold uppercase tracking-wider cursor-pointer select-none ${
        isDark
          ? 'bg-white text-black border-white hover:bg-neutral-200 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.4)]'
          : 'bg-black text-white border-black hover:bg-neutral-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]'
      } ${className}`}
      aria-label={`Current mode: ${theme}. Click to switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Current mode: ${theme.toUpperCase()}. Click to switch to ${isDark ? 'LIGHT' : 'DARK'} mode`}
    >
      {isDark ? (
        <>
          <Moon className="w-3.5 h-3.5 fill-black stroke-black" />
          <span>DARK (CLICK FOR LIGHT)</span>
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5 stroke-white fill-white" />
          <span>LIGHT (CLICK FOR DARK)</span>
        </>
      )}
    </button>
  );
};
