import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
}

export default function InteractiveParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    // Create particles
    const colors = ['#2563EB', '#FF6B35', '#10B981', '#FBBF24'];
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      originalX: Math.random() * 100,
      originalY: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Animate particles
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setParticles(prev => prev.map(p => {
        // Move towards original position with noise
        const dx = p.originalX - p.x;
        const dy = p.originalY - p.y;
        
        // Add mouse repulsion
        const mouseXVal = smoothMouseX.get();
        const mouseYVal = smoothMouseY.get();
        const distX = p.x - mouseXVal;
        const distY = p.y - mouseYVal;
        const dist = Math.sqrt(distX * distX + distY * distY);
        
        let repulsionX = 0;
        let repulsionY = 0;
        
        if (dist < 20) {
          const force = (20 - dist) / 20;
          repulsionX = (distX / dist) * force * 2;
          repulsionY = (distY / dist) * force * 2;
        }

        return {
          ...p,
          x: p.x + p.vx + dx * 0.01 + repulsionX,
          y: p.y + p.vy + dy * 0.01 + repulsionY,
          vx: p.vx * 0.99 + (Math.random() - 0.5) * 0.1,
          vy: p.vy * 0.99 + (Math.random() - 0.5) * 0.1,
        };
      }));
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [smoothMouseX, smoothMouseY]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}40`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.map((p1, i) => 
          particles.slice(i + 1).map((p2, j) => {
            const dist = Math.sqrt(
              Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
            );
            if (dist < 15) {
              return (
                <line
                  key={`${i}-${j}`}
                  x1={`${p1.x}%`}
                  y1={`${p1.y}%`}
                  x2={`${p2.x}%`}
                  y2={`${p2.y}%`}
                  stroke="#2563EB"
                  strokeWidth={0.5}
                  opacity={0.2 * (1 - dist / 15)}
                />
              );
            }
            return null;
          })
        )}
      </svg>
    </div>
  );
}
