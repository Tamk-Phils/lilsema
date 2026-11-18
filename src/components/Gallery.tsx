'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { GalleryImage } from '@/lib/seo';
import { Loader2, X, ChevronLeft, ChevronRight, Layers, Download } from 'lucide-react';

type GalleryProps = {
  initialImages?: GalleryImage[];
};

export default function Gallery({ initialImages = [] }: GalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [loading, setLoading] = useState(initialImages.length === 0);
  const [filter, setFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [activeImages, setActiveImages] = useState<GalleryImage[]>([]);
  const [viewingImageIndex, setViewingImageIndex] = useState<number | null>(null);

  useEffect(() => {
    let ignore = false;
    if (initialImages.length === 0) {
      supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          if (!ignore) {
            if (data) setImages(data);
            setLoading(false);
          }
        });
    }
    return () => {
      ignore = true;
    };
  }, [initialImages.length]);

  const filteredImages = filter === 'All'
    ? images
    : images.filter((img) => img.category === filter);

  // Group images by event
  const eventGroups = filteredImages.reduce((acc: Record<string, GalleryImage[]>, img) => {
    if (img.event_name) {
      if (!acc[img.event_name]) acc[img.event_name] = [];
      acc[img.event_name].push(img);
    } else {
      acc[`solo-${img.id}`] = [img];
    }
    return acc;
  }, {});

  const eventCovers = Object.keys(eventGroups).map((key) => ({
    key,
    images: eventGroups[key],
    isEvent: !key.startsWith('solo-'),
    name: key.startsWith('solo-') ? null : key,
  }));

  const openEvent = (eventName: string | null, imagesInEvent: GalleryImage[]) => {
    if (eventName) {
      setSelectedEvent(eventName);
      setActiveImages(imagesInEvent);
      setViewingImageIndex(0);
    } else {
      setSelectedEvent(null);
      // For solo items, let user navigate across all filtered images starting from clicked item
      const clickedIdx = filteredImages.findIndex((img) => img.id === imagesInEvent[0].id);
      setActiveImages(filteredImages);
      setViewingImageIndex(clickedIdx >= 0 ? clickedIdx : 0);
    }
  };

  const closeLightbox = useCallback(() => {
    setViewingImageIndex(null);
    setSelectedEvent(null);
    setActiveImages([]);
  }, []);

  const navigatePrev = useCallback(() => {
    if (viewingImageIndex === null || activeImages.length <= 1) return;
    setViewingImageIndex((prev) => (prev! > 0 ? prev! - 1 : activeImages.length - 1));
  }, [viewingImageIndex, activeImages.length]);

  const navigateNext = useCallback(() => {
    if (viewingImageIndex === null || activeImages.length <= 1) return;
    setViewingImageIndex((prev) => (prev! < activeImages.length - 1 ? prev! + 1 : 0));
  }, [viewingImageIndex, activeImages.length]);

  // Keyboard navigation & lock scroll
  useEffect(() => {
    const isLightboxOpen = viewingImageIndex !== null;

    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigatePrev();
        if (e.key === 'ArrowRight') navigateNext();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [viewingImageIndex, closeLightbox, navigatePrev, navigateNext]);

  const currentImage = viewingImageIndex !== null && activeImages[viewingImageIndex]
    ? activeImages[viewingImageIndex]
    : null;

  return (
    <section id="gallery" className="pt-28 md:pt-36 pb-20 px-4 md:px-6 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6 border-b border-slate-200/80 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black tracking-[0.25em] text-blue-600 uppercase">Portfolio Collections</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-slate-900">
              THE <span className="text-blue-600">ARCHIVE</span>
            </h1>
            <p className="text-slate-600 max-w-md font-normal text-sm pt-1">
              Photography &amp; videography portfolio — portraits, weddings, and events in Yaounde, Cameroon.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
            {['All', 'Photography', 'Portrait', 'Event', 'Cinematic'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full transition-all text-[10px] font-black tracking-widest uppercase ${
                  filter === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase italic">Loading visual archive...</p>
          </div>
        ) : eventCovers.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-slate-200/80 p-8">
            <p className="text-slate-600 font-bold text-sm">No photos found in this category.</p>
            <button
              onClick={() => setFilter('All')}
              className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-full text-xs font-black tracking-widest uppercase hover:bg-blue-700 transition-colors"
            >
              Show All Photos
            </button>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {eventCovers.map((group) => (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => openEvent(group.name, group.images)}
                className="relative group cursor-pointer rounded-[2.2rem] overflow-hidden bg-white border border-slate-200/80 p-2 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200 break-inside-avoid"
              >
                <div className="relative w-full aspect-[4/5] rounded-[1.8rem] overflow-hidden bg-slate-100">
                  <Image
                    src={group.images[0].url}
                    alt={group.name ? `${group.name} — ${group.images[0].category ?? 'photography'} by Lil Sema` : `Lil Sema ${group.images[0].category ?? 'photography'} work`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={group.images[0].id === images[0]?.id || group.images[0].id === images[1]?.id}
                    quality={75}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-600 rounded-full text-[8px] font-black tracking-widest text-white uppercase shadow-sm">
                          {group.images[0].category}
                        </span>
                        {group.isEvent && (
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[8px] font-black tracking-widest text-white uppercase border border-white/20 flex items-center gap-1.5">
                            <Layers className="w-2.5 h-2.5" /> {group.images.length} SHOTS
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-black tracking-tight uppercase leading-tight truncate">
                        {group.name || `Shot #${String(group.images[0].id).slice(-4)}`}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {currentImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 md:p-8"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeLightbox();
              }}
            >
              {/* Top Bar: Counter, Download, Close */}
              <div className="w-full max-w-6xl flex items-center justify-between z-[110] pt-2 md:pt-0">
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase border border-white/15">
                    {viewingImageIndex! + 1} / {activeImages.length}
                  </span>
                  {selectedEvent && (
                    <span className="hidden sm:inline-block px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-[11px] font-bold tracking-wider uppercase truncate max-w-xs">
                      {selectedEvent}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = currentImage.url;
                      link.download = `LilSema_${currentImage.id}.jpg`;
                      link.target = '_blank';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wider uppercase rounded-full transition-all shadow-lg active:scale-95"
                    title="Download high-resolution image"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </button>

                  <button
                    onClick={closeLightbox}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all text-white active:scale-95"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Showcase */}
              <div className="w-full max-w-6xl relative flex-1 flex items-center justify-center my-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center"
                  >
                    <Image
                      src={currentImage.url}
                      alt={currentImage.event_name || `Lil Sema ${currentImage.category ?? 'photography'}`}
                      fill
                      className="object-contain"
                      quality={90}
                      priority
                      sizes="100vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {activeImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigatePrev();
                      }}
                      className="absolute left-2 md:left-4 p-3 bg-slate-900/70 hover:bg-white hover:text-slate-900 text-white rounded-full border border-white/20 backdrop-blur-md transition-all z-10 active:scale-90 shadow-lg"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateNext();
                      }}
                      className="absolute right-2 md:right-4 p-3 bg-slate-900/70 hover:bg-white hover:text-slate-900 text-white rounded-full border border-white/20 backdrop-blur-md transition-all z-10 active:scale-90 shadow-lg"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Bottom Caption / Thumbnail indicator */}
              <div className="w-full max-w-xl text-center space-y-2 text-white pb-2">
                <div className="bg-slate-900/80 px-6 py-2.5 border border-white/10 inline-block rounded-2xl backdrop-blur-md shadow-lg">
                  <h4 className="text-sm md:text-base font-black tracking-tight uppercase">
                    {currentImage.event_name || currentImage.category || 'Portfolio Shot'}
                  </h4>
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">
                    Category: {currentImage.category || 'General'}
                  </p>
                </div>

                {activeImages.length > 1 && activeImages.length <= 16 && (
                  <div className="flex gap-1.5 justify-center pt-1 overflow-x-auto max-w-full px-4">
                    {activeImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setViewingImageIndex(idx)}
                        className={`transition-all rounded-full h-1.5 ${
                          idx === viewingImageIndex ? 'bg-blue-500 w-6' : 'bg-white/30 hover:bg-white/60 w-1.5'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
