'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Users, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="pt-32 pb-24 px-4 bg-slate-50 min-h-screen text-slate-900 flex-1">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-[10px] font-black tracking-[0.25em] text-blue-600 uppercase">About Lil Sema</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none text-slate-900">
              BEHIND <br /> THE <span className="text-blue-600">LENS</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Lil Sema is a visionary photographer and videographer based in Yaounde, Cameroon, specializing in high-end mobile photography and cinematic storytelling.
            </p>
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm">
                <Award className="text-blue-600 w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-800">5+ Years Exp</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm">
                <Users className="text-blue-600 w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-800">200+ Clients</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm">
                <MapPin className="text-blue-600 w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-800">Yaounde, Cameroon</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[540px] rounded-[2.5rem] overflow-hidden bg-white p-2 border border-slate-200 shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1000&auto=format&fit=crop"
              alt="Lil Sema at work"
              fill
              className="object-cover rounded-[2.1rem]"
              priority
            />
          </motion.div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black">01</div>
            <h3 className="text-2xl font-black uppercase text-slate-900">The Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We believe that the best camera is the one you have with you. My mission is to push the boundaries of phone photography, proving that professional quality starts with the eye, not just the gear.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black">02</div>
            <h3 className="text-2xl font-black uppercase text-slate-900">The Process</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              From initial concept and lighting setup to precise post-production. Every frame is treated with the same meticulous care to ensure your moments are captured with cinematic depth.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black">03</div>
            <h3 className="text-2xl font-black uppercase text-slate-900">The Result</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Breathtaking visuals that tell a story. Whether it&apos;s a personal portrait or a major event, our goal is to deliver images that you&apos;ll cherish for a lifetime.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-[3rem] p-12 md:p-16 text-center text-white relative overflow-hidden shadow-xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">READY TO CREATE?</h2>
          <p className="text-blue-100 text-base mb-8 max-w-xl mx-auto">
            Join the hundreds of satisfied clients who have trusted Lil Sema to capture their most important memories.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-700 font-black text-xs tracking-widest uppercase rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-lg"
          >
            GET IN TOUCH NOW
          </Link>
        </section>
      </div>
    </main>
  );
}
