import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

export default function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // 3D rotation based on mouse
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);
  
  // Parallax layers
  const layer1X = useTransform(x, [-0.5, 0.5], [50, -50]);
  const layer1Y = useTransform(y, [-0.5, 0.5], [50, -50]);
  const layer2X = useTransform(x, [-0.5, 0.5], [100, -100]);
  const layer2Y = useTransform(y, [-0.5, 0.5], [100, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const xPos = (e.clientX - centerX) / (rect.width / 2);
      const yPos = (e.clientY - centerY) / (rect.height / 2);
      
      mouseX.set(xPos * 0.5);
      mouseY.set(yPos * 0.5);
      setMousePosition({ x: xPos, y: yPos });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Interactive layered background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(37, 99, 235, 0.15), transparent 50%)`,
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute w-32 h-32 border-2 border-[#2563EB]/20 rounded-2xl"
        style={{ x: layer2X, y: layer2Y, top: '20%', left: '10%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-24 h-24 bg-[#FF6B35]/10 rounded-full blur-xl"
        style={{ x: layer1X, y: layer1Y, bottom: '30%', right: '15%' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-16 h-16 border-2 border-[#10B981]/30"
        style={{ x: layer2X, y: layer2Y, top: '40%', right: '20%' }}
        animate={{ rotate: -360, borderRadius: ['0%', '50%', '0%'] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* 3D Cards floating */}
      <motion.div
        className="absolute hidden lg:block"
        style={{ 
          x: layer1X, 
          y: layer1Y, 
          right: '10%', 
          top: '30%',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="w-64 h-40 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100"
          whileHover={{ scale: 1.05, z: 50 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-lg">✓</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Lead Captured!</p>
              <p className="text-xs text-gray-500">JEE Batch Inquiry</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-100 rounded-full w-full" />
            <div className="h-2 bg-gray-100 rounded-full w-3/4" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute hidden lg:block"
        style={{ 
          x: layer2X, 
          y: layer2Y, 
          right: '5%', 
          bottom: '20%',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="w-56 h-32 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-2xl shadow-2xl p-4 text-white"
          whileHover={{ scale: 1.05, z: 50 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ transform: 'translateZ(30px)' }}
        >
          <p className="text-xs opacity-80 mb-1">Conversion Rate</p>
          <p className="text-3xl font-bold">42%</p>
          <p className="text-xs opacity-80 mt-2">+12% from last month</p>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full mb-6 border border-gray-200 shadow-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
            </motion.div>
            <span className="text-sm font-medium text-gray-700">Trusted by 550+ coaching institutes</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Your Students
            </motion.span>
            <br />
            <motion.span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Visit at 11 PM.
            </motion.span>
            <br />
            <motion.span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#e55a2b]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Nobody Is Answering.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 mb-8 max-w-xl"
          >
            ClaritAI captures, calls, and converts leads automatically for coaching institutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              className="group px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-full shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(37, 99, 235, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>

            <motion.button
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-[#FF6B35] hover:text-[#FF6B35] flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mouse follower glow */}
      <motion.div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #2563EB, transparent)',
          x: useTransform(x, [-0.5, 0.5], [-250, 250]),
          y: useTransform(y, [-0.5, 0.5], [-250, 250]),
          left: '50%',
          top: '50%',
        }}
      />
    </div>
  );
}
