'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { GalleryImage } from '@/lib/seo';

type GalleryCard3DProps = {
  image: GalleryImage;
  index: number;
};

export function GalleryCard3D({ image, index }: GalleryCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const title = image.event_name ?? image.category ?? 'Latest Work';
  const alt = image.event_name
    ? `${image.event_name} — ${image.category ?? 'photography'} by Lil Sema`
    : `Lil Sema ${image.category ?? 'photography'} portfolio`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative aspect-[3/4] [perspective:1200px]"
    >
      <div
        className="relative h-full w-full rounded-[2.5rem] border border-white/10 bg-white/5 p-1.5 shadow-2xl shadow-blue-500/10 transition-shadow duration-500 group-hover:shadow-blue-500/25"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem]">
          <Image
            src={image.url}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70" />
          <div
            className="absolute inset-x-0 bottom-0 p-8"
            style={{ transform: 'translateZ(40px)' }}
          >
            <span className="text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase">
              {image.category ?? 'Photography'}
            </span>
            <h3 className="mt-2 text-xl font-black tracking-tight text-white uppercase line-clamp-2">
              {title}
            </h3>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-blue-600/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ transform: 'translateZ(-30px)' }}
      />
    </motion.div>
  );
}

type LatestGalleryProps = {
  images: GalleryImage[];
};

const fallbackImages: GalleryImage[] = [
  {
    id: 'fallback-1',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    category: 'Portrait',
    event_name: 'Portrait Session',
  },
  {
    id: 'fallback-2',
    url: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=1000&auto=format&fit=crop',
    category: 'Event',
    event_name: 'Event Coverage',
  },
  {
    id: 'fallback-3',
    url: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=1000&auto=format&fit=crop',
    category: 'Photography',
    event_name: 'Wedding Day',
  },
];

export default function LatestGallery({ images }: LatestGalleryProps) {
  const displayImages = (images.length > 0 ? images.slice(0, 6) : fallbackImages).slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-black py-32 px-6">
      <div className="pointer-events-none absolute inset-0 [perspective:1000px]">
        <div className="absolute left-1/4 top-20 h-64 w-64 animate-[spin_28s_linear_infinite] rounded-full border border-blue-500/10 [transform:rotateX(65deg)]" />
        <div className="absolute bottom-10 right-1/4 h-48 w-48 animate-[spin_22s_linear_infinite_reverse] rounded-full border border-white/5 [transform:rotateX(72deg)_rotateZ(45deg)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase"
            >
              Fresh from the studio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-black leading-none tracking-tighter md:text-7xl"
            >
              LATEST <br />
              <span className="text-white/30">DROPS</span>
            </motion.h2>
          </div>
          <Link
            href="/gallery"
            className="border-b-2 border-blue-500 pb-2 text-sm font-black tracking-[0.3em] text-blue-500 uppercase transition-colors hover:text-white"
          >
            View Full Gallery
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 [perspective:1400px]">
          {displayImages.map((image, index) => (
            <GalleryCard3D key={image.id} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
