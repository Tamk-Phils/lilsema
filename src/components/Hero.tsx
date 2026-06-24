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
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black pt-20">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute top-0 right-0 z-0 h-full w-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-2/3 w-1/3 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* Text block */}
        <div className="space-y-6 text-center md:space-y-8 lg:text-left">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 glass-card px-4 py-2 text-[9px] font-black tracking-[0.3em] text-blue-400 uppercase lg:mx-0">
            <Camera className="h-3 w-3" /> Professional Visuals
          </div>
          <h1 className="text-4xl font-black leading-[0.9] tracking-tighter uppercase sm:text-6xl md:text-8xl lg:text-[7rem] lg:leading-[0.85]">
            LIL SEMA<span className="text-blue-500">&apos;S</span><br />
            <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">PRO SHOTS</span>
          </h1>
          <p className="mx-auto max-w-lg text-sm font-medium leading-relaxed text-white/50 md:text-xl lg:mx-0">
            From raw emotion to cinematic perfection. We capture the essence of your vision through high‑end digital artistry.
          </p>
          <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
            <Link
              href="/gallery"
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-center text-[10px] font-black tracking-widest text-black transition-all hover:bg-blue-600 hover:text-white active:scale-95 lg:w-auto"
            >
              EXPLORE WORKS <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Image grid – static, no 3D rotation */}
        <div className="grid h-[300px] w-full grid-cols-2 gap-3 sm:h-[450px] md:gap-4 lg:h-[600px]">
          <div className="relative col-span-1 row-span-2 overflow-hidden rounded-[2rem] glass-card p-1 shadow-2xl shadow-blue-500/10 md:rounded-[3rem]">
            <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-white/5 md:rounded-[2.8rem]">
              <Image
                src={featuredShots[0]}
                alt="Lil Sema professional portrait photography — cinematic mobile photography in Cameroon"
                fill
                sizes="(max-width: 768px) 50vw, 40vw"
                className="object-cover transition-transform duration-500 hover:scale-110"
                quality={60}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-40" />
            </div>
          </div>
          <div className="col-span-1 flex flex-col space-y-3 md:space-y-4">
            {[featuredShots[1], featuredShots[2]].map((src, i) => (
              <div
                key={src}
                className="relative flex-1 overflow-hidden rounded-[1.5rem] glass-card p-1 shadow-xl shadow-black/20 md:rounded-[2rem]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[1.3rem] bg-white/5 md:rounded-[1.8rem]">
                  <Image
                    src={src}
                    alt={i === 0 ? 'Cinematic event videography by Lil Sema in Yaounde, Cameroon' : 'High‑detail portrait photography session by Lil Sema'}
                    fill
                    sizes="(max-width: 768px) 30vw, 20vw"
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    quality={60}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 animate-bounce opacity-30 lg:block">
        <ChevronDown className="h-6 w-6 text-white" />
      </div>
    </section>
  );
}
