import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * Full-screen gradient sweep (orange <-> cyan) that plays on every theme switch.
 * Purely decorative: fixed, pointer-events-none, auto-dismisses.
 */
export const ThemeTransitionFx: React.FC = () => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setActive(true);
    setSweepKey((k) => k + 1);
    const t = setTimeout(() => setActive(false), 1100);
    return () => clearTimeout(t);
  }, [theme]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={sweepKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {/* Ambient radial gradient flash — direction flips with theme */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            style={{
              background:
                theme === 'dark'
                  ? 'radial-gradient(circle at 20% 15%, rgba(255,77,0,0.20), transparent 45%), radial-gradient(circle at 85% 85%, rgba(34,211,238,0.20), transparent 45%)'
                  : 'radial-gradient(circle at 85% 15%, rgba(34,211,238,0.18), transparent 45%), radial-gradient(circle at 15% 85%, rgba(255,77,0,0.18), transparent 45%)',
            }}
          />

          {/* Diagonal orange -> cyan sweep band */}
          <motion.div
            className="absolute inset-y-0 -left-full w-full"
            initial={{ x: 0 }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
            style={{
              background:
                'linear-gradient(105deg, transparent 0%, rgba(255,77,0,0.30) 35%, rgba(34,211,238,0.30) 65%, transparent 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
