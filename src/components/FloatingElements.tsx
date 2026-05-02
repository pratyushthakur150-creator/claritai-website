import { motion } from 'framer-motion';
import { Bot, MessageCircle, Phone, CheckCircle, Clock, Star } from 'lucide-react';

// Floating particles for background decoration
export function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.id % 3 === 0 ? '#2563EB' : p.id % 3 === 1 ? '#FF6B35' : '#10B981',
            opacity: 0.1,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Floating notification bubbles
export function FloatingNotifications() {
  const notifications = [
    { icon: MessageCircle, text: 'New lead: JEE query', color: '#2563EB', x: '10%', y: '20%' },
    { icon: Phone, text: 'Demo booked!', color: '#10B981', x: '85%', y: '30%' },
    { icon: CheckCircle, text: 'Lead qualified', color: '#FBBF24', x: '75%', y: '70%' },
    { icon: Clock, text: '24/7 Active', color: '#FF6B35', x: '15%', y: '60%' },
  ];

  return (
    <>
      {notifications.map((notif, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex items-center gap-3 px-4 py-3 bg-white rounded-2xl shadow-xl border border-gray-100"
          style={{ left: notif.x, top: notif.y }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: [0, -10, 0],
          }}
          transition={{ 
            opacity: { delay: 1 + i * 0.2, duration: 0.5 },
            scale: { delay: 1 + i * 0.2, duration: 0.5 },
            y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${notif.color}15` }}
          >
            <notif.icon className="w-4 h-4" style={{ color: notif.color }} />
          </div>
          <span className="text-sm font-medium text-gray-700">{notif.text}</span>
        </motion.div>
      ))}
    </>
  );
}

// Animated gradient orbs
export function GradientOrbs() {
  return (
    <>
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{ 
          background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{ 
          background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)',
          bottom: '-10%',
          right: '-10%',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
        style={{ 
          background: 'radial-gradient(circle, #10B981 0%, transparent 70%)',
          top: '40%',
          left: '30%',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

// Progress rings for stats
export function ProgressRing({ progress, color, size = 120 }: { progress: number; color: string; size?: number }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>{progress}%</span>
      </div>
    </div>
  );
}

// Pulse ring effect
export function PulseRing({ color = '#2563EB' }: { color?: string }) {
  return (
    <div className="relative">
      <div 
        className="absolute inset-0 rounded-full animate-ping opacity-20"
        style={{ backgroundColor: color }}
      />
      <div 
        className="absolute inset-0 rounded-full animate-pulse opacity-40"
        style={{ backgroundColor: color, animationDelay: '0.5s' }}
      />
    </div>
  );
}

// Animated number counter
export function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="tabular-nums"
    >
      {value}{suffix}
    </motion.span>
  );
}
