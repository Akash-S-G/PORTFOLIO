import React from 'react';
import { motion, type Variants } from 'framer-motion';

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
  up: { y: 36 },
  down: { y: -36 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.92, y: 20 },
  fade: {},
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.55,
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
      viewport={{ once, margin: '-60px' }}
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
      viewport={{ once: true, margin: '-60px' }}
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
        visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
