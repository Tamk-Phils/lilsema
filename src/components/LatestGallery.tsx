'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { GalleryImage } from '@/lib/seo';

type GalleryCardProps = {
  image: GalleryImage;
  index: number;
};

export function GalleryCard({ image, index }: GalleryCardProps) {
  const title = image.event_name ?? image.category ?? 'Latest Work';
  const alt = image.event_name
    ? `${image.event_name} — ${image.category ?? 'photography'} by Lil Sema`
    : `Lil Sema ${image.category ?? 'photography'} portfolio`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative aspect-[3/4] overflow-hidden rounded-[2.2rem] bg-white border border-slate-200/80 p-2 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
        <Image
          src={image.url}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-[9px] font-black tracking-widest uppercase mb-2 shadow-sm">
            {image.category ?? 'Photography'}
          </span>
          <h3 className="text-lg font-black tracking-tight uppercase line-clamp-2 leading-tight">
            {title}
          </h3>
        </div>
      </div>
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
    <section className="relative overflow-hidden bg-slate-50 py-28 px-6 border-b border-slate-200/80">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <p className="text-[10px] font-black tracking-[0.25em] text-blue-600 uppercase">
              Fresh from the studio
            </p>
            <h2 className="text-4xl font-black leading-none tracking-tighter text-slate-900 md:text-6xl uppercase">
              LATEST <span className="text-blue-600">DROPS</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 border-b-2 border-blue-600 pb-1 text-xs font-black tracking-widest text-blue-600 uppercase transition-colors hover:text-blue-700"
          >
            View Full Gallery &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayImages.map((image, index) => (
            <GalleryCard key={image.id} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
