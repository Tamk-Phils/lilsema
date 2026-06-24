'use client';

import { motion } from 'framer-motion';

const shapes = [
  { size: 120, x: '8%', y: '12%', delay: 0, duration: 18, color: 'rgba(59,130,246,0.15)' },
  { size: 80, x: '85%', y: '18%', delay: 2, duration: 22, color: 'rgba(255,255,255,0.06)' },
  { size: 160, x: '72%', y: '68%', delay: 1, duration: 26, color: 'rgba(59,130,246,0.1)' },
  { size: 60, x: '15%', y: '75%', delay: 3, duration: 20, color: 'rgba(255,255,255,0.08)' },
];

export default function Home3DBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 [perspective:1200px]">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-2xl border border-white/10 will-change-transform"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              background: `linear-gradient(135deg, ${shape.color}, transparent)`,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: [0, 360, 0],
              rotateY: [0, 180, 360],
              y: [0, -30, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: shape.delay,
            }}
          />
        ))}

        <motion.div
          className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full border border-blue-500/10 will-change-transform"
          style={{ transform: 'rotateX(75deg)' }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.12),_transparent_55%)]" />
    </div>
  );
}
