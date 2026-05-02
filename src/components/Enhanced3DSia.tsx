import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Bot, MessageCircle, Clock, Zap, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Enhanced3DSia() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeMessage, setActiveMessage] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Auto-cycle through messages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessage((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const chatMessages = [
    { text: "Hi! Do you have JEE courses?", type: "user", delay: 0 },
    { text: "Yes! We have JEE crash courses 🚀", type: "sia", delay: 0.5 },
    { text: "What's the fee structure?", type: "user", delay: 1 },
    { text: "Let me share the details...", type: "sia", delay: 1.5 },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ perspective: 1000 }}>
      {/* Main 3D Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {/* Glowing background orb */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl opacity-40"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, #2563EB, #FF6B35, #10B981)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main Sia Avatar */}
        <motion.div
          className="relative w-72 h-72 mx-auto"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Outer rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-dashed"
              style={{
                borderColor: i === 0 ? '#2563EB30' : i === 1 ? '#FF6B3530' : '#10B98130',
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          ))}

          {/* Main circle */}
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-[#2563EB] via-[#3b82f6] to-[#1d4ed8] flex items-center justify-center shadow-2xl"
            style={{
              boxShadow: '0 0 60px -10px rgba(37, 99, 235, 0.5)',
            }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
            
            {/* Bot Icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Bot className="w-32 h-32 text-white drop-shadow-lg" strokeWidth={1} />
            </motion.div>

            {/* Orbiting particles */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  backgroundColor: i % 2 === 0 ? '#FF6B35' : '#10B981',
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5
                }}
              >
                <motion.div
                  className="absolute w-full h-full rounded-full"
                  style={{
                    backgroundColor: i % 2 === 0 ? '#FF6B35' : '#10B981',
                    transform: `translateX(${100 + i * 20}px)`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Status indicator */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-6 py-2 bg-white rounded-full shadow-xl border border-gray-100 flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span 
              className="w-3 h-3 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-sm font-bold text-gray-800">Sia is online</span>
          </motion.div>
        </motion.div>

        {/* Floating chat bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          {chatMessages.map((msg, i) => (
            <motion.div
              key={i}
              className={`absolute ${msg.type === 'user' ? 'left-0' : 'right-0'} top-${20 + i * 15}`}
              style={{
                top: `${20 + i * 15}%`,
              }}
              initial={{ opacity: 0, scale: 0, x: msg.type === 'user' ? -50 : 50 }}
              animate={{
                opacity: activeMessage === i ? 1 : 0.3,
                scale: activeMessage === i ? 1 : 0.9,
                x: 0,
              }}
              transition={{
                duration: 0.5,
                delay: msg.delay,
              }}
            >
              <div
                className={`px-4 py-2 rounded-2xl shadow-lg max-w-[180px] ${
                  msg.type === 'user'
                    ? 'bg-white text-gray-800 rounded-tl-sm'
                    : 'bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white rounded-tr-sm'
                }`}
              >
                <p className="text-xs font-medium">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating badges */}
        <motion.div
          className="absolute -top-4 right-0 px-4 py-2 bg-[#FF6B35] rounded-xl text-white text-sm font-bold shadow-lg"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Clock className="w-4 h-4 inline mr-1" />
          11 PM
        </motion.div>

        <motion.div
          className="absolute bottom-20 -left-8 px-3 py-2 bg-[#10B981] rounded-xl text-white text-xs font-bold shadow-lg"
          animate={{
            y: [0, 10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <CheckCircle2 className="w-3 h-3 inline mr-1" />
          Lead captured!
        </motion.div>

        <motion.div
          className="absolute top-1/3 -right-4 px-3 py-2 bg-[#FBBF24] rounded-xl text-gray-900 text-xs font-bold shadow-lg"
          animate={{
            y: [0, -8, 0],
            x: [0, -5, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Zap className="w-3 h-3 inline mr-1" />
          Instant reply
        </motion.div>
      </motion.div>
    </div>
  );
}
