import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  as: Tag = 'h2',
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 140,
      },
    },
    hidden: {
      opacity: 0,
      y: '100%',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 140,
      },
    },
  };

  return (
    <Tag className={`overflow-hidden inline-flex flex-wrap ${className}`}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="inline-flex flex-wrap"
      >
        {words.map((word, index) => (
          <span key={index} className="overflow-hidden inline-block mr-[0.25em] pb-1">
            <motion.span variants={child} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};
