import { Camera, ChevronDown, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const featuredShots = [
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?q=80&w=1000&auto=format&fit=crop',
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100 pt-28 pb-16">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute top-0 right-0 z-0 h-full w-1/2 rounded-full bg-blue-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-2/3 w-1/3 rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Text block */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur-md px-4 py-2 text-[10px] font-black tracking-[0.25em] text-blue-600 uppercase lg:mx-0 shadow-sm">
            <Camera className="h-3.5 w-3.5 text-blue-600" /> Professional Visuals
          </div>
          
          <h1 className="text-5xl font-black leading-[0.95] tracking-tighter uppercase text-slate-900 sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            LIL SEMA<span className="text-blue-600">&apos;S</span><br />
            <span className="text-slate-900">PRO SHOTS</span>
          </h1>

          <p className="mx-auto max-w-lg text-base font-medium leading-relaxed text-slate-600 md:text-xl lg:mx-0">
            From raw emotion to cinematic perfection. Capturing the essence of your vision through high-end digital artistry in Yaounde, Cameroon.
          </p>

          <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row justify-center lg:justify-start">
            <Link
              href="/gallery"
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-center text-xs font-black tracking-widest text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/25 active:scale-95 sm:w-auto uppercase"
            >
              EXPLORE WORKS <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-white border border-slate-200 px-8 py-4 text-center text-xs font-black tracking-widest text-slate-800 transition-all hover:border-blue-400 hover:text-blue-600 shadow-sm active:scale-95 sm:w-auto uppercase"
            >
              BOOK A SESSION
            </Link>
          </div>
        </div>

        {/* Image showcase grid */}
        <div className="grid h-[340px] w-full grid-cols-2 gap-3 sm:h-[480px] md:gap-4 lg:h-[540px]">
          <div className="relative col-span-1 row-span-2 overflow-hidden rounded-[2rem] bg-white p-2 shadow-2xl shadow-slate-200/80 border border-slate-200/80 md:rounded-[2.5rem]">
            <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-slate-100 md:rounded-[2.1rem]">
              <Image
                src={featuredShots[0]}
                alt="Lil Sema professional portrait photography in Yaounde, Cameroon"
                fill
                sizes="(max-width: 768px) 50vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={75}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
            </div>
          </div>

          <div className="col-span-1 flex flex-col space-y-3 md:space-y-4">
            {[featuredShots[1], featuredShots[2]].map((src, i) => (
              <div
                key={src}
                className="relative flex-1 overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-lg shadow-slate-200/60 border border-slate-200/80 md:rounded-[2rem]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] bg-slate-100 md:rounded-[1.6rem]">
                  <Image
                    src={src}
                    alt={i === 0 ? 'Cinematic event videography by Lil Sema' : 'High-detail portrait shoot by Lil Sema'}
                    fill
                    sizes="(max-width: 768px) 30vw, 20vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    quality={75}
                    loading="eager"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce opacity-40 lg:block">
        <ChevronDown className="h-6 w-6 text-slate-600" />
      </div>
    </section>
  );
}
