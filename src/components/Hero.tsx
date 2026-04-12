'use client';

import { Camera, ChevronDown, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const featuredShots = [
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?q=80&w=1000&auto=format&fit=crop",
];

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 bg-black">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-blue-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10 w-full py-10 lg:py-20">
        {/* Left Side: Text Content */}
        <div className="space-y-6 md:space-y-8 text-center lg:text-left z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 glass-card rounded-full text-[9px] font-black tracking-[0.3em] text-blue-400 uppercase mx-auto lg:mx-0">
            <Camera className="w-3 h-3" /> Professional Visuals
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] lg:leading-[0.85] uppercase">
            LIL SEMA<span className="text-blue-500">'</span>S <br /> 
            <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">PRO SHOTS</span>
          </h1>
          
          <p className="text-sm md:text-xl text-white/50 max-w-lg font-medium leading-relaxed mx-auto lg:mx-0">
            From raw emotion to cinematic perfection. We capture the essence of your vision through high-end digital artistry.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link 
              href="/gallery"
              className="w-full lg:w-auto px-10 py-5 bg-white text-black font-black text-[10px] tracking-widest rounded-full hover:bg-blue-600 hover:text-white transition-all transform active:scale-95 text-center flex items-center justify-center gap-3 group"
            >
              EXPLORE WORKS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
 
        {/* Right Side: Imagery Showcase */}
        <div className="relative grid grid-cols-2 gap-3 md:gap-4 h-[300px] sm:h-[450px] lg:h-[600px] w-full z-10">
          {/* Main Large Image */}
          <div className="col-span-1 row-span-2 relative rounded-[2rem] md:rounded-[3rem] overflow-hidden glass-card p-1 shadow-2xl shadow-blue-500/10 active:scale-95 transition-transform duration-500 group">
            <div className="relative w-full h-full rounded-[1.8rem] md:rounded-[2.8rem] overflow-hidden bg-white/5">
              <Image 
                src={featuredShots[0]}
                alt="Featured Pro Shot"
                fill
                sizes="(max-width: 768px) 50vw, 40vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                priority
                quality={75}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />
            </div>
          </div>
          
          <div className="col-span-1 space-y-3 md:space-y-4 flex flex-col">
            {/* Top Smaller Image */}
            <div className="flex-1 relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden glass-card p-1 shadow-xl shadow-black/20 group cursor-pointer active:scale-95 transition-transform duration-500">
              <div className="relative w-full h-full rounded-[1.3rem] md:rounded-[1.8rem] overflow-hidden bg-white/5">
                <Image 
                  src={featuredShots[1]}
                  alt="Cinematic Moment"
                  fill
                  sizes="(max-width: 768px) 30vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  quality={75}
                />
              </div>
            </div>
            
            {/* Bottom Smaller Image */}
            <div className="flex-1 relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden glass-card p-1 shadow-xl shadow-black/20 group cursor-pointer active:scale-95 transition-transform duration-500">
              <div className="relative w-full h-full rounded-[1.3rem] md:rounded-[1.8rem] overflow-hidden bg-white/5">
                <Image 
                  src={featuredShots[2]}
                  alt="Portrait Detail"
                  fill
                  sizes="(max-width: 768px) 30vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  quality={75}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 hidden lg:block animate-bounce">
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
}
