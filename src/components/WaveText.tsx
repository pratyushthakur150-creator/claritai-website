import { motion } from 'framer-motion';

interface WaveTextProps {
  text: string;
  className?: string;
}

export default function WaveText({ text, className = '' }: WaveTextProps) {
  const letters = text.split('');

  return (
    <motion.span className={`inline-flex ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
          whileHover={{
            y: -10,
            scale: 1.2,
            color: '#2563EB',
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 10,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
