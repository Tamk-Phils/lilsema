'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, Award, Users, Layers } from 'lucide-react';
import { useRef } from 'react';

const stats = [
  { label: 'PROJECTS COMPLETED', value: '200+', icon: Layers },
  { label: 'HAPPY CLIENTS', value: '150+', icon: Users },
  { label: 'YEARS EXPERIENCE', value: '5+', icon: Award },
  { label: 'PROFESSIONAL SHOTS', value: '10K+', icon: Camera },
];

export default function Stats3D() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -12]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-black px-6 py-20">
      <motion.div
        style={{ rotateX }}
        className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-12 [perspective:1200px] [transform-style:preserve-3d] md:justify-between"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, rotateY: -25 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              rotateY: 8,
              rotateX: -6,
            }}
            className="group flex flex-col items-center text-center [transform-style:preserve-3d]"
          >
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors group-hover:border-blue-500/40 group-hover:bg-blue-500/10">
              <stat.icon className="h-8 w-8 text-blue-500 transition-transform group-hover:scale-110" />
            </div>
            <h4 className="mb-1 text-4xl font-black tracking-tighter">{stat.value}</h4>
            <p className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute top-1/2 left-1/2 z-0 h-[1px] w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
