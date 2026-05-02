import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';

interface ScrollVelocityProps {
  children: React.ReactNode;
  className?: string;
  baseVelocity?: number;
}

export default function ScrollVelocity({ 
  children, 
  className = '', 
  baseVelocity = 100 
}: ScrollVelocityProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  
  const scrollVelocity = useTransform(scrollY, (latest) => {
    // Calculate velocity based on scroll
    return latest * 0.5;
  });
  
  const x = useTransform(baseX, (v) => `${v}%`);
  const springX = useSpring(x, { damping: 50, stiffness: 400 });

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        style={{ x: springX }}
        className="flex whitespace-nowrap"
      >
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
