import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function Logo({ size = 'md', animated = true }: LogoProps) {
  const sizes = {
    sm: { container: 32, font: 18 },
    md: { container: 40, font: 22 },
    lg: { container: 56, font: 32 },
  };

  const { container, font } = sizes[size];

  const IconSvg = (
    <svg 
      viewBox="0 0 45 40" 
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(37, 99, 235, 0.2))' }}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB"/>
          <stop offset="100%" stopColor="#FF6B35"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Main C shape */}
      <motion.path 
        d="M20 5 C 10 5, 5 12, 5 20 C 5 32, 12 38, 20 38 C 28 38, 32 33, 32 28 L 28 28 C 28 31, 25 34, 20 34 C 15 34, 10 30, 10 20 C 10 14, 14 9, 20 9 C 25 9, 28 12, 28 16 L 32 16 C 32 10, 28 5, 20 5 Z" 
        fill="url(#logoGrad)"
        filter="url(#glow)"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* AI dots */}
      {animated ? (
        <>
          <motion.circle 
            cx="38" cy="12" r="3" fill="#2563EB"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: "spring" }}
          />
          <motion.circle 
            cx="38" cy="20" r="3" fill="#FF6B35"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9, type: "spring" }}
          />
          <motion.circle 
            cx="38" cy="28" r="3" fill="#10B981"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
          />
        </>
      ) : (
        <>
          <circle cx="38" cy="12" r="3" fill="#2563EB"/>
          <circle cx="38" cy="20" r="3" fill="#FF6B35"/>
          <circle cx="38" cy="28" r="3" fill="#10B981"/>
        </>
      )}
    </svg>
  );

  return (
    <div className="flex items-center gap-2">
      <motion.div 
        className="flex-shrink-0"
        style={{ width: container, height: container }}
        whileHover={animated ? { rotate: 10, scale: 1.1 } : {}}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {IconSvg}
      </motion.div>
      <span 
        className="font-bold text-gray-900 tracking-tight"
        style={{ fontSize: font }}
      >
        Clarit<span className="text-[#2563EB]">AI</span>
      </span>
    </div>
  );
}
