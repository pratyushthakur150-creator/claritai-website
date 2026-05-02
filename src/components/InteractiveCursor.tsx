import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function InteractiveCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const cursorXDelayed = useSpring(cursorX, { damping: 30, stiffness: 200 });
  const cursorYDelayed = useSpring(cursorY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor]')) {
        setIsHovering(true);
        const cursorData = target.closest('[data-cursor]')?.getAttribute('data-cursor');
        if (cursorData) setCursorText(cursorData);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Only show on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="bg-white rounded-full"
          animate={{
            width: isHovering ? 80 : 12,
            height: isHovering ? 80 : 12,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
        {cursorText && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-black text-xs font-bold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXDelayed,
          y: cursorYDelayed,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="border-2 border-[#2563EB] rounded-full"
          animate={{
            width: isHovering ? 100 : 40,
            height: isHovering ? 100 : 40,
            opacity: isVisible ? 0.5 : 0,
            borderColor: isHovering ? '#FF6B35' : '#2563EB',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
      </motion.div>

      {/* Cursor trail dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            x: useSpring(cursorX, { damping: 30 + i * 5, stiffness: 200 - i * 20 }),
            y: useSpring(cursorY, { damping: 30 + i * 5, stiffness: 200 - i * 20 }),
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="bg-[#2563EB] rounded-full"
            animate={{
              width: 8 - i,
              height: 8 - i,
              opacity: (0.3 - i * 0.05) * (isVisible ? 1 : 0),
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
