import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface ScrollSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  variant?: 'up' | 'left' | 'right' | 'scale';
}

const offsets = {
  up: { y: 45 },
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  scale: { scale: 0.94, y: 30 },
};

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  id,
  className = '',
  delay = 0,
  variant = 'up',
}) => {
  const variants: Variants = {
    hidden: { opacity: 0, ...offsets[variant] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      id={id}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px' }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
