'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera, Award, Users, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="pt-32 pb-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">BEHIND <br /> THE LENS</h1>
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              Lil Sema is a visionary photographer and videographer based in Cameroon, specializing in high-end phone photography and cinematic storytelling.
            </p>
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <Award className="text-blue-400" />
                <span className="text-sm font-bold uppercase tracking-widest">5+ Years Exp</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-blue-400" />
                <span className="text-sm font-bold uppercase tracking-widest">200+ Clients</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-400" />
                <span className="text-sm font-bold uppercase tracking-widest">Cameroon</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] rounded-3xl overflow-hidden glass-card p-2"
          >
            <Image 
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1000&auto=format&fit=crop"
              alt="Lil Sema at work"
              fill
              className="object-cover rounded-2xl"
            />
          </motion.div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="glass-card p-10">
            <h3 className="text-2xl font-bold mb-4">The Vision</h3>
            <p className="text-white/50 leading-relaxed">
              We believe that the best camera is the one you have with you. My mission is to push the boundaries of phone photography, proving that professional quality starts with the eye, not just the gear.
            </p>
          </div>
          <div className="glass-card p-10">
            <h3 className="text-2xl font-bold mb-4">The Process</h3>
            <p className="text-white/50 leading-relaxed">
              From initial concept and lighting setup to precise post-production. Every frame is treated with the same meticulous care to ensure your moments are captured with cinematic depth.
            </p>
          </div>
          <div className="glass-card p-10">
            <h3 className="text-2xl font-bold mb-4">The Result</h3>
            <p className="text-white/50 leading-relaxed">
              Breathtaking visuals that tell a story. Whether it's a personal portrait or a major event, our goal is to deliver images that you'll cherish for a lifetime.
            </p>
          </div>
        </section>

        <section className="bg-white/5 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 blur-[120px]" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">READY TO CREATE?</h2>
          <p className="text-white/40 text-lg mb-12 max-w-2xl mx-auto relative z-10">
            Join the hundreds of satisfied clients who have trusted Lil Sema to capture their most important memories.
          </p>
          <a href="/contact" className="inline-block px-10 py-5 bg-white text-black font-black rounded-full hover:scale-105 transition-transform relative z-10">
            GET IN TOUCH
          </a>
        </section>
      </div>
    </main>
  );
}
