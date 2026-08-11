'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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
  const [viewingImageIndex, setViewingImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialImages.length === 0) {
      fetchImages();
    }
  }, [initialImages.length]);

  const fetchImages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setImages(data);
    setLoading(false);
  };

  const filteredImages = filter === 'All'
    ? images
    : images.filter(img => img.category === filter);

  // Grouped logic for events
  const eventGroups = filteredImages.reduce((acc: Record<string, GalleryImage[]>, img) => {
    if (img.event_name) {
      if (!acc[img.event_name]) acc[img.event_name] = [];
      acc[img.event_name].push(img);
    } else {
      acc[`solo-${img.id}`] = [img];
    }
    return acc;
  }, {});

  const eventCovers = Object.keys(eventGroups).map(key => ({
    key,
    images: eventGroups[key],
    isEvent: !key.startsWith('solo-'),
    name: key.startsWith('solo-') ? null : key
  }));

  const openEvent = (eventName: string | null, imagesInEvent: GalleryImage[]) => {
    if (eventName) {
      setSelectedEvent(eventName);
      setViewingImageIndex(0);
    } else {
      setSelectedEvent(null);
      setViewingImageIndex(images.findIndex(img => img.id === imagesInEvent[0].id));
    }
  };

  const currentEventImages = selectedEvent
    ? eventGroups[selectedEvent]
    : (viewingImageIndex !== null ? [images[viewingImageIndex]] : []);

  return (
    <section id="gallery" className="pt-32 pb-24 px-4 bg-slate-50 min-h-screen text-slate-900">
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
                  filter === cat ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {eventCovers.map((group) => (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => openEvent(group.name, group.images)}
                className="relative group cursor-pointer rounded-[2.2rem] overflow-hidden bg-white border border-slate-200/80 p-2 shadow-sm transition-all hover:shadow-xl hover:border-blue-200 break-inside-avoid"
              >
                <div className="relative w-full aspect-[4/5] rounded-[1.8rem] overflow-hidden">
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
                        {group.name || `Asset #${group.images[0].id.toString().slice(-4)}`}
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
          {(selectedEvent || viewingImageIndex !== null) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-8"
            >
              {/* Close & Action Buttons */}
              <div className="absolute top-20 md:top-8 right-4 md:right-8 flex items-center gap-3 z-[110]">
                {currentEventImages[viewingImageIndex || 0] && (
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = currentEventImages[viewingImageIndex || 0].url;
                      link.download = `SemaPhoto_${currentEventImages[viewingImageIndex || 0].id}.jpg`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black tracking-widest uppercase rounded-full transition-all shadow-lg"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                )}
                <button
                  onClick={() => { setSelectedEvent(null); setViewingImageIndex(null); }}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all text-white"
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="w-full max-w-6xl relative h-[70vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={viewingImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full flex items-center justify-center p-2"
                  >
                    <Image
                      src={currentEventImages[viewingImageIndex || 0]?.url || images[viewingImageIndex || 0]?.url}
                      alt="Full Resolution View"
                      fill
                      className="object-contain"
                      quality={85}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {currentEventImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setViewingImageIndex(prev => (prev! > 0 ? prev! - 1 : currentEventImages.length - 1))}
                      className="absolute left-2 p-3 md:p-4 bg-slate-900/60 backdrop-blur-md text-white rounded-full border border-white/10 hover:bg-white hover:text-slate-900 transition-all z-10"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setViewingImageIndex(prev => (prev! < currentEventImages.length - 1 ? prev! + 1 : 0))}
                      className="absolute right-2 p-3 md:p-4 bg-slate-900/60 backdrop-blur-md text-white rounded-full border border-white/10 hover:bg-white hover:text-slate-900 transition-all z-10"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-6 text-center space-y-3 max-w-xl text-white">
                <div className="bg-white/10 px-6 py-3 border border-white/10 inline-block rounded-2xl backdrop-blur-md">
                  <h4 className="text-lg md:text-2xl font-black tracking-tight uppercase">
                    {selectedEvent || "Collection Detail"}
                  </h4>
                  <p className="text-[9px] font-bold tracking-widest text-slate-300 uppercase mt-0.5">
                    Asset ID: {currentEventImages[viewingImageIndex || 0]?.id.toString().slice(-6) || "---"}
                  </p>
                </div>

                {selectedEvent && (
                  <div className="flex gap-2 justify-center pt-2">
                    {currentEventImages.map((_: unknown, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setViewingImageIndex(idx)}
                        className={`transition-all rounded-full ${idx === viewingImageIndex ? 'bg-blue-500 w-8 h-1.5' : 'bg-white/20 hover:bg-white/40 w-2 h-1.5'}`}
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
