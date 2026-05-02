import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function InteractiveCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isChatbot, setIsChatbot] = useState(false);
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
      const chatbotEl = target.closest('[data-cursor="chatbot"]');
      const interactiveEl = target.closest('a, button, [data-cursor]');

      if (chatbotEl) {
        setIsChatbot(true);
        setIsHovering(true);
        setCursorText('Chat 💬');
      } else if (interactiveEl) {
        setIsChatbot(false);
        setIsHovering(true);
        const cursorData = interactiveEl.getAttribute('data-cursor');
        if (cursorData && cursorData !== 'chatbot') setCursorText(cursorData);
        else setCursorText('');
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = (e as any).relatedTarget as HTMLElement | null;
      // Only reset if leaving to something without cursor
      if (!relatedTarget?.closest('a, button, [data-cursor]')) {
        setIsHovering(false);
        setIsChatbot(false);
        setCursorText('');
      }
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
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="bg-white rounded-full flex items-center justify-center overflow-hidden"
          animate={{
            width: isHovering ? 80 : 12,
            height: isHovering ? 80 : 12,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
        {cursorText && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-black text-[11px] font-bold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Cursor ring — rainbow + spinning when chatbot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: cursorXDelayed, y: cursorYDelayed, translateX: '-50%', translateY: '-50%' }}
      >
        {isChatbot ? (
          /* Rainbow spinning ring for chatbot */
          <motion.div
            className="rounded-full relative flex items-center justify-center"
            animate={{ width: 100, height: 100, opacity: isVisible ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Spinning rainbow gradient ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                background: 'conic-gradient(from 0deg, #4A7CFF, #8B5CF6, #FF6B4A, #EC4899, #06B6D4, #4A7CFF)',
                padding: '2.5px',
              }}
            >
              <div className="w-full h-full rounded-full bg-transparent" />
            </motion.div>
            {/* Inner mask to make it look like a ring */}
            <motion.div
              className="absolute rounded-full bg-white/0"
              style={{ inset: '3px' }}
            />
          </motion.div>
        ) : (
          /* Normal blue ring */
          <motion.div
            className="border-2 rounded-full"
            animate={{
              width: isHovering ? 100 : 40,
              height: isHovering ? 100 : 40,
              opacity: isVisible ? 0.5 : 0,
              borderColor: isHovering ? '#FF6B35' : '#2563EB',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        )}
      </motion.div>

      {/* Trailing dots — purple/orange when chatbot, blue normally */}
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
            className="rounded-full"
            animate={{
              width: 8 - i,
              height: 8 - i,
              opacity: (0.3 - i * 0.05) * (isVisible ? 1 : 0),
              backgroundColor: isChatbot
                ? ['#8B5CF6', '#FF6B4A', '#EC4899', '#06B6D4', '#4A7CFF'][i]
                : '#2563EB',
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </>
  );
}
