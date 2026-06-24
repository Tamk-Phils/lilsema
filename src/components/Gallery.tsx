'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { GalleryImage } from '@/lib/seo';
import { Loader2, X, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

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
    const { data, error } = await supabase
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
  const eventGroups = filteredImages.reduce((acc: any, img) => {
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

  const openEvent = (eventName: string | null, imagesInEvent: any[]) => {
    if (eventName) {
      setSelectedEvent(eventName);
      setViewingImageIndex(0);
    } else {
      // Small solo shot lightbox logic could go here if needed
      setSelectedEvent(null);
      setViewingImageIndex(images.findIndex(img => img.id === imagesInEvent[0].id));
    }
  };

  const currentEventImages = selectedEvent 
    ? eventGroups[selectedEvent] 
    : (viewingImageIndex !== null ? [images[viewingImageIndex]] : []);

  return (
    <section id="gallery" className="py-24 px-4 bg-black selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">THE <br /> ARCHIVE</h1>
            <p className="text-white/30 max-w-sm font-medium">Photography &amp; videography portfolio — portraits, weddings, and events in Cameroon.</p>
          </div>
          <div className="flex gap-2 flex-wrap bg-white/5 p-1.5 rounded-full border border-white/5">
            {['All', 'Photography', 'Portrait', 'Event', 'Cinematic'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full transition-all text-[10px] font-black tracking-widest uppercase ${filter === cat ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white/60'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-6" />
            <p className="text-[10px] font-black tracking-[0.4em] text-white/10 uppercase italic">Reconstructing visuals...</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {eventCovers.map((group) => (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => openEvent(group.name, group.images)}
                className="relative group cursor-pointer rounded-[2.5rem] overflow-hidden bg-white/[0.03] border border-white/5 p-1.5 transition-all hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1"
              >
                <div className="relative w-full aspect-[4/5] rounded-[2.2rem] overflow-hidden">
                  <Image 
                    src={group.images[0].url} 
                    alt={group.name ? `${group.name} — ${group.images[0].category ?? 'photography'} by Lil Sema` : `Lil Sema ${group.images[0].category ?? 'photography'} work`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    priority={group.images[0].id === images[0]?.id || group.images[0].id === images[1]?.id}
                    quality={95}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-10">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-600 rounded-full text-[8px] font-black tracking-widest text-white uppercase">
                          {group.images[0].category}
                        </span>
                        {group.isEvent && (
                          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-black tracking-widest text-white uppercase border border-white/10 flex items-center gap-1.5">
                            <Layers className="w-2.5 h-2.5" /> {group.images.length} SHOTS
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-black tracking-tighter uppercase leading-tight truncate">
                        {group.name || `Asset #${group.images[0].id.toString().slice(-4)}`}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && images.length > 0 && (
          <noscript>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {images.map((img) => (
                <li key={img.id}>
                  <img
                    src={img.url}
                    alt={img.event_name ? `${img.event_name} — ${img.category ?? 'photography'} by Lil Sema` : `Lil Sema ${img.category ?? 'photography'} portfolio`}
                    width={400}
                    height={500}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </noscript>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {(selectedEvent || viewingImageIndex !== null) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-4 md:p-10"
            >
              <div className="absolute top-10 right-10 flex gap-4 z-[110]">
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
                    className="flex items-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-[10px] font-black tracking-widest uppercase rounded-full transition-all shadow-2xl shadow-blue-500/20"
                  >
                    Download Original
                  </button>
                )}
                <button 
                  onClick={() => { setSelectedEvent(null); setViewingImageIndex(null); }}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all group"
                >
                  <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              <div className="w-full max-w-7xl relative h-[75vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={viewingImageIndex}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-full h-full flex items-center justify-center p-2"
                  >
                    <Image 
                      src={currentEventImages[viewingImageIndex || 0]?.url || images[viewingImageIndex || 0]?.url}
                      alt="Full Resolution View"
                      fill
                      className="object-contain"
                      quality={80}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {currentEventImages.length > 1 && (
                  <>
                    <button 
                      onClick={() => setViewingImageIndex(prev => (prev! > 0 ? prev! - 1 : currentEventImages.length - 1))}
                      className="absolute left-0 p-4 md:p-6 bg-black/40 backdrop-blur-xl rounded-full border border-white/5 hover:bg-white hover:text-black transition-all hover:scale-110 z-10"
                    >
                      <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                    <button 
                      onClick={() => setViewingImageIndex(prev => (prev! < currentEventImages.length - 1 ? prev! + 1 : 0))}
                      className="absolute right-0 p-4 md:p-6 bg-black/40 backdrop-blur-xl rounded-full border border-white/5 hover:bg-white hover:text-black transition-all hover:scale-110 z-10"
                    >
                      <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-8 md:mt-12 text-center space-y-4 md:space-y-6 max-w-2xl px-6">
                <div className="glass-card px-6 py-4 md:px-8 md:py-5 border-white/10 inline-block rounded-2xl md:rounded-3xl backdrop-blur-2xl">
                  <h4 className="text-xl md:text-5xl font-black tracking-tighter uppercase mb-1 md:mb-2">
                    {selectedEvent || "Collection Detail"}
                  </h4>
                  <p className="text-[8px] md:text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">
                    Asset ID: {currentEventImages[viewingImageIndex || 0]?.id.toString().slice(-6) || "---"}
                  </p>
                </div>
                
                {selectedEvent && (
                  <div className="flex gap-4 justify-center">
                    {currentEventImages.map((_: any, idx: number) => (
                      <button 
                        key={idx}
                        onClick={() => setViewingImageIndex(idx)}
                        className={`transition-all duration-500 rounded-full ${idx === viewingImageIndex ? 'bg-blue-600 w-12 h-1.5' : 'bg-white/10 hover:bg-white/20 w-3 h-1.5'}`}
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
