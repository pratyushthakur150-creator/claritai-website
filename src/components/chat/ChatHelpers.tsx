import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, CheckCheck, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';

const BOT_AVATAR = '/sia-avatar-small.png';

/* ─── Confetti Burst ─── */
export function ConfettiBurst({ x, y }: { x: number; y: number }) {
  const colors = ['#4A7CFF', '#8B5CF6', '#FF6B4A', '#22C55E', '#F59E0B', '#EC4899', '#06B6D4', '#10B981'];
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i, color: colors[i % colors.length],
    angle: (i / 30) * 360, speed: 50 + Math.random() * 100,
    size: 3 + Math.random() * 5, rotation: Math.random() * 360,
  }));
  return (
    <div className="fixed pointer-events-none z-[9999]" style={{ left: x, top: y }}>
      {particles.map(p => {
        const rad = (p.angle * Math.PI) / 180;
        return (
          <motion.div key={p.id} className="absolute rounded-sm"
            style={{ width: p.size, height: p.size, background: p.color, left: 0, top: 0 }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{ x: Math.cos(rad) * p.speed, y: Math.sin(rad) * p.speed - 40, opacity: 0, rotate: p.rotation + 720, scale: 0 }}
            transition={{ duration: 0.9 + Math.random() * 0.4, ease: 'easeOut' }} />
        );
      })}
    </div>
  );
}

/* ─── Typewriter Text ─── */
export function TypewriterText({ text, speed = 16, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(''); setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); onComplete?.(); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      {!done && (
        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[2px] h-[14px] bg-blue-500 ml-0.5 align-middle" />
      )}
    </span>
  );
}

/* ─── Message Status ─── */
export function MessageStatus({ status }: { status: string }) {
  return (
    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center">
      {status === 'sent' && <Check className="w-3 h-3 text-gray-400" />}
      {status === 'delivered' && <CheckCheck className="w-3.5 h-3.5 text-gray-400" />}
      {status === 'read' && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
    </motion.div>
  );
}

/* ─── Floating Particles ─── */
export function Particles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: 1.5 + Math.random() * 2, duration: 15 + Math.random() * 20, delay: Math.random() * 10,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: ['rgba(74,124,255,0.08)', 'rgba(139,92,246,0.06)', 'rgba(255,107,74,0.06)', 'rgba(236,72,153,0.05)', 'rgba(6,182,212,0.05)'][p.id % 5] }}
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

/* ─── Typing Indicator ─── */
export function TypingIndicator() {
  return (
    <motion.div initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="flex items-end gap-2.5 pl-1">
      <div className="relative flex-shrink-0">
        <img src={BOT_AVATAR} alt="Sia" className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100" />
        <motion.span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-5 py-3.5 flex items-center gap-2 shadow-md shadow-gray-100/50 border border-gray-100/60">
        <div className="flex items-center gap-[5px]">
          {[0, 1, 2].map(i => (
            <motion.div key={i} className="w-2 h-2 rounded-full"
              style={{ background: ['#4A7CFF', '#8B5CF6', '#FF6B4A'][i] }}
              animate={{ y: [0, -8, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Ripple Button ─── */
export function RippleButton({ children, onClick, className = '', disabled = false, style }: any) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const handleClick = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    onClick?.(e);
  };
  return (
    <button onClick={handleClick} className={`relative overflow-hidden ${className}`} disabled={disabled} style={style}>
      {children}
      {ripples.map(r => (
        <motion.span key={r.id} className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{ left: r.x, top: r.y }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.5 }}
          animate={{ width: 100, height: 100, x: -50, y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }} />
      ))}
    </button>
  );
}

/* ─── Message Bubble ─── */
export function MessageBubble({ msg, onRateClick, userRating, isLatestBot, onTypingDone }: any) {
  const isUser = msg.sender === 'user';
  const formatTime = (ts: string) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`flex items-end gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} pl-1`}
    >
      {!isUser && (
        <div className="relative flex-shrink-0">
          <img src={BOT_AVATAR} alt="Sia" className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-50" />
        </div>
      )}
      <div className={`max-w-[78%] group ${isUser ? 'items-end' : 'items-start'}`}>
        <motion.div whileHover={{ y: -1 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`relative px-4 py-3 text-[13.5px] leading-relaxed ${
            isUser
              ? 'text-white rounded-[20px] rounded-br-[6px]'
              : 'text-gray-800 rounded-[20px] rounded-bl-[6px] bg-white shadow-md shadow-gray-100/60 border border-gray-100/60'
          }`}
          style={isUser ? { background: 'linear-gradient(135deg, #4A7CFF 0%, #6B8FFF 100%)' } : {}}>
          {isLatestBot && !isUser ? (
            <TypewriterText text={msg.text} speed={16} onComplete={onTypingDone} />
          ) : msg.text}
        </motion.div>
        <div className={`flex items-center gap-2 mt-1.5 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-[10px] text-gray-400 font-medium">{formatTime(msg.timestamp)}</span>
          {isUser && <MessageStatus status={msg.status || 'read'} />}
          {!isUser && (
            <motion.button onClick={onRateClick} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
              {userRating === 'up' ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
                  <ThumbsUp className="w-3.5 h-3.5 text-green-500 fill-green-500" />
                </motion.div>
              ) : userRating === 'down' ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
                  <ThumbsDown className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                </motion.div>
              ) : (
                <ThumbsUp className="w-3.5 h-3.5 text-gray-300 hover:text-blue-400 transition-colors" />
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export { BOT_AVATAR };
