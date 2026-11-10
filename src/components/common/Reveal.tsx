import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useSpring, type Variants } from 'framer-motion';

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  id?: string;
}

const offsets: Record<RevealVariant, { x?: number; y?: number; scale?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: -32 },
  right: { x: 32 },
  scale: { scale: 0.97, y: 14 },
  fade: {},
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  id,
}) => {
  const hidden = { opacity: 0, ...offsets[variant] };

  const variants: Variants = {
    hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      id={id}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Stagger container: children with `Reveal` inside animate in sequence */
export const RevealStagger: React.FC<{ children: React.ReactNode; className?: string; stagger?: number }> = ({
  children,
  className = '',
  stagger = 0.08,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Child item for use inside RevealStagger */
export const RevealItem: React.FC<{ children: React.ReactNode; className?: string; variant?: RevealVariant }> = ({
  children,
  className = '',
  variant = 'up',
}) => {
  const hidden = { opacity: 0, ...offsets[variant] };
  return (
    <motion.div
      variants={{
        hidden,
        visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
}

/**
 * Word-rise mask animation: each word rises out of an overflow-hidden mask.
 * Used for the hero name and all section headings. Collapses to static text
 * when the user prefers reduced motion.
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.06,
}) => {
  const reduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          {/* The mask is the observed element: it always has real in-view geometry.
              The word inside starts translated below the clip — if the word itself
              were observed, ancestor clipping would report empty intersection and
              whileInView would never fire. */}
          <motion.span
            aria-hidden="true"
            className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -5% 0px' }}
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: '115%' },
                visible: {
                  y: 0,
                  transition: { duration: 0.6, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </Tag>
  );
};

interface AnimatedNameProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

const MAGNETIC_RADIUS = 170;

interface MagneticLetterProps {
  ch: string;
  index: number;
  risen: boolean;
  delay: number;
  stagger: number;
  pointerX: number | null;
}

/** Single letter: load-in rise, then spring-based magnetic lift toward the cursor. */
const MagneticLetter: React.FC<MagneticLetterProps> = ({ ch, index, risen, delay, stagger, pointerX }) => {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [centerX, setCenterX] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        setCenterX(measureRef.current.getBoundingClientRect().left + measureRef.current.offsetWidth / 2);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const influence = pointerX == null ? 0 : Math.max(0, 1 - Math.abs(centerX - pointerX) / MAGNETIC_RADIUS);
  const targetY = -influence * influence * 38 - influence * 6;
  const targetRotate = influence * ((centerX - (pointerX ?? centerX)) / MAGNETIC_RADIUS) * -10;

  const springY = useSpring(targetY, { stiffness: 260, damping: 16 });
  const springRotate = useSpring(targetRotate, { stiffness: 260, damping: 16 });

  useEffect(() => {
    springY.set(targetY);
    springRotate.set(targetRotate);
  }, [targetY, targetRotate, springY, springRotate]);

  return (
    <span
      ref={measureRef}
      aria-hidden="true"
      className={`inline-block ${risen ? '' : 'overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]'}`}
    >
      <motion.span
        className="inline-block"
        initial={{ y: '115%' }}
        animate={{ y: 0, transition: { duration: 0.6, delay: delay + index * stagger, ease: [0.22, 1, 0.36, 1] } }}
      >
        <motion.span className="inline-block will-change-transform" style={{ y: springY, rotate: springRotate }}>
          {ch}
        </motion.span>
      </motion.span>
    </span>
  );
};

/**
 * Interactive heading: letters rise out of an overflow mask on load, then
 * react magnetically to the cursor — letters near the pointer lift and tilt
 * on springs. Collapses to static text under prefers-reduced-motion.
 */
export const AnimatedName: React.FC<AnimatedNameProps> = ({
  text,
  className = '',
  delay = 0.15,
  stagger = 0.035,
}) => {
  const reduceMotion = useReducedMotion();
  const [risen, setRisen] = useState(false);
  const [pointerX, setPointerX] = useState<number | null>(null);
  const letters = useMemo(() => [...text], [text]);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(() => setRisen(true), (delay + letters.length * stagger + 0.7) * 1000);
    return () => clearTimeout(t);
  }, [reduceMotion, delay, stagger, letters.length]);

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={`inline-block cursor-default select-none ${className}`}
      onPointerMove={(e) => setPointerX(e.clientX)}
      onPointerLeave={() => setPointerX(null)}
      aria-label={text}
    >
      {letters.map((ch, i) =>
        ch === ' ' ? (
          <span key={`space-${i}`} aria-hidden="true" className="inline-block w-[0.28em]" />
        ) : (
          <MagneticLetter
            key={`${ch}-${i}`}
            ch={ch}
            index={i}
            risen={risen}
            delay={delay}
            stagger={stagger}
            pointerX={risen ? pointerX : null}
          />
        )
      )}
    </motion.span>
  );
};
