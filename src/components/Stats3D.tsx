'use client';

import { motion } from 'framer-motion';
import { Camera, Award, Users, Layers } from 'lucide-react';

const stats = [
  { label: 'PROJECTS COMPLETED', value: '200+', icon: Layers },
  { label: 'HAPPY CLIENTS', value: '150+', icon: Users },
  { label: 'YEARS EXPERIENCE', value: '5+', icon: Award },
  { label: 'PROFESSIONAL SHOTS', value: '10K+', icon: Camera },
];

export default function Stats3D() {
  return (
    <section className="relative overflow-hidden bg-slate-50 border-b border-slate-200/80 px-6 py-16">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="group flex flex-col items-center justify-center p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm transition-all hover:shadow-md hover:border-blue-200"
          >
            <div className="mb-3 rounded-2xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <stat.icon className="h-6 w-6" />
            </div>
            <h4 className="mb-1 text-3xl md:text-4xl font-black tracking-tighter text-slate-900">{stat.value}</h4>
            <p className="text-[9px] md:text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
