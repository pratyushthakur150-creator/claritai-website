import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxContainerProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function ParallaxContainer({ 
  children, 
  offset = 50,
  className = '',
  direction = 'up'
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getTransform = () => {
    switch (direction) {
      case 'up': return useTransform(scrollYProgress, [0, 1], [offset, -offset]);
      case 'down': return useTransform(scrollYProgress, [0, 1], [-offset, offset]);
      case 'left': return useTransform(scrollYProgress, [0, 1], [offset, -offset]);
      case 'right': return useTransform(scrollYProgress, [0, 1], [-offset, offset]);
    }
  };

  const isHorizontal = direction === 'left' || direction === 'right';
  const transformValue = getTransform();

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          [isHorizontal ? 'x' : 'y']: transformValue,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
