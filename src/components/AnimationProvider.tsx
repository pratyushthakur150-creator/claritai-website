import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MousePosition {
  x: number;
  y: number;
}

interface AnimationContextType {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  smoothMouseX: ReturnType<typeof useSpring>;
  smoothMouseY: ReturnType<typeof useSpring>;
  rotateX: ReturnType<typeof useTransform<number, number>>;
  rotateY: ReturnType<typeof useTransform<number, number>>;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <AnimationContext.Provider value={{ mouseX, mouseY, smoothMouseX, smoothMouseY, rotateX, rotateY }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useMouseAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useMouseAnimation must be used within AnimationProvider');
  }
  return context;
}
