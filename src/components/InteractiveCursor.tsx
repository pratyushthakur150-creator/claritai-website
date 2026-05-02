import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface Spark { id: number; x: number; y: number; color: string; }

export default function InteractiveCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isChatbot, setIsChatbot] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const lastSpark = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, { damping: 28, stiffness: 500 });
  const dotY = useSpring(cursorY, { damping: 28, stiffness: 500 });
  const ringX = useSpring(cursorX, { damping: 32, stiffness: 220 });
  const ringY = useSpring(cursorY, { damping: 32, stiffness: 220 });

  // Trail springs — 3 dots, progressively lagging
  const t1X = useSpring(cursorX, { damping: 35, stiffness: 180 });
  const t1Y = useSpring(cursorY, { damping: 35, stiffness: 180 });
  const t2X = useSpring(cursorX, { damping: 40, stiffness: 140 });
  const t2Y = useSpring(cursorY, { damping: 40, stiffness: 140 });
  const t3X = useSpring(cursorX, { damping: 45, stiffness: 100 });
  const t3Y = useSpring(cursorY, { damping: 45, stiffness: 100 });

  const SPARK_COLORS = ['#4A7CFF', '#8B5CF6', '#FF6B4A', '#EC4899', '#06B6D4'];

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Emit sparks when inside chatbot zone
      if (isChatbot) {
        const now = Date.now();
        if (now - lastSpark.current > 80) {
          lastSpark.current = now;
          const spark: Spark = {
            id: now,
            x: e.clientX,
            y: e.clientY,
            color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
          };
          setSparks(prev => [...prev.slice(-6), spark]);
          setTimeout(() => setSparks(prev => prev.filter(s => s.id !== spark.id)), 500);
        }
      }
    };

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('[data-cursor="chatbot"]')) {
        setIsChatbot(true);
        setIsHovering(true);
      } else if (t.closest('a, button, [data-cursor]')) {
        setIsChatbot(false);
        setIsHovering(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const rel = (e as any).relatedTarget as HTMLElement | null;
      if (!rel?.closest('a, button, [data-cursor]')) {
        setIsHovering(false);
        setIsChatbot(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [cursorX, cursorY, isChatbot]);

  // Hide on mobile/tablet
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

  const trailDots = [
    { x: t1X, y: t1Y, size: 5, opacity: 0.5 },
    { x: t2X, y: t2Y, size: 3.5, opacity: 0.3 },
    { x: t3X, y: t3Y, size: 2.5, opacity: 0.18 },
  ];

  return (
    <>
      {/* ── Spark particles (chatbot only) ── */}
      <AnimatePresence>
        {sparks.map(s => (
          <motion.div key={s.id}
            className="fixed pointer-events-none z-[9996] rounded-full"
            style={{ left: s.x, top: s.y, translateX: '-50%', translateY: '-50%', background: s.color }}
            initial={{ width: 6, height: 6, opacity: 0.9, scale: 1 }}
            animate={{ width: 2, height: 2, opacity: 0, scale: 0,
              x: (Math.random() - 0.5) * 24, y: (Math.random() - 0.5) * 24 }}
            exit={{}}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* ── Trail dots ── */}
      {trailDots.map((t, i) => (
        <motion.div key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
          style={{ x: t.x, y: t.y, translateX: '-50%', translateY: '-50%' }}
        >
          <motion.div className="rounded-full"
            animate={{
              width: t.size,
              height: t.size,
              opacity: isVisible ? t.opacity : 0,
              backgroundColor: isChatbot
                ? ['#8B5CF6', '#FF6B4A', '#06B6D4'][i]
                : '#2563EB',
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      ))}

      {/* ── Ring (chatbot = rainbow spinning, normal = blue) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        {isChatbot ? (
          <motion.div
            className="rounded-full flex items-center justify-center relative"
            animate={{ width: 28, height: 28, opacity: isVisible ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            {/* Spinning rainbow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              style={{
                background: 'conic-gradient(from 0deg, #4A7CFF, #8B5CF6, #FF6B4A, #EC4899, #06B6D4, #4A7CFF)',
              }}
            />
            {/* White inner mask to create ring effect */}
            <div className="absolute rounded-full bg-transparent"
              style={{ inset: '2.5px', background: 'transparent' }} />
          </motion.div>
        ) : (
          <motion.div
            className="rounded-full border-2"
            animate={{
              width: isHovering ? 56 : 36,
              height: isHovering ? 56 : 36,
              opacity: isVisible ? 0.55 : 0,
              borderColor: isHovering ? '#FF6B35' : '#2563EB',
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          />
        )}
      </motion.div>

      {/* ── Main dot (8px gradient orb) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isChatbot ? 8 : isHovering ? 10 : 8,
            height: isChatbot ? 8 : isHovering ? 10 : 8,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          style={{
            background: isChatbot
              ? 'linear-gradient(135deg, #4A7CFF, #8B5CF6)'
              : isHovering
              ? 'linear-gradient(135deg, #FF6B35, #FF4A6B)'
              : 'linear-gradient(135deg, #2563EB, #7C3AED)',
            boxShadow: isChatbot
              ? '0 0 8px rgba(74,124,255,0.8), 0 0 16px rgba(139,92,246,0.4)'
              : isHovering
              ? '0 0 6px rgba(255,107,53,0.7)'
              : '0 0 6px rgba(37,99,235,0.6)',
          }}
        />
      </motion.div>
    </>
  );
}
